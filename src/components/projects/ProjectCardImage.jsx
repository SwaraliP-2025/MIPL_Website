/**
 * Fills the card frame edge-to-edge while showing the entire image (no crop).
 * Blurred cover backdrop removes empty letterbox bars on logos/portraits.
 */
export const ProjectCardImage = ({ src, alt, className = "h-56 sm:h-64" }) => {
  if (!src) {
    return <div className={`bg-[#0f172a] ${className}`} aria-hidden />;
  }

  return (
  <div className={`relative overflow-hidden bg-[#0f172a] ${className}`}>
    <img
      src={src}
      alt=""
      aria-hidden
      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-lg"
    />
    <img
      src={src}
      alt={alt}
      className="relative z-10 h-full w-full max-h-full max-w-full object-contain object-center"
    />
  </div>
  );
};
