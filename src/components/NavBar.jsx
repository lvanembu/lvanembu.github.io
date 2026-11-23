import { useEffect, useState } from "react";
import { profile, sheets } from "../data/content";

export default function NavBar() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const ids = [...sheets.map((s) => s.id), "skills"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="navbar" aria-label="Sections">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-name">{profile.name}</a>
        <div className="nav-links mono">
          {sheets.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""} title={s.title}>
              {s.id}
            </a>
          ))}
          <a href="#skills" className={active === "skills" ? "active" : ""}>Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
