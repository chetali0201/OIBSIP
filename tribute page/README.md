# Tribute Page — Dr. APJ Abdul Kalam

**Project type:** Web Development Internship — Level 2  
**Built by:** Chetali Kumbhare  
**Tech stack:** HTML · CSS · Minimal Vanilla JS (nav toggle only)

---

## About This Project

A tribute webpage for Dr. APJ Abdul Kalam — aerospace scientist, author, and India's 11th President.
This is a static, single-page site built with pure HTML and CSS as part of a frontend internship programme.
The goal was to build something that feels thoughtfully designed — not over-engineered, but not rushed either.

---

## Folder Structure

```
tribute-apj-kalam/
├── index.html          ← All page content and structure
├── style.css           ← All styling (CSS Variables, layout, responsive)
└── README.md           ← This file
```

Optional (if you want to use a local photo):
```
tribute-apj-kalam/
└── images/
    └── kalam.jpg       ← Replace URL in .hero-photo background-image
```

---

## How to View

No build steps needed. Just:

1. Download or clone the folder
2. Open `index.html` in any modern browser
3. Or use VS Code's **Live Server** extension

---

## Sections

| Section | Description |
|---|---|
| Navigation | Sticky top bar with anchor links + mobile hamburger |
| Hero | Portrait, name, dates, tagline |
| Biography | 4 original paragraphs + quick facts sidebar |
| Timeline | 10 key milestones in a vertical card layout |
| Quote | Styled typographic blockquote |
| Why I Chose Him | Personal reflection section |
| Footer | Closing tribute and attribution |

---

## Design Decisions

- **Color palette:** Dark backgrounds (`#1c1c1c`) for hero + timeline, warm off-whites for content sections. Accent color is a warm amber-brown (`#7c5c38`) — chosen to feel earthy and dignified rather than corporate.
- **Typography:** Lora (serif) for headings — warm and academic. Inter (sans-serif) for body — clean and readable. Loaded from Google Fonts.
- **No JavaScript except** the mobile nav toggle (18 lines). Smooth scroll is CSS-only via `scroll-behavior: smooth`.
- **Responsive** via 3 breakpoints: desktop default, 720px (tablet — sidebar stacks), 540px (mobile — hamburger nav).

---

## Future Improvements

1. **Image carousel** — show multiple photos of Kalam across different life stages (student, scientist, president, teacher)
2. **Dark/light mode toggle** — CSS Variables are already set up; just needs a button and a class swap
3. **Read More expansion** — biography could hide extra paragraphs behind a "Read more" button for mobile
4. **Animated timeline** — use `IntersectionObserver` to fade in each card as it scrolls into view
5. **Quotes section expanded** — rotate between 3–4 notable quotes with prev/next buttons
6. **Book shelf section** — card grid showing his major books with cover images and one-line descriptions
7. **Share button** — native Web Share API (`navigator.share()`) for mobile sharing
8. **Accessibility audit** — check contrast ratios, add skip-to-content link, test with screen reader

---

*A tribute to the man who said: "You have to dream before your dreams can come true."*
