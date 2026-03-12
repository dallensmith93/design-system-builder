import { describe, expect, it } from "vitest";
import {
  generateThemeStyles,
  parseTokenSource,
  validateTokens,
} from "../engine/tokenEngine";

describe("tokenEngine", () => {
  it("parses valid token lines", () => {
    const parsed = parseTokenSource(`--color-bg: #ffffff;\n--radius-md: 12px;`);

    expect(parsed.errors).toHaveLength(0);
    expect(parsed.tokens["--color-bg"]).toBe("#ffffff");
    expect(parsed.tokens["--radius-md"]).toBe("12px");
  });

  it("reports invalid token lines", () => {
    const parsed = parseTokenSource(`--color-bg: #ffffff;\nbad line`);

    expect(parsed.errors).toHaveLength(1);
  });

  it("validates required tokens", () => {
    const validation = validateTokens({ "--color-bg": "#fff" });

    expect(validation.valid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  it("generates theme css and merged vars", () => {
    const generated = generateThemeStyles({ "--color-primary": "#ff0000" }, "dark");

    expect(generated.cssVars["--color-primary"]).toBe("#ff0000");
    expect(generated.cssText).toContain('[data-theme="dark"]');
  });
});