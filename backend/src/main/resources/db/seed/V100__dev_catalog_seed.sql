-- Dados de exemplo do catálogo (somente perfil dev). Preços em reais.
INSERT INTO categories (name, slug, position, image_url) VALUES
    ('Tapetes de sala',   'tapetes-de-sala',   1, '/mock/categorias/tapete-sala.svg'),
    ('Capachos',          'capachos',          2, '/mock/categorias/capacho.svg'),
    ('Tapetes infantis',  'tapetes-infantis',  3, '/mock/categorias/tapete-infantil.svg'),
    ('Tapetes pet',       'tapetes-pet',       4, '/mock/categorias/tapete-pet.svg'),
    ('Bolsas tote',       'bolsas-tote',       5, '/mock/categorias/bolsa-tote.svg'),
    ('Necessaires',       'necessaires',       6, '/mock/categorias/necessaire.svg'),
    ('Presentes',         'presentes',         7, '/mock/categorias/presente.svg'),
    ('Para empresas',     'para-empresas',     8, '/mock/categorias/empresa.svg');

INSERT INTO products (category_id, name, slug, description, price, old_price, stock_quantity, active,
                      image_url, hover_image_url, rating, review_count, personalizable, best_seller) VALUES
    ((SELECT id FROM categories WHERE slug = 'tapetes-de-sala'), 'Tapete de sala com o nome da família', 'tapete-sala-nome-da-familia',
        'Tapete personalizado com o nome da sua família, lavável e antiderrapante.', 289.90, 349.90, 40, TRUE,
        '/mock/produtos/tapete-sala.svg', '/mock/produtos/tapete-sala.svg', 4.9, 128, TRUE, TRUE),
    ((SELECT id FROM categories WHERE slug = 'capachos'), 'Capacho "Bem-vindos" com sobrenome', 'capacho-bem-vindos-sobrenome',
        'Capacho de entrada com o sobrenome da família. Material resistente à chuva.', 129.90, 159.90, 60, TRUE,
        '/mock/produtos/capacho.svg', '/mock/produtos/capacho.svg', 4.8, 96, TRUE, TRUE),
    ((SELECT id FROM categories WHERE slug = 'bolsas-tote'), 'Bolsa tote com monograma', 'bolsa-tote-monograma',
        'Bolsa tote de lona com monograma bordado, alça reforçada.', 189.90, NULL, 25, TRUE,
        '/mock/produtos/bolsa-tote.svg', '/mock/produtos/bolsa-tote.svg', 4.7, 75, TRUE, TRUE),
    ((SELECT id FROM categories WHERE slug = 'necessaires'), 'Necessaire com iniciais', 'necessaire-iniciais',
        'Necessaire em tecido com iniciais personalizadas e zíper reforçado.', 69.90, 89.90, 50, TRUE,
        '/mock/produtos/necessaire.svg', '/mock/produtos/necessaire.svg', 4.9, 243, TRUE, TRUE),
    ((SELECT id FROM categories WHERE slug = 'tapetes-pet'), 'Tapete pet com nome', 'tapete-pet-nome',
        'Tapete para cama ou comedouro do seu pet, com o nome bordado.', 99.90, NULL, 35, TRUE,
        '/mock/produtos/tapete-pet.svg', '/mock/produtos/tapete-pet.svg', 4.6, 58, TRUE, TRUE),
    ((SELECT id FROM categories WHERE slug = 'tapetes-infantis'), 'Tapete infantil com nome', 'tapete-infantil-nome',
        'Tapete colorido para o quarto, com o nome da criança.', 159.90, 199.90, 30, TRUE,
        '/mock/produtos/tapete-infantil.svg', '/mock/produtos/tapete-infantil.svg', 4.8, 61, TRUE, FALSE),
    ((SELECT id FROM categories WHERE slug = 'presentes'), 'Kit presente personalizado', 'kit-presente-personalizado',
        'Kit com caneca e necessaire com o nome da pessoa, em embalagem para presente.', 149.90, NULL, 20, TRUE,
        '/mock/produtos/presente.svg', '/mock/produtos/presente.svg', 4.9, 40, TRUE, FALSE),
    ((SELECT id FROM categories WHERE slug = 'para-empresas'), 'Capacho com logotipo da empresa', 'capacho-logotipo-empresa',
        'Capacho com o logotipo da sua empresa, para lojas, escritórios e clínicas.', 179.90, NULL, 100, TRUE,
        '/mock/produtos/capacho.svg', '/mock/produtos/capacho.svg', 4.7, 22, TRUE, FALSE);

INSERT INTO banners (title, subtitle, image_url, link_url, cta_label, position, active) VALUES
    ('Feito para você, do seu jeito.', 'Tapetes, bolsas e acessórios com o seu nome, sua foto ou sua arte.',
        '/mock/banners/banner-1.svg', '/personalizar', 'Personalizar agora', 1, TRUE),
    ('Coleção de Natal', 'Presentes personalizados com prazo garantido para as festas.',
        '/mock/banners/banner-2.svg', '/produtos?category=presentes', 'Ver presentes', 2, TRUE),
    ('Para empresas', 'Capachos com o logotipo da sua marca.',
        '/mock/banners/banner-3.svg', '/produtos?category=para-empresas', 'Pedir orçamento', 3, TRUE);
