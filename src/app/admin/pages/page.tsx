import Link from "next/link";
import { editablePages } from "@/config/page-heroes";
import { getAllPageHeroes, type HeroStyle } from "@/lib/page-hero";

export const dynamic = "force-dynamic";

const STYLE_LABEL: Record<HeroStyle, string> = {
  default: "Designed hero",
  split: "Side image",
  background: "Background image",
  simple: "Text only",
};

export default async function AdminPagesList() {
  let heroes: Awaited<ReturnType<typeof getAllPageHeroes>> = {};
  let dbError = false;
  try {
    heroes = await getAllPageHeroes();
  } catch {
    dbError = true;
  }
  const groups = [...new Set(editablePages.map((p) => p.group))];
  const customised = Object.keys(heroes).length;

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Website</p>
          <h1>Pages</h1>
          <p>Change each page&apos;s hero: style, heading, text, buttons, side image and background image.</p>
        </div>
      </div>

      {dbError ? <p className="admin-error">Could not reach the database. Check MONGODB_URI and that MongoDB is running.</p> : null}

      <div className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat-label">Pages</span>
          <span className="admin-stat-value">{editablePages.length}</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat-label">Custom heroes</span>
          <span className="admin-stat-value">{customised}</span>
          <span className="admin-stat-hint">The rest use their designed hero</span>
        </div>
      </div>

      {groups.map((group) => (
        <section key={group} className="admin-card" style={{ marginTop: 20 }}>
          <h2>{group}</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Hero</th>
                  <th>Background image</th>
                  <th>Editable</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {editablePages
                  .filter((p) => p.group === group)
                  .map((p) => {
                    const h = heroes[p.key];
                    return (
                      <tr key={p.key}>
                        <td>
                          <Link href={`/admin/pages/${p.key}/`}>{p.label}</Link>
                          <small>{p.path}</small>
                        </td>
                        <td>
                          <span className={`admin-pill ${h && h.style !== "default" ? "live" : "draft"}`}>{STYLE_LABEL[h?.style ?? "default"]}</span>
                        </td>
                        <td>{h?.backgroundImage ? <span className="admin-pill live">Set</span> : <span className="admin-pill draft">None</span>}</td>
                        <td>
                          <small>{p.mode === "full" ? "Style, text, images" : "Background image only"}</small>
                        </td>
                        <td>
                          <Link className="admin-btn ghost" href={`/admin/pages/${p.key}/`}>
                            Edit hero
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
}
