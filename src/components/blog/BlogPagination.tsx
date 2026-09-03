import Link from "next/link";
import { url } from "@/lib/config";

export function BlogPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (n: number) => (n <= 1 ? url("blog") : url(`blog/page/${n}`));

  return (
    <nav className="blog-pagination" aria-label="Blog pages">
      {page > 1 ? (
        <Link className="blog-page-link" href={hrefFor(page - 1)} rel="prev">
          Previous
        </Link>
      ) : (
        <span className="blog-page-link is-disabled">Previous</span>
      )}

      <ol>
        {Array.from({ length: totalPages }, (_, index) => {
          const n = index + 1;
          const active = n === page;
          return (
            <li key={n}>
              {active ? (
                <span className="blog-page-num is-active" aria-current="page">
                  {n}
                </span>
              ) : (
                <Link className="blog-page-num" href={hrefFor(n)}>
                  {n}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {page < totalPages ? (
        <Link className="blog-page-link" href={hrefFor(page + 1)} rel="next">
          Next
        </Link>
      ) : (
        <span className="blog-page-link is-disabled">Next</span>
      )}
    </nav>
  );
}
