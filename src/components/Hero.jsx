import { profile, sheets } from "../data/content";
import Figure from "./Figure";

export default function Hero({ onOpen }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <p className="kicker mono">{profile.kicker}</p>
          <h1>{profile.name}</h1>
          <p className="lede">{profile.summary}</p>
          <div className="hero-links">
            <a className="btn btn-primary" href="#LV-01">View work</a>
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
            <a className="btn" href={profile.portfolioPdf} download>PDF portfolio</a>
          </div>
          <p className="hero-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span aria-hidden="true">·</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </div>
        <Figure
          className="hero-fig"
          src={profile.heroImage.src}
          label={profile.heroImage.label}
          caption={profile.heroImage.caption}
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
            <dt className="mono">Available</dt>
            <dd>{profile.available}</dd>
          </div>
          <div>
            <dt className="mono">Sheets</dt>
            <dd>{sheets.length}</dd>
          </div>
        </dl>

        <ol className="index" aria-label="Projects">
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
