package com.JLeonG.proyect.taskmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.JLeonG.proyect.tasks.Repository") // Fuerza a buscar Repositorios
@EntityScan(basePackages = "com.JLeonG.proyect.tasks.Entity") // Fuerza a buscar Entidades
@ComponentScan(basePackages = "com.JLeonG.proyect.tasks") // Fuerza a buscar Config, Security, etc.
public class TaskmanagerApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(TaskmanagerApiApplication.class, args);
    }
}
