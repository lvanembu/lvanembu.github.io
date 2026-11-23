import { useEffect, useRef } from "react";

export default function Lightbox({ item, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.label} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} />
        <figcaption>
          <span className="mono fig-label">{item.label}</span> {item.caption}
        </figcaption>
      </figure>
      <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
