# starter

Шаблон для статических проектов exi.moe на GitHub Pages: Vite, React 19, TypeScript, Tailwind 4, shadcn с общей
темой, i18n (ru/en). Демо: https://exi66.github.io/starter/

## Новый проект

1. **Use this template** → склонировать → `pnpm install`.
2. Заменить `starter` на имя проекта: `name` в `package.json`, `APP_NAME` в `src/lib/app.ts`, `.env` (адрес,
   название, описание для превью ссылок), `app.title` в `src/messages/*.json`.
3. Удалить `registry.json` и `default.json` — они нужны только самому стартеру.
4. `pnpm dev`.

## Деплой

1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Environments → `github-pages` → Deployment branches and tags → добавить тег `v*`.
3. `git tag v0.1.0 && git push --tags` — сайт публикуется после зелёного CI.

## Команды

```
pnpm dev          # dev-сервер
pnpm build        # сборка в dist/
pnpm test         # тесты
pnpm lint         # oxlint
pnpm format       # prettier
pnpm typecheck    # tsc
```

## Тема

Общая тема раздаётся как shadcn registry `@exi/theme`. Обновить в проекте:

```bash
pnpm dlx shadcn@latest add @exi/theme --overwrite
```

Перевести на тему старый проект — добавить в `components.json`
`"registries": { "@exi": "https://exi66.github.io/starter/r/{name}.json" }`, затем:

```bash
pnpm dlx shadcn@latest apply b5KtPvff6
pnpm dlx shadcn@latest add @exi/theme
```

Тема правится только здесь, в `registry.json`, и публикуется новым тегом.
