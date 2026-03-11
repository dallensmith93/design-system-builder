import type { ThemeName } from "../engine/themeGenerator";

type ThemePanelProps = {
  theme: ThemeName;
  onChangeTheme: (theme: ThemeName) => void;
  cssText: string;
  tokenCount: number;
};

const themes: ThemeName[] = ["light", "dark", "brand"];

export default function ThemePanel({ theme, onChangeTheme, cssText, tokenCount }: ThemePanelProps) {
  return (
    <aside className="panel theme-panel">
      <h2>Theme Panel</h2>

      <label>
        Active Theme
        <select value={theme} onChange={(event) => onChangeTheme(event.target.value as ThemeName)}>
          {themes.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <p className="theme-meta">Resolved Tokens: {tokenCount}</p>

      <h3>Generated CSS</h3>
      <pre>{cssText}</pre>
    </aside>
  );
}
