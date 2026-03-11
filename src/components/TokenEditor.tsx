type TokenEditorProps = {
  source: string;
  onChangeSource: (next: string) => void;
  errors: string[];
};

export default function TokenEditor({ source, onChangeSource, errors }: TokenEditorProps) {
  return (
    <section className="panel token-editor">
      <h2>Token Editor</h2>
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
        <p className="hint">Token syntax valid.</p>
      )}
    </section>
  );
}
