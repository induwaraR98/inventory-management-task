import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/categories': 'Categories',
  '/stock-history': 'Stock History',
};

export default function TopBar({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'InvenTrack';

  return (
    <header className="bg-surface border-b border-theme px-4 md:px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
      {/* Left: Hamburger + Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="btn btn-icon btn-secondary lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          <p className="text-xs text-muted hidden sm:block">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-icon btn-secondary tooltip-container"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-indigo-500" />
          )}
          <span className="tooltip">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </header>
  );
}
