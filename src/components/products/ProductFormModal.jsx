import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X, RefreshCw, Plus } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { productValidationSchema } from '../../utils/validationSchemas';

function FieldError({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span> {msg}
        </p>
      )}
    />
  );
}

export default function ProductFormModal({ product, onClose }) {
  const { products, categories, addProduct, updateProduct, addCategory, generateSKU } = useInventory();
  const isEditing = Boolean(product);
  const [newCatInput, setNewCatInput] = useState('');
  const [showNewCat, setShowNewCat] = useState(false);
  const [catError, setCatError] = useState('');

  const initialValues = {
    name: product?.name || '',
    id: product?.id || generateSKU(),
    category: product?.category || (categories[0] || ''),
    price: product?.price ?? '',
    stock: product?.stock ?? '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    };

    if (isEditing) {
      updateProduct(product.id, data);
    } else {
      addProduct(data);
    }
    setSubmitting(false);
    onClose();
  };

  const handleAddCategory = (setFieldValue) => {
    const name = newCatInput.trim();
    if (!name) { setCatError('Category name cannot be empty'); return; }
    if (name.length < 2) { setCatError('At least 2 characters'); return; }
    const added = addCategory(name);
    if (!added) { setCatError('Category already exists'); return; }
    setFieldValue('category', name);
    setNewCatInput('');
    setShowNewCat(false);
    setCatError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-theme">
          <div>
            <h2 className="text-lg font-semibold text-primary">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-muted mt-0.5">
              {isEditing ? `Editing ${product.id}` : 'Fill in the details below'}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-icon btn-secondary">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={productValidationSchema(products, product?.id)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="label" htmlFor="name">Product Name *</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="e.g. Wireless Bluetooth Headphones"
                  className={`input ${touched.name && errors.name ? 'input-error' : ''}`}
                />
                <FieldError name="name" />
              </div>

              {/* SKU */}
              <div>
                <label className="label" htmlFor="id">SKU / Product ID *</label>
                <div className="flex gap-2">
                  <Field
                    id="id"
                    name="id"
                    placeholder="PRD-XXXXXX"
                    className={`input font-mono ${touched.id && errors.id ? 'input-error' : ''}`}
                  />
                  {!isEditing && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-icon flex-shrink-0 tooltip-container"
                      onClick={() => setFieldValue('id', generateSKU())}
                      title="Generate new SKU"
                    >
                      <RefreshCw size={15} />
                      <span className="tooltip">Regenerate SKU</span>
                    </button>
                  )}
                </div>
                <FieldError name="id" />
              </div>

              {/* Category */}
              <div>
                <label className="label" htmlFor="category">Category *</label>
                <div className="flex gap-2">
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className={`input ${touched.category && errors.category ? 'input-error' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Field>
                  <button
                    type="button"
                    className="btn btn-secondary btn-icon flex-shrink-0 tooltip-container"
                    onClick={() => setShowNewCat((v) => !v)}
                    title="Add new category"
                  >
                    <Plus size={15} />
                    <span className="tooltip">New category</span>
                  </button>
                </div>
                <FieldError name="category" />

                {/* Inline new category input */}
                {showNewCat && (
                  <div className="mt-2 flex gap-2 animate-fade-in">
                    <input
                      type="text"
                      value={newCatInput}
                      onChange={(e) => { setNewCatInput(e.target.value); setCatError(''); }}
                      placeholder="New category name"
                      className={`input text-sm ${catError ? 'input-error' : ''}`}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory(setFieldValue))}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddCategory(setFieldValue)}
                      className="btn btn-success btn-sm flex-shrink-0"
                    >
                      Add
                    </button>
                  </div>
                )}
                {catError && <p className="text-red-500 text-xs mt-1">⚠ {catError}</p>}
              </div>

              {/* Price + Stock (side by side) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="price">Price ($) *</label>
                  <Field
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`input ${touched.price && errors.price ? 'input-error' : ''}`}
                  />
                  <FieldError name="price" />
                </div>
                <div>
                  <label className="label" htmlFor="stock">Stock Quantity *</label>
                  <Field
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    className={`input ${touched.stock && errors.stock ? 'input-error' : ''}`}
                  />
                  <FieldError name="stock" />
                </div>
              </div>

              {/* Preview */}
              {values.name && values.price && (
                <div className="bg-elevated border border-theme rounded-xl p-3 text-xs text-secondary animate-fade-in">
                  <span className="font-semibold text-primary">{values.name}</span>
                  {' · '}
                  <span className="font-mono text-indigo-500">{values.id}</span>
                  {' · '}
                  ${Number(values.price || 0).toFixed(2)}
                  {' · '}
                  {values.stock || 0} units
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary flex-1"
                >
                  {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
