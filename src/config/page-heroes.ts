import { services, serviceSlugs } from "@/lib/data";

/**
 * Pages whose hero can be edited in Admin → Pages.
 *
 * mode "full"        → every style can be chosen (side image, background image, text only) or the designed hero kept.
 * mode "background"  → the designed hero stays (it holds a form, quiz, tabs or search), only its background image changes.
 */
export type HeroEditMode = "full" | "background";

export interface EditablePage {
  key: string;
  label: string;
  path: string;
  group: "Main" | "Services" | "Who we help" | "Guides & tools" | "Legal";
  mode: HeroEditMode;
}

export const editablePages: EditablePage[] = [
  { key: "home", label: "Home", path: "/", group: "Main", mode: "full" },
  { key: "about-us", label: "About Us", path: "/about-us/", group: "Main", mode: "full" },
  { key: "services", label: "Services", path: "/services/", group: "Main", mode: "full" },
  { key: "our-process", label: "Our Process", path: "/process/", group: "Main", mode: "full" },
  { key: "pricing", label: "Pricing", path: "/wikipedia-page-cost/", group: "Main", mode: "background" },
  { key: "contact", label: "Contact", path: "/contact/", group: "Main", mode: "full" },
  { key: "thank-you", label: "Thank You", path: "/thank-you/", group: "Main", mode: "full" },
  { key: "case-studies", label: "Case Studies", path: "/case-studies/", group: "Main", mode: "full" },
  ...serviceSlugs.map((slug) => ({
    key: `service-${slug}`,
    label: services[slug].name,
    path: `/services/${slug}/`,
    group: "Services" as const,
    mode: "background" as const,
  })),
  { key: "persona-companies", label: "For Companies", path: "/wikipedia-page-for-companies/", group: "Who we help", mode: "background" },
  { key: "persona-authors", label: "For Authors", path: "/wikipedia-page-for-authors/", group: "Who we help", mode: "background" },
  { key: "persona-academics", label: "For Academics", path: "/wikipedia-page-for-academics/", group: "Who we help", mode: "background" },
  { key: "persona-musicians", label: "For Musicians", path: "/wikipedia-page-for-musicians/", group: "Who we help", mode: "background" },
  { key: "faq", label: "FAQ", path: "/faq/", group: "Guides & tools", mode: "background" },
  { key: "notability-checker", label: "Notability Checker", path: "/wikipedia-notability-checker/", group: "Guides & tools", mode: "background" },
  { key: "hire-wikipedia-writer", label: "Hire a Wikipedia Writer", path: "/hire-wikipedia-writer/", group: "Guides & tools", mode: "full" },
  { key: "how-to-choose-agency", label: "How to Choose an Agency", path: "/how-to-choose-wikipedia-agency/", group: "Guides & tools", mode: "full" },
  { key: "resources", label: "Resources", path: "/resources/", group: "Guides & tools", mode: "full" },
  { key: "sitemap", label: "HTML Sitemap", path: "/sitemap/", group: "Guides & tools", mode: "background" },
  { key: "privacy-policy", label: "Privacy Policy", path: "/privacy-policy/", group: "Legal", mode: "background" },
  { key: "terms-conditions", label: "Terms & Conditions", path: "/terms-conditions/", group: "Legal", mode: "background" },
];

export function getEditablePage(key: string): EditablePage | undefined {
  return editablePages.find((p) => p.key === key);
}
