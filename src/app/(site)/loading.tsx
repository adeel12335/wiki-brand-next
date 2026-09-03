/** Client-only route transition indicator — no crawlable "Loading…" copy in HTML. */
export default function SiteLoading() {
  return (
    <div className="route-loading" aria-hidden="true">
      <div className="route-loading-mark">
        <span>W</span>
      </div>
      <div className="route-loading-bar">
        <i />
      </div>
    </div>
  );
}
