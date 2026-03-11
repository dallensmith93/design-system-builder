import type { CSSProperties } from "react";
import type { TokenMap } from "../engine/tokenEngine";

type ComponentPreviewProps = {
  cssVars: TokenMap;
};

export default function ComponentPreview({ cssVars }: ComponentPreviewProps) {
  const style = cssVars as CSSProperties;

  return (
    <section className="panel preview-panel" style={style}>
      <h2>Component Preview</h2>

      <div className="preview-card">
        <h3>Card Title</h3>
        <p>Previewing tokenized spacing, radius, colors, and typography.</p>
        <div className="preview-actions">
          <button type="button" className="btn-primary">Primary Action</button>
          <button type="button" className="btn-secondary">Secondary</button>
        </div>
      </div>

      <label className="preview-field">
        Input
        <input type="text" value="Tokenized Input" readOnly />
      </label>

      <span className="preview-pill">Badge</span>
    </section>
  );
}
