package club.yunzhi.workhome.properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 获取application.yml中对应的配置信息
 *
 * @author panjie
 */
@ConfigurationProperties(prefix = "app")
@Component
public class AppProperties {
    private static final Logger logger = LoggerFactory.getLogger(AppProperties.class);

    private String crypto;

    public String getCrypto() {
        return crypto;
    }

    public void setCrypto(String crypto) {
        this.crypto = crypto;
    }
}


