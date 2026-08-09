# AI Agent Context

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS

## Project Overview
This project is a personal portfolio website for Roushan Sheik. It uses Next.js with the App Router and Tailwind CSS for styling. The design aims to be clean and minimal.

## Directory Structure

```text
.
├── jsconfig.json
├── my portfolio.png
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [id]/
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── icon.ico
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── projects/
│   │       └── page.jsx
│   ├── assets/
│   │   ├── fav.png
│   │   └── profile/
│   │       ├── profile-500into500-2.png
│   │       └── profile-500into500.png
│   ├── components/
│   │   ├── blog/
│   │   │   └── Blog.jsx
│   │   ├── button/
│   │   │   ├── Btn.jsx
│   │   │   └── style.css
│   │   ├── paticles-animation/
│   │   │   └── ParticlesComponent.jsx
│   │   ├── project/
│   │   │   └── Project.jsx
│   │   └── shared/
│   │       ├── footer/
│   │       │   └── Footer.jsx
│   │       └── header/
│   │           └── Header.jsx
│   ├── constants/
│   │   ├── links.js
│   │   ├── nav.js
│   │   └── siteMeta.js
│   ├── data/
│   │   ├── blogs.js
│   │   ├── profile.js
│   │   ├── projects.js
│   │   └── socialLinks.js
└── tailwind.config.js
```

## Key Files
- `src/app/page.js`: The main landing page.
- `src/app/globals.css`: Global styles, contains Tailwind directives.
- `tailwind.config.js`: Tailwind configuration.
- `src/data/profile.js`: Contains the personal data used across the site.

## Design Tokens
- **Brand Hover Primary**: `#E63946` (configured as `brand-hover` in Tailwind).
- **Brand Hover Secondary**: Uses a fractional opacity of the primary color, e.g., `text-brand-hover/70`.
