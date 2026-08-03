# Wikipedia Studio Website

Static landing page for The Wikipedia Studio.

## Files

- `index.html` — Full landing page
- `styles.css` — Responsive styling and animations
- `script.js` — Interactive motion, navigation, carousel, FAQ, star field
- `assets/` — Local brand assets extracted from the approved logo

## Preview

Open `index.html` directly in a browser, or run a local server in this folder:

```bash
python -m http.server 8080
```

Then open http://localhost:8080

## Notes

- The page uses Google Fonts when an internet connection is available and falls back to system fonts if not.
- All core effects and interactions are vanilla HTML, CSS, and JavaScript. No build step is required.
