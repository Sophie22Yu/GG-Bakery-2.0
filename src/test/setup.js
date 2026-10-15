// Test helpers only: add assertions, clear rendered components between tests,
// and replace scrollTo because jsdom does not implement actual browser scrolling.
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
afterEach(cleanup);
window.scrollTo = vi.fn();
