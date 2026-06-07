import type { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  mrr: number;
  lastActive: string;
  status: 'Active' | 'Inactive';
  signupDate: string;
  location: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface RegionalSession {
  region: string;
  sessions: number;
  percentage: number;
  trend: number;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: 'Revenue' | 'Churn' | 'Growth' | 'Security' | 'Performance';
  confidence: number;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface GrowthData {
  month: string;
  newUsers: number;
  returningUsers: number;
}

export interface HourlyTraffic {
  day: number;
  hour: number;
  value: number;
}

export interface FunnelStep {
  name: string;
  value: number;
  percentage: number;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
  icon: ReactNode;
  delay?: number;
}

export interface AIInsightCardProps {
  insight: AIInsight;
  delay?: number;
}

export interface AlertCardProps {
  alert: Alert;
  onDismiss?: () => void;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: string;
}
