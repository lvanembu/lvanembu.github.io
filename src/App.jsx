import { useCallback, useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Sheet from "./components/Sheet";
import Skills from "./components/Skills";
import Lightbox from "./components/Lightbox";
import { sheets } from "./data/content";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <NavBar />
      <main>
        <Hero onOpen={setOpen} />
        {sheets.map((s) => (
          <Sheet key={s.id} sheet={s} onOpen={setOpen} />
        ))}
        <Skills />
      </main>
      <Lightbox item={open} onClose={close} />
    </>
  );
}
