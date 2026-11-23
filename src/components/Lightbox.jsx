import { useEffect, useRef } from "react";

// Full-screen viewer. `items` is every figure on the page in order; arrow keys step through them.
export default function Lightbox({ items, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onChange, onClose]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!item) return null;

  const step = (d) => (e) => {
    e.stopPropagation();
    onChange((index + d + items.length) % items.length);
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.label} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} />
        <figcaption>
          <span className="mono fig-label">
            {item.sheet ? `${item.sheet} · ` : ""}
            {item.label}
          </span>{" "}
          {item.caption}
        </figcaption>
      </figure>
      <button type="button" className="lb-nav lb-prev" onClick={step(-1)} aria-label="Previous figure">‹</button>
      <button type="button" className="lb-nav lb-next" onClick={step(1)} aria-label="Next figure">›</button>
      <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
