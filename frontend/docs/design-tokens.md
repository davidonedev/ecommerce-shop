# Design tokens: rosé + grafite

Loja moderna e comercial: **grafite** para estrutura e ação, **rosé** como cor de destaque, títulos em **caixa alta e negrito** (Poppins), texto em Inter e **uma** frase manuscrita (Allura) por seção de destaque.

- **Fonte de verdade:** `src/app/globals.css` (variáveis CSS + tema do Tailwind + utilitários).
- **Espelho em código:** `src/lib/tokens/tokens.ts`. O teste `tokens.test.ts` falha se o CSS e o TypeScript se afastarem, ou se a decisão de contraste de algum par deixar de ser verdadeira.
- **Receitas dos componentes:** `src/components/ui/variants.ts`.
- **Vitrine ao vivo:** rota `/design-system` (inclui o topo e a parte de baixo da home montados só com estes componentes).

Regra de ouro: **nenhuma cor, tamanho ou raio solto no código.** Use as classes dos tokens abaixo.

## Cores

| Classe                               | Hex                   | Uso                                                                         |
| ------------------------------------ | --------------------- | --------------------------------------------------------------------------- |
| `bg-graphite` / `text-graphite`      | `#3B3B3B` Grafite     | Botão primário, títulos, header, rodapé, selo e badge de desconto           |
| `bg-graphite-hover`                  | `#2B2B2B`             | Hover do primário                                                           |
| `bg-rose`                            | `#E6ACA4` Rosé        | Barra de aviso, newsletter, painel de oferta, selos, linhas decorativas. **Só fundo e decoração** |
| `bg-rose-soft`                       | `#F7E4E0`             | Botão "Fale conosco", "50%" do selo, fundos suaves                          |
| `bg-cream`                           | `#FAF4F0` Creme       | Fundo do hero e dos banners de coleção                                      |
| `bg-sand`                            | `#F5EBE6` Areia       | Tons quentes de apoio                                                       |
| `bg-bg`                              | `#FFFFFF`             | Fundo da página                                                             |
| `bg-surface`                         | `#F4F4F5`             | Tiles de categoria, imagem dos cards, painel 3                              |
| `text-text`                          | `#111827`             | Texto principal                                                             |
| `text-text-muted`                    | `#5B6170`             | Descrições, apoio, placeholder                                              |
| `text-text-subtle`                   | `#9CA3AF`             | **Só** preço riscado e legenda decorativa                                   |
| `text-star`                          | `#F5A623`             | Estrelas de avaliação                                                       |
| `border-border`                      | `#E5E7EB`             | Borda de cards e divisores **decorativos**                                  |
| `text-on-dark`                       | `#FFFFFF`             | Texto sobre grafite ou rosé escuro                                          |
| **`text-rose-strong`** (derivado)    | `#9C5953` Rosé escuro | Botões, preços e texto **pequeno** em rosé sobre claro (overline, badge)    |
| **`bg-rose-strong-hover`** (derivado)| `#864B46`             | Hover dos botões rosé escuro                                                |
| **`border-field-border`** (derivado) | `#80868F`             | Borda de input, select, botão do card; ponto inativo do carrossel           |
| **`text-on-graphite-muted`** (derivado) | `#D4D4D4`          | Texto secundário sobre grafite (rodapé, barra superior)                     |
| **`text-danger`** (derivado)         | `#B42318`             | Mensagem de erro de formulário e aviso de erro                              |
| **`text-success`** / **`bg-soldout`** | `#1B7F2E` / `#D10A0A` | "Compra verificada" / selo "Esgotado"                                    |
| `bg-scrim`                           | `rgb(33 33 33 / .55)` | Véu atrás de modais e drawers                                               |

Os derivados existem só para passar no contraste, mantendo a mesma família de cor. Não há modo escuro.

### Contraste (WCAG AA): decisão de uso de cada par

Texto precisa de **4,5:1**; texto grande (≥ 24px, ou ≥ 18,66px em negrito) e elementos de interface, de **3:1**. A vitrine mostra esta tabela calculada ao vivo (`lib/tokens/contrast-pairs.ts`).

| Par                                  | Razão                  | Decisão                                                                                                                                            |
| ------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| text / bg, sand, surface             | 17,74 / 15,13 / 16,14  | Passa. Texto principal.                                                                                                                            |
| text-muted / bg, sand, surface       | 6,20 / 5,28 / 5,64     | Passa. Descrições e **placeholder**.                                                                                                               |
| on-dark / graphite, graphite-hover   | 11,20 / 14,16          | Passa. Botão primário, header, rodapé, badge `-20%`.                                                                                               |
| graphite / bg, sand, surface         | 11,20 / 9,55 / 10,19   | Passa. Títulos, botão outline, painel 3.                                                                                                           |
| on-graphite-muted / graphite         | 7,56                   | Passa. Texto secundário do rodapé.                                                                                                                 |
| rose-strong / bg, surface, sand      | 5,29 / 4,82 / 4,51     | Passa. Preço, botão, overline e texto pequeno em rosé.                                                                                             |
| **rose / bg**                        | **1,94**               | **Reprova como texto.** O rosé claro é só fundo e decoração.                                                                                       |
| **on-dark (branco) / rose**          | **1,94**               | **Reprova.** Texto sobre o rosé claro é sempre **grafite**.                                                                                        |
| graphite / rose, rose-soft           | 5,76 / 9,14            | Passa. Painel de oferta, barra de aviso, botão "Fale conosco".                                                                                     |
| rose-soft / graphite                 | 9,14                   | Passa. "50%" do selo e trecho final da barra superior.                                                                                             |
| rose / graphite                      | 5,76                   | Passa. Logotipo e realces rosé sobre grafite.                                                                                                      |
| **text-subtle / bg**                 | **2,54**               | **Reprova até como UI.** Só preço riscado (que também sai em texto: "Preço anterior:") e legenda decorativa.                                       |
| **border / bg**                      | **1,24**               | **Reprova como borda de campo.** Só divisor decorativo.                                                                                            |
| field-border / bg, surface, sand     | 3,67 / 3,34 / 3,13     | Passa (3:1). Borda de input e controles.                                                                                                           |
| **text-muted / graphite**            | **1,81**               | **Reprova.** Use `on-graphite-muted`.                                                                                                              |
| danger / bg, surface                 | 6,57 / 5,98            | Passa.                                                                                                                                             |
| graphite (foco) / bg                 | 11,20                  | Passa. Anel de foco de 2px.                                                                                                                        |
| rose-soft (foco) / graphite          | 9,14                   | Passa. Anel de foco sobre fundo grafite (`focus-inverse`).                                                                                         |
| **star / bg**                        | **2,03**               | **Reprova como gráfico isolado.** Mitigação: a nota também vai em texto (`<Rating showValue />`) e no `aria-label` ("4,9 de 5, 2.300 avaliações"). |

Regras decorrentes:

1. **Texto sobre grafite:** `text-on-dark` (secundário: `text-on-graphite-muted`). **Foco sobre grafite:** `focus-inverse` (ou `focusRingInverse` nas receitas).
2. **Texto sobre o rosé claro:** **sempre grafite.** Nunca branco.
3. **Rosé em texto sobre claro:** `text-rose-strong`. O rosé claro é para preenchimento e decoração.
4. **Placeholder e descrição:** `text-text-muted`, nunca `text-text-subtle`.
5. **Frase manuscrita (Allura):** `text-rose-strong`.

## Tipografia

Poppins (600/700/800) em títulos, menu, botões e preço; Inter (400/500) no texto; Allura (400) em uma frase por seção de destaque. Cada estilo é um utilitário que já define família, tamanho, peso, tracking e caixa. Todos fluidos entre 360px e 1440px.

| Classe                                     | Tamanho (360 → 1440) | Fonte / peso            | Caixa         | Uso                                               |
| ------------------------------------------ | -------------------- | ----------------------- | ------------- | ------------------------------------------------- |
| `text-topbar`                              | 12 → 20px            | Poppins 800             | ALTA          | Barra superior (trecho final em `text-rose`)   |
| `text-overline`                            | 13px                 | Poppins 600, 0,12em     | ALTA          | "BEM-VINDO À [NOME DA LOJA]" (`text-rose-strong`) |
| `text-display-hero`                        | 34 → 56px, lh 1,05   | Poppins 800             | ALTA          | Único h1 da home                                  |
| `text-script`                              | 26 → 36px            | Allura 400              | normal        | Frase manuscrita (rosé escuro sobre branco)          |
| `text-section-title`                       | 18 → 20px, 0,04em    | Poppins 700             | ALTA          | H2 de seção, título de modal/drawer               |
| `text-nav`                                 | 13px, 0,06em         | Poppins 600             | ALTA          | Menu                                              |
| `text-button`                              | 13px, 0,06em         | Poppins 600             | ALTA          | Botões                                            |
| `text-button-sm`                           | 12px, 0,06em         | Poppins 600             | ALTA          | Botão do card, link de seção                      |
| `text-body`                                | 15 → 16px, lh 1,6    | Inter 400               | normal        | Descrições                                        |
| `text-product-name`                        | 14px                 | Inter 500               | normal        | Nome do produto                                   |
| `text-tile-name`                           | 13px                 | Inter 500               | normal        | Nome no tile de categoria                         |
| `text-price`                               | 17px                 | Poppins 700             | normal        | Preço atual                                       |
| `text-cart-total`                          | 14px                 | Poppins 600             | normal        | Total do carrinho no header                       |
| `text-caption`                             | 12px                 | Inter 400               | normal        | Apoio, nº de avaliações                           |
| `text-panel-title`                         | 16px, 0,04em         | Poppins 700             | ALTA          | Título dos painéis promocionais                   |
| `text-benefit-title` / `text-benefit-text` | 11px                 | Poppins 600 / Inter 400 | ALTA / normal | Linha de benefícios do hero                       |
| `text-badge` / `text-badge-xs`             | 11px / 10px          | Poppins 700 / 600       | — / ALTA      | "-20%" / "PERSONALIZÁVEL"                         |
| `text-seal`                                | 24 → 32px            | Poppins 800             | normal        | "50%" do selo de desconto                         |

- Os títulos `h1`–`h4` são Poppins 700 com tracking -0,01em; **a caixa alta vem dos utilitários acima** (assim nomes de produto e páginas antigas ficam em caixa normal).
- O tamanho vem da classe, não da tag. Mantenha **um único `<h1>` por página**. Os slides 2 e 3 do hero usam `<h2>`/`<p>`, nunca um segundo `<h1>`.
- **Largura do título do hero:** "FEITO PARA VOCÊ." em Poppins 800 a 56px mede cerca de **640px**. A coluna de texto do hero precisa de pelo menos isso a 1440px para o título caber em 2 linhas (a 360px, 34px, cabe em 328px de largura útil).
- As variáveis das fontes (`--font-poppins` etc.) vêm de `fontClassNames` (`src/app/fonts.ts`), que **deve estar no `<html>`**.

### Fontes de personalização (não são da interface)

O texto do **cliente** nas prévias e em `/personalizar` usa 4 fontes que só carregam quando aparecem (sem preload): `font-personalize-classic` (Fraunces), `-elegant` (Playfair Display itálico), `-script` (Caveat), `-bold` (Archivo Black). As 5 cores do texto (`personalizeColors`) são opções do **produto**, não da marca, e seus ids vão na query string de `/personalizar` (não mudam).

## Espaço, layout e forma

- Base de **4px**: `p-1`=4, `p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24, `p-8`=32, `p-12`=48, `p-16`=64, `p-20`=80.
- `container-page`: máx. **1280px**, gutter 24px (16px abaixo de 640px).
- **`section-gap`**: ritmo vertical **entre** seções, como margem superior (48px no celular, 56px a partir de 768px, 64px a partir de 1024px). Aplique em cada seção que vem depois de outra; não some `padding` por cima.
- `section-head`: linha do título da seção com o link à direita, 24px de respiro até o conteúdo.
- Raios: `rounded-control` 4px (botões, inputs, badges), `rounded-card` 8px (cards, tiles, modais), `rounded-panel` 8px (faixa promocional), `rounded-full` (selo de desconto, contador, setas). **Legado:** `rounded-sm/md/lg` = 4/8/8.
- Sombras mínimas: `shadow-soft` (quase nada), `shadow-hover` (`0 6px 20px rgb(33 33 33 / .08)`, hover de card), `shadow-lift` (só modal, drawer, toast). A separação é por borda de 1px.
- Ícones: **Lucide**, `strokeWidth={1.5}`, 20 a 24px, cor grafite. O Lucide atual **não tem ícones de marcas** (Instagram, Facebook...): use SVGs próprios nas redes sociais.
- Breakpoints: `xs` 360, `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440.

### Recorte diagonal do hero

`clip-diagonal-left` (a partir de 768px) recorta a borda **esquerda** do bloco areia, com o topo mais à direita que a base, como no modelo. Aplique no elemento de fundo areia, posicionado à direita (`absolute inset-y-0 right-0 -z-10 hidden w-[47%] bg-sand md:block`). A inclinação é `--diagonal-inset` (padrão 10%; use `[--diagonal-inset:12%]`). No celular o bloco fica reto, embaixo do texto.

## Movimento

Discreto e funcional. Sem autoplay, sem parallax, sem rolagem sequestrada.

- `fade-slide`: crossfade de slide (400ms). Marque o ativo com `data-active="true"`; os demais ficam `visibility: hidden` (saem do teclado e dos leitores de tela).
- `lift` / hover de tile e card: sobe 2px. Cards e tiles dos componentes já fazem isso (`data-interactive`).
- `image-zoom` (zoom 1,04) e `arrow-slide` (seta 4px): o pai precisa de `group`.
- Botão do card: transição de cor em 200ms (`duration-button`); clique escala 0,98.
- `animate-cart-bump`: o contador do carrinho "pula" quando o número muda (`<CountBadge />` já faz).
- `animate-fade-up`: entrada de seção (fade + 16px, 400ms, uma vez).
- **`prefers-reduced-motion`**: entradas aparecem no estado final, shimmer e "pulo" param, zoom/seta/lift não acontecem e as transições ficam instantâneas. Já tratado em `globals.css`.

## Componentes (`src/components/ui`)

| Componente                                                             | Notas                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                                               | `variant`: `primary`, `outline`, `rose` (**só sobre fundo grafite**), `ghost`, `link`, `cart`. `size`: `xs`, `sm`, `md`, `lg`. `arrow` acrescenta "→"; com `asChild`, use `<ButtonArrow />` dentro do filho. Todos com alvo de toque de 44px (o `xs` estende por pseudo-elemento). **Classes extras passadas em `className` vencem as do botão** (`hidden md:inline-flex` esconde o botão no celular). |
| `Button variant="cart"`                                                | Largura total, outline cinza, ícone à esquerda, 12px caixa alta; hover vira grafite em 200ms. O rótulo pode **quebrar em 2 linhas** em cards estreitos (altura mínima de 48px mantém o alinhamento).                                                                                                                                                                                                      |
| `DiscountSeal`                                                         | Círculo grafite, 80px no celular e 112px no desktop. `prefix`, `value`, `suffix`, `label`. Posicione-o (absolute) sobre a divisa texto/foto.                                                                                                                                                                                                                                                              |
| `Badge`                                                                | `tone`: `discount` ("-20%"), `customizable`, `bestseller`, `new`, `ready`.                                                                                                                                                                                                                                                                                                                                |
| `Rating`                                                               | 5 estrelas de 12px + "(nº)". `showValue` mostra a nota em texto. **Renderiza um `<div>`: nunca dentro de `<p>`.**                                                                                                                                                                                                                                                                                         |
| `ProductCard`                                                          | `variant="shop"` (home: selo `-N%` calculado de `oldPrice`, Rating, preço + antigo riscado, botão `cart` ou link PERSONALIZAR) ou `"detailed"` (padrão, `/produtos`). `onAddToCart` opcional; sem ele adiciona ao carrinho (zustand) e avisa (se houver provedor de toast).                                                                                                                               |
| `CategoryTile`                                                         | Tile quadrado (`name`, `href`, `image`, `more`). `CategoryCard` (foto + degradê) continua para outros usos.                                                                                                                                                                                                                                                                                               |
| `CarouselArrow`                                                        | `appearance="chevron"` (esquerda, sem círculo) ou `"circle"` (direita, branco com borda fina); `direction`.                                                                                                                                                                                                                                                                                               |
| `CarouselDots`                                                         | `count`, `active`, `onSelect`; ativo rosé escuro e mais largo; alvo de 44px de altura.                                                                                                                                                                                                                                                                                                                       |
| `BenefitRow`                                                           | Linha de benefícios do hero (ícone + título 11px + apoio 11px, divisores finos, rola no celular). **O pai em grid/flex precisa de `min-w-0`.**                                                                                                                                                                                                                                                            |
| `PromoPanels` / `PromoPanel`                                           | Faixa de 3 painéis: `tone="graphite" \| "rose" \| "light"`. O rosé usa texto grafite.                                                                                                                                                                                                                                                                                                               |
| `AvatarStack`                                                          | Avatares sobrepostos (decorativo). Combine com `<Rating showValue />`.                                                                                                                                                                                                                                                                                                                                    |
| `CountBadge`                                                           | Contador circular grafite; "pula" quando muda.                                                                                                                                                                                                                                                                                                                                                            |
| `SectionLink`                                                          | "VER TODOS OS PRODUTOS →" com seta que desliza.                                                                                                                                                                                                                                                                                                                                                           |
| `Input`, `Select`, `Field`                                             | 44px, borda `field-border`, foco com anel grafite. Colados: `inputJoinedClass` + `buttonJoinedClass`.                                                                                                                                                                                                                                                                                                     |
| Recipes                                                                | `footerLinkClass`, `socialButtonClass`, `paymentBadgeClass` (rodapé grafite).                                                                                                                                                                                                                                                                                                                             |
| `Chip`, `Accordion`, `Modal`, `Drawer`, `Toast`, `Tooltip`, `Skeleton` | Na paleta nova; foco visível.                                                                                                                                                                                                                                                                                                                                                                             |

Convenções: botão carregando usa `data-loading`; chip selecionado usa `selected` + `aria-pressed`; cards clicáveis levam `data-interactive`.

## Apelidos legados (remover quando as outras páginas forem redesenhadas)

As páginas `/produtos`, `/carrinho`, `/checkout` e `/personalizar` ainda usam os nomes antigos. Em vez de editá-las, os nomes viraram **apelidos** das cores novas:

| Antigo         | Agora        | Antigo                             | Agora                             |
| -------------- | ------------ | ---------------------------------- | --------------------------------- |
| `ink`          | `text`       | `blush`                            | `sand`                            |
| `ink-muted`    | `text-muted` | `sage`                             | `rose`                            |
| `accent`       | `graphite`   | `on-sage`                          | `graphite`                        |
| `accent-hover` | `graphite-hover` | `font-display`                     | Poppins                           |
| `on-accent`    | `on-dark`    | `text-h1/h2/h3`, `text-display-xl` | Poppins 700/800, tamanhos menores |

`surface` e `sand` mantêm o nome, mas **já têm os valores novos** (`#F4F4F5` e `#F5EBE6`). `Button variant="accent"` = `primary` e `"secondary"` = `outline`. `text-caption` agora é Inter 400 normal (antes era caixa alta).

## Regras de uso

1. Grafite é estrutura e ação; **rosé só destaque**, nunca blocos grandes de texto.
2. Áreas de toque ≥ 44px (todos os botões, chips, setas e pontos respeitam).
3. Um único `<h1>` por página; o texto da marca vem de `lib/brand` (`[NOME DA LOJA]`), nunca digitado em componentes.
4. Preços no formato `R$ 189,90` (`formatPrice`). Preço riscado sempre acompanhado de texto para leitores de tela.
5. O texto do carrinho no header ("R$ 189,90") e o `CountBadge` são decorativos para leitores de tela: descreva a quantidade e o total no `aria-label` do link do carrinho.

## Vitrine rosé + grafite (home, header e rodapé)

A home e a estrutura do site (barra de aviso, header, rodapé, botão do WhatsApp) usam as mesmas cores da tabela acima: **rosé + grafite + creme**.

**Por que dois rosés:** o rosé da referência (`#E6ACA4`) com texto branco dá 1,9:1, abaixo do mínimo de 4,5:1. Ele fica em fundos e decoração; botões, preços e textos pequenos usam o rosé escuro.

### Fontes e estilos da vitrine

- **Montserrat** (`font-store-heading`): títulos de seção, preços, botões, menu.
- **Raleway** (`font-store-body`): texto do banner, nome do produto, depoimentos.
- **Cormorant Garamond** (`font-wordmark`): logotipo em caixa alta com espaçamento largo.
- **Allura** (`text-script`): uma frase manuscrita por banner, em `text-rose-strong`.
- Utilitários: `text-store-title`, `text-store-hero`, `text-store-eyebrow`, `text-store-product`, `text-store-price`, `text-store-price-note`, `text-store-button`, `text-store-nav`, `text-store-body`, `text-store-caption`, `text-store-label`, `text-store-badge`.

### Componentes

`ui/store-button.ts` (botão pílula), `ui/store-product-card.tsx` (card com preço no Pix, parcelamento, selos e "Esgotado"), `ui/quantity-stepper.tsx`, `ui/section-heading.tsx` (título com traço de 40×3px), `ui/store-carousel-controls.tsx`, `ui/ornaments.tsx` (moldura em arco e brilhos). Condições de pagamento (5% no Pix, 12x com juros) vêm de `brand.payment` em `src/lib/brand.ts` e são placeholders.
