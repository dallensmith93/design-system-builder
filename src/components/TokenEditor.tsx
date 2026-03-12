type TokenEditorProps = {
  source: string;
  theme: "light" | "dark" | "brand";
  errors: string[];
  onChangeSource: (next: string) => void;
  onChangeTheme: (theme: "light" | "dark" | "brand") => void;
};

export default function TokenEditor({
  source,
  theme,
  errors,
  onChangeSource,
  onChangeTheme,
}: TokenEditorProps) {
  return (
    <section className="panel token-editor">
      <div className="editor-head">
        <h2>Token Editor</h2>
        <label>
          Theme
          <select value={theme} onChange={(event) => onChangeTheme(event.target.value as "light" | "dark" | "brand")}>
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="brand">brand</option>
          </select>
        </label>
      </div>

      <textarea
        value={source}
        onChange={(event) => onChangeSource(event.target.value)}
        spellCheck={false}
        aria-label="Design token source editor"
      />

      {errors.length > 0 ? (
        <ul className="error-list">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : (
        <p className="hint">Tokens valid.</p>
      )}
    </section>
  );
}