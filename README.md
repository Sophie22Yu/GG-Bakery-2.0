# G&G Bakery Website 2.0

A React rebuild of [G&G Bakery's original Streamlit website](https://github.com/Sophie22Yu/GG-Bakery-Website). The bakery's photos, warm colors, and handwritten visual direction are retained; the interface is rebuilt as reusable React components.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended) and npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Vite prints the local preview address. The production output is `dist/`.

## What's implemented

- Five routes: Home (`/`), Shop (`/shop`), Delivery & Pickup (`/delivery`), Events & Sales (`/events`), and About Us (`/about`). An unknown route displays a 404 page.
- Shared navigation, mobile menu, footer, and reusable product cards.
- Case-insensitive product search combined with category filters, reset controls, and a no-results state.
- A Monday-first React calendar with correct month alignment, leap years, previous/next month, Today, selected dates, and date-specific event details.
- Responsive layouts, visible keyboard focus, skip navigation, descriptive image alternatives, and optimized WebP photos.
- Preserved Google Forms destinations with a safe contact fallback until each form is confirmed active.

This is a static informational storefront. It has no checkout, order database, accounts, payments, inventory management, or measured business-outcome claims.

## Where to make changes

| Area | File | What to change |
| --- | --- | --- |
| Product and event content | `src/data.js` | Product records, confirmed events, order-form status |
| Reusable interface | `src/components.jsx` | Header, footer, cards, shared links |
| Calendar behavior | `src/Calendar.jsx` | Month and selected-date state, calendar calculations |
| Page composition | `src/App.jsx` | Five pages, routes, search/filter state |
| Visual design | `src/styles.css` | Color tokens, typography, spacing, responsive layouts |

Product records use `{ id, name, category, description, image, alt, form }`; `image` is a basename in `public/images/`, and `form` identifies a preserved destination in `orderForms`. No current prices or availability are assumed. Add an optional displayed price only after confirmation.

Event records use `{ id, title, date, description, link? }`. Dates must be local calendar dates in `YYYY-MM-DD` format. Keep the production array empty until an event is confirmed. Test fixtures are confined to `src/test/`.

Before setting any order form's `verifiedActive` field to `true`, open it as a customer and confirm it accepts responses for the intended products. Never submit a test order without the bakery's agreement. Until then, the site links to the bakery email. Historical delivery details are explicitly qualified.

## Deployment: Netlify Free

1. Push this project to the new 2.0 GitHub repository; leave the original repository and Streamlit deployment intact.
2. In Netlify, import that repository and select the Free plan.
3. Set the build command to `npm run build`, publish directory to `dist`, and Node version to `24`.
4. `public/_redirects` is copied into `dist/` and provides the single-page-app route fallback, including for manual uploads. `netlify.toml` supplies the build settings. Do not enable Netlify Forms or paid add-ons; no environment secrets are needed.
5. Use the assigned `netlify.app` address; purchasing a domain is unnecessary.
6. Check every route and refresh `/shop` while signed out. Check images, search, calendar controls, mobile navigation, and ordering/contact links.

Netlify's Free plan has usage limits. Check the dashboard after deployment and after sharing the link. Keep the original Streamlit URL available as a fallback. Public URL and deployment verification must be recorded after publication; configuration alone is not a live deployment.

## Learning and contribution record

The original design was created by Sophie in Figma. Sophie used Claude to help build and deploy the original Streamlit version, then manually edited HTML/CSS, Python functions, and its calendar.

The initial React 2.0 implementation, tests, and documentation were generated with Codex assistance. They are not a record of React changes Sophie has already made independently. Follow [LEARNING.md](LEARNING.md), make and commit your own changes, and record what you implemented and can explain. Describe AI assistance candidly when asked.

Do not list Netlify deployment as completed until the public site is live and verified. Do not claim customer adoption, revenue gains, or independent authorship without evidence.

## Assets and attribution

Selected photos and artwork are copied from `gg_bakery/assets/` in the original repository and converted to WebP (maximum width 1,200 pixels). No Python virtual environment, sample-data images that do not exist, fabricated testimonials, or unsupported donation metrics are copied.

Original source license is retained in `LICENSE`. Google Fonts supplies Caveat Brush, Gaegu, and DM Sans with local fallback fonts if unavailable.

## Checks

`npm test` runs Vitest and React Testing Library. The suite covers combined filters, reset/empty results, keyboard navigation, direct routes, unverified order forms, Monday alignment, leap years, month/year transitions, Today, selected-date events, and keyboard date selection.

Before release: run tests and a production build; inspect all routes at phone and desktop widths; check the console, local images, links, and nested-route refresh. CI repeats the test/build checks for pushes and pull requests.
