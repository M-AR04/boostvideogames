'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Core translation dictionary covering the entire application
export const translations = {
  en: {
    // Navbar
    shop: 'Shop',
    services: 'Repairs & Services',
    dashboard: 'ERP Dashboard',
    cart: 'Cart',
    tagline: '25+ Years Experience',
    roleBadge: 'Demo Role',
    langToggle: 'العربية',
    
    // Footer
    aboutTitle: 'About Boost',
    aboutDesc: 'Established cornerstone of Amman\'s gaming community for over 25 years. Specialized in high-end maintenance, custom controller mods, and elite console retailing.',
    shopHub: 'E-commerce Hub',
    browseConsoles: 'Browse Consoles',
    keyboards: 'Mechanical Keyboards',
    mice: 'Gaming Mice',
    controllers: 'Controllers & Peripherals',
    repairHub: 'MMS Repair Center',
    driftFix: 'Controller Drift Fixing',
    hdmiRepair: 'HDMI Port Repair',
    deepClean: 'Console Deep Cleaning',
    bookRepair: 'Book Repair Service',
    locationTitle: 'Showroom Location',
    locationDesc: 'Al Swaifyeh District, Amman, Jordan',
    phone: '079 529 4030',
    hours: '12:00 PM - 10:00 PM (Daily)',
    rights: '© 2026 Boost Video Game. All Rights Reserved.',
    erpTitle: 'Premium E-commerce & System integration by ANTIGRAVITY',

    // Hero / Landing
    heroSub: 'PREMIER GAMING RETAIL & MAINTENANCE CENTER',
    heroTitle: 'A Higher Level of Gaming',
    heroDesc: 'For over 25 years, Boost Video Game has been the ultimate hub for gamers in Amman, Jordan. We build, retail, upgrade, and repair your favorite gaming hardware with elite precision.',
    shopBtn: 'Explore Shop',
    repairBtn: 'Book Repair Service',
    pillarsTitle: 'Our Core Operations',
    pillar1: 'Premium Retail',
    pillar1Desc: 'Authorized retailer of next-gen consoles, gaming hardware, and professional racing gear.',
    pillar2: 'Specialized Maintenance',
    pillar2Desc: 'Advanced technicians repairing drift, console overheating, chip level fixes, and cleaning.',
    pillar3: 'Community Hub',
    pillar3Desc: 'Decades of experience in Amman gaming market, offering expert advice and specialized setups.',
    featuredTitle: 'Featured Gaming Gear',
    featuredSub: 'Handpicked products from our Swefieh showroom',
    ctaTitle: 'Analog Stick Drift or HDMI Problems?',
    ctaDesc: 'Don\'t let hardware faults ruin your game. Book your device for specialized maintenance today. 90% of repairs completed within 2 hours by our sweat-and-grease experts.',
    ctaBtn: 'Open Repair Ticket',
    reviewTitle: 'Amman Gamers Love Boost',
    review1: '"The best repair center in Swefieh! They fixed my drift on DualSense in 45 minutes. Super clean shop."',
    review1User: 'Zaid A.',
    review2: '"Elite service and original parts. Brought my PS5 for deep cleaning and thermal paste replacement. Running dead quiet now!"',
    review2User: 'Rania H.',

    // Shop Catalog
    catalogTitle: 'Gaming Catalog',
    catalogSub: 'Premium consoles and gamer gear at competitive Jordan prices',
    searchPlaceholder: 'Search hardware, accessories, brands...',
    allCats: 'All Categories',
    allBrands: 'All Brands',
    sortBy: 'Sort By',
    featured: 'Featured First',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    nameSort: 'Name: A to Z',
    resultsCount: 'Showing {n} gaming hardware items',
    noResults: 'No items found matching your filters.',
    clearFilters: 'Clear Filters',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',

    // Product Detail
    backShop: 'Back to Shop',
    overview: 'Product Overview',
    brand: 'Brand',
    availability: 'Availability',
    quantity: 'Quantity',
    successAdd: 'Added to cart successfully!',
    relatedGear: 'Related Gaming Gear',
    specifications: 'Specifications',

    // Cart
    cartTitle: 'Shopping Basket',
    cartSub: 'Complete your high-end gaming hardware acquisition',
    cartEmpty: 'Your shopping cart is currently empty.',
    checkoutTitle: 'Amman Delivery / Store Pickup',
    checkoutDesc: 'Confirm your order details and send your invoice directly to our WhatsApp. Our team will contact you in under 15 minutes to arrange delivery.',
    fullName: 'Full Name',
    phoneLabel: 'Phone Number (e.g., 079...)',
    addressLabel: 'Delivery Address / Store Pickup Instructions',
    orderTotal: 'Order Total',
    totalPrice: 'Total Price',
    clearBasket: 'Clear Basket',
    confirmWhatsApp: 'Send Invoice to WhatsApp 💬',
    successOrder: 'Order Confirmed!',
    successOrderDesc: 'Your invoice has been generated and prepared for WhatsApp redirection. Click below to chat with our agents.',
    itemsCount: 'Items Count',
    summary: 'Order Summary',
    backHome: 'Back to Home',

    // Services (MMS)
    mmsHubTitle: 'MMS Maintenance Hub',
    mmsHubSub: 'Expert hardware diagnostics, deep cleaning and chip level repairs',
    trackStatus: 'Track Repair Status',
    ticketPlaceholder: 'Enter Ticket ID (e.g. BVG-2026-001)',
    searchBtn: 'Search',
    ticketNotFound: 'Ticket number not found in our database.',
    serviceCatalog: 'Maintenance & Mod Catalog',
    duration: 'Duration',
    estCost: 'Estimated Cost',
    bookService: 'Book a Maintenance Appointment',
    yourName: 'Your Name',
    phoneNum: 'Phone Number',
    gamingDevice: 'Gaming Device / Controller',
    selectedService: 'Selected Base Service',
    faultDesc: 'Fault Description / Custom Mods details',
    generateTicket: 'Generate Maintenance Ticket',
    mmsSuccess: 'Ticket Created successfully!',
    mmsSuccessDesc: 'Success! Your device has been booked in the MMS. Your ticket ID is {id}. Click below to send a copy of this ticket to our WhatsApp for immediate confirmation.',
    techNotes: 'Technician Notes',
    noNotes: 'No notes added yet.',
    sampleTickets: 'Sample IDs for testing tracker: BVG-2026-001, BVG-2026-002, BVG-2026-003',
    statusLabel: 'Status',
    technicianLabel: 'Technician',
    createdDate: 'Created Date',
    updatedDate: 'Last Updated',
    
    // Dashboard / ERP
    erpOverview: 'ERP Executive Overview',
    erpSub: 'Unified business intelligence and general ledger',
    liveUpdates: 'Live Updates',
    todayRevenue: 'Today\'s Revenue',
    mmsActive: 'MMS Active Tickets',
    imsStockAlerts: 'IMS Stock Alerts',
    walkins: 'Walk-ins / Visits',
    weeklyRev: 'Weekly Revenue (JOD)',
    topProducts: 'Top Retaining Products',
    recentOrders: 'Recent E-commerce Orders',
    orderId: 'Order ID',
    customer: 'Customer',
    itemsPurchased: 'Items Purchased',
    billingTotal: 'Billing Total',
    workflowStatus: 'Workflow Status',
    
    // Sidebar
    overviewSidebar: 'Overview',
    imsSidebar: 'IMS / Inventory',
    jardSidebar: 'Jard / Auditing',
    mmsSidebar: 'MMS / Repairs',
    backStore: 'Back to Store',
  },
  ar: {
    // Navbar
    shop: 'المتجر',
    services: 'الصيانة والخدمات',
    dashboard: 'نظام ERP',
    cart: 'السلة',
    tagline: 'أكثر من ٢٥ عاماً من الخبرة',
    roleBadge: 'دور التجربة',
    langToggle: 'English',
    
    // Footer
    aboutTitle: 'عن بوست فيديو جيم',
    aboutDesc: 'رائد مجتمع ألعاب الفيديو في عمان لأكثر من ٢٥ عاماً. متخصصون في الصيانة المتقدمة، وتعديل أيدي التحكم، وبيع أجهزة الألعاب الإحترافية.',
    shopHub: 'بوابة المتجر الالكتروني',
    browseConsoles: 'تصفح أجهزة الألعاب',
    keyboards: 'كيبوردات ميكانيكية',
    mice: 'ماوسات ألعاب احترافية',
    controllers: 'أيدي تحكم واكسسوارات',
    repairHub: 'مركز الصيانة MMS',
    driftFix: 'إصلاح انحراف الأنالوج',
    hdmiRepair: 'إصلاح منفذ الـ HDMI',
    deepClean: 'تنظيف عميق للأجهزة',
    bookRepair: 'حجز موعد صيانة',
    locationTitle: 'معرض الصويفية',
    locationDesc: 'عمان، الصويفية، شارع باريس',
    phone: '٠٧٩٥٢٩٤٠٣٠',
    hours: '١٢:٠٠ ظهراً - ١٠:٠٠ مساءً (يومياً)',
    rights: 'جميع الحقوق محفوظة © ٢٠٢٦ بوست فيديو جيم.',
    erpTitle: 'تصميم وتنفيذ شركة ANTIGRAVITY للحلول البرمجية المتكاملة',

    // Hero / Landing
    heroSub: 'المركز الأول لبيع وصيانة أجهزة الألعاب في الأردن',
    heroTitle: 'تجربة لعب بمستوى أعلى ...',
    heroDesc: 'لأكثر من ٢٥ عاماً، كان بوست فيديو جيم الوجهة المفضلة للاعبين في عمان، الأردن. نبيع ونرقي ونصلح معدات الألعاب المفضلة لديك بدقة احترافية متناهية.',
    shopBtn: 'تصفح المتجر',
    repairBtn: 'احجز صيانة لجهازك',
    pillarsTitle: 'خدماتنا الأساسية',
    pillar1: 'بيع الأجهزة والملحقات',
    pillar1Desc: 'موزع معتمد لأجهزة الجيل الجديد، وقطع التجميعات الاحترافية، ومعدات محاكاة القيادة.',
    pillar2: 'صيانة احترافية متخصصة',
    pillar2Desc: 'فنيون متخصصون في إصلاح انحراف يد التحكم، مشاكل الحرارة، التوصيلات الدقيقة والتنظيف.',
    pillar3: 'مركز مجتمع اللاعبين',
    pillar3Desc: 'عقود من الخبرة في السوق الأردني لتوفير الاستشارات الفنية والتركيبات الخاصة.',
    featuredTitle: 'معدات ألعاب مميزة',
    featuredSub: 'مجموعة مختارة بعناية من معرضنا في الصويفية',
    ctaTitle: 'تعاني من انحراف يد التحكم أو أعطال الـ HDMI؟',
    ctaDesc: 'لا تدع الأعطال التقنية تفسد متعة اللعب. احجز جهازك للصيانة الاحترافية اليوم. يتم الانتهاء من ٩٠٪ من عمليات الإصلاح في غضون ساعتين بواسطة خبرائنا.',
    ctaBtn: 'افتح تذكرة صيانة',
    reviewTitle: 'ماذا يقول مجتمع اللاعبين عن بوست؟',
    review1: '"أفضل مركز صيانة في الصويفية! أصلحوا انحراف الأنالوج في يد بلايستيشن 5 خلال ٤٥ دقيقة. خدمة ممتازة."',
    review1User: 'زيد أ.',
    review2: '"خدمة راقية وقطع غيار أصلية. أحضرت جهازي PS5 للتنظيف وتغيير المعجون الحراري وصار صوته هادئ تماماً!"',
    review2User: 'رانيا ه.',

    // Shop Catalog
    catalogTitle: 'كتالوج الألعاب',
    catalogSub: 'أجهزة ألعاب وملحقات احترافية بأسعار منافسة في الأردن',
    searchPlaceholder: 'ابحث عن أجهزة، ملحقات، ماركات...',
    allCats: 'كل الفئات',
    allBrands: 'كل الماركات',
    sortBy: 'ترتيب حسب',
    featured: 'المميز أولاً',
    priceLow: 'السعر: من الأقل للأعلى',
    priceHigh: 'السعر: من الأعلى للأقل',
    nameSort: 'الاسم: أ إلى ي',
    resultsCount: 'نعرض {n} من منتجات الألعاب',
    noResults: 'لم يتم العثور على نتائج تطابق خياراتك.',
    clearFilters: 'إعادة تعيين الفلاتر',
    addToCart: 'أضف إلى السلة',
    outOfStock: 'نفذت الكمية',
    inStock: 'متوفر',

    // Product Detail
    backShop: 'العودة للمتجر',
    overview: 'تفاصيل المنتج',
    brand: 'الشركة المصنعة',
    availability: 'حالة التوفر',
    quantity: 'الكمية',
    successAdd: 'تمت الإضافة للسلة بنجاح!',
    relatedGear: 'منتجات ألعاب مشابهة',
    specifications: 'المواصفات التقنية',

    // Cart
    cartTitle: 'سلة المشتريات',
    cartSub: 'أكمل عملية شراء معدات الألعاب المميزة الخاصة بك',
    cartEmpty: 'سلة مشترياتك فارغة حالياً.',
    checkoutTitle: 'التوصيل في عمان / الاستلام من المعرض',
    checkoutDesc: 'أكد تفاصيل طلبك وأرسل الفاتورة مباشرة للواتساب. سيتواصل معك فريقنا خلال أقل من ١٥ دقيقة لترتيب الاستلام والتوصيل.',
    fullName: 'الاسم الكامل',
    phoneLabel: 'رقم الهاتف (مثال: ٠٧٩...)',
    addressLabel: 'عنوان التوصيل / تفاصيل الاستلام من الصويفية',
    orderTotal: 'ملخص الطلب',
    totalPrice: 'السعر الإجمالي',
    clearBasket: 'تفريغ السلة',
    confirmWhatsApp: 'إرسال الفاتورة عبر الواتساب 💬',
    successOrder: 'تم تأكيد الطلب بنجاح!',
    successOrderDesc: 'تم تجهيز الفاتورة بنجاح وسيتم توجيهك إلى الواتساب للتواصل المباشر مع موظفي المعرض وتأكيد التوصيل.',
    itemsCount: 'عدد المنتجات',
    summary: 'ملخص الطلب',
    backHome: 'العودة للرئيسية',

    // Services (MMS)
    mmsHubTitle: 'مركز الصيانة المعتمد MMS',
    mmsHubSub: 'تشخيص أعطال المكونات الدقيقة، التنظيف الفني وتعديل هياكل أجهزة الألعاب',
    trackStatus: 'تتبع حالة الصيانة لجهازك',
    ticketPlaceholder: 'أدخل رقم التذكرة (مثال: BVG-2026-001)',
    searchBtn: 'بحث',
    ticketNotFound: 'رقم التذكرة غير مسجل في قاعدة البيانات.',
    serviceCatalog: 'دليل خدمات الصيانة والتعديل',
    duration: 'المدة المتوقعة',
    estCost: 'التكلفة التقديرية',
    bookService: 'طلب موعد صيانة جديد',
    yourName: 'اسمك الكريم',
    phoneNum: 'رقم الهاتف',
    gamingDevice: 'جهاز الألعاب / يد التحكم',
    selectedService: 'الخدمة المطلوبة',
    faultDesc: 'وصف العطل بالتفصيل / تعديلات الأزرار والهيكل',
    generateTicket: 'إنشاء تذكرة صيانة جديدة',
    mmsSuccess: 'تم إنشاء التذكرة بنجاح!',
    mmsSuccessDesc: 'ممتاز! تم تسجيل جهازك في نظام الصيانة بنجاح. رقم تذكرتك هو {id}. اضغط بالأسفل لإرسال التذكرة مباشرة للواتساب لتأكيد موعد الاستلام في الصويفية.',
    techNotes: 'ملاحظات الفني',
    noNotes: 'لا توجد ملاحظات حالياً.',
    sampleTickets: 'أرقام تذاكر للتجربة: BVG-2026-001, BVG-2026-002, BVG-2026-003',
    statusLabel: 'الحالة',
    technicianLabel: 'الفني المسؤول',
    createdDate: 'تاريخ الإنشاء',
    updatedDate: 'آخر تحديث',
    
    // Dashboard / ERP
    erpOverview: 'نظرة عامة على نظام ERP المالي والمبيعات',
    erpSub: 'التحليلات المالية والرقابة العامة لمبيعات وصيانة الألعاب',
    liveUpdates: 'تحديثات مباشرة',
    todayRevenue: 'مبيعات اليوم',
    mmsActive: 'تذاكر الصيانة النشطة',
    imsStockAlerts: 'تنبيهات نقص المخزون',
    walkins: 'عدد الزوار اليوم',
    weeklyRev: 'المبيعات الأسبوعية (دينار)',
    topProducts: 'المنتجات الأكثر مبيعاً',
    recentOrders: 'الطلبات الحديثة عبر المتجر',
    orderId: 'رقم الطلب',
    customer: 'العميل',
    itemsPurchased: 'المنتجات المشتراة',
    billingTotal: 'إجمالي الفاتورة',
    workflowStatus: 'حالة الطلب',

    // Sidebar
    overviewSidebar: 'نظرة عامة',
    imsSidebar: 'المستودع (IMS)',
    jardSidebar: 'عمليات الجرد (Jard)',
    mmsSidebar: 'تذاكر الصيانة (MMS)',
    backStore: 'العودة للمتجر',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('boost_lang') as Language;
    if (savedLang) {
      setLanguageState(savedLang);
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    } else {
      setLanguageState('en');
      localStorage.setItem('boost_lang', 'en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('boost_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string): string => {
    const dict = translations[language];
    return (dict as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
