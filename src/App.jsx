import { useCallback, useMemo, useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Sheet from "./components/Sheet";
import Skills from "./components/Skills";
import Lightbox from "./components/Lightbox";
import { profile, sheets } from "./data/content";
import "./App.css";

// Every figure on the page, in reading order, for the lightbox's previous/next.
function collectFigures() {
  const list = [{ src: profile.heroImage.src, label: profile.heroImage.label, caption: profile.heroImage.caption }];
  sheets.forEach((s) =>
    s.sections.forEach((sec) =>
      (sec.figures || []).forEach((f) => list.push({ src: f.src, label: `VIEW ${f.view}`, caption: f.caption, sheet: s.id }))
    )
  );
  return list;
}

export default function App() {
  const figures = useMemo(collectFigures, []);
  const [index, setIndex] = useState(null);
  const openBySrc = useCallback((src) => setIndex(figures.findIndex((f) => f.src === src)), [figures]);
  const close = useCallback(() => setIndex(null), []);

  return (
    <>
      <a className="skip-link" href="#LV-01">Skip to work</a>
      <NavBar />
      <main>
        <Hero onOpen={openBySrc} />
        {sheets.map((s) => (
          <Sheet key={s.id} sheet={s} onOpen={openBySrc} />
        ))}
        <Skills />
      </main>
      <Lightbox items={figures} index={index} onChange={setIndex} onClose={close} />
    </>
  );
}
