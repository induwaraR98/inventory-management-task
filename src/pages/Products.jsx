import React from 'react';

export default function Products() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-16 h-16 gradient-info rounded-2xl flex items-center justify-center mb-4 shadow-lg">
        <span className="text-white text-2xl">📦</span>
      </div>
      <h2 className="text-xl font-semibold text-primary mb-2">Products</h2>
      <p className="text-secondary text-sm">Coming in Step 4 — Product List & Filters!</p>
    </div>
  );
}
