export interface Service {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  duration: string;
  icon: string;
  category: 'controller' | 'console' | 'cleaning' | 'modification';
}

export interface RepairTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerPhone: string;
  device: string;
  issue: string;
  status: 'received' | 'diagnosed' | 'awaiting-parts' | 'in-progress' | 'completed' | 'delivered';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  technician: string;
  createdAt: string;
  updatedAt: string;
  estimatedCost: number;
  notes: string[];
}

export const services: Service[] = [
  {
    id: 'controller-drift',
    name: 'Controller Drift Repair',
    nameAr: 'إصلاح انحراف يد التحكم',
    description: 'Fix analog stick drift on PS5, Xbox, and Switch controllers. Includes calibration and testing.',
    descriptionAr: 'إصلاح انحراف عصا التحكم التناظرية لأيدي PS5 وإكس بوكس وسويتش. يشمل المعايرة والاختبار.',
    price: 15,
    duration: '1-2 hours',
    icon: '🕹️',
    category: 'controller',
  },
  {
    id: 'controller-button',
    name: 'Button Replacement',
    nameAr: 'تبديل الأزرار',
    description: 'Replace faulty or worn-out buttons on any controller. Original or aftermarket parts available.',
    descriptionAr: 'استبدال الأزرار التالفة أو المتآكلة لأي يد تحكم. قطع أصلية أو بديلة متوفرة.',
    price: 10,
    duration: '30 min - 1 hour',
    icon: '🔘',
    category: 'controller',
  },
  {
    id: 'console-hdmi',
    name: 'HDMI Port Repair',
    nameAr: 'إصلاح منفذ HDMI',
    description: 'Fix or replace damaged HDMI ports on PS5, Xbox, and Switch docks.',
    descriptionAr: 'إصلاح أو استبدال منافذ HDMI التالفة لأجهزة PS5 وإكس بوكس ودوك سويتش.',
    price: 35,
    duration: '2-4 hours',
    icon: '📺',
    category: 'console',
  },
  {
    id: 'console-ssd',
    name: 'SSD Upgrade / Replacement',
    nameAr: 'ترقية / تبديل SSD',
    description: 'Upgrade or replace your console storage. PS5 M.2 SSD installation included.',
    descriptionAr: 'ترقية أو استبدال تخزين جهازك. تركيب SSD M.2 لل PS5 مشمول.',
    price: 20,
    duration: '1 hour',
    icon: '💾',
    category: 'console',
  },
  {
    id: 'deep-clean',
    name: 'Deep Cleaning Service',
    nameAr: 'خدمة التنظيف العميق',
    description: 'Complete disassembly, dust removal, thermal paste replacement, and reassembly of your console.',
    descriptionAr: 'تفكيك كامل، إزالة الغبار، تبديل المعجون الحراري، وإعادة تجميع جهازك.',
    price: 25,
    duration: '2-3 hours',
    icon: '✨',
    category: 'cleaning',
  },
  {
    id: 'controller-clean',
    name: 'Controller Deep Clean',
    nameAr: 'تنظيف عميق ليد التحكم',
    description: 'Full disassembly and ultrasonic cleaning of your controller. Removes grime and restores like-new feel.',
    descriptionAr: 'تفكيك كامل وتنظيف بالموجات فوق الصوتية ليد التحكم. إزالة الأوساخ واستعادة الشعور الجديد.',
    price: 12,
    duration: '1 hour',
    icon: '🧹',
    category: 'cleaning',
  },
  {
    id: 'custom-shell',
    name: 'Custom Shell Modification',
    nameAr: 'تعديل الهيكل المخصص',
    description: 'Replace your controller shell with custom colors, transparent cases, or themed designs.',
    descriptionAr: 'استبدل هيكل يد التحكم بألوان مخصصة أو حافظات شفافة أو تصاميم مميزة.',
    price: 30,
    duration: '1-2 hours',
    icon: '🎨',
    category: 'modification',
  },
  {
    id: 'trigger-mod',
    name: 'Trigger / Paddle Modification',
    nameAr: 'تعديل الأزرار الخلفية',
    description: 'Add back paddles or hair triggers to your controller for competitive gaming advantage.',
    descriptionAr: 'أضف أزرار خلفية أو أزرار سريعة ليد التحكم لميزة تنافسية.',
    price: 40,
    duration: '2-3 hours',
    icon: '⚡',
    category: 'modification',
  },
];

export const sampleTickets: RepairTicket[] = [
  {
    id: '1',
    ticketNumber: 'BVG-2026-001',
    customerName: 'أحمد الخالدي',
    customerPhone: '079 123 4567',
    device: 'PS5 DualSense',
    issue: 'Right stick drift - severe',
    status: 'in-progress',
    priority: 'high',
    technician: 'محمد',
    createdAt: '2026-05-22T10:00:00Z',
    updatedAt: '2026-05-24T14:30:00Z',
    estimatedCost: 15,
    notes: ['Customer reports drift started 2 weeks ago', 'Replacement stick ordered', 'Part arrived - installation in progress'],
  },
  {
    id: '2',
    ticketNumber: 'BVG-2026-002',
    customerName: 'سارة العمري',
    customerPhone: '078 987 6543',
    device: 'Nintendo Switch OLED',
    issue: 'Screen replacement - cracked display',
    status: 'awaiting-parts',
    priority: 'medium',
    technician: 'خالد',
    createdAt: '2026-05-23T09:15:00Z',
    updatedAt: '2026-05-24T11:00:00Z',
    estimatedCost: 85,
    notes: ['Display cracked from drop', 'OLED panel ordered from supplier'],
  },
  {
    id: '3',
    ticketNumber: 'BVG-2026-003',
    customerName: 'عمر حسن',
    customerPhone: '077 555 1234',
    device: 'PS5 Console',
    issue: 'Overheating and loud fan noise',
    status: 'diagnosed',
    priority: 'medium',
    technician: 'محمد',
    createdAt: '2026-05-24T08:00:00Z',
    updatedAt: '2026-05-24T10:45:00Z',
    estimatedCost: 25,
    notes: ['Heavy dust buildup detected', 'Thermal paste degraded - needs replacement'],
  },
  {
    id: '4',
    ticketNumber: 'BVG-2026-004',
    customerName: 'لينا الجبري',
    customerPhone: '079 222 3344',
    device: 'Xbox Series X Controller',
    issue: 'A button not responding',
    status: 'completed',
    priority: 'low',
    technician: 'خالد',
    createdAt: '2026-05-21T14:00:00Z',
    updatedAt: '2026-05-23T16:00:00Z',
    estimatedCost: 10,
    notes: ['Membrane worn out', 'Button replaced', 'Tested - all buttons working'],
  },
  {
    id: '5',
    ticketNumber: 'BVG-2026-005',
    customerName: 'يوسف المصري',
    customerPhone: '078 111 9988',
    device: 'PS5 Console',
    issue: 'HDMI port not outputting signal',
    status: 'received',
    priority: 'urgent',
    technician: '',
    createdAt: '2026-05-24T16:30:00Z',
    updatedAt: '2026-05-24T16:30:00Z',
    estimatedCost: 35,
    notes: ['Customer says no display output since yesterday'],
  },
];

export const statusColors: Record<RepairTicket['status'], { bg: string; text: string; label: string; labelAr: string }> = {
  'received': { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Received', labelAr: 'مستلم' },
  'diagnosed': { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Diagnosed', labelAr: 'تم التشخيص' },
  'awaiting-parts': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Awaiting Parts', labelAr: 'بانتظار القطع' },
  'in-progress': { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'In Progress', labelAr: 'قيد الإصلاح' },
  'completed': { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Completed', labelAr: 'مكتمل' },
  'delivered': { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Delivered', labelAr: 'تم التسليم' },
};
