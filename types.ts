
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
  badge?: string;
}

export interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  valueLabel: string;
  buttonText: string;
  theme: 'purple' | 'blue' | 'orange';
  badge?: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string; // ISO string
  status: 'success' | 'pending' | 'failed';
}

export interface RewardStatus {
  currentDay: number;
  lastClaimedTimestamp: number;
}

export interface User {
  name: string;
  email: string;
  balance: number;
  profileImage?: string;
  isSubscribed?: boolean;
  subscriptionPlan?: string;
  transactions?: Transaction[];
  rewardStatus?: RewardStatus;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  amount: string; // For email body clarity
  duration: string;
  recommended?: boolean;
}
