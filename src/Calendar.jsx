// CALENDAR READING ORDER: date helpers → state → button handlers → calendar JSX → event details.
import { useState } from "react";

// JavaScript months are 0–11; our stored date strings use 01–12.
// Build YYYY-MM-DD directly so UTC parsing cannot shift an event onto the previous day.
export function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
// Build one month's cells. null values are empty spaces before day 1.
export function calendarDays(year, month) {
  // getDay() starts with Sunday=0. Adding 6 and taking % 7 makes Monday=0 instead.
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  return [
    ...Array(offset).fill(null),
    // Day 0 of the following month is the last day of this month (including leap years).
    ...Array.from(
      { length: new Date(year, month + 1, 0).getDate() },
      (_, index) => index + 1,
    ),
  ];
}

// Parents supply events as props. Tests can also supply "today" to use a predictable date.
export default function Calendar({ events = [], today = new Date() }) {
  // Two separate pieces of state: the month being shown and the date that was selected.
  const [display, setDisplay] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selected, setSelected] = useState(
    dateKey(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  // Derived values: calculate these from props/state each render instead of storing copies.
  const { year, month } = display;
  const heading = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  // Only events with the selected date appear in the adjacent details panel.
  const selectedEvents = events.filter((event) => event.date === selected);
  const [selectedYear, selectedMonth, selectedDay] = selected
    .split("-")
    .map(Number);
  const selectedLabel = new Date(
    selectedYear,
    selectedMonth - 1,
    selectedDay,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  // Event handlers: -1 means previous month, +1 means next. Date handles year rollover.
  // Select day 1 of the new month so the details panel stays in sync with the calendar.
  function moveMonth(change) {
    const next = new Date(year, month + change, 1);
    setDisplay({ year: next.getFullYear(), month: next.getMonth() });
    setSelected(dateKey(next.getFullYear(), next.getMonth(), 1));
  }
  // Reset both the visible month and selected day to today.
  function goToday() {
    setDisplay({ year: today.getFullYear(), month: today.getMonth() });
    setSelected(
      dateKey(today.getFullYear(), today.getMonth(), today.getDate()),
    );
  }
  return (
    <div className="calendar-layout">
      <section className="calendar" aria-label="Bakery event calendar">
        <div className="calendar-toolbar">
          <h3 aria-live="polite">{heading}</h3>
          <div>
            <button aria-label="Previous month" onClick={() => moveMonth(-1)}>
              ←
            </button>
            <button className="today-button" onClick={goToday}>
              Today
            </button>
            <button aria-label="Next month" onClick={() => moveMonth(1)}>
              →
            </button>
          </div>
        </div>
        <div className="calendar-week" aria-hidden="true">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        {/* map() creates a button per day; a click changes state, then React redraws the selection. */}
        <div className="calendar-grid">
          {calendarDays(year, month).map((day, index) => {
            if (!day)
              return <span className="blank-day" key={`blank-${index}`} />;
            const key = dateKey(year, month, day);
            const hasEvents = events.some((event) => event.date === key);
            const isToday =
              key ===
              dateKey(today.getFullYear(), today.getMonth(), today.getDate());
            return (
              <button
                key={key}
                aria-label={`${new Date(year, month, day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}${hasEvents ? ", events scheduled" : ""}`}
                aria-pressed={selected === key}
                aria-current={isToday ? "date" : undefined}
                onClick={() => setSelected(key)}
                className={selected === key ? "day selected" : "day"}
              >
                {day}
                {hasEvents && <span className="event-dot" />}
              </button>
            );
          })}
        </div>
        <p className="calendar-caption">Pick a date to see what's happening.</p>
      </section>
      {/* Conditional rendering: show matching events, or the empty state if there are none. */}
      <aside className="event-details" aria-live="polite">
        <p className="eyebrow">SELECTED DATE</p>
        <h3>{selectedLabel}</h3>
        {selectedEvents.length ? (
          selectedEvents.map((event) => (
            <article key={event.id}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              {event.link && (
                <a className="text-link" href={event.link}>
                  Event details ↗
                </a>
              )}
            </article>
          ))
        ) : (
          <>
            <span className="empty-calendar" aria-hidden="true">
              ✳
            </span>
            <h4>No events scheduled</h4>
            <p>No upcoming dates have been confirmed.</p>
            <a
              className="text-link"
              href="https://www.instagram.com/gg._.bakery_/"
              target="_blank"
              rel="noreferrer"
            >
              Follow G&G ↗
            </a>
          </>
        )}
      </aside>
    </div>
  );
}
