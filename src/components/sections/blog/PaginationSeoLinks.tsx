import { absUrl } from "@/lib/config";

/** Crawlable rel=prev/next hints (hoisted into <head> by React). Canonical stays in buildPageMetadata. */
export function PaginationSeoLinks({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const hrefFor = (n: number) => (n <= 1 ? absUrl("blog") : absUrl(`blog/page/${n}`));
  return (
    <>
      {page > 1 ? <link key="blog-prev" rel="prev" href={hrefFor(page - 1)} /> : null}
      {page < totalPages ? <link key="blog-next" rel="next" href={hrefFor(page + 1)} /> : null}
    </>
  );
}
