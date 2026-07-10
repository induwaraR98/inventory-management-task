/**
 * Generates a unique product SKU in the format PRD-XXXXXX
 * Ensures no collision with existing IDs.
 * @param {Array} existingProducts - Current list of products
 * @returns {string} A unique SKU string
 */
export function generateSKU(existingProducts = []) {
  const existingIds = new Set(existingProducts.map((p) => p.id));

  let sku;
  do {
    const num = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    sku = `PRD-${num}`;
  } while (existingIds.has(sku));

  return sku;
}

/**
 * Generates a unique ID for stock history entries.
 * @returns {string}
 */
export function generateHistoryId() {
  return `SH-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}
