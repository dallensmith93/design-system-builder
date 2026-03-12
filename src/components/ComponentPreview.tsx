import type { CSSProperties } from "react";
import type { TokenMap } from "../engine/tokenEngine";

type ComponentPreviewProps = {
  cssVars: TokenMap;
  cssText: string;
};

export default function ComponentPreview({ cssVars, cssText }: ComponentPreviewProps) {
  const style = cssVars as CSSProperties;

  return (
    <section className="panel preview-panel" style={style}>
      <h2>Component Preview</h2>

      <article className="preview-card">
        <h3>Tokenized Card</h3>
        <p>Spacing, colors, and radius update from your tokens.</p>
        <div className="actions">
          <button type="button" className="btn-primary">Primary</button>
          <button type="button" className="btn-secondary">Secondary</button>
        </div>
      </article>

      <label className="preview-input">
        Input
        <input type="text" readOnly value="Preview Field" />
      </label>

      <details>
        <summary>Generated Theme CSS</summary>
        <pre>{cssText}</pre>
      </details>
    </section>
  );
}