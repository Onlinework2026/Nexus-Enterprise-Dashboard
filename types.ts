
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  status: 'active' | 'archived' | 'draft';
  updatedAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  activeUsers: number;
  newOrders: number;
  conversionRate: number;
}
