import React from 'react';
import { Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

function StockBadge({ stock }) {
  if (stock === 0) return <span className="badge badge-danger">Out of Stock</span>;
  if (stock <= 5) return <span className="badge badge-warning">Low Stock</span>;
  return <span className="badge badge-success">In Stock</span>;
}

export default function ProductCard({
  product,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
  onAdjustStock,
}) {
  return (
    <div
      className={`card hover-lift transition-all duration-200 relative ${
        selected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-transparent' : ''
      }`}
    >
      {/* Checkbox */}
      <div className="absolute top-4 left-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(product.id)}
          className="w-4 h-4 accent-indigo-500 cursor-pointer"
        />
      </div>

      {/* SKU + Category */}
      <div className="flex items-start justify-between mb-3 pl-6">
        <span className="font-mono text-xs text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">
          {product.id}
        </span>
        <span className="badge badge-info">{product.category}</span>
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-primary text-sm mb-3 leading-snug">
        {product.name}
      </h3>

      {/* Price + Stock */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xs text-muted mb-0.5">Price</p>
          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted mb-0.5">Stock</p>
          <p className={`text-lg font-bold ${
            product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-amber-500' : 'text-emerald-500'
          }`}>
            {product.stock}
          </p>
        </div>
      </div>

      {/* Status badge */}
      <div className="mb-4">
        <StockBadge stock={product.stock} />
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-theme pt-3">
        <button
          onClick={() => onAdjustStock(product, 'restock')}
          className="btn btn-sm flex-1 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 gap-1"
        >
          <TrendingUp size={13} /> Restock
        </button>
        <button
          onClick={() => onAdjustStock(product, 'sale')}
          className="btn btn-sm flex-1 text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 gap-1"
        >
          <TrendingDown size={13} /> Sell
        </button>
        <button
          onClick={() => onEdit(product)}
          className="btn btn-icon btn-sm btn-secondary"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => onDelete(product)}
          className="btn btn-icon btn-sm text-red-500 bg-red-500/10 hover:bg-red-500/20"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
