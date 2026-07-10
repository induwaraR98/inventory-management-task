import React from 'react';
import { Trash2, TrendingUp, X } from 'lucide-react';

export default function BulkActionsBar({ selectedCount, onDelete, onRestock, onClear }) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-scale-in">
      <div className="bg-surface border border-theme rounded-2xl shadow-2xl px-5 py-3.5 flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
            {selectedCount}
          </div>
          <span className="text-sm font-medium text-primary">
            item{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="w-px h-6 bg-border-theme" />

        <div className="flex items-center gap-2">
          <button
            onClick={onRestock}
            className="btn btn-sm btn-success gap-1.5"
          >
            <TrendingUp size={14} /> Bulk Restock
          </button>
          <button
            onClick={onDelete}
            className="btn btn-sm btn-danger gap-1.5"
          >
            <Trash2 size={14} /> Delete All
          </button>
          <button
            onClick={onClear}
            className="btn btn-sm btn-secondary"
            title="Deselect all"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
