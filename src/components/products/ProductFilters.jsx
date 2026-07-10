import React from 'react';
import { Search, Filter, X, LayoutGrid, List } from 'lucide-react';

export default function ProductFilters({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  categories,
  viewMode,
  onViewModeChange,
  totalResults,
}) {
  const hasActiveFilters = search || categoryFilter || stockFilter;

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('');
    onStockFilterChange('');
  };

  return (
    <div className="card mb-4 space-y-3">
      {/* Row 1: Search + View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            className="input pl-9"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex bg-elevated border border-theme rounded-lg p-1 gap-1 self-start sm:self-auto">
          <button
            onClick={() => onViewModeChange('table')}
            className={`btn btn-sm gap-1.5 ${viewMode === 'table' ? 'btn-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
            title="Table view"
          >
            <List size={15} />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => onViewModeChange('card')}
            className={`btn btn-sm gap-1.5 ${viewMode === 'card' ? 'btn-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
            title="Card view"
          >
            <LayoutGrid size={15} />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      {/* Row 2: Category + Stock + Active filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-1 min-w-[160px]">
          <Filter size={14} className="text-muted flex-shrink-0" />
          <select
            className="input text-sm py-2"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Stock Status Filter */}
        <div className="flex-1 min-w-[160px]">
          <select
            className="input text-sm py-2"
            value={stockFilter}
            onChange={(e) => onStockFilterChange(e.target.value)}
          >
            <option value="">All Stock Status</option>
            <option value="in-stock">In Stock (&gt; 5)</option>
            <option value="low-stock">Low Stock (1–5)</option>
            <option value="out-of-stock">Out of Stock (0)</option>
          </select>
        </div>

        {/* Clear filters + Result count */}
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn btn-sm btn-secondary gap-1.5 text-xs">
              <X size={12} /> Clear
            </button>
          )}
          <span className="text-xs text-muted whitespace-nowrap">
            {totalResults} result{totalResults !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
