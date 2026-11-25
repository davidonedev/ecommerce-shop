# Design tokens

Conceito: **"Feito para você, com cuidado de ateliê"**. Moderno-editorial, acolhedor e tátil. Premium acessível, sem cara de gráfica genérica.

- **Fonte de verdade:** `src/app/globals.css` (variáveis CSS + tema do Tailwind).
- **Espelho em código:** `src/lib/tokens/tokens.ts` (mude nos dois lugares).
- **Receitas dos componentes:** `src/components/ui/variants.ts`.
- **Vitrine visual:** rota `/design-system` (componente `TokenShowcase`).

Regra de ouro: **nenhuma cor ou tamanho solto no código.** Use as classes dos tokens abaixo.

## Cores

| Classe                                  | Hex                     | Uso                                   |
| --------------------------------------- | ----------------------- | ------------------------------------- |
| `bg-bg`                                 | `#F7F3EE` Linho         | Fundo principal                       |
| `bg-surface`                            | `#FFFDFA` Branco quente | Cards, modais                         |
| `bg-sand`                               | `#E8DFD3` Areia         | Seções alternadas                     |
| `text-ink` / `bg-ink`                   | `#1F1B16` Tinta         | Texto principal, botão primário       |
| `text-ink-muted`                        | `#6B6259`               | Texto secundário                      |
| `bg-accent`                             | `#B8562F` Terracota     | CTA de destaque, badge Personalizável |
| `bg-accent-hover` / `text-accent-hover` | `#9A4524`               | Hover do acento, links                |
| `bg-sage`                               | `#7F8F72` Sálvia        | Selos de confiança, sucesso           |
| `bg-blush`                              | `#E9C9B8` Rosé          | Presentes, toques afetivos            |
| `border-border`                         | `#DDD3C6`               | Divisores decorativos                 |
| `text-on-accent`                        | `#FFFDFA`               | Texto sobre terracota                 |
| `text-on-sage`                          | `#1F1B16`               | Texto sobre sálvia                    |
| `bg-scrim`                              | `rgb(31 27 22 / .5)`    | Véu atrás de modais e drawers         |

### Contraste (WCAG AA, texto ≥ 4,5:1)

Razões calculadas (a vitrine mostra a tabela completa, calculada ao vivo).

| Par                          | Razão | Situação                                     |
| ---------------------------- | ----- | -------------------------------------------- |
| ink / bg                     | 15,50 | OK                                           |
| ink / surface                | 16,86 | OK                                           |
| ink / sand                   | 12,98 | OK                                           |
| ink / blush                  | 11,02 | OK                                           |
| ink-muted / bg               | 5,41  | OK                                           |
| ink-muted / surface          | 5,88  | OK                                           |
| ink-muted / sand             | 4,53  | OK (no limite)                               |
| on-accent (#FFFDFA) / accent | 4,69  | OK                                           |
| on-accent / accent-hover     | 6,36  | OK                                           |
| accent-hover / bg            | 5,85  | OK                                           |
| accent / surface             | 4,69  | OK                                           |
| ink / sage                   | 4,95  | OK                                           |
| **bg / accent**              | 4,31  | **Reprova**                                  |
| **accent / bg**              | 4,31  | **Reprova**                                  |
| **ink-muted / blush**        | 3,84  | **Reprova**                                  |
| **surface / sage**           | 3,40  | **Reprova**                                  |
| **border / bg**              | 1,34  | **Reprova como texto e como borda de campo** |

Os hex não foram alterados. O que muda é **como usar**:

1. **Texto sobre terracota:** sempre `text-on-accent` (`#FFFDFA`, 4,69:1). Nunca o Linho (4,31:1).
2. **Link ou texto terracota:** sobre `bg`/`sand`, use `text-accent-hover` (5,85:1). `text-accent` só sobre `surface` (4,69:1).
3. **Sálvia é preenchimento ou ícone, nunca cor de texto.** Texto sobre sálvia usa `text-on-sage` (tinta).
4. **Texto secundário sobre Rosé:** use `text-ink`, não `text-ink-muted`.
5. **Borda de campo (input, select):** `border-ink-muted` (5,41:1, exigência de 3:1 para componentes de UI). `border-border` é só divisor decorativo.
6. Ícones e elementos gráficos precisam de ≥ 3:1 com o fundo.

**Foco:** contorno de 2px na terracota com offset de 2px (`outline-accent`): 4,31:1 sobre Linho, 3,61:1 sobre Areia.

## Tipografia

| Classe            | Tamanho (360 → 1440px) | Linha | Tracking | Peso |
| ----------------- | ---------------------- | ----- | -------- | ---- |
| `text-display-xl` | 48 → 88px              | 1.0   | -0,02em  | 400  |
| `text-h1`         | 40 → 56px              | 1.1   | -0,015em | 400  |
| `text-h2`         | 32 → 44px              | 1.15  | -0,01em  | 400  |
| `text-h3`         | 22 → 28px              | 1.25  | -0,005em | 600  |
| `text-body`       | 16 → 17px              | 1.6   | 0        | 400  |
| `text-small`      | 14px                   | 1.5   | 0        | 400  |
| `text-caption`    | 12px, MAIÚSCULAS       | 1.4   | 0,12em   | 600  |

- Títulos: `font-display` (Fraunces). Texto e UI: `font-sans` (Inter).
- O tamanho vem da classe, não da tag: um `<h2>` pode ter visual de `text-h3`. Mantenha **um único `<h1>` por página**.
- Fraunces usa `font-optical-sizing: auto`, então títulos grandes ganham o desenho de tamanho óptico alto sozinhos.
- As variáveis das fontes (`--font-fraunces` etc.) são definidas por `fontClassNames` (`src/app/fonts.ts`), que **deve ser aplicado no `<html>`**.

### Fontes de personalização

| Classe                                  | Fonte                    |
| --------------------------------------- | ------------------------ |
| `font-personalize-classic`              | Fraunces (clássica)      |
| `font-personalize-elegant` (+ `italic`) | Playfair Display itálico |
| `font-personalize-script`               | Caveat (manuscrita)      |
| `font-personalize-bold`                 | Archivo Black (moderna)  |

Cores do texto personalizado (5 bolinhas): `personalizeColors` em `tokens.ts`.

## Espaço, layout e forma

- Base de **4px**: `p-1`=4, `p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24, `p-8`=32, `p-12`=48, `p-16`=64, `p-24`=96, `p-32`=128.
- `py-section`: respiro vertical entre seções (64 → 128px, fluido).
- `container-page`: máx. 1320px, gutter 24px (16px abaixo de 640px).
- Breakpoints: `xs` 360, `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440.
- Raios: `rounded-sm` 6 (inputs), `rounded-md` 12 (cards), `rounded-lg` 24 (blocos/hero), `rounded-full` (pills).
- Sombras: `shadow-soft` (repouso), `shadow-lift` (hover, drawers, modais).
- Textura: `bg-grain` em um wrapper (ruído a 3,5%); o conteúdo fica acima dela.

## Movimento

- Durações: `fast` 150ms, `base` 250ms, `slow` 400ms. Easing: `ease-soft`. Use `duration-(--duration-base)`.
- Entrada de seção: `animate-fade-up` (fade + 16px, 400ms, uma vez só).
- Hover de card: elevação leve (`data-interactive` no card). Clique: `scale(0.98)`.
- Sem parallax pesado, sem rolagem sequestrada, sem autoplay.
- **`prefers-reduced-motion`**: entradas aparecem no estado final, o shimmer para, transições ficam instantâneas e o clique não escala. Já tratado em `globals.css`, nada a fazer por componente.

## Regras de uso

1. **No máximo 1 CTA terracota (`accent`) por dobra.** O resto é `primary` (tinta), `secondary` ou `ghost`.
2. Áreas de toque ≥ 44px (todos os botões, chips e ícones já respeitam).
3. Estado de carregamento do botão: `data-loading` presente (`data-loading={loading || undefined}`); estado selecionado do chip: prop `selected` + `aria-pressed`.
4. Cards clicáveis levam `data-interactive` para ter a elevação no hover.
5. Texto da marca vem de `lib/brand` (placeholder `[NOME DA LOJA]`), nunca digitado em componentes.

## Modo escuro (preparado, não ativado)

`[data-theme="dark"]` já redefine todos os tokens (fundo `#171411`, texto `#F3EDE6`, terracota `#E08A62`). Nada define esse atributo hoje. Contrastes no escuro: tinta/fundo 15,78, tinta suave/fundo 7,86, `on-accent`/terracota 6,51, terracota/fundo 6,97. Para ativar no futuro, basta `data-theme="dark"` no `<html>`.
