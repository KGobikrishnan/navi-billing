// Mock initial data store with localStorage persistence support
export const initialTenants = [
  { id: 'ten_apple_01', name: 'Apex Technologies Inc.', domain: 'apex.navi-cloud.io', plan: 'Enterprise Pro', currency: 'USD', symbol: '$', status: 'Active', mfaEnabled: true, pciStatus: 'Level 1 Certified' },
  { id: 'ten_sol_02', name: 'Solaria Solar Systems Ltd.', domain: 'solaria.navi-cloud.io', plan: 'Scale Business', currency: 'INR', symbol: '₹', status: 'Active', mfaEnabled: true, pciStatus: 'Compliant' },
  { id: 'ten_luma_03', name: 'Luma Creative Agency LLC', domain: 'lumadesign.navi-cloud.io', plan: 'Growth Tier', currency: 'EUR', symbol: '€', status: 'Trialing', mfaEnabled: false, pciStatus: 'Compliant' }
];

export const userRoles = [
  { id: 'admin', name: 'Super Admin', desc: 'Full access to financial ledgers, keys, DB config, user RBAC & gateways' },
  { id: 'accountant', name: 'Accountant', desc: 'Can generate invoices, reconcile payments, review tax audits & run export' },
  { id: 'sales', name: 'Sales Representative', desc: 'Can create clients, generate proposals, view invoice statuses' },
  { id: 'viewer', name: 'Audit Viewer', desc: 'Read-only access to customer summaries and invoice PDFs' }
];

export const initialCustomers = [
  {
    id: 'CUST-1001',
    name: 'Aether Dynamics',
    contactPerson: 'Sophia Chen',
    email: 'billing@aether.ai',
    phone: '+1 (415) 890-2341',
    country: 'United States',
    taxId: 'US-EIN-948201',
    taxCategory: 'US Sales Tax (8.25%)',
    currency: 'USD',
    balance: 4250.00,
    status: 'Good Standing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    address: '500 Howard St, Suite 400, San Francisco, CA'
  },
  {
    id: 'CUST-1002',
    name: 'Nexa Global Solutions',
    contactPerson: 'Kavita Sundaram',
    email: 'finance@nexaglobal.in',
    phone: '+91 98401 22319',
    country: 'India',
    taxId: '33AABCN1234F1Z8',
    taxCategory: 'GST @ 18% (CGST 9% + SGST 9%)',
    currency: 'INR',
    balance: 145000.00,
    status: 'Good Standing',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    address: 'Tidel Park, 4th Floor, Rajiv Gandhi Salai, Chennai, TN'
  },
  {
    id: 'CUST-1003',
    name: 'Krono Studio Berlin',
    contactPerson: 'Lukas Meyer',
    email: 'lukas@kronostudio.de',
    phone: '+49 30 901820',
    country: 'Germany',
    taxId: 'DE 814 392 019',
    taxCategory: 'EU VAT Standard (19%)',
    currency: 'EUR',
    balance: 0.00,
    status: 'Good Standing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    address: 'Friedrichstraße 120, 10117 Berlin, Germany'
  },
  {
    id: 'CUST-1004',
    name: 'HyperScale Media UK',
    contactPerson: 'Oliver Twist',
    email: 'accounts@hyperscale.co.uk',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    taxId: 'GB 123 4567 89',
    taxCategory: 'UK VAT (20%)',
    currency: 'GBP',
    balance: 890.00,
    status: 'Dunning Alert',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    address: '42 Canary Wharf, London, E14 5AB'
  }
];

export const initialProducts = [
  {
    id: 'PROD-01',
    name: 'Enterprise Cloud Platform License',
    code: 'SFT-ENT-01',
    category: 'SaaS Software',
    priceUSD: 1200,
    priceINR: 98000,
    priceEUR: 1100,
    taxRate: 18,
    stock: 'Unlimited (Digital)',
    type: 'recurring',
    interval: 'monthly',
    description: 'Core infrastructure hosting, multi-tenant container management & SOC2 audit logs.'
  },
  {
    id: 'PROD-02',
    name: 'High-Volume AI Token Pipeline',
    code: 'API-TOK-100K',
    category: 'API Consumption',
    priceUSD: 450,
    priceINR: 38000,
    priceEUR: 420,
    taxRate: 18,
    stock: 'Real-time metered',
    type: 'metered',
    interval: 'monthly',
    description: '100,000 deep reasoning inference credits with 99.99% latency SLA.'
  },
  {
    id: 'PROD-03',
    name: 'Dedicated Solutions Architect Advisory',
    code: 'SRV-ARCH-01',
    category: 'Professional Services',
    priceUSD: 250,
    priceINR: 20000,
    priceEUR: 230,
    taxRate: 18,
    stock: '32 hrs available',
    type: 'one_time',
    interval: 'per_hour',
    description: 'Senior fullstack infrastructure & billing integration engineering advisory.'
  },
  {
    id: 'PROD-04',
    name: 'Priority 24/7 Mission-Critical SLA',
    code: 'SLA-247-PREM',
    category: 'Support Add-on',
    priceUSD: 800,
    priceINR: 65000,
    priceEUR: 750,
    taxRate: 18,
    stock: 'Unlimited',
    type: 'recurring',
    interval: 'monthly',
    description: 'Sub-15 minute response time with designated lead engineer & telephone bridge.'
  }
];

export const currencyRates = {
  USD: { rate: 1.0, symbol: '$', name: 'US Dollar' },
  INR: { rate: 86.4, symbol: '₹', name: 'Indian Rupee' },
  EUR: { rate: 0.92, symbol: '€', name: 'Euro' },
  GBP: { rate: 0.79, symbol: '£', name: 'British Pound' },
  SGD: { rate: 1.34, symbol: 'S$', name: 'Singapore Dollar' }
};

export const initialInvoices = [
  {
    id: 'INV-2026-089',
    customerId: 'CUST-1001',
    customerName: 'Aether Dynamics',
    customerEmail: 'billing@aether.ai',
    date: '2026-10-28',
    dueDate: '2026-11-12',
    currency: 'USD',
    symbol: '$',
    items: [
      { id: '1', description: 'Enterprise Cloud Platform License', qty: 2, unitPrice: 1200, amount: 2400 },
      { id: '2', description: 'High-Volume AI Token Pipeline', qty: 3, unitPrice: 450, amount: 1350 }
    ],
    discountPercent: 5,
    discountAmount: 187.50,
    subtotal: 3750,
    taxRate: 8.25,
    taxName: 'US Sales Tax',
    taxAmount: 293.91,
    total: 3856.41,
    status: 'Paid',
    paidAt: '2026-10-29',
    paymentMethod: 'Stripe Auto-Pay (Visa •••• 4242)',
    notes: 'Thank you for your continuous enterprise partnership.'
  },
  {
    id: 'INV-2026-090',
    customerId: 'CUST-1002',
    customerName: 'Nexa Global Solutions',
    customerEmail: 'finance@nexaglobal.in',
    date: '2026-10-31',
    dueDate: '2026-11-15',
    currency: 'INR',
    symbol: '₹',
    items: [
      { id: '1', description: 'Enterprise Cloud Platform License', qty: 1, unitPrice: 98000, amount: 98000 },
      { id: '2', description: 'Dedicated Solutions Architect Advisory (10h)', qty: 10, unitPrice: 2000, amount: 20000 }
    ],
    discountPercent: 0,
    discountAmount: 0,
    subtotal: 118000,
    taxRate: 18,
    taxName: 'GST (9% CGST + 9% SGST)',
    taxAmount: 21240,
    total: 139240,
    status: 'Pending',
    paidAt: null,
    paymentMethod: 'Razorpay Instant SmartCollect',
    notes: 'Tax Invoice under Section 31 of CGST Act.'
  },
  {
    id: 'INV-2026-091',
    customerId: 'CUST-1004',
    customerName: 'HyperScale Media UK',
    customerEmail: 'accounts@hyperscale.co.uk',
    date: '2026-10-15',
    dueDate: '2026-10-30',
    currency: 'GBP',
    symbol: '£',
    items: [
      { id: '1', description: 'Priority 24/7 Mission-Critical SLA', qty: 1, unitPrice: 650, amount: 650 }
    ],
    discountPercent: 0,
    discountAmount: 0,
    subtotal: 650,
    taxRate: 20,
    taxName: 'UK VAT',
    taxAmount: 130,
    total: 780,
    status: 'Overdue',
    paidAt: null,
    paymentMethod: 'Automated Direct Debit (Card Expired)',
    notes: 'Payment overdue. Dunning workflow in Stage 2 (Smart Retry + WhatsApp Notification).'
  }
];

export const initialSubscriptions = [
  {
    id: 'SUB-9021',
    customer: 'Aether Dynamics',
    plan: 'Enterprise Cloud Tier',
    interval: 'Monthly',
    billingCycle: '28th of every month',
    amount: 3856.41,
    currency: 'USD',
    symbol: '$',
    status: 'Active',
    nextBilling: '2026-11-28',
    gateway: 'Stripe Elements (PCI-DSS Safe)'
  },
  {
    id: 'SUB-9022',
    customer: 'Nexa Global Solutions',
    plan: 'Scale Cluster Business',
    interval: 'Annual',
    billingCycle: 'Nov 01 Annual',
    amount: 1450000,
    currency: 'INR',
    symbol: '₹',
    status: 'Active',
    nextBilling: '2027-11-01',
    gateway: 'Razorpay Autopay (e-Mandate)'
  },
  {
    id: 'SUB-9023',
    customer: 'HyperScale Media UK',
    plan: 'Mission Critical 24/7',
    interval: 'Monthly',
    billingCycle: '15th of every month',
    amount: 780,
    currency: 'GBP',
    symbol: '£',
    status: 'Past Due',
    nextBilling: '2026-11-15',
    gateway: 'GoCardless BACS Direct'
  }
];

export const dunningLogs = [
  { id: 'DUN-01', target: 'HyperScale Media UK', event: 'Card Charge Failed (Insufficient funds / Expiry)', date: 'Oct 30, 04:30 AM', action: 'Smart Retry scheduled in 48h', status: 'Warning' },
  { id: 'DUN-02', target: 'HyperScale Media UK', event: 'Automated WhatsApp & Email Alert dispatched', date: 'Oct 31, 09:00 AM', action: 'Delivered with 1-click Pay Link', status: 'Dispatched' },
  { id: 'DUN-03', target: 'Krono Studio Berlin', event: 'Payment recovered via Smart Retry sequence', date: 'Oct 24, 11:15 AM', action: 'Subscription restored automatically', status: 'Recovered' }
];

export const accountingIntegrations = [
  { id: 'int_xero', name: 'Xero Accounting', icon: 'xero', status: 'Connected', lastSync: '12 mins ago', recordsSynced: '1,420 entries', autoReconcile: true },
  { id: 'int_qb', name: 'QuickBooks Online', icon: 'qb', status: 'Connected', lastSync: '45 mins ago', recordsSynced: '3,890 entries', autoReconcile: true },
  { id: 'int_tally', name: 'Tally Prime API', icon: 'tally', status: 'Ready for Auth', lastSync: 'Never', recordsSynced: '0 entries', autoReconcile: false },
  { id: 'int_stripe', name: 'Stripe Billing & Radar', icon: 'stripe', status: 'Active (PCI-DSS L1)', lastSync: 'Live Webhook Stream', recordsSynced: 'Realtime', autoReconcile: true }
];
