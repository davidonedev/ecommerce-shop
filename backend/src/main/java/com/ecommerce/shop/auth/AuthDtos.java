package com.ecommerce.shop.auth;

import com.ecommerce.shop.user.UserResponse;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthDtos {

	private AuthDtos() {
	}

	public record RegisterRequest(
			@NotBlank(message = "Informe o nome") @Size(max = 120, message = "Nome com no máximo 120 caracteres") String name,
			@NotBlank(message = "Informe o e-mail") @Email(message = "E-mail inválido") @Size(max = 160, message = "E-mail com no máximo 160 caracteres") String email,
			// 72 bytes é o limite do BCrypt; acima disso a senha seria truncada silenciosamente.
			@NotBlank(message = "Informe a senha") @Size(min = 8, max = 72, message = "A senha deve ter entre 8 e 72 caracteres") String password) {
	}

	public record LoginRequest(
			@NotBlank(message = "Informe o e-mail") String email,
			@NotBlank(message = "Informe a senha") String password) {
	}

	public record AuthResponse(String token, String tokenType, long expiresInSeconds, UserResponse user) {
	}

}
