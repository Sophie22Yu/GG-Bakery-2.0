import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App, { Shop } from "../App.jsx";
import { OrderLink } from "../components.jsx";
import { products, orderForms } from "../data.js";

describe("Shop", () => {
  it("combines case-insensitive text and category filters, and resets them", async () => {
    const user = userEvent.setup();
    render(<Shop />);
    expect(screen.getAllByRole("article")).toHaveLength(products.length);
    await user.type(screen.getByLabelText("Search products"), "BEAR");
    expect(screen.getAllByRole("article")).toHaveLength(2);
    await user.selectOptions(screen.getByLabelText("Category"), "Desserts");
    expect(screen.getByText("No products found.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getAllByRole("article")).toHaveLength(products.length);
    expect(screen.getByLabelText("Search products")).toHaveValue("");
    expect(screen.getByLabelText("Category")).toHaveValue("All treats");
  });
  it("filters categories without a search and handles a search with no matches", async () => {
    const user = userEvent.setup();
    render(<Shop />);
    await user.selectOptions(screen.getByLabelText("Category"), "Cakes");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await user.type(
      screen.getByLabelText("Search products"),
      "not-a-real-dessert",
    );
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show all products" }));
    expect(screen.getAllByRole("article")).toHaveLength(products.length);
  });
});

describe("Navigation", () => {
  it("opens the menu using the keyboard, closes on Escape and after navigation", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const menu = screen.getByRole("button", { name: /Menu/ });
    menu.focus();
    await user.keyboard("{Enter}");
    expect(menu).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveFocus();
    await user.keyboard("{Enter}");
    const shop = screen
      .getByRole("navigation", { name: "Main navigation" })
      .querySelector('a[href="/shop"]');
    shop.focus();
    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("heading", { name: "Our Shop" }),
    ).toBeInTheDocument();
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector("main")).toHaveFocus();
  });
  it.each(["/delivery", "/events", "/about", "/missing"])(
    "renders direct route %s",
    (path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      );
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      if (path === "/missing")
        expect(screen.getByRole("link", { name: "Home ↗" })).toHaveAttribute(
          "href",
          "/",
        );
    },
  );
});

describe("Ordering", () => {
  it("uses contact fallback for unverified forms", () => {
    render(<OrderLink />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "mailto:gg.bakery.service@gmail.com",
    );
  });
  it("uses the preserved form destination once verified", () => {
    orderForms.custom.verifiedActive = true;
    try {
      render(<OrderLink />);
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        orderForms.custom.url,
      );
    } finally {
      orderForms.custom.verifiedActive = false;
    }
  });
});
