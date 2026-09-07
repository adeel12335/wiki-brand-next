import { absUrl } from "@/lib/config";

/**
 * Hoisted into <head> by Next/React — crawlable pagination hints.
 * Canonical stays in buildPageMetadata (self-referencing per page).
 */
export function BlogPaginationSeoLinks({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (n: number) =>
    n <= 1 ? absUrl("blog") : absUrl(`blog/page/${n}`);

  return (
    <>
      {page > 1 ? <link key="blog-prev" rel="prev" href={hrefFor(page - 1)} /> : null}
      {page < totalPages ? (
        <link key="blog-next" rel="next" href={hrefFor(page + 1)} />
      ) : null}
    </>
  );
}
