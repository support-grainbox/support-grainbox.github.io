# Portfolio site — Jason Bergh style

Close clone of the reference site's structure, motion and layout
(jasonbergh.com / Blacklead Studio), built in plain HTML / CSS / JS.

## How to open

```bash
# from this folder
npx --yes serve .
# or just open index.html in a browser
```

## Customize

1. Edit content arrays at the top of `script.js` (`WORKS`, `ARCHIVE`).
2. Replace text in `index.html` (bio, contact).
3. Drop real images into `assets/` and swap `.ph` placeholders for `<img>` / `<video>`.

## Pages

- **Work** — Slider / List toggle, category filters, scroll or click to advance
- **Archive** — Masonry stills grid
- **About** — Hero + bio
- **Contact** — Email + socials

## Signature details

- Viewfinder corner brackets
- Edge ruler ticks + recording dot
- Live clock / timecode footer
- Italic first-letter dropcaps via `dropcap()`
