import * as Yup from 'yup';

export const productValidationSchema = (existingProducts = [], editingId = null) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(2, 'Product name must be at least 2 characters')
      .max(100, 'Product name must be at most 100 characters')
      .required('Product name is required'),

    id: Yup.string()
      .trim()
      .matches(/^PRD-\d{6}$/, 'SKU must be in format PRD-XXXXXX (e.g. PRD-482910)')
      .required('SKU is required')
      .test('unique-sku', 'This SKU is already used by another product', (value) => {
        if (!value) return true;
        const conflict = existingProducts.find(
          (p) => p.id === value && p.id !== editingId
        );
        return !conflict;
      }),

    category: Yup.string()
      .trim()
      .required('Category is required'),

    price: Yup.number()
      .typeError('Price must be a number')
      .min(0.01, 'Price must be greater than 0')
      .max(1000000, 'Price seems too high')
      .required('Price is required'),

    stock: Yup.number()
      .typeError('Stock must be a number')
      .integer('Stock must be a whole number')
      .min(0, 'Stock cannot be negative')
      .max(999999, 'Stock quantity seems too high')
      .required('Stock quantity is required'),
  });

export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name must be at most 50 characters')
    .required('Category name is required'),
});

export const stockAdjustValidationSchema = Yup.object({
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(999999, 'Quantity seems too high')
    .required('Quantity is required'),
  note: Yup.string()
    .max(200, 'Note must be at most 200 characters'),
});
