import { renderToStaticMarkup } from "react-dom/server";
import { createElement, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

const captured = vi.hoisted(() => ({
  props: null as Record<string, unknown> | null,
  history: [] as Record<string, unknown>[],
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children?: ReactNode }) => children,
  motion: {
    div: ({ children, ...props }: { children?: ReactNode; [key: string]: unknown }) => {
      captured.props = props;
      captured.history.push(props);
      return children;
    },
  },
}));

import { AnimatedPage } from "./AnimatedPage";

describe("AnimatedPage reduced-motion integration", () => {
  it("passes the zero-duration and no-enter-exit branch to the actual motion container", () => {
    captured.history = [];
    renderToStaticMarkup(
      createElement(
        AnimatedPage,
        { location: "/game", reduceMotion: true },
        createElement("span", undefined, "星際冒險"),
      ),
    );

    expect(captured.props).toMatchObject({
      initial: false,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    });
    expect(captured.props?.exit).toBeUndefined();
  });

  it("keeps the no-motion branch across a hall-to-game route change", () => {
    captured.history = [];

    renderToStaticMarkup(createElement(AnimatedPage, { location: "/hall", reduceMotion: true }, "大廳"));
    renderToStaticMarkup(createElement(AnimatedPage, { location: "/game", reduceMotion: true }, "星際冒險"));

    expect(captured.history).toEqual([
      expect.objectContaining({ "data-page-route": "/hall", initial: false, exit: undefined, transition: { duration: 0 } }),
      expect.objectContaining({ "data-page-route": "/game", initial: false, exit: undefined, transition: { duration: 0 } }),
    ]);
  });
});
