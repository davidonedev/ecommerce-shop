# Guia de contribuição

## Branches

| Branch | Papel |
|---|---|
| `main` | **Produção.** Só recebe código já validado na `develop`. |
| `develop` | **Integração.** Recebe todas as branches de feature, bugfix e chore. |
| `feature/<nome>` | Nova funcionalidade. Sai da `develop`, volta para a `develop`. |
| `bugfix/<nome>` | Correção de bug. Sai da `develop`, volta para a `develop`. |
| `chore/<nome>` | Infra, dependências, documentação. Sai da `develop`, volta para a `develop`. |
| `hotfix/<nome>` | Correção urgente em produção. Sai da `main`, volta para a `main` **e** para a `develop`. |

```
feature/*  ─┐
bugfix/*   ─┼─► develop ──(aprovação / release)──► main
chore/*    ─┘
hotfix/*  ───────────────────────────────────────► main (e depois develop)
```

## Passo a passo

1. Atualize a `develop` e crie sua branch:
   ```bash
   git switch develop && git pull
   git switch -c feature/carrinho
   ```
2. Faça commits pequenos e abra um Pull Request **para a `develop`**.
3. Aguarde a CI passar e a revisão. Depois do merge, apague a branch.
4. Para publicar em produção, abra um PR de `develop` para `main`, valide e faça o merge.

## Convenção de commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

Exemplo: `feat(cart): adiciona remoção de item do carrinho`.

## Regras

- Não faça commit direto em `main` nem em `develop`; use Pull Request.
- Não versione segredos: `.env` está no `.gitignore`; use `.env.example` como referência.
- Todo PR deve passar na CI (`./mvnw verify`, `npm run lint`, `npm test`, `npm run build`).

> **Nota:** a proteção de branches no GitHub (PR obrigatório, checks obrigatórios) ainda **não** está configurada.
> Para reforçar este fluxo, ative em *Settings → Branches → Add branch protection rule* para `main` e `develop`.
