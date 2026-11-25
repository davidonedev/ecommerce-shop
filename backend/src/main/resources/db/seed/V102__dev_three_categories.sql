-- A loja passa a ter só 3 categorias: Chinelos Personalizados, Bolsas Personalizadas e Tapetes.
-- Remove as categorias antigas e cria 4 ou mais produtos de exemplo em cada uma (perfil dev, depois do V101).
-- Fotos: Unsplash License (ver frontend/public/mock/CREDITS.md).
-- Pode rodar mais de uma vez sem erro (cada passo só age no que ainda não foi feito).

-- 1) Categorias novas (a ordem na vitrine é a coluna position).
INSERT INTO categories (name, slug, position, image_url) VALUES
    ('Chinelos Personalizados', 'chinelos-personalizados', 1, '/mock/categorias/chinelos.jpg'),
    ('Bolsas Personalizadas',   'bolsas-personalizadas',   2, '/mock/categorias/bolsas.jpg')
ON CONFLICT (slug) DO NOTHING;

-- 2) "Tapetes" aproveita a categoria de tapetes de sala (renomeia) e recebe os tapetes das categorias que vão sair.
UPDATE categories
   SET name = 'Tapetes', slug = 'tapetes', position = 3, image_url = '/mock/categorias/tapetes.jpg'
 WHERE slug = 'tapetes-de-sala';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'tapetes')
 WHERE category_id IN (SELECT id FROM categories WHERE slug IN ('capachos', 'tapetes-infantis', 'tapetes-pet', 'para-empresas'));

-- 3) Bolsas Personalizadas recebe a bolsa tote e a necessaire.
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'bolsas-personalizadas')
 WHERE slug IN ('bolsa-tote-monograma', 'necessaire-iniciais');

-- 4) Sai o produto da categoria "Presentes" (a categoria deixa de existir) e o capacho "para empresas" vira um capacho comum.
DELETE FROM products WHERE slug = 'kit-presente-personalizado';

UPDATE products
   SET name = 'Capacho com frase personalizada', slug = 'capacho-frase-personalizada',
       description = 'Capacho de fibra de coco com a frase que você escolher.',
       personalizable = TRUE
 WHERE slug = 'capacho-logotipo-empresa';

-- 5) Remove as categorias antigas (já sem produtos).
DELETE FROM categories WHERE slug IN ('capachos', 'tapetes-infantis', 'tapetes-pet', 'necessaires', 'presentes', 'para-empresas', 'bolsas-tote');

-- 6) Produtos novos.
INSERT INTO products (category_id, name, slug, description, price, old_price, stock_quantity, active,
                      image_url, hover_image_url, rating, review_count, personalizable, best_seller) VALUES
    ((SELECT id FROM categories WHERE slug = 'chinelos-personalizados'), 'Chinelo personalizado com nome', 'chinelo-personalizado-nome',
        'Chinelo de borracha com tiras estampadas e o nome que você escolher.', 59.90, 79.90, 120, TRUE,
        '/mock/produtos/chinelo-nome.jpg', '/mock/produtos/chinelo-nome.jpg', 4.8, 154, TRUE, TRUE),
    ((SELECT id FROM categories WHERE slug = 'chinelos-personalizados'), 'Chinelo com estampa personalizada', 'chinelo-estampa-personalizada',
        'Chinelo com a estampa ou a palavra que você escolher, em cores vivas.', 69.90, NULL, 90, TRUE,
        '/mock/produtos/chinelo-aloha.jpg', '/mock/produtos/chinelo-aloha.jpg', 4.9, 98, TRUE, TRUE),
    ((SELECT id FROM categories WHERE slug = 'chinelos-personalizados'), 'Rasteirinha personalizada com pompons', 'rasteirinha-pompons',
        'Rasteirinha com pompons coloridos e amarração no tornozelo.', 99.90, 119.90, 60, TRUE,
        '/mock/produtos/chinelo-pompons.jpg', '/mock/produtos/chinelo-pompons.jpg', 4.7, 67, TRUE, FALSE),
    ((SELECT id FROM categories WHERE slug = 'chinelos-personalizados'), 'Babucha bordada colorida', 'babucha-bordada-colorida',
        'Chinelo fechado bordado, em várias cores, para usar em casa.', 89.90, NULL, 45, TRUE,
        '/mock/produtos/chinelo-bordado.jpg', '/mock/produtos/chinelo-bordado.jpg', 4.6, 41, FALSE, FALSE),
    ((SELECT id FROM categories WHERE slug = 'bolsas-personalizadas'), 'Bolsa estampada personalizada', 'bolsa-estampada-personalizada',
        'Bolsa de mão com estampa floral e as suas iniciais.', 249.90, 299.90, 18, TRUE,
        '/mock/produtos/bolsa-estampada.jpg', '/mock/produtos/bolsa-estampada.jpg', 4.8, 52, TRUE, FALSE),
    ((SELECT id FROM categories WHERE slug = 'bolsas-personalizadas'), 'Bolsa de palha com iniciais', 'bolsa-palha-iniciais',
        'Bolsa de palha trançada com alça de mão e as suas iniciais.', 219.90, NULL, 22, TRUE,
        '/mock/produtos/bolsa-palha.jpg', '/mock/produtos/bolsa-palha.jpg', 4.7, 33, TRUE, FALSE)
ON CONFLICT (slug) DO NOTHING;

-- 7) Quem aparece primeiro na vitrine (a ordenação padrão prioriza os mais vendidos).
UPDATE products SET best_seller = TRUE  WHERE slug IN ('bolsa-tote-monograma', 'necessaire-iniciais', 'tapete-sala-nome-da-familia', 'capacho-bem-vindos-sobrenome');
UPDATE products SET best_seller = FALSE WHERE slug IN ('tapete-pet-nome', 'tapete-infantil-nome', 'capacho-frase-personalizada');

-- 8) Banners: o 2 e o 3 passam a falar de chinelos e bolsas.
UPDATE banners SET title = 'Chinelos Personalizados', subtitle = 'Com o seu nome, estampa ou cor favorita.',
                   image_url = '/mock/banners/banner-2.jpg', link_url = '/categorias/chinelos-personalizados', cta_label = 'Ver chinelos'
 WHERE position = 2;
UPDATE banners SET title = 'Bolsas Personalizadas', subtitle = 'Bolsas e necessaires com as suas iniciais.',
                   image_url = '/mock/banners/banner-3.jpg', link_url = '/categorias/bolsas-personalizadas', cta_label = 'Ver bolsas'
 WHERE position = 3;
