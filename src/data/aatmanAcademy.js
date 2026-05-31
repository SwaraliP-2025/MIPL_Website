/** Content & images from https://aatmanacademy.org/ — files in public/social-activities/aatman/ */

const AATMAN_IMG = "/social-activities/aatman";

export const aatmanHero = {
  tagline: "A place where everyone belongs.",
  title: "Aatman Academy",
  headline: "Inclusive school for children with learning differences & disabilities",
  website: "https://aatmanacademy.org/",
  email: "info@aatmanacademy.org",
  phone: "98696 87073",
};

export const aatmanHighlights = [
  { value: "180+", label: "SSC board completions" },
  { value: "1,000+", label: "Cases through AALAP" },
  { value: "10,000+", label: "Educators trained via AART" },
  { value: "Top 10", label: "National institutions for diverse learners" },
];

export const aatmanLeadStory = {
  category: "Inclusive education",
  headline: "Nurturing potential. Celebrating differences.",
  body: "Aatman Academy is among the top 10 institutions nationally serving children with varied diversities. Registered under the Divyang Ayuktalay, Government of Maharashtra (Rights of PWD Act, 2016), the school offers a safe place where differently-abled children learn without discrimination — with mindful education, therapy, and pathways to board exams.",
  image: `${AATMAN_IMG}/gallery-students-01.jpg`,
  imageAlt: "Students at Aatman Academy",
  link: aatmanHero.website,
  linkLabel: "Explore aatmanacademy.org",
};

export const aatmanStories = [
  {
    category: "Occupational therapy",
    headline: "Building focus, coordination, and independence",
    body: "Occupational therapy at Aatman helps learners strengthen focus, coordination, and functional independence — supporting daily skills alongside classroom learning so children with special needs can participate fully in school life.",
    image: `${AATMAN_IMG}/learning-program.jpeg`,
    imageAlt: "Aatman learning program and occupational therapy",
    link: aatmanHero.website,
  },
  {
    category: "Classroom life",
    headline: "Mindful education — Me Time",
    body: "The academy’s mindful approach gives each child space to reflect, regulate, and learn at their own pace. Me Time is part of a curriculum designed for children who think and learn differently — not a one-size-fits-all classroom.",
    image: `${AATMAN_IMG}/gallery-classroom-01.jpg`,
    imageAlt: "Inclusive classroom at Aatman Academy",
    link: aatmanHero.website,
  },
  {
    category: "National recognition",
    headline: "Ranked among India’s leading inclusive schools",
    body: "Aatman’s work with children with disabilities has earned national visibility — including Education World rankings and recognition as a Great Place to Work, reflecting a culture where educators and learners thrive together.",
    image: `${AATMAN_IMG}/education-rankings.png`,
    imageAlt: "Education World rankings — Aatman Academy",
    link: aatmanHero.website,
  },
  {
    category: "Learning in action",
    headline: "Experiment. Explore. Learn.",
    body: "Hands-on learning, exploration, and joy in the classroom — so much to learn, so much fun. Aatman balances academics with activities that build confidence, values, and participation in extracurricular life.",
    image: `${AATMAN_IMG}/gallery-activities-01.jpg`,
    imageAlt: "Students learning through activities at Aatman",
    link: aatmanHero.website,
  },
  {
    category: "15-year report card",
    headline: "Impact that families can measure",
    body: "Over 180 children have successfully completed the SSC board through Aatman. More than 1,000 individual learners have been supported through AALAP, and 10,000+ teachers, principals, and parents trained through AART — extending inclusion beyond one campus.",
    image: `${AATMAN_IMG}/gallery-students-05.jpg`,
    imageAlt: "Aatman Academy students and community",
    link: aatmanHero.website,
  },
  {
    category: "CHILD course",
    headline: "Training inclusive education practitioners nationwide",
    body: "Aatman conducts CHILD — Certificate in Holistic Inclusion of Learners with Diversities — a virtual course under guidance of ICI, University of Minnesota, for educators who want to become inclusive education practitioners.",
    image: `${AATMAN_IMG}/child-poster-1.jpeg`,
    imageAlt: "CHILD course on inclusive education",
    link: "https://aatmanacademy.org/child/about-child/",
    linkLabel: "About CHILD course",
  },
  {
    category: "Aatman Educational Society",
    headline: "AAVA, AADI, iSEAD & outreach",
    body: "Beyond the academy, the society runs AAVA, AADI, iSEAD, and teacher-training through AART — spreading inclusive practices, research, and support for families navigating learning differences across India.",
    image: `${AATMAN_IMG}/isead-poster-1.jpeg`,
    imageAlt: "iSEAD program at Aatman Educational Society",
    link: aatmanHero.website,
  },
];

export const aatmanPhotoGrid = [
  { image: `${AATMAN_IMG}/gallery-students-02.jpg`, alt: "Students at Aatman", caption: "Campus life" },
  { image: `${AATMAN_IMG}/gallery-students-03.jpg`, alt: "Inclusive learning", caption: "Learning together" },
  { image: `${AATMAN_IMG}/gallery-students-06.jpg`, alt: "School community", caption: "Community" },
  { image: `${AATMAN_IMG}/gallery-classroom-02.jpg`, alt: "Classroom activities", caption: "Classroom" },
];

/** Extra mosaic from official gallery page */
export const aatmanGalleryMosaic = [
  { image: `${AATMAN_IMG}/gallery-students-04.jpg`, alt: "Aatman Academy students", label: "Students" },
  { image: `${AATMAN_IMG}/gallery-students-07.jpg`, alt: "Inclusive education", label: "Inclusion" },
  { image: `${AATMAN_IMG}/gallery-students-08.jpg`, alt: "School activities", label: "Activities" },
  { image: `${AATMAN_IMG}/gallery-activities-02.jpg`, alt: "Learning activities", label: "Explore & learn" },
  { image: `${AATMAN_IMG}/campus-community.jpeg`, alt: "Aatman campus", label: "Campus", span: "md:col-span-2" },
  { image: `${AATMAN_IMG}/philosophy-underpinnings.jpg`, alt: "Six foundations of learning", label: "Philosophy" },
  { image: `${AATMAN_IMG}/aadi-poster.jpeg`, alt: "AADI program", label: "AADI" },
  { image: `${AATMAN_IMG}/gptw-poster.jpg`, alt: "Great Place to Work", label: "Recognition" },
];
