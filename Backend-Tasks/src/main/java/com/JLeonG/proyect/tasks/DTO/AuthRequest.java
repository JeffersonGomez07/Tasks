package com.JLeonG.proyect.tasks.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;



@Builder


public record AuthRequest(
        @NotBlank (message = "El usuario es obligatorio")
        @Size(min = 3, max = 50)
        String username,

        @Email @NotBlank (message = "El email es obligatorio")
        String email,
        @NotBlank(message = "La contraseña es obligatoria")
        String password
) {
}
