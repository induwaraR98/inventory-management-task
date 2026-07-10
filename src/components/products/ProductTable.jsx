import React from 'react';
import { Edit2, Trash2, TrendingUp, TrendingDown, ChevronUp, ChevronDown } from 'lucide-react';

function StockBadge({ stock }) {
  if (stock === 0) return <span className="badge badge-danger">Out of Stock</span>;
  if (stock <= 5) return <span className="badge badge-warning">Low Stock</span>;
  return <span className="badge badge-success">In Stock</span>;
}

export default function ProductTable({
  products,
  selected,
  onToggleSelect,
  onToggleAll,
  onEdit,
  onDelete,
  onAdjustStock,
  sortKey,
  sortDir,
  onSort,
}) {
  const allSelected = products.length > 0 && products.every((p) => selected.has(p.id));
  const someSelected = products.some((p) => selected.has(p.id));

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-muted opacity-40" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-indigo-500" />
      : <ChevronDown size={12} className="text-indigo-500" />;
  };

  const ThSort = ({ col, children }) => (
    <th
      className="cursor-pointer select-none"
      onClick={() => onSort(col)}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon col={col} />
      </div>
    </th>
  );

  if (products.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-elevated rounded-2xl flex items-center justify-center mb-4">
          <span className="text-3xl">📦</span>
        </div>
        <p className="text-primary font-semibold mb-1">No products found</p>
        <p className="text-muted text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="card p-0 overflow-hidden">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="w-10 px-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => el && (el.indeterminate = !allSelected && someSelected)}
                  onChange={onToggleAll}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                />
              </th>
              <ThSort col="id">SKU</ThSort>
              <ThSort col="name">Product Name</ThSort>
              <ThSort col="category">Category</ThSort>
              <ThSort col="price">Price</ThSort>
              <ThSort col="stock">Stock</ThSort>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product.id}
                className={`animate-fade-in ${selected.has(product.id) ? 'bg-indigo-500/5' : ''}`}
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <td className="px-4">
                  <input
                    type="checkbox"
                    checked={selected.has(product.id)}
                    onChange={() => onToggleSelect(product.id)}
                    className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  />
                </td>
                <td>
                  <span className="font-mono text-xs text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {product.id}
                  </span>
                </td>
                <td>
                  <p className="font-medium text-primary text-sm">{product.name}</p>
                  <p className="text-xs text-muted">
                    Added {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td>
                  <span className="badge badge-info">{product.category}</span>
                </td>
                <td>
                  <span className="font-semibold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className={`font-semibold ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <StockBadge stock={product.stock} />
                </td>
                <td>
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => onAdjustStock(product, 'restock')}
                      className="btn btn-icon btn-sm text-emerald-500 hover:bg-emerald-500/10 tooltip-container"
                      title="Restock"
                    >
                      <TrendingUp size={14} />
                      <span className="tooltip">Restock</span>
                    </button>
                    <button
                      onClick={() => onAdjustStock(product, 'sale')}
                      className="btn btn-icon btn-sm text-amber-500 hover:bg-amber-500/10 tooltip-container"
                      title="Sell / Reduce stock"
                    >
                      <TrendingDown size={14} />
                      <span className="tooltip">Sell</span>
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="btn btn-icon btn-sm text-indigo-500 hover:bg-indigo-500/10 tooltip-container"
                      title="Edit product"
                    >
                      <Edit2 size={14} />
                      <span className="tooltip">Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="btn btn-icon btn-sm text-red-500 hover:bg-red-500/10 tooltip-container"
                      title="Delete product"
                    >
                      <Trash2 size={14} />
                      <span className="tooltip">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
