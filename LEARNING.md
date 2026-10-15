# Make this React project your own

Work through these checkpoints with the site running. Keep each change small, test it, and make a commit describing the actual change. These exercises are not marked complete automatically.

## 1. JSX, components, and CSS

- Open `src/components.jsx`; find `Header` and `Footer`.
- Change the short announcement message and adjust one spacing or color variable in `src/styles.css`.
- Visit all five pages. Explain why the same header appears everywhere without copying its markup five times.
- Explain why JSX uses `className`, and why a React component name begins with a capital letter.
- Suggested commit: `Personalize the shared bakery header and styling`.

## 2. Props and data-driven rendering

- Follow one product record from `src/data.js` through `ProductGrid` to `ProductCard`.
- Edit an existing description. Then add a real bakery product using an existing photo and confirmed details; do not invent price or availability.
- Explain how the `product` prop reaches the card and why each rendered card needs a stable `key`.
- Compare props (data received by a component) with state (data the component remembers and changes).
- Suggested commit: `Update the bakery catalog through reusable product data`.

## 3. State and filtering

- In `Shop` in `src/App.jsx`, identify `query`, `category`, and `matches`.
- Trace a keystroke: `onChange` → state update → filtered products → rendered cards.
- Implement a small enhancement yourself: add a category name to the text searchable by the search box. Add a test for that behavior.
- Explain why matching products are computed from state rather than stored as a second, synchronized state variable.
- Run `npm test`. Suggested commit: `Extend product search to category names`.

## 4. Calendar state and dates

- In `src/Calendar.jsx`, identify the displayed month and the selected date.
- Explain Monday-first padding, days in a month, and why we do not parse an event's date as a UTC timestamp.
- Modify the calendar yourself: add a button labeled `Next year` that advances twelve months using `moveMonth(12)`. Add a test for it.
- Use only test fixtures to experiment with sample events; do not publish fictional dates.
- Run `npm test`. Suggested commit: `Add and test yearly calendar navigation`.

## 5. Deployment and interview walkthrough

- Run a production build; verify all routes and a nested-route refresh on the deployed site.
- Record the actual public URL and checks performed in `VERIFICATION.md`.
- Demonstrate adding a product, changing a filter, and navigating a month without reading a prepared script.
- Explain what the site does not do: it sends ordering inquiries to email or verified Google Forms; it does not process payments or store orders.

## Personal change log

Add dated entries here only after you complete the work. Include the component changed, the behavior you implemented, what you learned, how you tested it, and the commit SHA.

No independently completed React checkpoints are recorded yet.

## Resume wording after your walkthrough

Use wording that matches your actual contribution. A candid starting point after reviewing and customizing this implementation is:

> Rebuilt and customized the bakery website in React.js with AI assistance, adding reusable product components, search/category filters, and an interactive event calendar.

Only mention Netlify deployment after it is verified. If your role is reviewing/customizing generated features, explain that accurately; do not say you independently implemented every feature in this initial version.
