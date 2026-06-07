import type { User, RevenueData, GrowthData, RegionalSession, AIInsight, HourlyTraffic, FunnelStep } from '../types';

export const getAvatar = (name: string): string =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

export const revenueData: RevenueData[] = [
  { month: 'Jul', revenue: 189000, expenses: 98000, profit: 91000 },
  { month: 'Aug', revenue: 198500, expenses: 102000, profit: 96500 },
  { month: 'Sep', revenue: 215000, expenses: 105000, profit: 110000 },
  { month: 'Oct', revenue: 224500, expenses: 108500, profit: 116000 },
  { month: 'Nov', revenue: 241000, expenses: 112000, profit: 129000 },
  { month: 'Dec', revenue: 267500, expenses: 118000, profit: 149500 },
  { month: 'Jan', revenue: 278000, expenses: 122000, profit: 156000 },
  { month: 'Feb', revenue: 285500, expenses: 125000, profit: 160500 },
  { month: 'Mar', revenue: 298000, expenses: 128000, profit: 170000 },
  { month: 'Apr', revenue: 312500, expenses: 132000, profit: 180500 },
  { month: 'May', revenue: 318000, expenses: 135000, profit: 183000 },
  { month: 'Jun', revenue: 320000, expenses: 138000, profit: 182000 },
];

export const userGrowthData: GrowthData[] = [
  { month: 'Jul', newUsers: 4200, returningUsers: 8500 },
  { month: 'Aug', newUsers: 4800, returningUsers: 9200 },
  { month: 'Sep', newUsers: 5100, returningUsers: 9800 },
  { month: 'Oct', newUsers: 5600, returningUsers: 10500 },
  { month: 'Nov', newUsers: 6200, returningUsers: 11200 },
  { month: 'Dec', newUsers: 6800, returningUsers: 12100 },
  { month: 'Jan', newUsers: 7500, returningUsers: 13500 },
  { month: 'Feb', newUsers: 8200, returningUsers: 14800 },
  { month: 'Mar', newUsers: 8800, returningUsers: 16200 },
  { month: 'Apr', newUsers: 9400, returningUsers: 17800 },
  { month: 'May', newUsers: 10200, returningUsers: 19500 },
  { month: 'Jun', newUsers: 11000, returningUsers: 21500 },
];

const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Parker', 'Blake', 'Cameron', 'Drew', 'Finley', 'Harper', 'Jamie', 'Kennedy', 'Logan', 'Reese', 'Sage', 'Skyler', 'Emery', 'Hayden', 'Peyton', 'Dakota', 'London', 'Phoenix', 'Rivers', 'Rowan', 'Sawyer', 'Spencer', 'Sydney', 'Tatum', 'Winter', 'Zion', 'Brook', 'Dale', 'Eden', 'Francis', 'Gale', 'Haze', 'Indigo', 'Jade', 'Kai', 'Lake', 'Moss', 'Nova', 'Ocean', 'River', 'Sol', 'Vale'];
const lastNames = ['Chen', 'Patel', 'Kim', 'Singh', 'Nguyen', 'Garcia', 'Martinez', 'Anderson', 'Thompson', 'Wilson', 'Brown', 'Davis', 'Miller', 'Moore', 'Jackson', 'White', 'Harris', 'Martin', 'Robinson', 'Clark', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Evans', 'Torres', 'Lopez', 'Ramirez', 'Hill', 'Flores', 'Cooper', 'Reed', 'Cook', 'Morgan'];
const cities = ['New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Berlin, DE', 'Toronto, CA', 'Paris, FR', 'Singapore, SG', 'Mumbai, IN', 'Sao Paulo, BR'];
const plans: ('Free' | 'Pro' | 'Enterprise')[] = ['Free', 'Pro', 'Enterprise'];

export const users: User[] = Array.from({ length: 50 }, (_, i) => {
  const firstName = firstNames[i];
  const lastName = lastNames[i % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const plan = plans[Math.floor(Math.random() * 3)];
  return {
    id: `user-${i + 1}`,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    avatar: getAvatar(name),
    plan,
    mrr: plan === 'Free' ? 0 : plan === 'Pro' ? 29 + Math.floor(Math.random() * 50) : 199 + Math.floor(Math.random() * 500),
    lastActive: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: Math.random() > 0.15 ? 'Active' : 'Inactive',
    signupDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    location: cities[Math.floor(Math.random() * cities.length)],
  };
});

export const regionalSessions: RegionalSession[] = [
  { region: 'North America', sessions: 45234, percentage: 38.2, trend: 12.4 },
  { region: 'Europe', sessions: 32156, percentage: 27.2, trend: 8.7 },
  { region: 'Asia Pacific', sessions: 24890, percentage: 21.0, trend: 24.2 },
  { region: 'Latin America', sessions: 8456, percentage: 7.1, trend: -3.2 },
  { region: 'Middle East', sessions: 4890, percentage: 4.1, trend: 15.8 },
  { region: 'Africa', sessions: 2134, percentage: 1.8, trend: 6.4 },
];

export const aiInsights: AIInsight[] = [
  { id: '1', title: 'Revenue Spike in APAC', description: 'Revenue increased 34% above forecast in APAC region this week.', category: 'Revenue', confidence: 94, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), priority: 'high', icon: 'TrendingUp' },
  { id: '2', title: 'Churn Risk Detected', description: '2,341 users have been inactive for 14+ days showing churn indicators.', category: 'Churn', confidence: 89, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), priority: 'high', icon: 'AlertTriangle' },
  { id: '3', title: 'Conversion Improved', description: 'New checkout flow improved conversion by 12.3% since deployment.', category: 'Growth', confidence: 97, timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), priority: 'medium', icon: 'CheckCircle' },
  { id: '4', title: 'API Latency Anomaly', description: '/api/analytics showing 340ms avg response, 85% above baseline.', category: 'Performance', confidence: 86, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), priority: 'high', icon: 'Activity' },
  { id: '5', title: 'Feature Adoption High', description: '68% of Enterprise users enabled custom widgets within first week.', category: 'Growth', confidence: 91, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), priority: 'medium', icon: 'LayoutDashboard' },
  { id: '6', title: 'Security Alert', description: 'Unusual login pattern detected from multiple countries for one account.', category: 'Security', confidence: 78, timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), priority: 'high', icon: 'Shield' },
];

export const hourlyTraffic: HourlyTraffic[] = Array.from({ length: 168 }, (_, i) => ({
  day: Math.floor(i / 24),
  hour: i % 24,
  value: Math.floor(Math.random() * 1000) + 100 + (i % 24 >= 9 && i % 24 <= 17 ? 500 : 0),
}));

export const funnelData: FunnelStep[] = [
  { name: 'Visit', value: 245678, percentage: 100 },
  { name: 'Signup', value: 42145, percentage: 17.1 },
  { name: 'Trial', value: 18342, percentage: 7.5 },
  { name: 'Paid', value: 8234, percentage: 3.4 },
];

export const cityCoordinates = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, color: '#00d4ff' },
  { name: 'London', lat: 51.5074, lng: -0.1278, color: '#00d4ff' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, color: '#7c3aed' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, color: '#7c3aed' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, color: '#f59e0b' },
];

export const keyMetrics = {
  totalRevenue: 2847392,
  activeUsers: 142853,
  conversionRate: 4.73,
  churnRate: 1.2,
  mrr: 237283,
  arr: 2847396,
  ltv: 2847,
  cac: 127,
};
