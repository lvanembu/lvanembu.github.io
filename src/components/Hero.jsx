import { profile, sheets } from "../data/content";
import Figure from "./Figure";

export default function Hero({ onOpen }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <div className="kicker mono">{profile.kicker}</div>
          <h1>{profile.name}</h1>
          <p className="lede">{profile.summary}</p>
          <div className="hero-links">
            <a className="btn btn-primary" href="#LV-01">View work</a>
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
            <a className="btn" href={profile.portfolioPdf} download>PDF portfolio</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
        <Figure
          className="hero-fig"
          src={profile.heroImage.src}
          label="FIG. 0"
          caption={profile.heroImage.caption.replace(/^FIG\. 0\s*/, "")}
          onOpen={onOpen}
          eager
        />
      </div>

      <div className="wrap">
        <dl className="facts">
          {profile.facts.map((f) => (
            <div key={f.label}>
              <dt className="mono">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
          <div>
            <dt className="mono">Sheets</dt>
            <dd>{sheets.length}</dd>
          </div>
        </dl>

        <ol className="index">
          {sheets.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                <span className="mono index-id">{s.id}</span>
                <span className="index-title">{s.title}</span>
                <span className="mono index-tag">{s.shortTag}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
