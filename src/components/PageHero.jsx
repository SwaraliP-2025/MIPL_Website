import { motion } from "framer-motion";
import { ScrollFloat } from "@/components/ScrollFloat";

export const PageHero = ({
  eyebrow,
  title,
  description,
  image,
  imageFit = "cover",
  imagePosition = "center center",
  align = "left",
  minHeight = "min-h-[420px]",
  topChildren,
  children,
}) => {
  const isCentered = align === "center";

  return (
    <section className={`relative overflow-hidden bg-[#0f172a] ${minHeight}`}>
      <ScrollFloat strength={72} className="absolute inset-0">
        <div
          className="h-[115%] w-full bg-no-repeat"
          style={{
            backgroundImage: image ? `url("${image}")` : undefined,
            backgroundSize: imageFit === "contain" ? "contain" : "cover",
            backgroundPosition: imagePosition,
            backgroundColor: imageFit === "contain" ? "#f1f5f9" : undefined,
          }}
        />
      </ScrollFloat>
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/65 to-[#020617]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-[#0f172a]/10" />

      <div className="relative z-10 flex min-h-full items-end px-6 pb-14 pt-32 md:px-10 lg:px-14 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`${isCentered ? "mx-auto text-center" : ""} max-w-4xl`}
        >
          {topChildren ? <div className="mb-6">{topChildren}</div> : null}
          {eyebrow ? (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </motion.div>
      </div>
    </section>
  );
};
