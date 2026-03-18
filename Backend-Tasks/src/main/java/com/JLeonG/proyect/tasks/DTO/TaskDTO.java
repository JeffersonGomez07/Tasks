package com.JLeonG.proyect.tasks.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import javax.xml.crypto.dsig.spec.HMACParameterSpec;

public record TaskDTO(
        Long id,
        @NotBlank(message = "El titulo es obligatorio")
        @Size(max = 150)
        String title,
        String descripcion,
        boolean completed
) {
}
