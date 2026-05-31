import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ScrollFloat } from "@/components/ScrollFloat";

/** Image box: full image visible, no crop */
const ImageFrame = ({ src, alt, imagePosition = "center center", className = "" }) => (
  <div className={`flex items-center justify-center bg-[#f1f5f9] p-2 md:p-4 ${className}`}>
    <img
      src={src}
      alt={alt}
      className="max-h-full max-w-full object-contain"
      style={{ objectPosition: imagePosition }}
      loading="lazy"
    />
  </div>
);

export const EditorialStory = ({
  category,
  headline,
  body,
  image,
  imageAlt,
  imagePosition = "center center",
  link,
  linkLabel = "Read more",
  reverse = false,
  strength = 40,
  featured = false,
}) => {
  if (featured) {
    return (
      <ScrollFloat strength={strength} className="mb-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden border border-slate-200 bg-white"
        >
          <ImageFrame
            src={image}
            alt={imageAlt}
            imagePosition={imagePosition}
            className="min-h-[280px] w-full md:min-h-[420px]"
          />
          <div className="border-t border-slate-200 p-6 md:p-10 lg:p-12">
            {category ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#E9863C]">
                {category}
              </p>
            ) : null}
            <h3 className="font-serif text-3xl font-bold leading-tight text-[#0f172a] md:text-4xl lg:text-5xl">
              {headline}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{body}</p>
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E9863C] hover:underline"
              >
                {linkLabel}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </motion.article>
      </ScrollFloat>
    );
  }

  return (
    <ScrollFloat strength={strength}>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid items-stretch gap-6 border-b border-slate-200 py-12 last:border-b-0 lg:grid-cols-2 lg:gap-10"
      >
        <ImageFrame
          src={image}
          alt={imageAlt}
          imagePosition={imagePosition}
          className={`min-h-[260px] lg:min-h-[320px] ${reverse ? "lg:order-2" : ""}`}
        />
        <div className={`flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
          {category ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#E9863C]">
              {category}
            </p>
          ) : null}
          <h3 className="font-serif text-2xl font-bold leading-snug text-[#0f172a] md:text-3xl">
            {headline}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">{body}</p>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f172a] hover:text-[#E9863C]"
            >
              {linkLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </motion.article>
    </ScrollFloat>
  );
};

export const EditorialPhotoGrid = ({ title, photos }) => (
  <section className="border-t border-slate-200 bg-[#f8fafc] px-6 py-14 md:px-10 lg:px-14">
    <div className="mx-auto max-w-6xl">
      {title ? (
        <h3 className="mb-8 text-center text-xl font-black text-[#0f172a] md:text-2xl">{title}</h3>
      ) : null}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {photos.map((photo, index) => (
          <ScrollFloat key={`${photo.image}-${index}`} strength={22 + index * 2}>
            <figure className="overflow-hidden border border-slate-200 bg-[#f1f5f9]">
              <div className="flex aspect-square items-center justify-center p-2 md:p-3">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="max-h-full max-w-full object-contain"
                  style={photo.imagePosition ? { objectPosition: photo.imagePosition } : undefined}
                  loading="lazy"
                />
              </div>
              {photo.caption ? (
                <figcaption className="border-t border-slate-200 bg-white px-2 py-2 text-center text-xs font-medium text-slate-600">
                  {photo.caption}
                </figcaption>
              ) : null}
            </figure>
          </ScrollFloat>
        ))}
      </div>
    </div>
  </section>
);
