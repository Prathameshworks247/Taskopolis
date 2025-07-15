// src/hooks/useTheme.ts
import { useLayoutEffect } from 'react';

export function useTheme() {
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const useDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    document.documentElement.classList.toggle('dark', useDark);
  }, []);
}
