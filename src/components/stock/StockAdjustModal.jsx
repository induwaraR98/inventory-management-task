import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { stockAdjustValidationSchema } from '../../utils/validationSchemas';

function FieldError({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <p className="text-red-500 text-xs mt-1">⚠ {msg}</p>
      )}
    />
  );
}

export default function StockAdjustModal({ product, bulkIds, initialType = 'restock', onClose }) {
  const { adjustStock, bulkRestock, products } = useInventory();
  const isBulk = Boolean(bulkIds && bulkIds.length > 0);
  const [activeType, setActiveType] = React.useState(initialType);

  const bulkProducts = isBulk
    ? products.filter((p) => bulkIds.includes(p.id))
    : null;

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    if (isBulk) {
      bulkRestock(bulkIds, values.quantity, values.note || 'Bulk restock');
      setSubmitting(false);
      onClose();
      return;
    }

    const result = adjustStock({
      productId: product.id,
      type: activeType,
      quantity: values.quantity,
      note: values.note,
    });

    if (!result.success) {
      setFieldError('quantity', result.error);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-theme">
          <div>
            <h2 className="text-lg font-semibold text-primary">
              {isBulk ? `Bulk Restock (${bulkIds.length} items)` : activeType === 'restock' ? 'Restock Product' : 'Record Sale'}
            </h2>
            {!isBulk && (
              <p className="text-xs text-muted mt-0.5">
                {product.name} · Current stock:{' '}
                <span className={`font-semibold ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {product.stock}
                </span>
              </p>
            )}
            {isBulk && (
              <p className="text-xs text-muted mt-0.5">
                {bulkProducts.map((p) => p.name).slice(0, 2).join(', ')}
                {bulkProducts.length > 2 && ` +${bulkProducts.length - 2} more`}
              </p>
            )}
          </div>
          <button onClick={onClose} className="btn btn-icon btn-secondary">
            <X size={16} />
          </button>
        </div>

        {/* Type Toggle (only for single product) */}
        {!isBulk && (
          <div className="flex gap-2 p-4 pb-0">
            <button
              type="button"
              onClick={() => setActiveType('restock')}
              className={`flex-1 btn gap-2 ${activeType === 'restock' ? 'btn-success' : 'btn-secondary'}`}
            >
              <TrendingUp size={15} /> Restock
            </button>
            <button
              type="button"
              onClick={() => setActiveType('sale')}
              className={`flex-1 btn gap-2 ${activeType === 'sale' ? 'btn-danger' : 'btn-secondary'}`}
            >
              <TrendingDown size={15} /> Sale / Reduce
            </button>
          </div>
        )}

        {/* Form */}
        <Formik
          initialValues={{ quantity: '', note: '' }}
          validationSchema={stockAdjustValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="p-6 space-y-4">
              {/* Quantity */}
              <div>
                <label className="label" htmlFor="quantity">
                  {isBulk ? 'Restock Quantity (per item)' : `Quantity to ${activeType === 'restock' ? 'add' : 'remove'}`} *
                </label>
                <Field
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  className={`input text-lg font-semibold ${touched.quantity && errors.quantity ? 'input-error' : ''}`}
                />
                <FieldError name="quantity" />

                {/* Preview new stock */}
                {!isBulk && values.quantity && !errors.quantity && (
                  <div className="mt-2 text-xs text-secondary bg-elevated border border-theme rounded-lg px-3 py-2 animate-fade-in">
                    New stock will be:{' '}
                    <span className={`font-bold text-sm ${
                      activeType === 'restock'
                        ? 'text-emerald-500'
                        : product.stock - Number(values.quantity) < 0
                        ? 'text-red-500'
                        : 'text-amber-500'
                    }`}>
                      {activeType === 'restock'
                        ? product.stock + Number(values.quantity)
                        : Math.max(0, product.stock - Number(values.quantity))}
                    </span>
                    {' '}units
                    {activeType === 'sale' && product.stock - Number(values.quantity) < 0 && (
                      <span className="text-red-500 ml-1">(insufficient stock!)</span>
                    )}
                  </div>
                )}
              </div>

              {/* Note */}
              <div>
                <label className="label" htmlFor="note">Note (optional)</label>
                <Field
                  id="note"
                  name="note"
                  placeholder={activeType === 'restock' ? 'e.g. Supplier delivery #1234' : 'e.g. Online order batch #A210'}
                  className="input"
                />
                <FieldError name="note" />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn flex-1 ${isBulk || activeType === 'restock' ? 'btn-success' : 'btn-danger'}`}
                >
                  {isSubmitting
                    ? 'Saving...'
                    : isBulk
                    ? `Restock ${bulkIds.length} Items`
                    : activeType === 'restock'
                    ? 'Confirm Restock'
                    : 'Confirm Sale'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
