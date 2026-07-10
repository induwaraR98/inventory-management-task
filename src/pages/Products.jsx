import React, { useState, useMemo, useCallback } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import ProductFilters from '../components/products/ProductFilters';
import ProductTable from '../components/products/ProductTable';
import ProductCard from '../components/products/ProductCard';
import BulkActionsBar from '../components/products/BulkActionsBar';
import { Plus, Download, ChevronLeft, ChevronRight } from 'lucide-react';

// These modals are imported in Step 5 (form) and Step 6 (stock)
// Placeholder until those steps are done
const ProductFormModal = React.lazy(() => import('../components/products/ProductFormModal'));
const DeleteConfirmModal = React.lazy(() => import('../components/products/DeleteConfirmModal'));
const StockAdjustModal = React.lazy(() => import('../components/stock/StockAdjustModal'));

const PAGE_SIZE = 10;

export default function Products() {
  const { products, categories, deleteProducts, getStats } = useInventory();

  // Filter state
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [viewMode, setViewMode] = useState('table');

  // Sort state
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  // Pagination
  const [page, setPage] = useState(1);

  // Selection
  const [selected, setSelected] = useState(new Set());

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [stockProduct, setStockProduct] = useState(null);
  const [stockType, setStockType] = useState('restock');
  const [bulkRestockOpen, setBulkRestockOpen] = useState(false);

  // Filtering + sorting
  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
      );
    }
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (stockFilter === 'in-stock') {
      result = result.filter((p) => p.stock > 5);
    } else if (stockFilter === 'low-stock') {
      result = result.filter((p) => p.stock > 0 && p.stock <= 5);
    } else if (stockFilter === 'out-of-stock') {
      result = result.filter((p) => p.stock === 0);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [products, search, categoryFilter, stockFilter, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSort = useCallback((col) => {
    if (sortKey === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col);
      setSortDir('asc');
    }
    setPage(1);
  }, [sortKey]);

  // Selection handlers
  const toggleSelect = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    const allIds = paginated.map((p) => p.id);
    const allSelected = allIds.every((id) => selected.has(id));
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        allIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelected((prev) => new Set([...prev, ...allIds]));
    }
  }, [paginated, selected]);

  // Handlers
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleAdjustStock = (product, type) => {
    setStockProduct(product);
    setStockType(type);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selected.size} selected product(s)?`)) {
      deleteProducts([...selected]);
      setSelected(new Set());
    }
  };

  const handleBulkRestock = () => {
    setBulkRestockOpen(true);
  };

  // CSV Export
  const handleExport = () => {
    const headers = ['SKU', 'Name', 'Category', 'Price', 'Stock', 'Status', 'Created'];
    const rows = filtered.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.category,
      p.price.toFixed(2),
      p.stock,
      p.stock === 0 ? 'Out of Stock' : p.stock <= 5 ? 'Low Stock' : 'In Stock',
      new Date(p.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Products</h1>
          <p className="text-sm text-muted mt-0.5">{products.length} total products</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={handleExport} className="btn btn-secondary gap-1.5 text-sm">
            <Download size={15} /> Export CSV
          </button>
          <button onClick={handleAddNew} className="btn btn-primary gap-1.5 text-sm">
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        categoryFilter={categoryFilter}
        onCategoryChange={(v) => { setCategoryFilter(v); setPage(1); }}
        stockFilter={stockFilter}
        onStockFilterChange={(v) => { setStockFilter(v); setPage(1); }}
        categories={categories}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filtered.length}
      />

      {/* Product List */}
      {viewMode === 'table' ? (
        <ProductTable
          products={paginated}
          selected={selected}
          onToggleSelect={toggleSelect}
          onToggleAll={toggleAll}
          onEdit={handleEdit}
          onDelete={setDeletingProduct}
          onAdjustStock={handleAdjustStock}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginated.length === 0 ? (
            <div className="col-span-full card flex flex-col items-center justify-center py-16 text-center">
              <span className="text-4xl mb-3">📦</span>
              <p className="text-primary font-semibold">No products found</p>
              <p className="text-muted text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            paginated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selected.has(product.id)}
                onToggleSelect={toggleSelect}
                onEdit={handleEdit}
                onDelete={setDeletingProduct}
                onAdjustStock={handleAdjustStock}
              />
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted">
            Page {safePage} of {totalPages} · {filtered.length} results
          </p>
          <div className="flex gap-2">
            <button
              disabled={safePage <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn btn-secondary btn-sm"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + Math.max(1, safePage - 2);
              if (p > totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`btn btn-sm w-8 justify-center ${p === safePage ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {p}
                </button>
              );
            })}
            <button
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn btn-secondary btn-sm"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <React.Suspense fallback={null}>
        {showForm && (
          <ProductFormModal
            product={editingProduct}
            onClose={() => { setShowForm(false); setEditingProduct(null); }}
          />
        )}
        {deletingProduct && (
          <DeleteConfirmModal
            product={deletingProduct}
            onClose={() => setDeletingProduct(null)}
          />
        )}
        {stockProduct && (
          <StockAdjustModal
            product={stockProduct}
            initialType={stockType}
            onClose={() => setStockProduct(null)}
          />
        )}
        {bulkRestockOpen && (
          <StockAdjustModal
            bulkIds={[...selected]}
            onClose={() => { setBulkRestockOpen(false); setSelected(new Set()); }}
          />
        )}
      </React.Suspense>

      {/* Bulk Actions Floating Bar */}
      <BulkActionsBar
        selectedCount={selected.size}
        onDelete={handleBulkDelete}
        onRestock={handleBulkRestock}
        onClear={() => setSelected(new Set())}
      />
    </div>
  );
}
