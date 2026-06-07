import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useDashboardStore } from '../../store/dashboardStore';

export function Layout() {
  const { sidebarCollapsed } = useDashboardStore();

  return (
    <div className="min-h-screen bg-space-950">
      <Sidebar />
      <motion.div initial={false} animate={{ marginLeft: sidebarCollapsed ? 72 : 240 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="min-h-screen flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neural-500/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-400/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}
