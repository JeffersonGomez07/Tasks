package com.JLeonG.proyect.tasks.Service;

import com.JLeonG.proyect.tasks.DTO.AuthRequest;
import com.JLeonG.proyect.tasks.DTO.AuthResponse;
import com.JLeonG.proyect.tasks.Entity.Role;
import com.JLeonG.proyect.tasks.Entity.User;
import com.JLeonG.proyect.tasks.Repository.UserRepository;
import com.JLeonG.proyect.tasks.Security.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public AuthResponse register(AuthRequest request) {
        if(userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("El nombre de usuario no esta disponible");
        }

        var user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        var user = userRepository.findByUsername(request.username())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }
}
