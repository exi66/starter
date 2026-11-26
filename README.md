# starter

Шаблон для статических проектов на GitHub Pages: Vite + React 19 + TypeScript + Tailwind 4 + shadcn
(пресет `b5KtPvff6`: base-sera, Base UI, sky, Geist Mono) и общая тема `@exi/theme`.

Тема раздаётся как shadcn registry: https://exi66.github.io/starter/r/theme.json

## Новый проект

1. На GitHub: **Use this template** → новый репозиторий, склонировать.
2. Поправить под проект: `name` в `package.json`, `APP_NAME` в `src/lib/app.ts`, адрес/название/описание в
   `.env` (из них собираются `<title>` и превью ссылок), `app.title` в `src/messages/*.json`, `src/App.tsx`,
   `README.md`, `CLAUDE.md`. Картинку превью `public/og.png` (1200×630) — заменить своей или оставить общую.
   Удалить `registry.json` (registry живёт только в стартере).
3. `pnpm install`, `pnpm dev`. Registry `@exi` уже прописан в `components.json`.
4. Settings → Pages → Source: **GitHub Actions**. Деплой — по тегу: `git tag v0.1.0 && git push --tags`.

## Перевести существующий проект на тему

Сначала добавить в `components.json` проекта
`"registries": { "@exi": "https://exi66.github.io/starter/r/{name}.json" }`, затем:

```bash
pnpm dlx shadcn@latest apply b5KtPvff6   # пресет: стиль, цвета, шрифт
pnpm dlx shadcn@latest add @exi/theme    # поверх пресета: радиус 0, фокус-кольцо, курсоры
```

## Градиент бренда

Переливающийся градиент (розовый ↔ голубой, 35 с, отключается при `prefers-reduced-motion`):

```tsx
<div className="bg-brand-gradient text-brand-gradient-foreground">…</div> {/* фон; текст на нём — тёмный */}
<h1 className="w-fit text-brand-gradient">exi.moe</h1>                   {/* текст; w-fit — градиент по ширине текста */}
```

Цвета — `--brand-1`, `--brand-2` (фон) и `--brand-text-1`, `--brand-text-2` (текст: в светлой теме затемнены до
контраста ≥ 4.5 с фоном). Белый текст на `bg-brand-gradient` нечитаем — только `text-brand-gradient-foreground`.

## Что есть в стартере

- **i18n** — i18next + react-i18next + детектор языка. Переводы: `src/messages/ru.json` (основной) и `en.json`;
  ключи типизированы по `ru.json` (`t('app.tittle')` — ошибка типов), тест проверяет, что у всех языков одинаковые
  ключи. Язык хранится в `localStorage.i18nextLng` — общий для всех проектов на домене, как и тема. Новый язык:
  файл в `src/messages/` + запись в `resources` и `SUPPORTED_LANGUAGES` (`src/lib/i18n.ts`).
- **Настройки** — `useStored(key, init, { schema, override })` (`src/hooks/use-stored.ts`): значение в
  localStorage под `<APP_NAME>:<key>`; `schema` (zod) отбрасывает устаревшие/битые значения, `override` — значение
  из ссылки, которое не сохраняется.
- **Валидация** — zod. **Запросы** — ky: общий клиент `api` в `src/lib/api.ts`, ответ проверяется схемой:
  `await api.get(url).json(Schema)`.

## Обновление зависимостей (Renovate)

Подключить один раз: https://github.com/apps/renovate → доступ к репозиториям. Правила общие для всех проектов —
`default.json` в стартере; в проекте только `renovate.json` со ссылкой на него.

- по понедельникам — один PR со всеми minor/patch, при зелёном CI мёржится сам (деплой — только по тегу);
- major и minor у пакетов 0.x — отдельные PR, мёржить руками после проверки;
- версии младше 3 дней не предлагаются (как `minimumReleaseAge` в pnpm 12);
- раз в месяц — обновление lock-файла; список всех ожидающих обновлений — issue «Dependency Dashboard».

## Обновить тему в проектах

1. Поменять `registry.json` здесь, выпустить тег — Pages опубликует новый `theme.json`.
2. В каждом проекте: `pnpm dlx shadcn@latest add @exi/theme --overwrite` и проверить diff `src/index.css`.

Правило: тему правят только в стартере, в проектах её руками не трогают.

## Команды

```
pnpm dev              # dev-сервер
pnpm build            # tsc -b && vite build → dist/
pnpm lint             # oxlint
pnpm format           # prettier (format:check в CI)
pnpm typecheck        # tsc -b
pnpm test             # vitest: test/**/*.test.ts
pnpm registry:build   # registry.json → public/r/*.json (только стартер)
```
