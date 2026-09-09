import { createContext, useContext, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

export type ThemeName = "light" | "dark";

export interface ThemeTokens {
  bg: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
}

const darkTokens: ThemeTokens = {
  bg: "#08080d",
  surface: "#18181b",
  border: "#27272a",
  text: "#fafafa",
  textMuted: "#a1a1aa",
  primary: "#f43f5e",
};

const lightTokens: ThemeTokens = {
  bg: "#f7f5f2",
  surface: "#ffffff",
  border: "#e4e4e7",
  text: "#18181b",
  textMuted: "#71717a",
  primary: "#e11d48",
};

export interface ThemeToggleOrigin {
  clientX: number;
  clientY: number;
}

interface ThemeContextValue {
  theme: ThemeTokens;
  dark: boolean;
  setDark: (dark: boolean) => void;
  toggle: (origin?: ThemeToggleOrigin) => void;
}

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readTheme(): ThemeName {
  if (document.documentElement.classList.contains("light")) return "light";
  if (document.documentElement.classList.contains("dark")) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(name: ThemeName) {
  document.documentElement.classList.toggle("dark", name === "dark");
  document.documentElement.classList.toggle("light", name === "light");
  document.documentElement.style.colorScheme = name;
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", name === "dark" ? darkTokens.bg : lightTokens.bg);
  localStorage.setItem("theme", name);
}

function startThemeTransition(update: () => void): ViewTransition | null {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => ViewTransition;
  };
  if (typeof doc.startViewTransition !== "function") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  return doc.startViewTransition(update);
}

function circleFrom(origin: ThemeToggleOrigin) {
  const x = origin.clientX;
  const y = origin.clientY;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  return { x, y, radius };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDarkState] = useState(() => readTheme() === "dark");
  const darkRef = useRef(dark);
  const busyRef = useRef(false);
  darkRef.current = dark;

  const commit = (next: boolean) => {
    applyTheme(next ? "dark" : "light");
    flushSync(() => setDarkState(next));
  };

  const setDark = (next: boolean) => {
    if (next === darkRef.current) return;
    commit(next);
  };

  const toggle = (origin?: ThemeToggleOrigin) => {
    if (busyRef.current) return;
    const next = !darkRef.current;
    const apply = () => commit(next);

    if (!origin) {
      apply();
      return;
    }

    const transition = startThemeTransition(apply);
    if (!transition) {
      apply();
      return;
    }

    const { x, y, radius } = circleFrom(origin);
    busyRef.current = true;
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 620,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => undefined);
    transition.finished.finally(() => {
      busyRef.current = false;
    });
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: dark ? darkTokens : lightTokens,
      dark,
      setDark,
      toggle,
    }),
    [dark],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div style={{ background: value.theme.bg, color: value.theme.text, minHeight: "100vh" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
