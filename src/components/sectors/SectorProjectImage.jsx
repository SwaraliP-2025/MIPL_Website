import { getImageLayoutForSrc } from "@/data/projectImages";

export const SectorProjectImage = ({
  src,
  alt,
  layout,
  objectPosition = "center center",
  className = "",
  imgClassName = "",
}) => {
  const fit = getImageLayoutForSrc(src, layout);
  const isContain = fit === "contain";

  return (
    <div
      className={`relative overflow-hidden ${isContain ? "bg-slate-50" : "bg-[#0f172a]"} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${
          isContain ? "object-contain object-center" : "object-cover object-center"
        } ${imgClassName}`}
        style={{ objectPosition }}
      />
    </div>
  );
};
