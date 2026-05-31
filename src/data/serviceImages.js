import { projectImages } from "./projectImages";

/** Project-folder visuals for Services page */
export const serviceImageById = {
  cctv: projectImages.aurangabadSmartCity,
  biometrics: projectImages.hpclPanIndia,
  "intrusion-detection": projectImages.hpclPipeline,
  "command-control": projectImages.aurangabadSmartCity,
  "access-control": projectImages.hpclMumbai,
  ict: projectImages.iimBangalore,
  "smart-city": projectImages.nandedSafeCity,
  "cyber-security": projectImages.thanePolice,
  "oil-gas": projectImages.mrplFeatured,
  healthcare: projectImages.hiranandani2,
  judiciary: projectImages.mpHighCourt,
  "ai-iot": projectImages.kolhapurSafeCity,
};

export const editorialServiceImages = {
  consultancy: projectImages.nandedSafeCity,
  audits: projectImages.iimBangalore,
  safecity: projectImages.nandedSafeCity,
  smartcity: projectImages.aurangabadSmartCity,
  egov: projectImages.kolhapurCorp,
  training: "/sectrain.png",
};

export function getServiceImage(serviceId) {
  return serviceImageById[serviceId] || projectImages.aurangabadSmartCity;
}
