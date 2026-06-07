import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AIInsight, ChatMessage, Alert } from '../types';
import { users as mockUsers, aiInsights as mockInsights, keyMetrics } from '../data/mockData';

interface DashboardState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  planFilter: string;
  setPlanFilter: (filter: string) => void;
  insights: AIInsight[];
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  dismissAlert: (id: string) => void;
  settings: { name: string; email: string; avatar: string; notifications: { email: boolean; push: boolean; weekly: boolean; alerts: boolean }; theme: 'dark' | 'light' };
  updateSettings: (settings: Partial<DashboardState['settings']>) => void;
  metrics: typeof keyMetrics;
  notificationCount: number;
  decrementNotifications: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      users: mockUsers,
      selectedUser: null,
      setSelectedUser: (user) => set({ selectedUser: user }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      planFilter: '',
      setPlanFilter: (filter) => set({ planFilter: filter }),
      insights: mockInsights,
      chatMessages: [],
      addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
      alerts: [],
      addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
      dismissAlert: (id) => set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
      settings: {
        name: 'Alex Thompson',
        email: 'alex@neuralmetrics.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        notifications: { email: true, push: true, weekly: true, alerts: true },
        theme: 'dark',
      },
      updateSettings: (newSettings) => set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      metrics: keyMetrics,
      notificationCount: 3,
      decrementNotifications: () => set((state) => ({ notificationCount: Math.max(0, state.notificationCount - 1) })),
    }),
    { name: 'neuralmetrics-storage', partialize: (state) => ({ theme: state.theme, settings: state.settings, sidebarCollapsed: state.sidebarCollapsed }) }
  )
);
