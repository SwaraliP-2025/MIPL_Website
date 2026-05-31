export const publicationArticles = [];

export const getPublicationArticleBySlug = (slug) =>
  publicationArticles.find((a) => a.slug === slug);
