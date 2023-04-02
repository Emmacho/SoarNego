package com.bankend.restfulwebservices10;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
/*The "main" method initializes and starts the application by calling "SpringApplication.run()" with the class and command-line arguments as parameters.
 * The method "addCorsMappings()" is overridden to add mappings for allowed origins and methods. The mapping is for all endpoints in the application since "/**" is used as the path. 
 * Only requests originating from "http://localhost:4200" are allowed and the allowed HTTP methods are GET, POST, PUT, DELETE, and OPTIONS.
 */