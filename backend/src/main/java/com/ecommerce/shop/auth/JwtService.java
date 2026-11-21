package com.ecommerce.shop.auth;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ecommerce.shop.user.Role;
import com.ecommerce.shop.user.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/** Gera e valida tokens JWT (HS256). O segredo vem de app.jwt.secret (variável JWT_SECRET). */
@Service
public class JwtService {

	private static final int MIN_SECRET_BYTES = 32;

	private final SecretKey key;
	private final Duration expiration;

	public JwtService(@Value("${app.jwt.secret:}") String secret,
			@Value("${app.jwt.expiration-minutes:60}") long expirationMinutes) {
		byte[] bytes = secret.getBytes(StandardCharsets.UTF_8);
		if (bytes.length < MIN_SECRET_BYTES) {
			throw new IllegalStateException(
					"JWT_SECRET ausente ou curto demais: informe um segredo com pelo menos 32 bytes "
							+ "(ex.: openssl rand -base64 48).");
		}
		if (expirationMinutes <= 0) {
			throw new IllegalStateException("app.jwt.expiration-minutes deve ser maior que zero.");
		}
		this.key = Keys.hmacShaKeyFor(bytes);
		this.expiration = Duration.ofMinutes(expirationMinutes);
	}

	public String generateToken(User user) {
		Instant now = Instant.now();
		return Jwts.builder()
			.subject(String.valueOf(user.getId()))
			.claim("email", user.getEmail())
			.claim("role", user.getRole().name())
			.issuedAt(Date.from(now))
			.expiration(Date.from(now.plus(expiration)))
			.signWith(key)
			.compact();
	}

	public long expiresInSeconds() {
		return expiration.toSeconds();
	}

	/** Devolve o usuário autenticado se o token for válido; vazio se for inválido, adulterado ou expirado. */
	public Optional<AuthenticatedUser> parse(String token) {
		try {
			Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
			return Optional.of(new AuthenticatedUser(Long.valueOf(claims.getSubject()), claims.get("email", String.class),
					Role.valueOf(claims.get("role", String.class))));
		}
		catch (JwtException | IllegalArgumentException ex) {
			return Optional.empty();
		}
	}

}
