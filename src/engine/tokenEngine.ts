export type TokenMap = Record<string, string>;

export type TokenParseResult = {
  tokens: TokenMap;
  errors: string[];
};

export function parseTokenSource(source: string): TokenParseResult {
  const tokens: TokenMap = {};
  const errors: string[] = [];

  const lines = source.split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) return;

    const match = trimmed.match(/^(--[a-z0-9-]+)\s*:\s*(.+?);?$/i);
    if (!match) {
      errors.push(`Line ${index + 1}: Invalid token format.`);
      return;
    }

    const name = match[1].trim();
    const value = match[2].trim();

    if (!value) {
      errors.push(`Line ${index + 1}: Missing token value.`);
      return;
    }

    tokens[name] = value;
  });

  return { tokens, errors };
}

export function tokenEngine(tokens: TokenMap): string {
  return Object.keys(tokens)
    .sort()
    .map((name) => `${name}: ${tokens[name]};`)
    .join("\n");
}

export function mergeTokens(base: TokenMap, overrides: TokenMap): TokenMap {
  return { ...base, ...overrides };
}
