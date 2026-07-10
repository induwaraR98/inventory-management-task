import React from 'react';
import { useInventory } from '../contexts/InventoryContext';
import StatCard from '../components/stats/StatCard';
import CategoryBarChart from '../components/charts/CategoryBarChart';
import StockPieChart from '../components/charts/StockPieChart';
import {
  Package,
  DollarSign,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { products, stockHistory, getStats } = useInventory();
  const stats = getStats();
  const navigate = useNavigate();

  const recentHistory = stockHistory.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
        <p className="text-secondary text-sm mt-1">
          Welcome back! Here's your inventory at a glance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          subtitle="Across all categories"
          icon={Package}
          gradient="gradient-primary"
          trendLabel="All items"
        />
        <StatCard
          title="Inventory Value"
          value={`$${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="Total stock value"
          icon={DollarSign}
          gradient="gradient-success"
          trendLabel="In stock"
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStock.toLocaleString()}
          subtitle="Items with ≤ 5 units"
          icon={AlertTriangle}
          gradient="gradient-warning"
          trendLabel="Needs restock"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock.toLocaleString()}
          subtitle="Items with 0 units"
          icon={XCircle}
          gradient="gradient-danger"
          trendLabel="Urgent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-primary">Products by Category</h2>
              <p className="text-xs text-muted mt-0.5">Item count per category</p>
            </div>
            <TrendingUp size={18} className="text-indigo-500" />
          </div>
          <CategoryBarChart data={stats.byCategory} />
        </div>

        {/* Stock Status */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-primary">Stock Status</h2>
              <p className="text-xs text-muted mt-0.5">Distribution across {stats.totalProducts} products</p>
            </div>
            <Package size={18} className="text-emerald-500" />
          </div>
          <StockPieChart products={products} />
        </div>
      </div>

      {/* Category Value Table + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Summary */}
        <div className="card">
          <h2 className="text-base font-semibold text-primary mb-4">Category Summary</h2>
          {stats.byCategory.length === 0 ? (
            <p className="text-muted text-sm text-center py-8">No products yet</p>
          ) : (
            <div className="space-y-3">
              {stats.byCategory.map((cat, i) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between p-3 bg-elevated rounded-xl hover:bg-border-theme transition-colors cursor-pointer animate-slide-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => navigate('/products')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
                      {cat.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{cat.name}</p>
                      <p className="text-xs text-muted">{cat.count} product{cat.count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                      ${cat.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted">total value</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Stock Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-primary">Recent Activity</h2>
            <button
              onClick={() => navigate('/stock-history')}
              className="text-xs text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
            >
              View all →
            </button>
          </div>
          {recentHistory.length === 0 ? (
            <p className="text-muted text-sm text-center py-8">No activity yet</p>
          ) : (
            <div className="space-y-3">
              {recentHistory.map((entry, i) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 p-3 bg-elevated rounded-xl animate-slide-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${entry.type === 'restock' ? 'gradient-success' : 'gradient-danger'}`}>
                    {entry.type === 'restock' ? '+' : '-'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{entry.productName}</p>
                    <p className="text-xs text-muted">
                      {entry.type === 'restock' ? 'Restocked' : 'Sold'} {entry.quantity} unit{entry.quantity !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-xs font-semibold ${entry.type === 'restock' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {entry.type === 'restock' ? '+' : '-'}{entry.quantity}
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
