import Figure from "./Figure";

export default function Sheet({ sheet, onOpen }) {
  return (
    <section className="sheet" id={sheet.id} aria-labelledby={`${sheet.id}-title`}>
      <div className="wrap">
        <div className="sheet-frame">
          <div className="title-block">
            <div className="tb-header mono">{sheet.header}</div>
            <div className="tb-dwg">
              <span className="mono">DWG NO.</span>
              <strong className="mono">{sheet.id}</strong>
            </div>
          </div>

          <h2 id={`${sheet.id}-title`}>{sheet.title}</h2>

          <div className="sheet-top">
            <table className="specs">
              <tbody>
                {sheet.specs.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td className="mono">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <aside className="sheet-side">
              {sheet.callout && (
                <div className="callout">
                  <div className="mono side-label">{sheet.callout.title}</div>
                  <p>{sheet.callout.text}</p>
                </div>
              )}
              {sheet.note && <p className="note">{sheet.note}</p>}
              <div className="mono side-label">Tools</div>
              <ul className="tools">
                {sheet.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </aside>
          </div>

          {sheet.intro && <p className="intro">{sheet.intro}</p>}

          {sheet.pipeline && (
            <div className="pipeline">
              <ol>
                {sheet.pipeline.steps.map(([name, detail], i) => (
                  <li key={name}>
                    <span className="mono step-no">Step {i + 1}</span>
                    <strong>{name}</strong>
                    <span className="step-detail">{detail}</span>
                  </li>
                ))}
              </ol>
              <p className="mono loop-note">↺ {sheet.pipeline.loopNote}</p>
            </div>
          )}

          {sheet.sections.map((sec, i) => (
            <div className="sheet-section" key={sec.heading || i}>
              {sec.heading && <h3>{sec.heading}</h3>}
              {sec.steps && (
                <dl className="steps">
                  {sec.steps.map(([k, v]) => (
                    <div key={k}>
                      <dt className="mono">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {sec.bullets && (
                <ul className="bullets">
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {sec.figures && (
                <div className={`figs figs-${Math.min(sec.figures.length, 3)}`}>
                  {sec.figures.map((f) => (
                    <Figure key={f.view} src={f.src} label={`VIEW ${f.view}`} caption={f.caption} onOpen={onOpen} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
