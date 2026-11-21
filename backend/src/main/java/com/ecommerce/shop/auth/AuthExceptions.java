package com.ecommerce.shop.auth;

public final class AuthExceptions {

	private AuthExceptions() {
	}

	public static class EmailAlreadyUsedException extends RuntimeException {

		public EmailAlreadyUsedException() {
			super("Já existe uma conta com este e-mail.");
		}

	}

	/** Mensagem propositalmente genérica: não revela se o e-mail existe. */
	public static class InvalidCredentialsException extends RuntimeException {

		public InvalidCredentialsException() {
			super("E-mail ou senha inválidos.");
		}

	}

}
