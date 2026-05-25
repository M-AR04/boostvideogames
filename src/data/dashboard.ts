export interface DashboardStats {
  totalSalesToday: number;
  totalSalesWeek: number;
  totalSalesMonth: number;
  ordersToday: number;
  activeRepairs: number;
  lowStockAlerts: number;
  customersToday: number;
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface InventoryAlert {
  id: string;
  productName: string;
  currentStock: number;
  minStock: number;
  category: string;
  severity: 'critical' | 'low' | 'warning';
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export const dashboardStats: DashboardStats = {
  totalSalesToday: 1245.97,
  totalSalesWeek: 7832.50,
  totalSalesMonth: 28450.00,
  ordersToday: 12,
  activeRepairs: 4,
  lowStockAlerts: 3,
  customersToday: 18,
};

export const weeklySales: SalesDataPoint[] = [
  { date: 'Sun', revenue: 980, orders: 8 },
  { date: 'Mon', revenue: 1250, orders: 11 },
  { date: 'Tue', revenue: 890, orders: 7 },
  { date: 'Wed', revenue: 1100, orders: 9 },
  { date: 'Thu', revenue: 1450, orders: 14 },
  { date: 'Fri', revenue: 1920, orders: 18 },
  { date: 'Sat', revenue: 1645, orders: 15 },
];

export const monthlySales: SalesDataPoint[] = [
  { date: 'Jan', revenue: 18500, orders: 145 },
  { date: 'Feb', revenue: 21300, orders: 168 },
  { date: 'Mar', revenue: 19800, orders: 155 },
  { date: 'Apr', revenue: 24100, orders: 192 },
  { date: 'May', revenue: 28450, orders: 215 },
];

export const inventoryAlerts: InventoryAlert[] = [
  { id: '1', productName: 'PS5 Slim Digital', currentStock: 2, minStock: 5, category: 'Consoles', severity: 'critical' },
  { id: '2', productName: 'Finalmouse PAW3950', currentStock: 3, minStock: 5, category: 'Mice', severity: 'low' },
  { id: '3', productName: 'Logitech G502 X', currentStock: 4, minStock: 5, category: 'Mice', severity: 'warning' },
];

export const recentOrders: RecentOrder[] = [
  { id: '1', orderNumber: 'ORD-2026-0142', customer: 'فيصل الحربي', items: ['PS5 Slim Disc', 'Extra DualSense'], total: 519.98, status: 'processing', date: '2026-05-24T18:30:00Z' },
  { id: '2', orderNumber: 'ORD-2026-0141', customer: 'نور الشمري', items: ['AttackShark X68 Max'], total: 69.99, status: 'delivered', date: '2026-05-24T15:15:00Z' },
  { id: '3', orderNumber: 'ORD-2026-0140', customer: 'ريم الأحمد', items: ['Xbox Controller x2'], total: 79.98, status: 'shipped', date: '2026-05-24T12:00:00Z' },
  { id: '4', orderNumber: 'ORD-2026-0139', customer: 'طارق بدر', items: ['Logitech Superlight 2 SE', 'AttackShark R85 HE'], total: 164.98, status: 'delivered', date: '2026-05-24T10:45:00Z' },
  { id: '5', orderNumber: 'ORD-2026-0138', customer: 'هند القحطاني', items: ['Nintendo Switch 2'], total: 369.99, status: 'pending', date: '2026-05-24T09:20:00Z' },
];

export const topProducts = [
  { name: 'PS5 Slim Disc', sales: 28, revenue: 13439.72 },
  { name: 'Xbox Controller', sales: 45, revenue: 1799.55 },
  { name: 'Logitech Superlight 2 SE', sales: 22, revenue: 2419.78 },
  { name: 'Nintendo Switch 2', sales: 18, revenue: 6659.82 },
  { name: 'AttackShark X98 Pro', sales: 15, revenue: 899.85 },
];
