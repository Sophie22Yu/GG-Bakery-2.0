import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calendar, { calendarDays, dateKey } from "../Calendar.jsx";

describe("Calendar date logic", () => {
  it("aligns Monday-first months and handles leap years", () => {
    expect(calendarDays(2024, 0)[0]).toBe(1);
    expect(calendarDays(2024, 1).slice(0, 3)).toEqual([null, null, null]);
    expect(calendarDays(2024, 1).filter(Boolean)).toHaveLength(29);
    expect(calendarDays(2025, 1).filter(Boolean)).toHaveLength(28);
    expect(dateKey(2024, 1, 29)).toBe("2024-02-29");
  });
  it("crosses December/January in both directions and returns to today", async () => {
    const user = userEvent.setup();
    render(<Calendar today={new Date(2026, 11, 15)} />);
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("January 2027")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("December 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("November 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Today" }));
    expect(
      screen.getByRole("button", { name: "December 15, 2026" }),
    ).toHaveAttribute("aria-pressed", "true");
  });
  it("shows the selected date’s events, with no UTC conversion", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        today={new Date(2024, 1, 1)}
        events={[
          {
            id: "test-only",
            date: "2024-02-29",
            title: "Test baking event",
            description: "Fixture only; never published.",
          },
        ]}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: "February 29, 2024, events scheduled",
      }),
    );
    expect(
      screen.getByRole("heading", { name: "Test baking event" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "February 29, 2024" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "February 28, 2024" }));
    expect(screen.getByText("No events scheduled")).toBeInTheDocument();
    expect(screen.queryByText("Test baking event")).not.toBeInTheDocument();
  });
  it("supports keyboard selection", async () => {
    const user = userEvent.setup();
    render(<Calendar today={new Date(2024, 1, 1)} />);
    const day = screen.getByRole("button", { name: "February 2, 2024" });
    day.focus();
    await user.keyboard("{Enter}");
    expect(day).toHaveAttribute("aria-pressed", "true");
  });
});
