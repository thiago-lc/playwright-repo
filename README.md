# Playwright Portfolio

![Playwright Tests](https://github.com/thiago-lc/playwright-repo/actions/workflows/playwright.yml/badge.svg)

Automação de testes **E2E** e de **API** com **Playwright + TypeScript**, rodando em **CI/CD no GitHub Actions** com sharding e relatório publicado no GitHub Pages.

📊 **Relatório da última execução:** https://thiago-lc.github.io/playwright-repo/

## O que este projeto demonstra

- **Page Object Model** com locators semânticos (`getByTestId`, `getByRole`)
- **Fixtures customizadas** que injetam os Page Objects em cada teste
- **Sessão reaproveitada** (`storageState`): login uma vez, testes mais rápidos
- **Testes de API** com `request` do Playwright (CRUD + autenticação por token)
- **`test.step`** para relatórios legíveis
- **CI/CD**: execução paralela em 2 shards, merge de relatórios e deploy no GitHub Pages
- Trace, screenshot e vídeo automáticos em caso de falha

## Aplicações testadas

| Tipo | Aplicação |
|------|-----------|
| UI   | [SauceDemo](https://www.saucedemo.com) |
| API  | [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html) |

## Estrutura

```
├── .github/workflows/playwright.yml   # pipeline CI/CD
├── data/                              # massa de dados
├── fixtures/                          # fixtures customizadas
├── pages/                             # Page Objects
├── tests/
│   ├── auth.setup.ts                  # login + storageState
│   ├── e2e/                           # testes de UI
│   └── api/                           # testes de API
└── playwright.config.ts
```

## Como rodar

```bash
npm install
npx playwright install chromium

npm test            # tudo
npm run test:e2e    # só UI
npm run test:api    # só API
npm run test:ui     # modo UI interativo
npm run report      # abre o último relatório
```

## Autor

**Thiago Luiz** — QA Automation / Desenvolvedor Full Stack
