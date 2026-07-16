"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import * as React from "react";

type Theme = "light" | "dark";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function read(): Theme {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    let stored: Theme | null = null;
    try {
      stored = localStorage.getItem("theme") as Theme | null;
    } catch {}
    if (!stored) {
      apply("dark");
    } else {
      apply(stored);
    }
  }, []);

  return <>{children}</>;
}

export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>("dark");

  React.useEffect(() => {
    setThemeState(read());
  }, []);

  const setTheme = (t: Theme) => {
    apply(t);
    setThemeState(t);
  };

  return {
    theme,
    setTheme,
    toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
  };
}
