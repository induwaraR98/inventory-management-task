import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { categoryValidationSchema } from '../../utils/validationSchemas';

function FieldError({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => <p className="text-red-500 text-xs mt-1">⚠ {msg}</p>}
    />
  );
}

export default function CategoryFormModal({ category, onClose }) {
  const { addCategory, renameCategory, categories } = useInventory();
  const isEditing = Boolean(category);

  const validate = (values) => {
    const errors = {};
    if (
      values.name.trim().toLowerCase() !== (category || '').toLowerCase() &&
      categories.some((c) => c.toLowerCase() === values.name.trim().toLowerCase())
    ) {
      errors.name = 'A category with this name already exists';
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const name = values.name.trim();
    if (isEditing) {
      renameCategory(category, name);
    } else {
      addCategory(name);
    }
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-sm" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-theme">
          <h2 className="text-lg font-semibold text-primary">
            {isEditing ? 'Rename Category' : 'Add Category'}
          </h2>
          <button onClick={onClose} className="btn btn-icon btn-secondary">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ name: category || '' }}
          validationSchema={categoryValidationSchema}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="p-6 space-y-4">
              <div>
                <label className="label" htmlFor="cat-name">Category Name *</label>
                <Field
                  id="cat-name"
                  name="name"
                  placeholder="e.g. Electronics"
                  className={`input ${touched.name && errors.name ? 'input-error' : ''}`}
                  autoFocus
                />
                <FieldError name="name" />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1">
                  {isSubmitting ? 'Saving...' : isEditing ? 'Rename' : 'Add Category'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
