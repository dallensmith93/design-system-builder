import { useMemo, useState } from "react";
import ComponentPreview from "./components/ComponentPreview";
import TokenEditor from "./components/TokenEditor";
import {
  defaultTokenSource,
  generateThemeStyles,
  parseTokenSource,
  validateTokens,
  type ThemeName,
} from "./engine/tokenEngine";

export default function App() {
  const [source, setSource] = useState(defaultTokenSource);
  const [theme, setTheme] = useState<ThemeName>("light");

  const parsed = useMemo(() => parseTokenSource(source), [source]);
  const validation = useMemo(() => validateTokens(parsed.tokens), [parsed.tokens]);
  const styles = useMemo(() => generateThemeStyles(parsed.tokens, theme), [parsed.tokens, theme]);

  return (
    <main className="app-shell" data-theme={theme}>
      <header className="app-header">
        <h1>Design System Builder</h1>
        <p>Create and preview design tokens.</p>
      </header>

      <section className="workspace">
        <TokenEditor
          source={source}
          theme={theme}
          errors={[...parsed.errors, ...validation.errors]}
          onChangeSource={setSource}
          onChangeTheme={setTheme}
        />
        <ComponentPreview cssVars={styles.cssVars} cssText={styles.cssText} />
      </section>
    </main>
  );
}