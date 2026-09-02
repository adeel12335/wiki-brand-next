const ICONS: Record<string, string> = {
  "i-arrow": "M5 12h13M13 6l6 6-6 6",
  "i-page": "M6 3h8l4 4v14H6zM14 3v5h5M9 12h6M9 16h5",
  "i-shield": "M12 3l7 3v5c0 4.4-2.8 8.2-7 10-4.2-1.8-7-5.6-7-10V6zM9 12l2 2 4-5",
  "i-users":
    "M3.5 20v-2.2A4.8 4.8 0 018.3 13h1.4a4.8 4.8 0 014.8 4.8V20M15 5.5a3 3 0 010 5.7M16 13.3a4.8 4.8 0 014.5 4.8V20",
  "i-globe":
    "M3 12h18M12 3c2.6 2.5 4 5.5 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.5-4-9s1.4-6.5 4-9z",
  "i-building":
    "M4 21V9h7v12M11 21V3h9v18M2 21h20M14 7h3M14 11h3M14 15h3M7 13h1M7 17h1",
  "i-edit": "M4 20l4.4-1 10.8-10.8-3.4-3.4L5 15.6zM14.8 5.8l3.4 3.4M4 20h16",
  "i-search": "M15.5 15.5L21 21M7.5 8h6M7.5 11h4",
  "i-manage": "M4 18l4-5 4 2 5-7 3 2M4 4v16h16M17 4h3v3",
  "i-network":
    "M10.8 7.2L7.2 15.8M13.2 7.2l3.6 8.6M8.5 18h7",
  "i-research": "M10.5 9.5l3.8 5M10.8 7.5l4.2-.3M8 11v3",
  "i-plan": "M6 4h12v16H6zM9 2v4M15 2v4M9 11l2 2 4-5M9 17h6",
  "i-write": "M5 3h11l3 3v15H5zM16 3v4h4M8 11h8M8 15h6M8 19h4",
  "i-review": "M12 3l7 4v6c0 4-2.7 7.1-7 8-4.3-.9-7-4-7-8V7zM8.5 12l2.2 2.2 4.8-5",
  "i-publish": "M5 7h14v13H5zM8 4h8v3M9 12l3-3 3 3M12 9v7",
  "i-check": "M8 12l2.5 2.5L16 9",
  "i-menu": "M4 7h16M4 12h16M4 17h16",
  "i-close": "M6 6l12 12M18 6L6 18",
};

const ICON_CIRCLES: Record<string, Array<{ cx: number; cy: number; r: number }>> = {
  "i-users": [{ cx: 9, cy: 8, r: 3 }],
  "i-globe": [{ cx: 12, cy: 12, r: 9 }],
  "i-search": [{ cx: 10.5, cy: 10.5, r: 6.5 }],
  "i-network": [
    { cx: 12, cy: 5, r: 2.5 },
    { cx: 6, cy: 18, r: 2.5 },
    { cx: 18, cy: 18, r: 2.5 },
  ],
  "i-research": [
    { cx: 8, cy: 8, r: 3 },
    { cx: 17, cy: 7, r: 2 },
    { cx: 16, cy: 17, r: 3 },
  ],
  "i-check": [{ cx: 12, cy: 12, r: 9 }],
};

export function IconLibrary() {
  return (
    <svg className="icon-library" aria-hidden="true">
      {Object.entries(ICONS).map(([id, d]) => (
        <symbol key={id} id={id} viewBox="0 0 24 24">
          {(ICON_CIRCLES[id] ?? []).map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
          ))}
          <path d={d} />
        </symbol>
      ))}
    </svg>
  );
}

export function Icon({ name }: { name: string }) {
  return (
    <svg aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
