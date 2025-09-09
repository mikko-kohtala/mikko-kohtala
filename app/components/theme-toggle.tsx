'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="fixed top-4 right-4 border border-border px-3 py-2 font-mono text-muted-foreground text-sm">
        <span className="opacity-0">[theme]</span>
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      className="group fixed top-4 right-4 border border-border px-3 py-2 font-mono text-sm transition-colors hover:border-primary"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="text-accent transition-colors group-hover:text-primary">
        [{theme === 'dark' ? 'light' : 'dark'}]
      </span>
    </button>
  );
}
