export type TokenMap = Record<string, string>;

export type TokenValidation = {
  valid: boolean;
  errors: string[];
};

export type ThemeName = "light" | "dark" | "brand";

export const defaultTokenSource = `--color-bg: #f8fafc;
--color-surface: #ffffff;
--color-text: #0f172a;
--color-primary: #2563eb;
--radius-md: 10px;
--space-md: 12px;
--font-size-base: 16px;`;

const baseThemes: Record<ThemeName, TokenMap> = {
  light: {
    "--color-bg": "#f8fafc",
    "--color-surface": "#ffffff",
    "--color-text": "#0f172a",
    "--color-primary": "#2563eb",
  },
  dark: {
    "--color-bg": "#0b1220",
    "--color-surface": "#111827",
    "--color-text": "#e2e8f0",
    "--color-primary": "#38bdf8",
  },
  brand: {
    "--color-bg": "#fdf2f8",
    "--color-surface": "#ffffff",
    "--color-text": "#4a044e",
    "--color-primary": "#db2777",
  },
};

export function parseTokenSource(source: string): { tokens: TokenMap; errors: string[] } {
  const tokens: TokenMap = {};
  const errors: string[] = [];

  source.split("\n").forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("#")) {
      return;
    }

    const match = trimmed.match(/^(--[a-z0-9-]+)\s*:\s*(.+?);?$/i);
    if (!match) {
      errors.push(`Line ${index + 1}: Invalid token format.`);
      return;
    }

    tokens[match[1]] = match[2].trim();
  });

  return { tokens, errors };
}

export function validateTokens(tokens: TokenMap): TokenValidation {
  const errors: string[] = [];

  if (!tokens["--color-bg"]) {
    errors.push("Missing required token --color-bg");
  }
  if (!tokens["--color-surface"]) {
    errors.push("Missing required token --color-surface");
  }
  if (!tokens["--color-text"]) {
    errors.push("Missing required token --color-text");
  }
  if (!tokens["--color-primary"]) {
    errors.push("Missing required token --color-primary");
  }

  return { valid: errors.length === 0, errors };
}

export function generateThemeStyles(tokens: TokenMap, theme: ThemeName): { cssText: string; cssVars: TokenMap } {
  const merged: TokenMap = { ...baseThemes[theme], ...tokens };
  const cssText = [
    `[data-theme="${theme}"] {`,
    ...Object.entries(merged)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, value]) => `  ${name}: ${value};`),
    `}`,
  ].join("\n");

  return { cssText, cssVars: merged };
}