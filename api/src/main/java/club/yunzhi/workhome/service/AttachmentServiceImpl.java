package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.repository.AttachmentRepository;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.mengyunzhi.core.exception.ValidationException;
import com.mengyunzhi.core.service.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Calendar;
import java.util.regex.Pattern;

@Service
public class AttachmentServiceImpl implements AttachmentService {

    private static final Logger logger = LoggerFactory.getLogger(AttachmentServiceImpl.class);

    private static final String CONFIG_PATH = "attachment/";
    private static final String WORK_PATH = "work/";

    private final AttachmentRepository attachmentRepository;
    private final StudentService studentService;

    @Autowired
    public AttachmentServiceImpl(AttachmentRepository attachmentRepository, StudentService studentService) {
        this.attachmentRepository = attachmentRepository;
        this.studentService = studentService;
    }

    @Override
    public Attachment upload(MultipartFile multipartFile) {
        Path saveFilePath = Paths.get(CONFIG_PATH + this.getYearMonthDay());
        return this.saveAttachment(multipartFile, saveFilePath, false);
    }

    @Override
    public Attachment getById(Long id) {
        Assert.notNull(id, "附件id值不能为null");
        return this.attachmentRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(String.format("id为%s的附件未找到", id.toString())));
    }

    @Override
    public void downloadFile(String fileName, HttpServletResponse response) throws IOException {
        File file = this.getPathByFileSaveName(fileName).toFile();
        logger.info("输出文件类型");
        FileInputStream inputStream = new FileInputStream(file);
        response.setHeader("Content-Type", this.getMediaTypeBySaveName(fileName));

        logger.info("输出文件名");
        response.setHeader("Content-disposition", "attachment; filename=" + fileName);
        response.setContentLength((int) file.length());

        logger.info("写入数据流");
        readInputAndWriteToOutput(inputStream, response.getOutputStream());
    }

    private Path getPathByFileSaveName(String name) {
        return this.getFilePath().resolve(name);
    }

    private Path getFilePath() {
        return Paths.get(CONFIG_PATH + this.getYearMonthDay());
    }

    @Override
    public String getMediaTypeBySaveName(String saveName) {
        Attachment attachment = this.attachmentRepository.findBySaveName(saveName);
        return attachment.getMIME();
    }

    @Override
    public Attachment uploadWork(MultipartFile multipartFile, String itemId, String uploadDir) {

        logger.debug("获取文件保存路径的实体");
        Path saveFilePath = getWorkSavePath(uploadDir, itemId);

        return saveAttachment(multipartFile, saveFilePath, true);
    }

    /**
     * 从 输入 中读取并写入到 输出 中
     *
     * @param in  输入流
     * @param out 输出流
     */
    private void readInputAndWriteToOutput(InputStream in, OutputStream out) throws IOException {
        logger.debug("设置缓冲区大小");
        byte[] buffer = new byte[10240];

        logger.debug("循环读取数据并写入到输出流");
        int len;
        while ((len = in.read(buffer)) != -1) {
            out.write(buffer, 0, len);
        }
    }

    /**
     * 返回当前时间的字符串信息
     */
    private String getYearMonthDay() {
        Calendar calendar = Calendar.getInstance();
        return "" + calendar.get(Calendar.YEAR)
                + (calendar.get(Calendar.MONTH) + 1)
                + calendar.get(Calendar.DAY_OF_MONTH);
    }

    private boolean checkDir(String dir) {

        return Pattern.matches("^\\/(\\w+\\/?)+$", dir);
    }

    /**
     * 通过扩展名确定存储的目录
     *
     * @param uploadDir 扩展名
     * @param itemId
     * @return 存储路径对象
     */
    private Path getWorkSavePath(String uploadDir, String itemId) {
        if (itemId != null) {
            uploadDir = '/' + itemId + uploadDir;
        }
        if (!checkDir(uploadDir)) {
            throw new ValidationException("目录格式不合法");
        }
        Student student = this.studentService.getCurrentStudent();

        return Paths.get(WORK_PATH + student.getNo() + uploadDir);
    }

    /**
     * 保存上传的文件
     *
     * @param multipartFile     上传的文件
     * @param saveFilePath      文件保存路径
     * @param useOriginNameSave 是否使用文件原名存储
     * @return 保存的附件实体
     */
    private Attachment saveAttachment(MultipartFile multipartFile, Path saveFilePath, Boolean useOriginNameSave) {
        logger.debug("新建附件对象");
        Attachment attachment = new Attachment();
        logger.debug("获取文件名");
        String fileName = multipartFile.getOriginalFilename();

        logger.debug("从文件名中截取拓展名");
        // 从"."最后一次出现的位置的下一位开始截取，获取扩展名
        assert fileName != null;
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
        try {
            logger.debug("对文件进行sha1,md5加密");
            String sha1ToMultipartFile = CommonService.encrypt(multipartFile, "SHA-1");
            String md5ToMultipartFile = CommonService.encrypt(multipartFile, "MD5");

            logger.debug("设置一般信息");
            attachment.setOriginName(fileName);
            attachment.setMIME(multipartFile.getContentType());
            attachment.setSize(String.valueOf(multipartFile.getSize()));
            attachment.setExt(ext);
            attachment.setSha1(sha1ToMultipartFile);
            attachment.setMd5(md5ToMultipartFile);

            Attachment oldAttachment = this.attachmentRepository.findTopOneBySha1AndMd5(sha1ToMultipartFile, md5ToMultipartFile);
            if (oldAttachment == null) {
                logger.debug("设置保存文件名");
                String saveName = null;
                if (useOriginNameSave) {
                    saveName = fileName;
                } else {
                    saveName = CommonService.md5(md5ToMultipartFile + System.currentTimeMillis()) + "." + ext;
                }

                logger.debug("判断上传的文件是否为空");
                if (multipartFile.isEmpty()) {
                    throw new RuntimeException("上传的附件不能为空" + fileName);
                }

                logger.debug("如果目录不存在，则创建目录。如果目录存在，则不创建");
                if (!Files.exists(saveFilePath)) {
                    Files.createDirectories(saveFilePath);
                    new File(saveFilePath.resolve("index.html").toString()).createNewFile();
                }

                logger.debug("将文件移动至储存文件的路径下");
                Files.copy(multipartFile.getInputStream(), saveFilePath.resolve(saveName),
                        StandardCopyOption.REPLACE_EXISTING);

                logger.debug("将附件存入到数据库中");
                attachment.setSaveName(saveName);
                String savePath = saveFilePath.toString();
                attachment.setSavePath(savePath);
            } else {
                logger.debug("从原附件实体中复制信息");
                attachment.setPath(oldAttachment.getPath());
                attachment.setSaveName(oldAttachment.getSaveName());
                attachment.setSavePath(oldAttachment.getSavePath());
            }

            this.attachmentRepository.save(attachment);
        } catch (Exception e) {
            logger.error("上传附件出现异常");
            e.printStackTrace();
        }
        return attachment;
    }

}
