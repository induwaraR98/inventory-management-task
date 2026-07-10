import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { InventoryProvider } from './contexts/InventoryContext';
import MainLayout from './layouts/MainLayout';

// Pages (lazy loaded)
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Products = React.lazy(() => import('./pages/Products'));
const Categories = React.lazy(() => import('./pages/Categories'));
const StockHistory = React.lazy(() => import('./pages/StockHistory'));

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <InventoryProvider>
        <BrowserRouter>
          <MainLayout>
            <React.Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/stock-history" element={<StockHistory />} />
              </Routes>
            </React.Suspense>
          </MainLayout>
        </BrowserRouter>
      </InventoryProvider>
    </ThemeProvider>
  );
}
