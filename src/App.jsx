import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';

// Placeholder pages (will be replaced in later steps)
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Products = React.lazy(() => import('./pages/Products'));
const Categories = React.lazy(() => import('./pages/Categories'));
const StockHistory = React.lazy(() => import('./pages/StockHistory'));

function PagePlaceholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
        <span className="text-white text-2xl">🚧</span>
      </div>
      <h2 className="text-xl font-semibold text-primary mb-2">{title}</h2>
      <p className="text-secondary text-sm">This page is coming in the next step!</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<PagePlaceholder title="Dashboard" />} />
              <Route path="/products" element={<PagePlaceholder title="Products" />} />
              <Route path="/categories" element={<PagePlaceholder title="Categories" />} />
              <Route path="/stock-history" element={<PagePlaceholder title="Stock History" />} />
            </Routes>
          </React.Suspense>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
