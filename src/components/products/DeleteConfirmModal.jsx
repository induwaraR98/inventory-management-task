import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';

export default function DeleteConfirmModal({ product, onClose }) {
  const { deleteProduct } = useInventory();

  const handleDelete = () => {
    deleteProduct(product.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Delete Product</h2>
          <button onClick={onClose} className="btn btn-icon btn-secondary"><X size={16} /></button>
        </div>
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <p className="text-primary font-semibold mb-2">Are you sure?</p>
          <p className="text-secondary text-sm mb-1">
            You are about to delete <span className="font-semibold text-primary">{product.name}</span>
          </p>
          <p className="text-muted text-xs">This action cannot be undone.</p>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
          <button onClick={handleDelete} className="btn btn-danger flex-1">Delete</button>
        </div>
      </div>
    </div>
  );
}
