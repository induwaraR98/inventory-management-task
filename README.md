# InvenTrack — Inventory Management System

A modern, frontend-only **Inventory Management System** built with **React + Vite + Tailwind CSS**. All data is persisted via `localStorage` — no backend required.

---

## 🚀 Live Demo

> Deploy to Vercel/Netlify for a live link (optional).

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v4** | Styling |
| **Formik + Yup** | Form handling & validation |
| **Recharts** | Analytics charts |
| **React Router v6** | Client-side routing |
| **lucide-react** | Icons |
| **localStorage** | Data persistence |

---

## ✨ Features

### Core Features
- ✅ **Product Management** — Add, edit, delete products with Name, SKU, Category, Price, Stock
- ✅ **Auto-generated SKU** — Unique `PRD-XXXXXX` format, regeneratable
- ✅ **Stock Management** — Restock (increase) and Sales (decrease) with zero-floor validation
- ✅ **Dashboard** — Stats cards, category bar chart, stock status pie chart, recent activity
- ✅ **Category Handling** — Create, rename, delete categories; products re-assigned on delete
- ✅ **Search & Filter** — By name/SKU, category, and stock status (In Stock / Low / Out)
- ✅ **Table & Card View** — Toggle between views with sorting on all columns
- ✅ **Formik + Yup Validation** — All forms with meaningful error messages
- ✅ **Responsive Design** — Works on mobile and desktop

### Bonus Features
- ✅ **Dark / Light Mode** — Toggle with smooth transition, saved to localStorage
- ✅ **Auto-generated SKU** — `PRD-XXXXXX` with collision detection
- ✅ **Stock History Log** — Every stock change recorded with timestamp, type, note
- ✅ **Export to CSV** — Download full filtered product list as `.csv`
- ✅ **Analytics Charts** — Category bar chart + Stock status pie chart (Recharts)
- ✅ **Bulk Actions** — Select multiple products → bulk delete or bulk restock

---

## 📦 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/induwaraR98/inventory-management-task.git
cd inventory-management-task

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── categories/       # CategoryFormModal
│   ├── charts/           # CategoryBarChart, StockPieChart (Recharts)
│   ├── products/         # ProductTable, ProductCard, ProductFilters,
│   │                     # ProductFormModal, DeleteConfirmModal, BulkActionsBar
│   ├── stats/            # StatCard
│   ├── stock/            # StockAdjustModal
│   ├── Sidebar.jsx
│   └── TopBar.jsx
├── contexts/
│   ├── InventoryContext.jsx  # Global state + localStorage
│   └── ThemeContext.jsx      # Dark/light mode
├── data/
│   └── seedData.js           # Sample products & history
├── hooks/
│   └── useLocalStorage.js    # Custom hook
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── Categories.jsx
│   └── StockHistory.jsx
└── utils/
    ├── csvExport.js          # CSV download utility
    ├── skuGenerator.js       # Auto SKU generation
    └── validationSchemas.js  # Yup schemas
```

---

## 🎨 Design

- **Dark/Light theme** with CSS custom properties
- **Google Inter font** for clean typography
- **Gradient stat cards** with decorative backgrounds
- **Animated transitions** — fade-in, slide-in, scale-in
- **Responsive** — mobile sidebar drawer, responsive grids

---

## 📝 Git Commit History

Commits follow the task guidelines:
- `init:` — Project scaffold
- `feat:` — New features
- `fix:` — Bug fixes
- `docs:` — Documentation

---

## ⚠️ Notes

- All data is stored in **localStorage** — clearing browser data will reset the inventory
- Seed data is loaded only on first visit (when localStorage is empty)
- The app is **frontend-only** — no backend, no authentication
