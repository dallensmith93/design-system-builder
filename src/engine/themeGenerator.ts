import { mergeTokens, tokenEngine, type TokenMap } from "./tokenEngine";

export type ThemeName = "light" | "dark" | "brand";

const baseThemeTokens: Record<ThemeName, TokenMap> = {
  light: {
    "--color-bg": "#f8fafc",
    "--color-surface": "#ffffff",
    "--color-text": "#0f172a",
    "--color-primary": "#2563eb",
    "--radius-md": "10px",
    "--space-md": "12px",
  },
  dark: {
    "--color-bg": "#0b1220",
    "--color-surface": "#111827",
    "--color-text": "#e5e7eb",
    "--color-primary": "#38bdf8",
    "--radius-md": "10px",
    "--space-md": "12px",
  },
  brand: {
    "--color-bg": "#fdf2f8",
    "--color-surface": "#ffffff",
    "--color-text": "#4a044e",
    "--color-primary": "#db2777",
    "--radius-md": "12px",
    "--space-md": "12px",
  },
};

export function themeGenerator(tokens: TokenMap, themeName: ThemeName): { cssText: string; cssVars: TokenMap } {
  const merged = mergeTokens(baseThemeTokens[themeName], tokens);
  const cssText = `[data-theme="${themeName}"] {\n${indent(tokenEngine(merged))}\n}`;

  return {
    cssText,
    cssVars: merged,
  };
}

function indent(text: string): string {
  return text
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}
