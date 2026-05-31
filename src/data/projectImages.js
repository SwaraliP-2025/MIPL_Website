/** Local images under public/projects/Projects — use instead of stock photos */

const P = (file) => `/projects/Projects/${file}`;

/** Files in public/projects/ root (not the Projects/ subfolder) */
const R = (file) => `/projects/${encodeURIComponent(file)}`;

export const projectImages = {
  aurangabadSmartCity: P("ASCDCL1.JPG"),
  aurangabadSafeCity: P("ASCDCL2.JPG"),
  nandedSafeCity: P("nanded-mnc1.jpg"),
  kolhapurSafeCity: P("kolhapur-mnc1.png"),
  kolhapurCorp: P("kolhapur-mnc2.png"),
  amravatiSafeCity: P("amravati-mnc1.png"),
  naviMumbai: P("navi-mumbai-mnc1.png"),
  gurgaon: P("gurgaon-mnc1.jpg"),
  thanePolice: R("Thane Police Office.jpg"),
  godhra: P("gujrat-police2.png"),
  bharuch: P("gujrat-police1.png"),

  hpclMumbai: P("hpcl-mumbai-refinery1.png"),
  hpclMumbai2: P("hpcl-mumbai-refinery2.png"),
  hpclPanIndia: P("hpcl1.png"),
  hpclLpg: P("HPCL-LBG-BPU1.png"),
  hpclPipeline: P("hpcl3.png"),
  hpclTrucks: P("hpcl2.png"),

  mrpl: P("MRPL1.png"),
  mrplFeatured: "/projects/mrpl-featured.png",
  nayara: P("nayara-energy1.png"),
  iocl: P("IOCL-bio-refinery-praj1.png"),
  adani: P("adani-power1.png"),
  privi: P("privi-organics1.png"),
  jnpt: P("JNPT1.jpg"),

  mpHighCourt: P("mp-high-court-jabalpur1.png"),
  vidhanBhavan: P("maharashtra-legislative-secretariat1.jpg"),
  iimBangalore: P("IIM-Bengaluru1.jpg"),

  suratDiamond: P("surat-diamon-bourse1.png"),
  bnpParibas: P("BNP-Paribas1.png"),
  ganjam: P("ganjam-jewellers1.png"),
  hiranandani: P("hiranandani-group1.png"),
  hiranandani2: P("hiranandani-group2.png"),
  hiranandani3: P("hiranandani-group3.png"),
  gujaratMaritime: P("gujrat-maritime-board1.png"),

  miplFounded: "/projects/mipl-founded-2000.jpg",
  awardIccc: "/awards/ICCC Awards3.png",

  chhatrapatiSmartBuses: "/projects/chhatrapati-sambhajinagar-buses.png",
  chhatrapatiSmartBusesTicketing: "/projects/chhatrapati-sambhajinagar-ticketing.png",
};

export const projectImageById = {
  1: projectImages.aurangabadSmartCity,
  2: projectImages.nayara,
  3: projectImages.mpHighCourt,
  4: projectImages.mrpl,
  5: projectImages.hpclMumbai,
  6: projectImages.suratDiamond,
  7: projectImages.iocl,
  8: projectImages.bnpParibas,
  9: projectImages.privi,
  10: projectImages.hpclLpg,
  11: projectImages.ganjam,
  12: projectImages.bharuch,
  13: projectImages.gujaratMaritime,
  14: projectImages.hiranandani,
  15: projectImages.adani,
  16: projectImages.hpclPanIndia,
  17: projectImages.hpclPipeline,
  18: projectImages.naviMumbai,
  19: projectImages.nandedSafeCity,
  20: projectImages.hpclTrucks,
  21: projectImages.hpclMumbai2,
  22: projectImages.kolhapurSafeCity,
  23: projectImages.amravatiSafeCity,
  24: projectImages.vidhanBhavan,
  25: projectImages.jnpt,
  26: projectImages.gurgaon,
  27: projectImages.iimBangalore,
  28: projectImages.godhra,
  29: projectImages.thanePolice,
  30: projectImages.aurangabadSafeCity,
};

export const projectImageLayoutById = {
  10: "contain",
  12: "contain",
  13: "contain",
  14: "contain",
  16: "contain",
  28: "contain",
};

const LOGO_IMAGE_PATTERN =
  /hpcl1\.png|gujrat-police|gujrat-maritime-board|hiranandani|bnp-paribas|ganjam-jewellers/i;

export function isLogoStyleImage(src) {
  return LOGO_IMAGE_PATTERN.test(String(src || ""));
}

export function resolveProjectImage(project) {
  const id = Number(project?.id);
  if (!Number.isNaN(id) && projectImageById[id]) return projectImageById[id];
  const img = project?.image;
  if (img && !String(img).includes("unsplash.com")) return img;
  return projectImageById[id] || img || "";
}

export function getProjectImageLayout(project) {
  if (project?.imageFit === "contain" || project?.imageFit === "cover") {
    return project.imageFit;
  }
  const id = Number(project?.id);
  if (!Number.isNaN(id) && projectImageLayoutById[id]) {
    return projectImageLayoutById[id];
  }
  return isLogoStyleImage(resolveProjectImage(project)) ? "contain" : "cover";
}

export function getImageLayoutForSrc(src, explicitLayout) {
  if (explicitLayout === "contain" || explicitLayout === "cover") return explicitLayout;
  return isLogoStyleImage(src) ? "contain" : "cover";
}

export function isTestProject(project) {
  const title = String(project?.title || "").trim().toLowerCase();
  return (
    title === "test" ||
    title.startsWith("test ") ||
    title.includes("test project") ||
    title === "testing"
  );
}
