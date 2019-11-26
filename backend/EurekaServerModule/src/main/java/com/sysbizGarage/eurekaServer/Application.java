package com.sysbizGarage.eurekaServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.annotation.Configuration;


@SpringBootApplication
@EnableEurekaServer
@Configuration
public class Application 
{
    public static void main( String[] args )
    {
        SpringApplication.run(Application.class, args);
        System.out.println("Eureka Server up for service");
    }
}
