import sizes from "../data/imageSizes.json";

export default function Figure({ src, label, caption, onOpen, className = "", eager = false }) {
  const [width, height] = sizes[src] || [];
  return (
    <figure className={`fig ${className}`}>
      <button
        type="button"
        className="fig-btn"
        onClick={() => onOpen(src)}
        aria-label={`Enlarge ${label}: ${caption}`}
      >
        <img
          src={src}
          alt={caption}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </button>
      <figcaption>
        <span className="mono fig-label">{label}</span> {caption}
      </figcaption>
    </figure>
  );
}
