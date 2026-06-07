import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, MessageSquare, X, Mail, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useDashboardStore } from '../store/dashboardStore';
import { format } from 'date-fns';

const plans = [{ value: '', label: 'All Plans' }, { value: 'Free', label: 'Free' }, { value: 'Pro', label: 'Pro' }, { value: 'Enterprise', label: 'Enterprise' }];

export function Users() {
  const { users, selectedUser, setSelectedUser, searchQuery, setSearchQuery, planFilter, setPlanFilter } = useDashboardStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlan = !planFilter || user.plan === planFilter;
      return matchesSearch && matchesPlan;
    });
  }, [users, searchQuery, planFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold text-gray-100">Users</h1><p className="text-gray-400 mt-1">Manage and monitor your user base</p></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4 border border-space-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full bg-space-800 border border-space-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-400/50" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select value={planFilter} onChange={(e) => { setPlanFilter(e.target.value); setCurrentPage(1); }} className="bg-space-800 border border-space-700 rounded-lg pl-10 pr-8 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-electric-400/50 cursor-pointer appearance-none">
              {plans.map((plan) => <option key={plan.value} value={plan.value}>{plan.label}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-400">Showing {paginatedUsers.length} of {filteredUsers.length} users</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass rounded-xl border border-space-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-space-700 bg-space-800/50">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">MRR</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Last Active</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-space-700">
              <AnimatePresence>
                {paginatedUsers.map((user, i) => (
                  <motion.tr key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setSelectedUser(user)} className="hover:bg-space-800/50 cursor-pointer transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div><p className="font-medium text-gray-200">{user.name}</p><p className="text-sm text-gray-400">{user.email}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge variant={user.plan === 'Enterprise' ? 'warning' : user.plan === 'Pro' ? 'info' : 'default'}>{user.plan}</Badge></td>
                    <td className="px-6 py-4"><span className="font-mono text-gray-200">${user.mrr.toLocaleString()}</span></td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-400">{format(new Date(user.lastActive), 'MMM d, yyyy')}</span></td>
                    <td className="px-6 py-4"><Badge variant={user.status === 'Active' ? 'success' : 'error'}>{user.status}</Badge></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }} className="p-2 rounded-lg bg-space-700 hover:bg-space-600 text-gray-400 hover:text-electric-400 transition-colors"><Eye className="w-4 h-4" /></motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg bg-space-700 hover:bg-space-600 text-gray-400 hover:text-electric-400 transition-colors"><MessageSquare className="w-4 h-4" /></motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-space-700">
          <div className="text-sm text-gray-400">Page {currentPage} of {totalPages}</div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft className="w-4 h-4" /></Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => Math.max(1, currentPage - 2) + i).filter(p => p <= totalPages).map((pageNum) => (
              <Button key={pageNum} variant={currentPage === pageNum ? 'primary' : 'secondary'} size="sm" onClick={() => setCurrentPage(pageNum)}>{pageNum}</Button>
            ))}
            <Button variant="secondary" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedUser(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-space-900 border-l border-space-700 z-50 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-200">User Details</h2>
                  <button onClick={() => setSelectedUser(null)} className="p-2 rounded-lg hover:bg-space-800 text-gray-400 hover:text-gray-200 transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="text-center mb-6">
                  <img src={selectedUser.avatar} alt={selectedUser.name} className="w-20 h-20 rounded-xl mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-100">{selectedUser.name}</h3>
                  <p className="text-gray-400">{selectedUser.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-space-800/50 text-center"><p className="text-xs text-gray-400 mb-1">MRR</p><p className="font-mono text-lg text-electric-400">${selectedUser.mrr.toLocaleString()}</p></div>
                  <div className="p-4 rounded-lg bg-space-800/50 text-center"><Badge variant={selectedUser.status === 'Active' ? 'success' : 'error'} size="md">{selectedUser.status}</Badge><p className="text-xs text-gray-400 mt-1">Status</p></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-space-800/50"><DollarSign className="w-5 h-5 text-gray-500" /><div><p className="text-xs text-gray-400">Plan</p><p className="text-sm text-gray-200">{selectedUser.plan}</p></div></div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-space-800/50"><MapPin className="w-5 h-5 text-gray-500" /><div><p className="text-xs text-gray-400">Location</p><p className="text-sm text-gray-200">{selectedUser.location}</p></div></div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-space-800/50"><Calendar className="w-5 h-5 text-gray-500" /><div><p className="text-xs text-gray-400">Signed Up</p><p className="text-sm text-gray-200">{format(new Date(selectedUser.signupDate), 'MMMM d, yyyy')}</p></div></div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-space-800/50"><Mail className="w-5 h-5 text-gray-500" /><div><p className="text-xs text-gray-400">Last Active</p><p className="text-sm text-gray-200">{format(new Date(selectedUser.lastActive), 'MMMM d, yyyy')}</p></div></div>
                </div>
                <div className="mt-6 space-y-3">
                  <Button className="w-full" onClick={() => {}}><MessageSquare className="w-4 h-4 mr-2" />Send Message</Button>
                  <Button variant="secondary" className="w-full" onClick={() => {}}>View Activity</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
