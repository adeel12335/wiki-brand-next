export default function SiteLoading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <div className="route-loading-mark" aria-hidden="true">
        <span>W</span>
      </div>
      <p>Loading page</p>
      <div className="route-loading-bar" aria-hidden="true">
        <i />
      </div>
      <span className="sr-only">Loading the requested page…</span>
    </div>
  );
}
