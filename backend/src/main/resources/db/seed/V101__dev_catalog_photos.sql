-- Troca as ilustrações do seed por fotos gratuitas (Unsplash License, ver frontend/public/mock/CREDITS.md).
-- Só atualiza os caminhos das imagens; roda no perfil dev, depois do V100.

UPDATE products SET image_url = '/mock/produtos/tapete-sala.jpg',     hover_image_url = '/mock/produtos/tapete-sala-ambiente.jpg' WHERE slug = 'tapete-sala-nome-da-familia';
UPDATE products SET image_url = '/mock/produtos/capacho.jpg',         hover_image_url = '/mock/produtos/capacho.jpg'         WHERE slug = 'capacho-bem-vindos-sobrenome';
UPDATE products SET image_url = '/mock/produtos/bolsa-tote.jpg',      hover_image_url = '/mock/produtos/bolsa-tote.jpg'      WHERE slug = 'bolsa-tote-monograma';
UPDATE products SET image_url = '/mock/produtos/necessaire.jpg',      hover_image_url = '/mock/produtos/necessaire.jpg'      WHERE slug = 'necessaire-iniciais';
UPDATE products SET image_url = '/mock/produtos/tapete-pet.jpg',      hover_image_url = '/mock/produtos/tapete-pet.jpg'      WHERE slug = 'tapete-pet-nome';
UPDATE products SET image_url = '/mock/produtos/tapete-infantil.jpg', hover_image_url = '/mock/produtos/tapete-infantil.jpg' WHERE slug = 'tapete-infantil-nome';
UPDATE products SET image_url = '/mock/produtos/presente.jpg',        hover_image_url = '/mock/produtos/presente.jpg'        WHERE slug = 'kit-presente-personalizado';
UPDATE products SET image_url = '/mock/produtos/capacho-empresa.jpg', hover_image_url = '/mock/produtos/capacho-empresa.jpg' WHERE slug = 'capacho-logotipo-empresa';

UPDATE categories SET image_url = '/mock/categorias/tapete-sala.jpg'     WHERE slug = 'tapetes-de-sala';
UPDATE categories SET image_url = '/mock/categorias/capacho.jpg'         WHERE slug = 'capachos';
UPDATE categories SET image_url = '/mock/categorias/tapete-infantil.jpg' WHERE slug = 'tapetes-infantis';
UPDATE categories SET image_url = '/mock/categorias/tapete-pet.jpg'      WHERE slug = 'tapetes-pet';
UPDATE categories SET image_url = '/mock/categorias/bolsa-tote.jpg'      WHERE slug = 'bolsas-tote';
UPDATE categories SET image_url = '/mock/categorias/necessaire.jpg'      WHERE slug = 'necessaires';
UPDATE categories SET image_url = '/mock/categorias/presente.jpg'        WHERE slug = 'presentes';
UPDATE categories SET image_url = '/mock/categorias/empresa.jpg'         WHERE slug = 'para-empresas';

UPDATE banners SET image_url = '/mock/banners/banner-1.jpg' WHERE image_url = '/mock/banners/banner-1.svg';
UPDATE banners SET image_url = '/mock/banners/banner-2.jpg' WHERE image_url = '/mock/banners/banner-2.svg';
UPDATE banners SET image_url = '/mock/banners/banner-3.jpg' WHERE image_url = '/mock/banners/banner-3.svg';
