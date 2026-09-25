# Waschplaner website

The public website for [Waschplaner](../waschplan): what it is, pricing (Free, Plus, self-hosted), help pages for
residents and administrators, and the self-hosting guide. The app itself lives in `../waschplan` and is
designed separately; this site only links to it.

- **Stack:** Vue 3 + Vue Router + Vite, served by nginx. Same tooling as the app (ESLint with the Vue style guide, Vitest).
- **Design:** the tokens, base elements, buttons, forms and surfaces in `src/styles.css` are copied from
  the app's `frontend/src/styles.css`, and `BaseIcon`, `BaseCallout`, `BaseStepper` and `LanguagePicker` from its
  components. The rules in the app's `frontend/DESIGN.md` and the words in its `frontend/GLOSSARY.md` apply here too.
  Change shared styles in the app first, then copy them over.
- **Languages:** German (Swiss spelling, "du") and English (British spelling), like the app.

## Run it

```bash
docker compose up -d --build     # works out of the box
open http://localhost:8081
```

The links to the hosted app, the repository and the contact address are baked in at build time. To change them,
`cp .env.example .env`, edit, and run `docker compose up -d --build` again.

| Variable | Default | Meaning |
|---|---|---|
| `VITE_APP_URL` | `https://app.waschplaner.com` | The hosted app ("Haus einrichten" → `/setup`, "Anmelden" → `/login`) |
| `VITE_REPO_URL` | `https://github.com/waschplaner/waschplaner` | Source code (self-hosting guide, footer) |
| `VITE_CONTACT_EMAIL` | `hallo@waschplaner.com` | Support and legal contact |
| `WEB_PORT` | `8081` | Port on the host (8081, so it can run next to the app on 8080) |

## Development

```bash
npm install
npm run dev      # http://localhost:5174
npm test         # Vitest: inline markup, formatting, DE/EN parity, links between pages
npm run lint
npm run build
```

## Where things are

- `src/views`: `HomeView` (landing page), `PricingView`, `docs/` (help layout, index and pages), `LegalView`, `NotFoundView`.
- `src/components`: `TheSiteHeader`/`TheSiteFooter`, `DemoWeek` + `DemoSlot` (a playable copy of the app's plan,
  styled like `WeekBoardSlot`), `PlanCards`, `PlanTable`, `PriceCalculator`, `FaqList`, `DocBlocks` (draws help and
  legal pages), `CodeBlock`, `RichText`.
- `src/i18n`: site texts in `de.js` and `en.js`. `tm(key)` returns lists (FAQ items, feature cards).
- `src/content`: help pages (`docs.de.js`, `docs.en.js`) and legal texts (`legal.js`) as blocks. Texts use a small
  inline markup: `**bold**`, `` `code` ``, `[label](/path)`, and `{app}`, `{repo}`, `{email}` placeholders.
- `src/lib/plans.js`: **what is in Free, Plus and self-hosted.** The pricing cards and the comparison table read from it.
- `src/site.js`: URLs, the price per flat and the Free limits (4 weeks of bookings, 30 days of activity).

## Free and Plus

The line between the plans: **Free is everything that happens when someone opens the plan. Plus is what the server
does on its own or keeps for longer.** Plus costs 1 CHF per flat per year, paid by the administrator.

| Plus feature | Why it costs something |
|---|---|
| E-mail notifications | Every e-mail costs delivery and upkeep of a trusted sender address |
| Calendar feed (iCal) | Calendar apps check each flat's feed around the clock |
| Live screen (kiosk, `/h/<token>`) | Reloads the plan every minute, 1,440 times a day |
| Full history and activity | Storage that grows year after year (Free: 4 weeks / 30 days) |
| Reminders, statistics (planned) | A scheduler that runs all the time, and heavier queries |

"Forgot password" e-mails stay free: they are rare, and locking people out is not a feature.

## Before going live

- Fill in the `[placeholders]` in `src/content/legal.js` (operator, address, providers, retention days, date).
- Set the real URLs and contact address (see above).
- Keep the price in `src/site.js` (`PRICE_PER_FLAT`) and the texts in `src/i18n/*.js` in line with the app's
  `PLUS_PRICE` and `PLUS_CURRENCY`. The app handles Free/Plus, `?plan=plus` on `/setup` and payments ("Verwalten → Plus").
