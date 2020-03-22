package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.properties.AppProperties;
import club.yunzhi.workhome.repository.AttachmentRepository;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.mengyunzhi.core.service.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.Cipher;
import javax.crypto.CipherOutputStream;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.EntityNotFoundException;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Key;
import java.util.Calendar;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class AttachmentServiceImpl implements AttachmentService {

    private static final Logger logger = LoggerFactory.getLogger(AttachmentServiceImpl.class);

    private static final String CONFIG_PATH = "attachment/";

    private final AttachmentRepository attachmentRepository;
    private final String ALGORITHM;
    private final Key KEY;

    public AttachmentServiceImpl(AppProperties appProperties, AttachmentRepository attachmentRepository) {
        byte[] VALUE = appProperties.getCrypto().getBytes(StandardCharsets.UTF_8);
        this.ALGORITHM = "AES";
        this.KEY = new SecretKeySpec(VALUE, this.ALGORITHM);
        this.attachmentRepository = attachmentRepository;
    }

    @Override
    public Attachment upload(MultipartFile multipartFile) {
        logger.debug("检验附件信息");
        if (multipartFile.isEmpty()) {
            throw new RuntimeException("上传的附件不能为空");
        }

        logger.debug("新建附件对象");
        Attachment attachment = new Attachment();

        try {
            logger.debug("获取文件名");
            String fileName = multipartFile.getOriginalFilename();

            logger.debug("从文件名中截取拓展名");
            // 从"."最后一次出现的位置的下一位开始截取，获取扩展名
            assert fileName != null;
            String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

            logger.debug("计算文件SHA-1 MD5值");
            String sha1 = CommonService.encrypt(multipartFile, "SHA-1");
            String md5 = CommonService.encrypt(multipartFile, "MD5");

            logger.debug("设置附件信息");
            attachment.setSha1(sha1);
            attachment.setMd5(md5);
            attachment.setOriginName(fileName);
            attachment.setExt(ext);

            logger.debug("查询持久化附件");
            Attachment persistAttachment = this.attachmentRepository.findTopOneBySha1AndMd5(sha1, md5);

            if (persistAttachment == null) {
                logger.debug("计算存储文件名称");
                String name = CommonService.md5(sha1 + System.currentTimeMillis());

                logger.debug("获取文件存储路径");
                Path path = this.getPath();

                logger.debug("如果目录不存在，则创建目录");
                if (Files.notExists(path)) {
                    Files.createDirectories(path);
                }

                logger.debug("获取算法");
                Cipher cipher = Cipher.getInstance(this.ALGORITHM);

                logger.debug("设置加密模式与加密密钥");
                cipher.init(Cipher.ENCRYPT_MODE, this.KEY);

                logger.debug("获取输出流");
                OutputStream out = new FileOutputStream(path.resolve(name).toFile());

                logger.debug("文件上传至目录");
                this.readInputAndWriteToOutput(multipartFile.getInputStream(), out, cipher);

                logger.debug("设置附件存储信息");
                attachment.setPath(path.toString());
                attachment.setName(name);
            } else {
                logger.debug("从原附件实体中复制信息");
                attachment.setPath(persistAttachment.getPath());
                attachment.setName(persistAttachment.getName());
            }

            logger.debug("存储附件");
            this.attachmentRepository.save(attachment);
        } catch (Exception e) {
            logger.error("上传附件出现异常");
            throw new RuntimeException("附件上传错误", e);
        }

        return attachment;
    }

    @Override
    public void download(String md5, String sha1, Long id, String originName, OutputStream out) {
        logger.debug("查询附件");
        Attachment attachment = this.attachmentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("附件未找到"));

        if (!attachment.getMd5().equals(md5) && !attachment.getSha1().equals(sha1) && !attachment.getOriginName().equals(originName)) {
            throw new EntityNotFoundException("附件未找到");
        }

        logger.debug("查询资源");
        Path path = Paths.get(attachment.getPath()).resolve(attachment.getName());
        Resource resource = this.getResourceByPath(path);

        try {
            logger.debug("获取算法");
            Cipher cipher = Cipher.getInstance(this.ALGORITHM);

            logger.debug("设置解密模式与解密密钥");
            cipher.init(Cipher.DECRYPT_MODE, this.KEY);

            this.readInputAndWriteToOutput(resource.getInputStream(), out, cipher);
        } catch (Exception e) {
            logger.error("下载附件出现异常");
            throw new RuntimeException("附件下载错误", e);
        }
    }

    @Override
    public Attachment getById(Long id) {
        Assert.notNull(id, "附件id值不能为null");
        return this.attachmentRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(String.format("id为%s的附件未找到", id.toString())));
    }

    /**
     * 从 输入 中读取并写入到 输出 中
     *
     * @param in     输入流
     * @param out    输出流
     * @param cipher 加密/解密
     */
    private void readInputAndWriteToOutput(InputStream in, OutputStream out, Cipher cipher) throws IOException {
        logger.debug("设置缓冲区大小");
        byte[] buffer = new byte[10240];

        logger.debug("输出流配置加密/解密");
        out = new CipherOutputStream(out, cipher);

        logger.debug("循环读取数据并写入到输出流");
        int len;
        while ((len = in.read(buffer)) != -1) {
            out.write(buffer, 0, len);
        }

        logger.debug("关闭输出流");
        out.flush();
        out.close();
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
     * 根据附件路径获取资源
     */
    private Resource getResourceByPath(Path path) {
        try {
            logger.debug("根据附件路径获取附件");
            Resource resource = new UrlResource(path.toUri());

            logger.debug("判断附件是否存在");
            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("获取附件时存在异常");
        }
    }

    /**
     * 计算当前图片的存储路径
     */
    private Path getPath() {
        return Paths.get(CONFIG_PATH + this.getYearMonthDay());
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
}
