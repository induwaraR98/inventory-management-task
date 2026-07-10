import React, { useState } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import CategoryFormModal from '../components/categories/CategoryFormModal';
import { Plus, Edit2, Trash2, Tag, AlertTriangle, Package } from 'lucide-react';

export default function Categories() {
  const { categories, products, deleteCategory } = useInventory();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const getCategoryStats = (cat) => {
    const catProducts = products.filter((p) => p.category === cat);
    const totalValue = catProducts.reduce((s, p) => s + p.price * p.stock, 0);
    const outOfStock = catProducts.filter((p) => p.stock === 0).length;
    return { count: catProducts.length, totalValue, outOfStock };
  };

  const handleDelete = (cat) => {
    deleteCategory(cat);
    setDeletingCategory(null);
  };

  const catStats = categories.map((cat) => ({ name: cat, ...getCategoryStats(cat) }));
  const totalProducts = products.length;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Categories</h1>
          <p className="text-sm text-muted mt-0.5">
            {categories.length} categories · {totalProducts} products total
          </p>
        </div>
        <button
          onClick={() => { setEditingCategory(null); setShowForm(true); }}
          className="btn btn-primary gap-1.5 self-start"
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* Category Grid */}
      {categories.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <Tag size={40} className="text-muted mb-4 opacity-40" />
          <p className="text-primary font-semibold">No categories yet</p>
          <p className="text-muted text-sm mt-1">Add your first category to get started</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary mt-4 gap-1.5"
          >
            <Plus size={14} /> Add Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {catStats.map((cat, i) => (
            <div
              key={cat.name}
              className="card hover-lift animate-fade-in group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Icon + Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-xl font-bold">
                    {cat.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Actions (visible on hover) */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditingCategory(cat.name); setShowForm(true); }}
                    className="btn btn-icon btn-sm text-indigo-500 hover:bg-indigo-500/10"
                    title="Rename category"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => setDeletingCategory(cat.name)}
                    className="btn btn-icon btn-sm text-red-500 hover:bg-red-500/10"
                    title="Delete category"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold text-primary mb-3 leading-snug">{cat.name}</h3>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Package size={13} />
                    <span>Products</span>
                  </div>
                  <span className="font-semibold text-primary">{cat.count}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Total Value</span>
                  <span className="font-semibold text-primary">
                    ${cat.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {cat.outOfStock > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <AlertTriangle size={11} />
                    {cat.outOfStock} out of stock
                  </div>
                )}
              </div>

              {/* Progress bar: share of total */}
              {totalProducts > 0 && (
                <div className="mt-4">
                  <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(2, (cat.count / totalProducts) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted mt-1 text-right">
                    {totalProducts > 0 ? Math.round((cat.count / totalProducts) * 100) : 0}% of inventory
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => { setShowForm(false); setEditingCategory(null); }}
        />
      )}

      {/* Delete confirm */}
      {deletingCategory && (
        <div className="modal-overlay" onClick={() => setDeletingCategory(null)}>
          <div className="modal-content max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-primary mb-2">Delete Category?</h2>
              <p className="text-secondary text-sm">
                Delete <span className="font-semibold text-primary">"{deletingCategory}"</span>?
              </p>
              {getCategoryStats(deletingCategory).count > 0 && (
                <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-amber-600 dark:text-amber-400">
                  ⚠ {getCategoryStats(deletingCategory).count} product(s) will be moved to "Uncategorized"
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeletingCategory(null)} className="btn btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={() => handleDelete(deletingCategory)} className="btn btn-danger flex-1">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
