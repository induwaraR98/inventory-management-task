import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateSKU, generateHistoryId } from '../utils/skuGenerator';
import {
  SEED_PRODUCTS,
  SEED_STOCK_HISTORY,
  DEFAULT_CATEGORIES,
} from '../data/seedData';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [products, setProducts] = useLocalStorage('ims-products', SEED_PRODUCTS);
  const [categories, setCategories] = useLocalStorage('ims-categories', DEFAULT_CATEGORIES);
  const [stockHistory, setStockHistory] = useLocalStorage('ims-stock-history', SEED_STOCK_HISTORY);

  // ─── Product CRUD ─────────────────────────────────────────────────────────

  const addProduct = useCallback(
    (productData) => {
      const newProduct = {
        ...productData,
        id: productData.id || generateSKU(products),
        createdAt: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);

      // Log initial stock
      if (newProduct.stock > 0) {
        addStockHistoryEntry({
          productId: newProduct.id,
          productName: newProduct.name,
          type: 'restock',
          quantity: newProduct.stock,
          note: 'Initial stock on product creation',
        });
      }

      return newProduct;
    },
    [products, setProducts]
  );

  const updateProduct = useCallback(
    (id, updates) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
      );
    },
    [setProducts]
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    },
    [setProducts]
  );

  const deleteProducts = useCallback(
    (ids) => {
      const idSet = new Set(ids);
      setProducts((prev) => prev.filter((p) => !idSet.has(p.id)));
    },
    [setProducts]
  );

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  // ─── Stock Management ──────────────────────────────────────────────────────

  const addStockHistoryEntry = useCallback(
    ({ productId, productName, type, quantity, note }) => {
      const entry = {
        id: generateHistoryId(),
        productId,
        productName,
        type, // 'restock' | 'sale'
        quantity: Number(quantity),
        note: note || '',
        timestamp: new Date().toISOString(),
      };
      setStockHistory((prev) => [entry, ...prev]);
      return entry;
    },
    [setStockHistory]
  );

  const adjustStock = useCallback(
    ({ productId, type, quantity, note }) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return { success: false, error: 'Product not found' };

      const qty = Number(quantity);
      if (qty <= 0) return { success: false, error: 'Quantity must be greater than 0' };

      let newStock;
      if (type === 'restock') {
        newStock = product.stock + qty;
      } else if (type === 'sale') {
        if (product.stock - qty < 0) {
          return { success: false, error: 'Stock cannot go below zero' };
        }
        newStock = product.stock - qty;
      } else {
        return { success: false, error: 'Invalid adjustment type' };
      }

      updateProduct(productId, { stock: newStock });
      addStockHistoryEntry({ productId, productName: product.name, type, quantity: qty, note });
      return { success: true, newStock };
    },
    [products, updateProduct, addStockHistoryEntry]
  );

  const bulkRestock = useCallback(
    (ids, quantity, note = 'Bulk restock') => {
      ids.forEach((id) => {
        adjustStock({ productId: id, type: 'restock', quantity, note });
      });
    },
    [adjustStock]
  );

  // ─── Category Management ───────────────────────────────────────────────────

  const addCategory = useCallback(
    (name) => {
      const trimmed = name.trim();
      if (!trimmed || categories.includes(trimmed)) return false;
      setCategories((prev) => [...prev, trimmed]);
      return true;
    },
    [categories, setCategories]
  );

  const renameCategory = useCallback(
    (oldName, newName) => {
      const trimmed = newName.trim();
      if (!trimmed || categories.includes(trimmed)) return false;
      setCategories((prev) => prev.map((c) => (c === oldName ? trimmed : c)));
      setProducts((prev) =>
        prev.map((p) => (p.category === oldName ? { ...p, category: trimmed } : p))
      );
      return true;
    },
    [categories, setCategories, setProducts]
  );

  const deleteCategory = useCallback(
    (name) => {
      setCategories((prev) => prev.filter((c) => c !== name));
      // Move products in deleted category to 'Uncategorized'
      setProducts((prev) =>
        prev.map((p) =>
          p.category === name ? { ...p, category: 'Uncategorized' } : p
        )
      );
    },
    [setCategories, setProducts]
  );

  // ─── Derived stats ─────────────────────────────────────────────────────────

  const getStats = useCallback(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

    const byCategory = categories.map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
      value: products
        .filter((p) => p.category === cat)
        .reduce((sum, p) => sum + p.price * p.stock, 0),
    })).filter((c) => c.count > 0);

    return { totalProducts, totalValue, outOfStock, lowStock, byCategory };
  }, [products, categories]);

  const value = {
    // State
    products,
    categories,
    stockHistory,
    // Product actions
    addProduct,
    updateProduct,
    deleteProduct,
    deleteProducts,
    getProductById,
    // Stock actions
    adjustStock,
    bulkRestock,
    // Category actions
    addCategory,
    renameCategory,
    deleteCategory,
    // Derived
    getStats,
    generateSKU: () => generateSKU(products),
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used inside InventoryProvider');
  return ctx;
}
