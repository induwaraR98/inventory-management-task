import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, gradient, trend, trendLabel }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg hover-lift ${gradient}`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 right-8 w-20 h-20 bg-white/10 rounded-full translate-y-8" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Icon size={22} className="text-white" />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20`}>
              {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trendLabel}
            </div>
          )}
        </div>

        <p className="text-white/70 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-white/60 text-xs mt-1.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
