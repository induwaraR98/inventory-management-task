import React, { useState } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import { History, TrendingUp, TrendingDown, Search, Filter, X } from 'lucide-react';

export default function StockHistory() {
  const { stockHistory, products } = useInventory();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');

  const filtered = stockHistory.filter((entry) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      entry.productName.toLowerCase().includes(q) ||
      entry.productId.toLowerCase().includes(q) ||
      (entry.note && entry.note.toLowerCase().includes(q));
    const matchesType = !typeFilter || entry.type === typeFilter;
    const matchesProduct = !productFilter || entry.productId === productFilter;
    return matchesSearch && matchesType && matchesProduct;
  });

  const uniqueProducts = [...new Map(stockHistory.map((e) => [e.productId, e.productName])).entries()];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Stock History</h1>
        <p className="text-sm text-muted mt-1">
          {stockHistory.length} total events recorded
        </p>
      </div>

      {/* Filters */}
      <div className="card space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or note..."
              className="input pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary">
                <X size={14} />
              </button>
            )}
          </div>
          <select
            className="input sm:max-w-[180px]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="restock">Restock only</option>
            <option value="sale">Sale only</option>
          </select>
          <select
            className="input sm:max-w-[220px]"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="">All Products</option>
            {uniqueProducts.map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          {(search || typeFilter || productFilter) && (
            <button
              onClick={() => { setSearch(''); setTypeFilter(''); setProductFilter(''); }}
              className="btn btn-sm btn-secondary gap-1"
            >
              <X size={11} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <History size={40} className="text-muted mb-4 opacity-40" />
          <p className="text-primary font-semibold">No history found</p>
          <p className="text-muted text-sm mt-1">Adjust filters or add stock events</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry, i) => (
            <div
              key={entry.id}
              className="card flex items-start gap-4 hover-lift animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 25, 300)}ms` }}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                entry.type === 'restock' ? 'gradient-success' : 'gradient-danger'
              }`}>
                {entry.type === 'restock'
                  ? <TrendingUp size={16} className="text-white" />
                  : <TrendingDown size={16} className="text-white" />
                }
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-primary text-sm leading-snug">
                      {entry.productName}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      <span className="font-mono text-indigo-500">{entry.productId}</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-bold ${entry.type === 'restock' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {entry.type === 'restock' ? '+' : '-'}{entry.quantity}
                    </p>
                    <p className="text-xs text-muted">units</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted">
                  <span className={`badge ${entry.type === 'restock' ? 'badge-success' : 'badge-danger'}`}>
                    {entry.type === 'restock' ? 'Restock' : 'Sale'}
                  </span>
                  <span>
                    {new Date(entry.timestamp).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {entry.note && (
                    <span className="italic">"{entry.note}"</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
