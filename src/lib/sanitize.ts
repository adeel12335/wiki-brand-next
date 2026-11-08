import sanitizeHtml from "sanitize-html";

/**
 * Cleans CMS HTML (blog and portfolio bodies) before it is rendered with dangerouslySetInnerHTML.
 * Keeps normal article markup, drops scripts, event handlers, inline styles and javascript: links.
 */
export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "sup", "sub", "small", "mark",
      "ul", "ol", "li", "blockquote", "a", "code", "pre", "span",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
      "figure", "figcaption", "img",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      h2: ["id"],
      h3: ["id"],
      h4: ["id"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    transformTags: {
      // External links open safely; internal links stay as they are.
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        if (/^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?thewikipediastudio\.com/i.test(href)) {
          return { tagName, attribs: { ...attribs, rel: "noopener noreferrer", target: attribs.target ?? "_blank" } };
        }
        return { tagName, attribs };
      },
    },
  });
}
