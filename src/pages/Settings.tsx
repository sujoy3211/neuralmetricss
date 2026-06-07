import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Palette, Key, Link2, Trash2, Eye, EyeOff, Copy, RefreshCw, Check, CreditCard, MessageSquare, Database, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tooltip } from '../components/ui/Tooltip';
import { useDashboardStore } from '../store/dashboardStore';

const apiKeys = [
  { id: 'key-1', name: 'Production API Key', key: 'nm_live_****************************a3f7', createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), lastUsed: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
  { id: 'key-2', name: 'Development API Key', key: 'nm_test_****************************b8e2', createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
];

const integrations = [
  { id: 'int-1', name: 'Stripe', icon: 'CreditCard', status: 'connected', connectedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'int-2', name: 'Slack', icon: 'MessageSquare', status: 'connected', connectedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'int-3', name: 'HubSpot', icon: 'Database', status: 'disconnected' },
  { id: 'int-4', name: 'Zapier', icon: 'Zap', status: 'connected', connectedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
];

export function Settings() {
  const { settings, updateSettings, theme, setTheme } = useDashboardStore();
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const integrationIcons: Record<string, React.ReactNode> = {
    CreditCard: <CreditCard className="w-5 h-5" />,
    MessageSquare: <MessageSquare className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div><h1 className="text-2xl font-display font-bold text-gray-100">Settings</h1><p className="text-gray-400 mt-1">Manage your account and preferences</p></div>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center gap-3 mb-6"><User className="w-5 h-5 text-electric-400" /><h2 className="text-lg font-medium text-gray-200">Profile</h2></div>
        <div className="flex items-start gap-6">
          <div className="relative">
            <img src={settings.avatar} alt={settings.name} className="w-20 h-20 rounded-xl object-cover" />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-400 mb-1">Full Name</label><input type="text" value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} className="w-full bg-space-800 border border-space-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-electric-400/50" /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Email</label><input type="email" value={settings.email} onChange={(e) => updateSettings({ email: e.target.value })} className="w-full bg-space-800 border border-space-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-electric-400/50" /></div>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center gap-3 mb-6"><Bell className="w-5 h-5 text-electric-400" /><h2 className="text-lg font-medium text-gray-200">Notifications</h2></div>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email notifications', description: 'Receive updates via email' },
            { key: 'push', label: 'Push notifications', description: 'Browser push notifications' },
            { key: 'weekly', label: 'Weekly digest', description: 'Summary of your metrics' },
            { key: 'alerts', label: 'Real-time alerts', description: 'Critical event notifications' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-space-800/50 hover:bg-space-800 transition-colors">
              <div><p className="text-gray-200">{item.label}</p><p className="text-sm text-gray-500">{item.description}</p></div>
              <button onClick={() => updateSettings({ notifications: { ...settings.notifications, [item.key]: !settings.notifications[item.key as keyof typeof settings.notifications] } })} className={`relative w-12 h-6 rounded-full transition-colors ${settings.notifications[item.key as keyof typeof settings.notifications] ? 'bg-electric-400' : 'bg-space-700'}`}>
                <motion.div animate={{ x: settings.notifications[item.key as keyof typeof settings.notifications] ? 24 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg" />
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center gap-3 mb-6"><Palette className="w-5 h-5 text-electric-400" /><h2 className="text-lg font-medium text-gray-200">Theme</h2></div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setTheme('dark')} className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-electric-400 bg-electric-400/10' : 'border-space-700 hover:border-space-600'}`}>
            <div className="w-full h-24 rounded-lg bg-gradient-to-br from-space-950 to-space-800 mb-3 flex items-center justify-center"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-400 to-neural-500" /></div>
            <p className="font-medium text-gray-200">Dark</p><p className="text-sm text-gray-500">Optimized for low light</p>
          </button>
          <button onClick={() => setTheme('light')} className={`p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-electric-400 bg-electric-400/10' : 'border-space-700 hover:border-space-600'}`}>
            <div className="w-full h-24 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 mb-3 flex items-center justify-center"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" /></div>
            <p className="font-medium text-gray-200">Light</p><p className="text-sm text-gray-500">Classic light theme</p>
          </button>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3"><Key className="w-5 h-5 text-electric-400" /><h2 className="text-lg font-medium text-gray-200">API Keys</h2></div>
          <Button variant="secondary" size="sm"><RefreshCw className="w-4 h-4 mr-2" />Generate New Key</Button>
        </div>
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-4 rounded-lg bg-space-800/50 border border-space-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><p className="font-medium text-gray-200">{apiKey.name}</p><Badge variant="default" size="sm">Active</Badge></div>
                <div className="flex items-center gap-2">
                  <Tooltip content="Show/Hide"><button onClick={() => setShowApiKey(showApiKey === apiKey.id ? null : apiKey.id)} className="p-2 rounded-lg bg-space-700 hover:bg-space-600 text-gray-400 hover:text-gray-200 transition-colors">{showApiKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></Tooltip>
                  <Tooltip content="Copy"><button onClick={() => handleCopyKey(apiKey.key)} className="p-2 rounded-lg bg-space-700 hover:bg-space-600 text-gray-400 hover:text-gray-200 transition-colors">{copiedKey === apiKey.key ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}</button></Tooltip>
                </div>
              </div>
              <p className="font-mono text-sm text-gray-400 truncate">{apiKey.key}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500"><span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span><span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span></div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center gap-3 mb-6"><Link2 className="w-5 h-5 text-electric-400" /><h2 className="text-lg font-medium text-gray-200">Integrations</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="p-4 rounded-lg bg-space-800/50 border border-space-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-space-700 text-gray-400">{integrationIcons[integration.icon] || <Link2 className="w-5 h-5" />}</div>
                <div><p className="font-medium text-gray-200">{integration.name}</p><p className="text-xs text-gray-500">{integration.status === 'connected' ? `Connected ${integration.connectedAt ? new Date(integration.connectedAt).toLocaleDateString() : ''}` : 'Not connected'}</p></div>
              </div>
              <Button variant={integration.status === 'connected' ? 'secondary' : 'primary'} size="sm">{integration.status === 'connected' ? 'Manage' : 'Connect'}</Button>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl p-6 border border-red-500/30 bg-red-500/5">
        <div className="flex items-center gap-3 mb-6"><Trash2 className="w-5 h-5 text-red-400" /><h2 className="text-lg font-medium text-red-400">Danger Zone</h2></div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-space-800/50 border border-space-700">
          <div><p className="font-medium text-gray-200">Delete Account</p><p className="text-sm text-gray-500">Permanently delete your account and all associated data</p></div>
          <Tooltip content="This action cannot be undone"><span><Button variant="danger" disabled>Delete Account</Button></span></Tooltip>
        </div>
      </motion.section>
    </div>
  );
}
