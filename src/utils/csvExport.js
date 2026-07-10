/**
 * Exports product list to a CSV file download.
 * @param {Array} products - Array of product objects
 * @param {string} filename - Optional filename
 */
export function exportProductsToCSV(products, filename = 'inventory') {
  const headers = [
    'SKU',
    'Product Name',
    'Category',
    'Price ($)',
    'Stock Quantity',
    'Stock Status',
    'Total Value ($)',
    'Created Date',
  ];

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';
  };

  const escapeCSV = (val) => {
    const str = String(val ?? '');
    // Wrap in quotes if contains comma, quote, or newline
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = products.map((p) => [
    escapeCSV(p.id),
    escapeCSV(p.name),
    escapeCSV(p.category),
    p.price.toFixed(2),
    p.stock,
    getStockStatus(p.stock),
    (p.price * p.stock).toFixed(2),
    new Date(p.createdAt).toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
