import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ShieldAlert, 
  Layers, 
  Zap, 
  Receipt,
  FileCheck2,
  RefreshCw
} from 'lucide-react';

export default function DashboardOverview({ invoices, subscriptions, customers, currentTenant, onNavigate }) {
  // Financial computations
  const totalInvoiced = invoices.reduce((acc, inv) => acc + (inv.currency === currentTenant.currency ? inv.total : inv.total * 1), 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
  const collectedAmount = paidInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending' || inv.status === 'Overdue');
  const outstandingAmount = pendingInvoices.reduce((acc, inv) => acc + inv.total, 0);

  // Approximate MRR from active subscriptions
  const activeSubs = subscriptions.filter(s => s.status === 'Active');
  const mrrAmount = activeSubs.reduce((acc, s) => {
    return acc + (s.interval === 'Monthly' ? s.amount : s.amount / 12);
  }, 0);

  const kpis = [
    {
      label: 'Monthly Recurring Revenue (MRR)',
      val: `${currentTenant.symbol}${mrrAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+14.2%',
      isPositive: true,
      sub: 'vs last 30 days',
      icon: TrendingUp,
      color: '#30d158'
    },
    {
      label: 'Total Collected Invoices',
      val: `${currentTenant.symbol}${collectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+9.4%',
      isPositive: true,
      sub: `${paidInvoices.length} invoices settled`,
      icon: DollarSign,
      color: '#0071e3'
    },
    {
      label: 'Outstanding Collections',
      val: `${currentTenant.symbol}${outstandingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '-2.1%',
      isPositive: true,
      sub: `${pendingInvoices.length} awaiting settlement`,
      icon: Clock,
      color: '#ff9f0a'
    },
    {
      label: 'Revenue Recovery Rate',
      val: '94.8%',
      change: '+3.5%',
      isPositive: true,
      sub: 'Smart Dunning AI Active',
      icon: Zap,
      color: '#a855f7'
    }
  ];

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(0, 113, 227, 0.12) 0%, rgba(168, 85, 247, 0.05) 100%)',
        border: '1px solid rgba(0, 113, 227, 0.2)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.4px' }}>
              Financial Command Center
            </h1>
            <span className="badge badge-good">PCI-DSS L1 Compliant</span>
            <span className="badge badge-blue">Tenant: {currentTenant.name}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '6px' }}>
            Real-time telemetry on invoicing engine, multi-currency ledger, subscription lifecycles, and auto-tax reconciliations.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onNavigate('invoices')} className="btn-apple btn-primary">
            <Receipt size={15} /> Create Invoice
          </button>
          <button onClick={() => onNavigate('client_portal')} className="btn-apple btn-secondary">
            <Layers size={15} /> Open Client Portal
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{kpi.label}</span>
                <div style={{
                  padding: '7px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: kpi.color
                }}>
                  <Icon size={16} />
                </div>
              </div>
              <div className="stat-value" style={{ marginBottom: '8px' }}>
                {kpi.val}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                <span style={{ 
                  color: kpi.isPositive ? '#30d158' : '#ff453a', 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  fontWeight: 600
                }}>
                  {kpi.isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {kpi.change}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{kpi.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Invoices & Subscriptions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        {/* Recent Invoices Ledger */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Active Invoicing Feed</h2>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automated currency conversion & tax calculations applied</div>
            </div>
            <button onClick={() => onNavigate('invoices')} className="btn-apple btn-secondary" style={{ fontSize: '12px', padding: '5px 12px' }}>
              View All ({invoices.length})
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '10px 8px' }}>Invoice ID</th>
                  <th style={{ padding: '10px 8px' }}>Customer</th>
                  <th style={{ padding: '10px 8px' }}>Due Date</th>
                  <th style={{ padding: '10px 8px' }}>Total Amount</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.15s' }}>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#64d2ff' }}>
                      {inv.id}
                    </td>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>
                      {inv.customerName}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>
                      {inv.dueDate}
                    </td>
                    <td style={{ padding: '12px 8px', fontWeight: 600 }}>
                      {inv.symbol}{inv.total.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <span className={`badge ${
                        inv.status === 'Paid' ? 'badge-paid' :
                        inv.status === 'Pending' ? 'badge-pending' : 'badge-overdue'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dunning & Recurring Health Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={17} color="#a855f7" /> Dunning Automation
              </h2>
              <span className="badge badge-good">Smart Retry</span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Self-healing AI retries failed cards during bank non-peak intervals and triggers omnichannel WhatsApp & Email payment reminders.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>HyperScale Media UK</span>
                  <span style={{ color: '#ff453a', fontSize: '11px', fontWeight: 600 }}>STAGE 2 RETRY</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Automated retry scheduled in 14h • WhatsApp alert delivered
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(48,209,88,0.04)', borderRadius: '10px', border: '1px solid rgba(48,209,88,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#30d158' }}>Krono Studio Berlin</span>
                  <span style={{ color: '#30d158', fontSize: '11px', fontWeight: 600 }}>RECOVERED</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  Successfully settled €780 via Stripe 3D-Secure fallback
                </div>
              </div>
            </div>

            <button onClick={() => onNavigate('subscriptions')} className="btn-apple btn-secondary" style={{ width: '100%', marginTop: '16px', fontSize: '12px' }}>
              <RefreshCw size={13} /> Manage Dunning Policies
            </button>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(48,209,88,0.07) 0%, rgba(0,0,0,0.3) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileCheck2 size={24} color="#30d158" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '13.5px' }}>Auto Tax Reconciled</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  All GST (18%) and US Sales Tax rates computed based on client billing coordinates.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
