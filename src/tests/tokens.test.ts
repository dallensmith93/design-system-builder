import { describe, expect, it } from "vitest";
import { parseTokenSource, tokenEngine } from "../engine/tokenEngine";
import { themeGenerator } from "../engine/themeGenerator";

describe("tokenEngine", () => {
  it("serializes tokens to css declarations", () => {
    const css = tokenEngine({ "--space-sm": "8px", "--radius-md": "12px" });
    expect(css).toContain("--space-sm: 8px;");
    expect(css).toContain("--radius-md: 12px;");
  });

  it("parses valid token source and reports invalid lines", () => {
    const parsed = parseTokenSource(`--space-sm: 8px;\nnot-valid\n--radius-md: 12px;`);

    expect(parsed.tokens["--space-sm"]).toBe("8px");
    expect(parsed.tokens["--radius-md"]).toBe("12px");
    expect(parsed.errors).toHaveLength(1);
  });
});

describe("themeGenerator", () => {
  it("merges custom tokens into selected theme", () => {
    const result = themeGenerator({ "--color-primary": "#ff0000" }, "dark");

    expect(result.cssVars["--color-primary"]).toBe("#ff0000");
    expect(result.cssText).toContain('[data-theme="dark"]');
  });
});
