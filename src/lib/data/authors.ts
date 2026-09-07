export interface SiteAuthor {
  slug: string;
  name: string;
  role: string;
  bio: string;
  linkedIn?: string;
  wikipediaUserPage?: string;
}

/** Person-level authors. Add named editors here when they consent to be listed. */
export const authors: Record<string, SiteAuthor> = {
  "editorial-team": {
    slug: "editorial-team",
    name: "Editorial Team",
    role: "Wikipedia Studio editors",
    bio: "Assessments, source dossiers, neutral drafts, and disclosed submissions are produced by our research and article editors under dual review. Named personal bylines are published when individual editors consent to be listed publicly.",
  },
};

export const DEFAULT_AUTHOR_SLUG = "editorial-team";

export function getAuthor(slug?: string | null): SiteAuthor {
  if (slug && authors[slug]) return authors[slug];
  return authors[DEFAULT_AUTHOR_SLUG];
}

export function getAllAuthors(): SiteAuthor[] {
  return Object.values(authors);
}
