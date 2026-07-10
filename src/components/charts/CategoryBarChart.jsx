import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const COLORS = [
  '#6366f1', '#8b5cf6', '#10b981', '#f59e0b',
  '#ef4444', '#3b82f6', '#ec4899', '#14b8a6',
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-theme rounded-xl px-4 py-2.5 shadow-xl text-sm">
        <p className="font-semibold text-primary mb-1">{label}</p>
        <p className="text-secondary">{payload[0].value} product{payload[0].value !== 1 ? 's' : ''}</p>
      </div>
    );
  }
  return null;
};

export default function CategoryBarChart({ data }) {
  const { isDark } = useTheme();
  const axisColor = isDark ? '#475569' : '#cbd5e1';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted text-sm">
        No category data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={axisColor} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: textColor }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={40}
        />
        <YAxis
          tick={{ fontSize: 11, fill: textColor }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgb(99 102 241 / 0.08)' }} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
