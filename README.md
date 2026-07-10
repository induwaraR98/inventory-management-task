<div align="center">

# 📦 InvenTrack — Inventory Management System

A modern, fully-featured **frontend-only Inventory Management System** built with React 19, Tailwind CSS v4, Formik + Yup, and Recharts. All data is persisted via `localStorage` — no backend or database required.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Formik](https://img.shields.io/badge/Formik+Yup-2.4-1764AB?style=for-the-badge)](https://formik.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages & Components](#-pages--components)
- [Data Persistence](#-data-persistence)
- [Form Validation](#-form-validation)
- [Dark / Light Mode](#-dark--light-mode)
- [Git Commit History](#-git-commit-history)
- [Evaluation Criteria](#-evaluation-criteria)

---

## 🌟 Overview

**InvenTrack** is a clean, responsive inventory management web application. It allows users to:

- Track products with full CRUD operations
- Manage stock levels (restock & sales) with history logging
- Organize products into categories
- View real-time analytics on a dashboard
- Export data to CSV
- Perform bulk operations on multiple products

All state is managed in **React Context** and automatically synced to **localStorage** so data persists across page refreshes without any backend.

---

## ✨ Features

### ✅ Core Features (Required)

| Feature | Details |
|---|---|
| **Product Management** | Add, edit, delete products with full validation |
| **Product Fields** | Name, SKU/Product ID, Category, Price, Stock Quantity |
| **Stock Management** | Increase (restock) and decrease (sales) stock levels |
| **Dashboard** | Total products, total inventory value, low stock alerts |
| **Category Handling** | Create, rename, delete custom categories; filter by category |
| **Search & Filter** | Search by name or SKU; filter by category and stock status |
| **Responsive UI** | Works on mobile, tablet, and desktop |
| **Form Validation** | Formik + Yup with descriptive error messages on all forms |

### 🎁 Bonus Features (All Implemented)

| Feature | Details |
|---|---|
| **Auto-generated SKU** | Unique `PRD-XXXXXX` format generated automatically; regeneratable |
| **Stock History Log** | Every stock change logged with timestamp, type, quantity, and note |
| **Export to CSV** | Download full filtered product list as `.csv` with proper escaping |
| **Dark / Light Mode** | Theme toggle saved to `localStorage`; detects system preference |
| **Analytics Charts** | Category bar chart + Stock status donut pie chart (Recharts) |
| **Bulk Actions** | Select multiple products → bulk delete or bulk restock |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework with Hooks & Context |
| [Vite](https://vitejs.dev/) | 8 | Lightning-fast dev server & bundler |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first CSS with custom design tokens |
| [Formik](https://formik.org/) | 2.4 | Form state management |
| [Yup](https://github.com/jquense/yup) | 1.7 | Schema-based form validation |
| [Recharts](https://recharts.org/) | 3.9 | Composable charts library |
| [React Router](https://reactrouter.com/) | v7 | Client-side routing |
| [lucide-react](https://lucide.dev/) | 1.24 | Beautiful, consistent icon set |
| localStorage | Browser API | Data persistence without a backend |

---

## 📸 Screenshots

> Screenshots will appear here after deployment. Run locally with `npm run dev` to preview.

| Dashboard (Dark Mode) | Products Table |
|---|---|
| *Stats cards + Charts + Activity Feed* | *Sortable table with filters & bulk select* |

| Product Form | Stock History |
|---|---|
| *Formik + Yup validation, inline category add* | *Searchable activity timeline* |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- A modern browser (Chrome, Firefox, Edge, Safari)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/induwaraR98/inventory-management-task.git

# 2. Navigate into the project folder
cd inventory-management-task

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173** 🎉

### Available Scripts

```bash
npm run dev       # Start development server with hot reload
npm run build     # Build optimized production bundle
npm run preview   # Preview production build locally
npm run lint      # Run oxlint code linter
```

### Production Build

```bash
npm run build
# Output: dist/ folder
# Preview: npm run preview → http://localhost:4173
```

---

## 📁 Project Structure

```
inventory-management-task/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx                         # Root component with routing & providers
│   ├── main.jsx                        # React entry point
│   ├── index.css                       # Global styles, CSS variables, design system
│   │
│   ├── contexts/
│   │   ├── InventoryContext.jsx        # Global inventory state (products, categories, history)
│   │   └── ThemeContext.jsx            # Dark/light mode state & toggle
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js          # Custom hook — syncs state with localStorage
│   │
│   ├── data/
│   │   └── seedData.js                 # Default categories + sample products & history
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx              # App shell (Sidebar + TopBar + page content)
│   │
│   ├── components/
│   │   ├── Sidebar.jsx                 # Navigation sidebar with active link highlighting
│   │   ├── TopBar.jsx                  # Header with page title, date, theme toggle
│   │   │
│   │   ├── stats/
│   │   │   └── StatCard.jsx            # Gradient stat card with icon and trend
│   │   │
│   │   ├── charts/
│   │   │   ├── CategoryBarChart.jsx    # Recharts bar chart: products per category
│   │   │   └── StockPieChart.jsx       # Recharts donut pie: In/Low/Out of stock
│   │   │
│   │   ├── products/
│   │   │   ├── ProductFilters.jsx      # Search + category + stock status filters
│   │   │   ├── ProductTable.jsx        # Sortable table with checkboxes & action buttons
│   │   │   ├── ProductCard.jsx         # Card view with stock status & quick actions
│   │   │   ├── ProductFormModal.jsx    # Add/Edit modal (Formik + Yup)
│   │   │   ├── DeleteConfirmModal.jsx  # Delete confirmation dialog
│   │   │   └── BulkActionsBar.jsx      # Floating bar for bulk delete/restock
│   │   │
│   │   ├── stock/
│   │   │   └── StockAdjustModal.jsx    # Restock/Sale modal with live preview (Formik + Yup)
│   │   │
│   │   └── categories/
│   │       └── CategoryFormModal.jsx   # Add/Rename category modal (Formik + Yup)
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx               # Stats, charts, category summary, recent activity
│   │   ├── Products.jsx                # Product list with all CRUD and filter functionality
│   │   ├── Categories.jsx              # Category management grid with stats
│   │   └── StockHistory.jsx            # Searchable stock event timeline
│   │
│   └── utils/
│       ├── skuGenerator.js             # Auto-generates unique PRD-XXXXXX SKUs
│       ├── csvExport.js                # CSV download with proper field escaping
│       └── validationSchemas.js        # Yup schemas for all forms
│
├── index.html                          # HTML entry with SEO meta tags
├── vite.config.js                      # Vite + Tailwind CSS plugin config
├── package.json
├── .gitattributes                      # Normalize line endings to LF
└── README.md
```

---

## 📄 Pages & Components

### 🏠 Dashboard
The main overview screen showing:
- **4 Stat Cards** — Total Products, Total Inventory Value ($), Low Stock count, Out of Stock count
- **Category Bar Chart** — Product count per category (Recharts, color-coded)
- **Stock Status Pie Chart** — Donut chart: In Stock / Low Stock / Out of Stock distribution
- **Category Summary Table** — Each category with product count, total value, and % of inventory
- **Recent Activity Feed** — Last 6 stock events with type, quantity, and timestamp

### 📦 Products
Full product management page:
- **Search** by product name or SKU (instant filtering)
- **Filter** by category (dropdown) and stock status (In Stock / Low Stock / Out of Stock)
- **Table View** — Sortable columns (Name, SKU, Category, Price, Stock), checkboxes, action buttons
- **Card View** — Visual grid with quick-action buttons
- **Pagination** — 10 items per page with page number navigation
- **Add / Edit** via modal with full Formik + Yup validation
- **Delete** with confirmation modal
- **Restock / Sell** with live new-stock preview
- **CSV Export** — Downloads currently filtered products
- **Bulk Actions** — Floating toolbar when items selected: bulk delete or bulk restock

### 🏷️ Categories
Category management grid:
- Card per category showing: product count, total inventory value, out-of-stock count, % of total inventory (progress bar)
- **Add** new categories with duplicate detection
- **Rename** existing categories (updates all assigned products automatically)
- **Delete** categories (products reassigned to "Uncategorized" with warning)

### 📜 Stock History
Full event log:
- Chronological timeline of every stock change
- Filter by event type (Restock / Sale) and by specific product
- Search by product name, SKU, or note
- Color-coded icons: 🟢 Restock / 🔴 Sale
- Shows quantity delta, timestamp, and optional notes

---

## 💾 Data Persistence

All data is stored in **browser localStorage** under the following keys:

| Key | Description |
|---|---|
| `ims-products` | Array of all product objects |
| `ims-categories` | Array of category name strings |
| `ims-stock-history` | Array of all stock event records |
| `ims-theme` | Current theme preference (`"dark"` or `"light"`) |

**Seed data** (8 sample products across all default categories + sample history) is loaded automatically on first visit when localStorage is empty. Subsequent visits load persisted user data.

> ⚠️ Clearing browser data (localStorage) will reset the app to seed data.

---

## ✅ Form Validation

All forms use **Formik** for state management and **Yup** for schema-based validation:

### Product Form
| Field | Validation Rules |
|---|---|
| Product Name | Required · 2–100 characters |
| SKU | Required · Must match `PRD-XXXXXX` format · Must be unique |
| Category | Required (select from list or create new) |
| Price | Required · Number · Must be > $0.01 |
| Stock | Required · Integer · Must be ≥ 0 |

### Stock Adjustment Form
| Field | Validation Rules |
|---|---|
| Quantity | Required · Integer · Must be ≥ 1 |
| Note | Optional · Max 200 characters |
| Business rule | Sale quantity cannot exceed current stock |

### Category Form
| Field | Validation Rules |
|---|---|
| Name | Required · 2–50 characters · Must be unique |

All error messages appear inline beneath their respective fields with a ⚠ indicator.

---

## 🌙 Dark / Light Mode

- Toggle button in the **TopBar** (🌙 Moon / ☀️ Sun icon)
- Theme is saved to `localStorage` under `ims-theme`
- On first visit, detects **system preference** via `prefers-color-scheme`
- Implemented via CSS custom properties (CSS variables) on `:root` and `.dark`
- Smooth 200ms transitions on all color changes
- Every component — sidebar, modals, tables, charts, cards — is fully themed

---

## 🗂️ Git Commit History

Each feature was committed separately to demonstrate clear, incremental development:

```
72c6c42  docs: add README with project overview, features list, setup instructions, and project structure
d0b6fa2  feat: add CSV export utility and bulk actions (delete + restock selected products)
bad3b08  feat: add category management page with CRUD, product count, value stats, and delete warning
87ea5e3  feat: add stock management with restock/sale modal, live stock preview, history log
         fix: prevent stock from going below zero
11bd2cd  feat: add product form with Formik + Yup validation, auto-generated SKU, and inline category creation
3513252  feat: add product list with search, category filter, stock filter, table/card view, sorting, and pagination
8b742a9  feat: add dashboard with stat cards, category bar chart, stock pie chart, and activity feed
49b6867  feat: add localStorage data layer with InventoryContext, useLocalStorage hook, SKU generator, and seed data
b2a5bce  init: scaffold Vite + React + Tailwind CSS project with dark/light mode layout
```

---

## 📊 Evaluation Criteria

| Criterion | Implementation |
|---|---|
| **Code Quality** | Separated contexts, hooks, utils, and components; consistent naming conventions |
| **Functionality** | All 6 core features + all 6 bonus features implemented and working |
| **User Experience** | Responsive layout, loading states, empty states, confirmation dialogs, tooltips |
| **Form Validation** | Formik + Yup on every form with field-level and business-rule validation |
| **Git Commit History** | 9 meaningful commits using `feat:`, `fix:`, `docs:`, `init:` prefixes |
| **Bonus Features** | Auto-SKU ✅ · Stock History ✅ · CSV Export ✅ · Dark Mode ✅ · Charts ✅ · Bulk Actions ✅ |

---

## 🔧 Design System

- **Font**: Inter (Google Fonts) — 300 to 800 weight
- **Color**: CSS custom properties for light and dark themes
- **Gradients**: Indigo-violet (primary), emerald (success), red (danger), amber (warning)
- **Animations**: `fadeIn`, `slideInLeft`, `scaleIn` keyframe animations; hover-lift on cards
- **Responsive**: Mobile sidebar drawer, responsive grid layouts at `sm`, `lg`, `xl` breakpoints

---

## 📝 Notes

- This is a **frontend-only** project — no backend, API, or authentication
- Data resets to seed data if localStorage is cleared
- The app is designed for **modern browsers** (Chrome, Firefox, Edge, Safari)
- All components are **lazy-loaded** for optimal initial bundle size

---

<div align="center">

Made with ❤️ by **induwaraR98**

</div>
