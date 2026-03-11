import { useMemo, useState } from "react";
import ComponentPreview from "./components/ComponentPreview";
import ThemePanel from "./components/ThemePanel";
import TokenEditor from "./components/TokenEditor";
import { parseTokenSource } from "./engine/tokenEngine";
import { themeGenerator, type ThemeName } from "./engine/themeGenerator";

const defaultTokenSource = `--color-primary: #2563eb;
--radius-md: 10px;
--space-md: 12px;
--font-size-md: 14px;`;

export default function App() {
  const [tokenSource, setTokenSource] = useState(defaultTokenSource);
  const [theme, setTheme] = useState<ThemeName>("light");

  const parsed = useMemo(() => parseTokenSource(tokenSource), [tokenSource]);
  const generated = useMemo(() => themeGenerator(parsed.tokens, theme), [parsed.tokens, theme]);

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="app-header">
        <h1>Design System Builder</h1>
        <p>Create tokens and preview component styles across themes.</p>
      </header>

      <main className="layout-grid">
        <TokenEditor source={tokenSource} onChangeSource={setTokenSource} errors={parsed.errors} />
        <ComponentPreview cssVars={generated.cssVars} />
        <ThemePanel
          theme={theme}
          onChangeTheme={setTheme}
          cssText={generated.cssText}
          tokenCount={Object.keys(generated.cssVars).length}
        />
      </main>
    </div>
  );
}
