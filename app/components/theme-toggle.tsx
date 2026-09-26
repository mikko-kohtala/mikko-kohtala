"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// Server snapshot is false, client snapshot is true: renders the placeholder until hydrated.
const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button className="fixed top-4 right-4 border border-border px-3 py-2 font-mono text-sm text-muted-foreground">
        <span className="opacity-0">[theme]</span>
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      className="group fixed top-4 right-4 border border-border px-3 py-2 font-mono text-sm transition-colors hover:border-primary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <span className="text-accent transition-colors group-hover:text-primary">
        [{theme === "dark" ? "light" : "dark"}]
      </span>
    </button>
  );
}
