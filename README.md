# Y2K Closet 🪩✨

A retro Y2K-style virtual closet built with React and Tailwind CSS. Add clothing items, filter by category, and build outfits with drag-and-drop.

## Features

- **Landing page** – Funky Y2K logo, pastel gradient background, and bubble fonts
- **Virtual closet** – Add items with name, category (top, bottom, shoes, accessory), and image URL
- **Grid display** – Items shown in a responsive grid with hover effects and Y2K styling
- **Category filters** – Filter by All, Top, Bottom, Shoes, Accessory
- **Drag-and-drop outfit** – Drag items from the closet into the “My outfit” zone to build an outfit
- **Responsive** – Mobile-friendly layout

## Run the app

```bash
npm install
npm run dev
```

Open https://y2k-closet.vercel.app.

## Build

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.jsx` – Main app and routes
- `src/main.jsx` – Entry point (used by Vite)
- `src/components/LandingPage.jsx` – Landing page with logo and CTA
- `src/components/Closet.jsx` – Closet view, outfit zone, and grid
- `src/components/ItemCard.jsx` – Single clothing card (draggable)
- `src/components/AddItemForm.jsx` – Form to add new items
- `src/components/Filters.jsx` – Category filter buttons
- `tailwind.config.js` – Y2K colors, fonts, and animations

Data is stored in `localStorage` (closet items and current outfit).
