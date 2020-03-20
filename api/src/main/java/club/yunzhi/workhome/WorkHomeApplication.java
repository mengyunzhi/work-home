package club.yunzhi.workhome;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

/**
 * @author yunzhi
 */
@EnableWebSecurity
@SpringBootApplication
public class WorkHomeApplication {
	public static void main(String[] args) {
		SpringApplication.run(WorkHomeApplication.class, args);
	}
}
