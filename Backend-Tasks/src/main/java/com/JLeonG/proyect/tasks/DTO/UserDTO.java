package com.JLeonG.proyect.tasks.DTO;

import com.JLeonG.proyect.tasks.Entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDTO(
        Long id,

        @NotBlank(message = "El nombre de usuario no puede estar vacío")
        String username,

        @Email(message = "El formato del email no es válido")
        @NotBlank(message = "El email es obligatorio")
        String email,

        Role role
) {}