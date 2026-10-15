import { useState } from "react";

export function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
export function calendarDays(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  return [
    ...Array(offset).fill(null),
    ...Array.from(
      { length: new Date(year, month + 1, 0).getDate() },
      (_, index) => index + 1,
    ),
  ];
}

export default function Calendar({ events = [], today = new Date() }) {
  const [display, setDisplay] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selected, setSelected] = useState(
    dateKey(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const { year, month } = display;
  const heading = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
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
  function moveMonth(change) {
    const next = new Date(year, month + change, 1);
    setDisplay({ year: next.getFullYear(), month: next.getMonth() });
    setSelected(dateKey(next.getFullYear(), next.getMonth(), 1));
  }
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
