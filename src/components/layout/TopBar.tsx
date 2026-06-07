import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export function TopBar() {
  const { settings, notificationCount, decrementNotifications } = useDashboardStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Revenue milestone reached', message: 'MRR exceeded $240K', time: '2m ago' },
    { id: 2, title: 'New user signup', message: 'Enterprise user from Tokyo', time: '15m ago' },
    { id: 3, title: 'Alert: API latency', message: 'p95 latency above threshold', time: '1h ago' },
  ];

  return (
    <header className="h-16 bg-space-900/60 backdrop-blur-xl border-b border-space-800 sticky top-0 z-30">
      <div className="flex items-center justify-between h-full px-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search..." className="w-full bg-space-800/50 border border-space-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-400/50 focus:border-electric-400/50 transition-all" />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }} className="relative w-10 h-10 rounded-lg bg-space-800/50 hover:bg-space-800 flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              {notificationCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-medium">{notificationCount}</span>}
            </motion.button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute right-0 top-full mt-2 w-80 bg-space-800 rounded-xl border border-space-700 shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-space-700"><h3 className="font-medium text-gray-200">Notifications</h3></div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <button key={notif.id} onClick={() => decrementNotifications()} className="w-full p-3 hover:bg-space-700/50 text-left transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-2 rounded-full bg-electric-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-200 font-medium">{notif.title}</p>
                            <p className="text-xs text-gray-400 truncate">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }} className="flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-space-800/50 hover:bg-space-800 transition-colors">
              <img src={settings.avatar} alt={settings.name} className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-sm text-gray-300 hidden sm:block">{settings.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </motion.button>
            <AnimatePresence>
              {showUserMenu && (
                <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute right-0 top-full mt-2 w-56 bg-space-800 rounded-xl border border-space-700 shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-space-700">
                    <p className="font-medium text-gray-200">{settings.name}</p>
                    <p className="text-xs text-gray-400">{settings.email}</p>
                  </div>
                  <div className="p-1">
                    <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-300 hover:bg-space-700 rounded-lg transition-colors"><User className="w-4 h-4" />Profile</button>
                    <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-300 hover:bg-space-700 rounded-lg transition-colors"><Settings className="w-4 h-4" />Settings</button>
                    <div className="h-px bg-space-700 my-1" />
                    <button className="w-full flex items-center gap-2 p-2 text-sm text-red-400 hover:bg-space-700 rounded-lg transition-colors"><LogOut className="w-4 h-4" />Sign out</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
