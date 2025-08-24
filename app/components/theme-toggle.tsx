"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="fixed top-4 right-4 px-3 py-2 border border-border text-muted-foreground font-mono text-sm">
        <span className="opacity-0">[theme]</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 px-3 py-2 border border-border hover:border-primary transition-colors font-mono text-sm group"
      aria-label="Toggle theme"
    >
      <span className="text-accent group-hover:text-primary transition-colors">
        [{theme === "dark" ? "light" : "dark"}]
      </span>
    </button>
  );
}