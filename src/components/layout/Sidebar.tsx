import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BarChart3, Brain, Users, DollarSign, Settings, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useDashboardStore } from '../../store/dashboardStore';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'AI Insights', href: '/insights', icon: Brain },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-space-900/80 backdrop-blur-xl border-r border-space-800 z-40"
    >
      <div className="flex items-center h-16 px-4 border-b border-space-800">
        <motion.div className="flex items-center gap-3" initial={false} animate={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-400 to-neural-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="font-display font-bold text-lg text-gradient whitespace-nowrap">
                NeuralMetrics
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <NavLink key={item.name} to={item.href} className={twMerge(clsx('flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group', isActive ? 'text-electric-400 bg-electric-400/10' : 'text-gray-400 hover:text-gray-200 hover:bg-space-800'))}>
              {isActive && <motion.div layoutId="activeIndicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-electric-400" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="font-medium text-sm">
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      <button onClick={toggleSidebar} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-space-800 hover:bg-space-700 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors">
        <motion.svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ rotate: sidebarCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <path d="m15 18-6-6 6-6" />
        </motion.svg>
      </button>
    </motion.aside>
  );
}
