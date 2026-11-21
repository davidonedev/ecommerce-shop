package com.ecommerce.shop.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.junit.jupiter.api.Test;

import com.ecommerce.shop.user.Role;
import com.ecommerce.shop.user.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

class JwtServiceTest {

	private static final String SECRET = "um-segredo-de-teste-com-mais-de-32-bytes!!";

	private final JwtService jwtService = new JwtService(SECRET, 60);

	private static User user() {
		User user = new User();
		user.setId(7L);
		user.setEmail("ana@exemplo.com");
		user.setRole(Role.ADMIN);
		return user;
	}

	@Test
	void generatesTokenThatParsesBackToTheSameUser() {
		String token = jwtService.generateToken(user());

		assertThat(jwtService.parse(token)).contains(new AuthenticatedUser(7L, "ana@exemplo.com", Role.ADMIN));
	}

	@Test
	void rejectsTamperedToken() {
		String token = jwtService.generateToken(user());
		String tampered = token.substring(0, token.length() - 2) + (token.endsWith("AA") ? "BB" : "AA");

		assertThat(jwtService.parse(tampered)).isEmpty();
	}

	@Test
	void rejectsTokenSignedWithAnotherSecret() {
		String token = new JwtService("outro-segredo-totalmente-diferente-32b!!", 60).generateToken(user());

		assertThat(jwtService.parse(token)).isEmpty();
	}

	@Test
	void rejectsExpiredToken() {
		String expired = Jwts.builder()
			.subject("7")
			.claim("email", "ana@exemplo.com")
			.claim("role", "ADMIN")
			.expiration(new Date(System.currentTimeMillis() - 1_000))
			.signWith(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)))
			.compact();

		assertThat(jwtService.parse(expired)).isEmpty();
	}

	@Test
	void rejectsGarbage() {
		assertThat(jwtService.parse("isto-nao-e-um-jwt")).isEmpty();
		assertThat(jwtService.parse("")).isEmpty();
	}

	@Test
	void failsFastWhenSecretIsMissingOrTooShort() {
		assertThatThrownBy(() -> new JwtService("", 60)).isInstanceOf(IllegalStateException.class)
			.hasMessageContaining("JWT_SECRET");
		assertThatThrownBy(() -> new JwtService("curto", 60)).isInstanceOf(IllegalStateException.class);
	}

}
