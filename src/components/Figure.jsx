export default function Figure({ src, label, caption, onOpen, className = "", eager = false }) {
  return (
    <figure className={`fig ${className}`}>
      <button
        type="button"
        className="fig-btn"
        onClick={() => onOpen({ src, label, caption })}
        aria-label={`Enlarge ${label}: ${caption}`}
      >
        <img src={src} alt={caption} loading={eager ? "eager" : "lazy"} />
      </button>
      <figcaption>
        <span className="mono fig-label">{label}</span> {caption}
      </figcaption>
    </figure>
  );
}
