import React from 'react';
import { X } from 'lucide-react';

// Stub — Full implementation in Step 5
export default function ProductFormModal({ product, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="btn btn-icon btn-secondary">
            <X size={16} />
          </button>
        </div>
        <p className="text-muted text-sm text-center py-8">
          Full form coming in Step 5 (Formik + Yup validation)
        </p>
        <button onClick={onClose} className="btn btn-secondary w-full mt-2">Close</button>
      </div>
    </div>
  );
}
