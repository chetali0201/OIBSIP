# A. P. J. Abdul Kalam — Tribute Page

A Level 2 Web Development Internship Project  
Built with plain HTML and CSS — no frameworks.

---

## Project Structure

```
tribute-kalam/
├── index.html      ← All page markup
├── style.css       ← All styles
└── README.md       ← This file
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Full-height intro with photo, name, tagline, and scroll hint |
| **About** | Four original paragraphs about Kalam's life and character |
| **Timeline** | Six alternating milestone cards with a dashed center line |
| **Quote** | Single featured quote in large serif type |
| **Why I Made This** | Personal reflection on the choice of subject |
| **Footer** | Minimal credit and image attribution |

---

## Design Decisions

**Typography**  
`Lora` (serif) for headings and display text — scholarly, warm, a little classical. `Inter` (sans-serif) for body copy — clean and readable at small sizes. This pairing avoids the over-used "Playfair + Roboto" combo and feels more specific to the subject.

**Color Palette**  
- `#F8F6F1` — warm off-white background, not pure white  
- `#1C2B3A` — deep navy for headings and the hero section  
- `#8B7355` — stone/tan accent color, used for years, labels, the quote attribution  
- `#EDE8DF` — slightly darker cream for alternating sections  
- `#6B7E6E` — muted sage for secondary text  

The palette avoids blues, greens, or anything that would look like a tech company. It's deliberately earthy.

**Timeline**  
The dashed vertical center line is the signature design element. It's made with a `repeating-linear-gradient` on a `::before` pseudo-element — no images, no SVG. Cards alternate left and right on desktop, stack single-column on mobile.

**Responsive Behavior**  
The hero flips to a single-column layout on mobile. The timeline collapses to a left-aligned single column with the center line moving to the far left. No media-query soup — just two breakpoints (768px and 480px).

**Small Human Details**  
- Drop cap on the first letter of the "Why I Made This" section  
- Italic first paragraph in the About section  
- Subtle `translateY(-2px)` hover on timeline cards  
- Animated scroll-hint dot in the hero  
- Image caption in muted, small type  
- Scroll hint says "scroll to explore" not "↓"

---

## How to Run

Open `index.html` directly in a browser. No build step, no server required.

The Google Fonts (`Lora` + `Inter`) load from the CDN — an internet connection is needed for them to render correctly. Without it, the page falls back to Georgia and system-ui.

LIVE DEMO
https://chetali0201.github.io/OIBSIP/tribute-kalam/

---

