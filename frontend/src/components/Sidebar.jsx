import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Package, 
  Repeat, 
  ShieldCheck, 
  CreditCard, 
  BarChart3, 
  Building2, 
  ExternalLink,
  ChevronDown,
  Globe2,
  Lock
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  currentTenant, 
  setCurrentTenant, 
  tenants, 
  currentRole, 
  setCurrentRole, 
  roles 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, category: 'Analytics' },
    { id: 'invoices', label: 'Invoices & Engine', icon: FileText, category: 'Billing' },
    { id: 'subscriptions', label: 'Subscriptions & Dunning', icon: Repeat, category: 'Billing' },
    { id: 'products', label: 'Product Catalog', icon: Package, category: 'Management' },
    { id: 'customers', label: 'Customer CRM', icon: Users, category: 'Management' },
    { id: 'client_portal', label: 'Client Self-Portal', icon: ExternalLink, category: 'Client Experience' },
    { id: 'gateways', label: 'Payments & PCI-DSS', icon: CreditCard, category: 'Security & Ops' },
    { id: 'security', label: 'Multi-Tenant & RBAC', icon: ShieldCheck, category: 'Security & Ops' },
    { id: 'integrations', label: 'Accounting Sync', icon: BarChart3, category: 'Integrations' }
  ];

  return (
    <aside style={{
      width: '270px',
      background: 'var(--bg-sidebar)',
      backdropFilter: 'var(--glass-blur)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{ padding: '0 8px 20px 8px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0071e3 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 113, 227, 0.4)'
          }}>
            <Building2 size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Navi Billing <span style={{ fontSize: '10px', background: 'rgba(0,113,227,0.2)', color: '#64d2ff', padding: '1px 6px', borderRadius: '4px' }}>OS</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>NextGen Enterprise Cloud</div>
          </div>
        </div>

        {/* Tenant Selector (Multi-Tenant Architecture) */}
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.6px', marginBottom: '6px' }}>
            Current Tenant
          </div>
          <div style={{ position: 'relative' }}>
            <select
              value={currentTenant.id}
              onChange={(e) => {
                const found = tenants.find(t => t.id === e.target.value);
                if (found) setCurrentTenant(found);
              }}
              style={{
                width: '100%',
                padding: '8px 28px 8px 10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '12.5px',
                appearance: 'none',
                cursor: 'pointer'
              }}
            >
              {tenants.map(t => (
                <option key={t.id} value={t.id} style={{ background: '#13161f', color: '#fff' }}>
                  {t.name} ({t.currency})
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '11px', color: '#30d158' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#30d158', display: 'inline-block' }}></span>
            <span>Isolated DB: {currentTenant.domain}</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '9px 12px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'rgba(0, 113, 227, 0.16)' : 'transparent',
                color: isActive ? '#64d2ff' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Icon size={17} color={isActive ? '#0071e3' : 'currentColor'} />
              <span>{item.label}</span>
              {item.id === 'client_portal' && (
                <span style={{ marginLeft: 'auto', fontSize: '9px', background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '4px', color: '#ccc' }}>
                  Live Demo
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* RBAC Role Switcher & Security Status */}
      <div style={{
        padding: '14px 12px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Lock size={12} color="#30d158" /> Active Role (RBAC)
          </div>
          <span style={{ fontSize: '10px', color: '#30d158', fontWeight: 600 }}>MFA ACTIVE</span>
        </div>

        <select
          value={currentRole.id}
          onChange={(e) => {
            const r = roles.find(role => role.id === e.target.value);
            if (r) setCurrentRole(r);
          }}
          style={{
            width: '100%',
            padding: '6px 8px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            color: 'var(--text-primary)',
            fontSize: '11.5px',
            cursor: 'pointer'
          }}
        >
          {roles.map(r => (
            <option key={r.id} value={r.id} style={{ background: '#111' }}>
              {r.name}
            </option>
          ))}
        </select>
        <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.3' }}>
          {currentRole.desc}
        </div>
      </div>
    </aside>
  );
}
