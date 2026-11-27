package com.ecommerce.shop.common;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Guarda imagens enviadas pelo painel. Aceita só PNG, JPEG e WebP, conferindo a assinatura do arquivo (não
 * confia no tipo declarado pelo navegador) e troca o nome por um identificador aleatório.
 */
@Service
public class FileStorage {

	public static final long MAX_BYTES = 3L * 1024 * 1024;

	private final Path directory;

	public FileStorage(@Value("${app.uploads.dir}") String uploadsDir) {
		this.directory = Path.of(uploadsDir).toAbsolutePath().normalize();
		try {
			Files.createDirectories(directory);
		}
		catch (IOException ex) {
			throw new IllegalStateException("Não foi possível criar a pasta de uploads: " + directory, ex);
		}
	}

	public Path directory() {
		return directory;
	}

	/** Salva a imagem e devolve o caminho público (ex.: /uploads/3f2a....webp). */
	public String store(MultipartFile file) {
		if (file.isEmpty()) {
			throw new IllegalArgumentException("Envie um arquivo de imagem.");
		}
		if (file.getSize() > MAX_BYTES) {
			throw new IllegalArgumentException("A imagem deve ter no máximo 3 MB.");
		}
		byte[] bytes;
		try {
			bytes = file.getBytes();
		}
		catch (IOException ex) {
			throw new IllegalArgumentException("Não foi possível ler o arquivo enviado.");
		}
		String extension = detectExtension(bytes);
		if (extension == null) {
			throw new IllegalArgumentException("Formato não suportado. Use PNG, JPEG ou WebP.");
		}
		String name = UUID.randomUUID() + "." + extension;
		try {
			Files.write(directory.resolve(name), bytes);
		}
		catch (IOException ex) {
			throw new IllegalStateException("Não foi possível salvar a imagem.", ex);
		}
		return "/uploads/" + name;
	}

	static String detectExtension(byte[] b) {
		if (b.length >= 8 && Arrays.equals(Arrays.copyOf(b, 8),
				new byte[] { (byte) 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A })) {
			return "png";
		}
		if (b.length >= 3 && (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 && (b[2] & 0xFF) == 0xFF) {
			return "jpg";
		}
		if (b.length >= 12 && b[0] == 'R' && b[1] == 'I' && b[2] == 'F' && b[3] == 'F' && b[8] == 'W'
				&& b[9] == 'E' && b[10] == 'B' && b[11] == 'P') {
			return "webp";
		}
		return null;
	}

}
