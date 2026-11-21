package com.ecommerce.shop.auth;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Lê o header "Authorization: Bearer &lt;token&gt;" e, se o token for válido, autentica a requisição.
 * Token ausente ou inválido não gera erro aqui: a requisição segue anônima e o Spring Security
 * responde 401 nas rotas protegidas.
 *
 * Não é um bean: é criado em SecurityConfig para não ser registrado também como filtro de servlet.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private static final String BEARER_PREFIX = "Bearer ";

	private final JwtService jwtService;

	public JwtAuthenticationFilter(JwtService jwtService) {
		this.jwtService = jwtService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (header != null && header.startsWith(BEARER_PREFIX)
				&& SecurityContextHolder.getContext().getAuthentication() == null) {
			jwtService.parse(header.substring(BEARER_PREFIX.length()).trim()).ifPresent(user -> {
				var authentication = new UsernamePasswordAuthenticationToken(user, null,
						List.of(new SimpleGrantedAuthority("ROLE_" + user.role().name())));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			});
		}
		chain.doFilter(request, response);
	}

}
