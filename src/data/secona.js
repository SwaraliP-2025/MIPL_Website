/** Content from https://www.secona.org/ — images in public/social-activities/secona/ */

const SECONA_IMG = "/social-activities/secona";

export const seconaHero = {
  title: "SECONA",
  subtitle: "Security Consultants' Association",
  website: "https://www.secona.org/",
  aboutUrl: "https://www.secona.org/About/",
  shieldAwardsUrl: "https://www.secona.org/Shield-Awards/",
};

export const seconaLeadStory = {
  category: "Industry trust",
  headline: "Raising standards across India's security technology sector",
  body: "Security Consultants' Association (SECONA) is a charitable trust registered under the Societies Registration Act, 1860 and the Mumbai Public Trusts' Act, 1950. Formed by security professionals — including MIPL's founders — it shares knowledge, runs free training, publishes guidance, and benchmarks excellence for the whole industry.",
  image: `${SECONA_IMG}/shield-awards-banner.jpg`,
  imageAlt: "SECONA Shield Awards for security technology excellence",
  link: seconaHero.aboutUrl,
  linkLabel: "About SECONA",
};

export const seconaStories = [
  {
    category: "Free training",
    headline: "Training for every link in the security chain",
    body: "SECONA undertakes free training sessions for security guards, end users, system integrators, and consultants — building skills and mindsets so technology is used appropriately across the industry.",
    image: `${SECONA_IMG}/initiative-1.jpg`,
    imageAlt: "SECONA security training initiative",
    link: seconaHero.website,
  },
  {
    category: "Public guidance",
    headline: "Free documents for schools and places of worship",
    body: "SECONA has published free guidance on applying security technology in social sectors — including educational institutions and religious premises — helping communities adopt sensible, practical protection.",
    image: `${SECONA_IMG}/initiative-3.jpg`,
    imageAlt: "SECONA guidance and outreach",
    link: seconaHero.website,
  },
  {
    category: "Shield Awards",
    headline: "Recognising excellence since 2015",
    body: "Since 2015, SECONA has instituted the Shield Awards for excellence in security technology — honouring individuals and organisations, promoting women in security, and encouraging young students to bring fresh talent into the field.",
    image: `${SECONA_IMG}/shield-awards-banner.jpg`,
    imageAlt: "SECONA Shield Awards ceremony",
    link: seconaHero.shieldAwardsUrl,
    linkLabel: "Shield Awards",
  },
  {
    category: "ASCM",
    headline: "Annual forum for consultants, OEMs & end users",
    body: "SECONA conducts ASCM — an annual event where security consultants, end users, and OEMs deliberate on issues that matter to the industry and on ways to raise awareness and standards in security technology.",
    image: `${SECONA_IMG}/shield-awards-banner.jpg`,
    imageAlt: "SECONA annual consultants meeting and industry forum",
    imagePosition: "center 40%",
    link: seconaHero.website,
  },
  {
    category: "About SECONA",
    headline: "India's platform for independent security consultants",
    body: "SECONA also advances structured learning through a|s|t|r|a — the Academy of Security Technology Training Research and Application — the first collaboration platform for independent security consultants in India.",
    image: `${SECONA_IMG}/about-feature.png`,
    imageAlt: "Security Consultants Association",
    link: seconaHero.website,
  },
];

export const seconaTrainingAudiences = [
  "Security guards",
  "End users",
  "System integrators",
  "Security consultants",
];

export const seconaPhotoGrid = [
  { image: `${SECONA_IMG}/initiative-1.jpg`, alt: "SECONA initiative", caption: "Training" },
  { image: `${SECONA_IMG}/initiative-2.jpg`, alt: "SECONA program", caption: "Industry" },
  { image: `${SECONA_IMG}/initiative-3.jpg`, alt: "SECONA outreach", caption: "Guidance" },
  { image: `${SECONA_IMG}/secona-logo.png`, alt: "SECONA logo", caption: "SECONA" },
];
