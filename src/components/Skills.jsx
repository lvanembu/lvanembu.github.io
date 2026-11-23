import { skills, leadership, profile } from "../data/content";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="wrap skills-grid">
        <div>
          <h2>Skills</h2>
          <dl className="skill-list">
            {skills.map((s) => (
              <div key={s.category}>
                <dt className="mono">{s.category}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>Leadership</h2>
          <ul className="lead-list">
            {leadership.map((l) => (
              <li key={l.role}>
                <strong>{l.role}.</strong> {l.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="wrap footer" id="contact">
        <p className="mono kicker">Available full-time, June 2027</p>
        <p className="footer-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span aria-hidden="true">·</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedinLabel}</a>
          <span aria-hidden="true">·</span>
          <a href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
          <span aria-hidden="true">·</span>
          <a href={profile.portfolioPdf} download>PDF portfolio</a>
        </p>
      </footer>
    </section>
  );
}
