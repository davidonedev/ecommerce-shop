package com.ecommerce.shop.auth;

import java.util.Locale;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.shop.auth.AuthDtos.AuthResponse;
import com.ecommerce.shop.auth.AuthDtos.LoginRequest;
import com.ecommerce.shop.auth.AuthDtos.RegisterRequest;
import com.ecommerce.shop.auth.AuthExceptions.EmailAlreadyUsedException;
import com.ecommerce.shop.auth.AuthExceptions.InvalidCredentialsException;
import com.ecommerce.shop.user.Role;
import com.ecommerce.shop.user.User;
import com.ecommerce.shop.user.UserRepository;
import com.ecommerce.shop.user.UserResponse;

@Service
public class AuthService {

	private static final String TOKEN_TYPE = "Bearer";

	private final UserRepository users;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthService(UserRepository users, PasswordEncoder passwordEncoder, JwtService jwtService) {
		this.users = users;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	/** Cadastro público: sempre cria CUSTOMER. Contas ADMIN não são criadas por esta API. */
	@Transactional
	public AuthResponse register(RegisterRequest request) {
		String email = normalize(request.email());
		if (users.existsByEmail(email)) {
			throw new EmailAlreadyUsedException();
		}
		User user = new User();
		user.setName(request.name().trim());
		user.setEmail(email);
		user.setPasswordHash(passwordEncoder.encode(request.password()));
		user.setRole(Role.CUSTOMER);
		try {
			users.saveAndFlush(user);
		}
		catch (DataIntegrityViolationException ex) {
			// Corrida entre duas requisições com o mesmo e-mail: a constraint UNIQUE do banco decide.
			throw new EmailAlreadyUsedException();
		}
		return toResponse(user);
	}

	@Transactional(readOnly = true)
	public AuthResponse login(LoginRequest request) {
		User user = users.findByEmail(normalize(request.email())).orElseThrow(InvalidCredentialsException::new);
		if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
			throw new InvalidCredentialsException();
		}
		return toResponse(user);
	}

	@Transactional(readOnly = true)
	public UserResponse currentUser(Long userId) {
		// Token válido de usuário removido: trata como não autenticado.
		return users.findById(userId).map(UserResponse::from).orElseThrow(InvalidCredentialsException::new);
	}

	private AuthResponse toResponse(User user) {
		return new AuthResponse(jwtService.generateToken(user), TOKEN_TYPE, jwtService.expiresInSeconds(),
				UserResponse.from(user));
	}

	private static String normalize(String email) {
		return email.trim().toLowerCase(Locale.ROOT);
	}

}
