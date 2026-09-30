# Waschplaner website

The public website for [Waschplaner](../waschplan): what it is, pricing (Free, Plus, self-hosted), help pages for
residents and administrators, and the self-hosting guide. The app itself lives in `../waschplan` and is
designed separately; this site only links to it.

- **Stack:** Vue 3 + Vue Router + Vite, served by nginx. Same tooling as the app (ESLint with the Vue style guide, Vitest).
- **Design:** the tokens, base elements, buttons, forms and surfaces in `src/styles.css` are copied from
  the app's `frontend/src/styles.css`, and `BaseIcon`, `BaseCallout`, `BaseStepper` and `LanguagePicker` from its
  components. The rules in the app's `frontend/DESIGN.md` and the words in its `frontend/GLOSSARY.md` apply here too.
  Change shared styles in the app first, then copy them over.
- **Languages:** German (Swiss spelling, "du"), English (British spelling), French (Swiss French, "vous") and
  Italian ("tu"). The app itself is only in German and English, so the French and Italian pages say so, quote
  buttons with their English label («Book») and show the demo plan with the app's English words.

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
- `src/i18n`: site texts in `de.js`, `en.js`, `fr.js` and `it.js`. `tm(key)` returns lists (FAQ items, steps).
- `src/content`: help pages (`docs.<lang>.js`) and legal texts (`legal.js`) as blocks. Texts use a small inline
  markup: `**bold**`, `` `code` ``, `[label](/path)`, and placeholders filled from `src/site.js`: `{app}`, `{repo}`,
  `{email}`, `{price}` and the Plus numbers `{trial}`, `{view}`, `{renew}`, `{remind}`, `{trialRemind}`, `{min}`.
  The tests check that every language has the same keys, pages and blocks, and only known placeholders.
- `src/lib/plans.js`: **what is in Free, Plus and self-hosted.** The pricing cards and the comparison table read from it.
- `src/site.js`: URLs, the price per flat and the Plus numbers from the app's `backend/internal/api/plus.go`.

## Free and Plus

As in the app: **Free is the schedule on paper. With Plus every resident uses it online.** On Free the
administrator sets up the house, changes single days and prints the schedule (two weeks per A4 page, up to 12 weeks at a time; with Plus a whole year). Plus adds
joining with the QR code, booking, freeing up, taking over, moving and checking in, e-mails about changes, the
calendar feed and the public schedule view. Plus costs CHF 2 per flat per year on the hosted app.

Why the line is there: printing takes almost no computing time; once everyone is online, the server works for
every flat around the clock (logins, bookings, e-mails, calendar feeds, a public view reloaded every minute).

How Plus works (from the app): a 30-day trial once per house without payment details; bought for a year
through Stripe (card or TWINT), nothing renews by itself; reminders 7 days before the trial ends and 30 days
before Plus ends; renewing in the last 60 days adds a year; after the end residents can look for 30 days, then
the house is on Free again and nothing is deleted. Self-hosted, Plus is a free switch unless payments are set up.

## Before going live

- Fill in the `[placeholders]` in `src/content/legal.js` (operator, address, providers, retention days, date).
- Set the real URLs and contact address (see above).
- Keep `PRICE_PER_FLAT` and `PLUS_TERMS` in `src/site.js` in line with the hosted app's `PLUS_PRICE`,
  `PLUS_CURRENCY` and `backend/internal/api/plus.go`, and "card or TWINT" in the texts with its `STRIPE_PAYMENT_METHODS`.
- Have the French and Italian texts read by a native speaker. The app handles Free/Plus, `?plan=plus` on `/setup` and payments ("Verwalten → Plus").
