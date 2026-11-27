package com.ecommerce.shop.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Cria o primeiro administrador a partir de APP_BOOTSTRAP_ADMIN_EMAIL / APP_BOOTSTRAP_ADMIN_PASSWORD, se essas
 * variáveis estiverem definidas e a conta ainda não existir. Não altera contas existentes.
 */
@Component
public class BootstrapAdminRunner implements ApplicationRunner {

	private static final Logger log = LoggerFactory.getLogger(BootstrapAdminRunner.class);

	private final UserRepository users;
	private final PasswordEncoder passwordEncoder;
	private final String email;
	private final String password;

	public BootstrapAdminRunner(UserRepository users, PasswordEncoder passwordEncoder,
			@Value("${app.bootstrap-admin.email:}") String email,
			@Value("${app.bootstrap-admin.password:}") String password) {
		this.users = users;
		this.passwordEncoder = passwordEncoder;
		this.email = email == null ? "" : email.trim().toLowerCase();
		this.password = password == null ? "" : password;
	}

	@Override
	public void run(ApplicationArguments args) {
		if (email.isBlank()) {
			return;
		}
		if (password.length() < 8) {
			log.warn("Administrador inicial não criado: APP_BOOTSTRAP_ADMIN_PASSWORD precisa ter 8+ caracteres.");
			return;
		}
		if (users.existsByEmail(email)) {
			return;
		}
		User admin = new User();
		admin.setName("Administrador");
		admin.setEmail(email);
		admin.setPasswordHash(passwordEncoder.encode(password));
		admin.setRole(Role.ADMIN);
		users.save(admin);
		log.info("Administrador inicial criado a partir da configuração de bootstrap.");
	}

}
