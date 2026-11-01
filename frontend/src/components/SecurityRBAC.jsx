import React, { useState } from 'react';
import { Shield, Key, Lock, Users, Database, CheckCircle, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SecurityRBAC({ tenants, setTenants, currentRole, roles, currentTenant }) {
  const [mfaCode, setMfaCode] = useState('');
  const [mfaVerified, setMfaVerified] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantDomain, setNewTenantDomain] = useState('');
  const [newTenantCurrency, setNewTenantCurrency] = useState('USD');

  const handleCreateTenant = (e) => {
    e.preventDefault();
    const newT = {
      id: `ten_${Date.now().toString().slice(-4)}`,
      name: newTenantName,
      domain: `${newTenantDomain.toLowerCase().replace(/\s+/g, '')}.navi-cloud.io`,
      plan: 'Growth Tier',
      currency: newTenantCurrency,
      symbol: newTenantCurrency === 'INR' ? '₹' : newTenantCurrency === 'EUR' ? '€' : '$',
      status: 'Active',
      mfaEnabled: true,
      pciStatus: 'Compliant'
    };

    setTenants([...tenants, newT]);
    setShowAddTenant(false);
    confetti({ particleCount: 50 });
  };

  const handleVerifyMFA = (e) => {
    e.preventDefault();
    if (mfaCode.length === 6) {
      setMfaVerified(true);
      confetti({ particleCount: 60 });
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
          Multi-Tenant Architecture & RBAC Security
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Strict database isolation per tenant, granular role-based access control, and Multi-Factor Authentication (MFA).
        </p>
      </div>

      {/* Multi-Tenant Cluster Overview */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={17} color="#64d2ff" /> Provisioned Multi-Tenant Environments
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Each SaaS client operates inside a partitioned schema with dedicated encryption keys (KMS).
            </div>
          </div>
          <button onClick={() => setShowAddTenant(true)} className="btn-apple btn-primary" style={{ fontSize: '12px' }}>
            + Provision New Tenant
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {tenants.map(t => (
            <div key={t.id} style={{
              padding: '16px',
              borderRadius: '12px',
              background: t.id === currentTenant.id ? 'rgba(0, 113, 227, 0.12)' : 'rgba(255,255,255,0.02)',
              border: t.id === currentTenant.id ? '1px solid rgba(0, 113, 227, 0.4)' : '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{t.name}</span>
                <span className={`badge ${t.status === 'Active' ? 'badge-good' : 'badge-pending'}`}>
                  {t.status}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: '#64d2ff', marginBottom: '8px' }}>
                {t.domain}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                <span>Default Currency: <strong>{t.currency} ({t.symbol})</strong></span>
                <span>{t.pciStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RBAC Matrix & MFA Configuration */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* RBAC Permissions Matrix */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} color="#a855f7" /> Role-Based Access Control (RBAC) Matrix
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Granular permissions enforce the principle of least privilege across company personnel.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', fontSize: '11px' }}>
                <th style={{ padding: '8px 4px' }}>Role</th>
                <th style={{ padding: '8px 4px' }}>Invoicing</th>
                <th style={{ padding: '8px 4px' }}>Dunning / Retries</th>
                <th style={{ padding: '8px 4px' }}>Ledger Export</th>
                <th style={{ padding: '8px 4px' }}>Security Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px 4px', fontWeight: 600, color: '#64d2ff' }}>Admin</td>
                <td style={{ padding: '10px 4px', color: '#30d158' }}>Full (CRUD)</td>
                <td style={{ padding: '10px 4px', color: '#30d158' }}>Full (CRUD)</td>
                <td style={{ padding: '10px 4px', color: '#30d158' }}>Full</td>
                <td style={{ padding: '10px 4px', color: '#30d158' }}>Manage Keys & RBAC</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 4px', fontWeight: 600 }}>Accountant</td>
                <td style={{ padding: '10px 4px', color: '#30d158' }}>Create & Reconcile</td>
                <td style={{ padding: '10px 4px', color: '#ff9f0a' }}>View Only</td>
                <td style={{ padding: '10px 4px', color: '#30d158' }}>Full</td>
                <td style={{ padding: '10px 4px', color: '#ff453a' }}>No Access</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 4px', fontWeight: 600 }}>Sales Rep</td>
                <td style={{ padding: '10px 4px', color: '#ff9f0a' }}>Draft Estimates Only</td>
                <td style={{ padding: '10px 4px', color: '#ff453a' }}>No Access</td>
                <td style={{ padding: '10px 4px', color: '#ff453a' }}>No Access</td>
                <td style={{ padding: '10px 4px', color: '#ff453a' }}>No Access</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 4px', fontWeight: 600 }}>Viewer</td>
                <td style={{ padding: '10px 4px', color: '#86868b' }}>Read-only PDFs</td>
                <td style={{ padding: '10px 4px', color: '#86868b' }}>Read-only</td>
                <td style={{ padding: '10px 4px', color: '#ff453a' }}>No Access</td>
                <td style={{ padding: '10px 4px', color: '#ff453a' }}>No Access</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Multi-Factor Authentication (MFA) Simulator */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Smartphone size={16} color="#30d158" /> Hardware/TOTP MFA Challenge
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Time-based One-Time Password required for financial mutations.
          </p>

          {mfaVerified ? (
            <div style={{ background: 'rgba(48,209,88,0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(48,209,88,0.3)', textAlign: 'center' }}>
              <CheckCircle size={32} color="#30d158" style={{ margin: '0 auto 8px auto', display: 'block' }} />
              <div style={{ fontWeight: 600, fontSize: '14px', color: '#30d158' }}>Session Verified via Authenticator</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Privileged operations unlocked for role: {currentRole.name}
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerifyMFA} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Enter 6-digit Authenticator Code (e.g. 582910)
              </label>
              <input 
                type="text" 
                maxLength={6} 
                className="apple-input" 
                placeholder="6-digit code" 
                style={{ textAlign: 'center', letterSpacing: '6px', fontSize: '18px', fontFamily: 'var(--font-mono)' }}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                required
              />
              <button type="submit" className="btn-apple btn-primary" style={{ marginTop: '6px' }}>
                Verify Token
              </button>
            </form>
          )}
        </div>
      </div>

      {showAddTenant && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <form onSubmit={handleCreateTenant} className="glass-panel" style={{ width: '440px', padding: '28px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Provision Isolated SaaS Tenant</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Tenant Company Name</label>
                <input 
                  type="text" 
                  className="apple-input" 
                  placeholder="e.g. Horizon Labs Corp" 
                  value={newTenantName} 
                  onChange={(e) => setNewTenantName(e.target.value)} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Subdomain Handle</label>
                <input 
                  type="text" 
                  className="apple-input" 
                  placeholder="horizon" 
                  value={newTenantDomain} 
                  onChange={(e) => setNewTenantDomain(e.target.value)} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Base Operating Currency</label>
                <select 
                  className="apple-select" 
                  style={{ width: '100%' }}
                  value={newTenantCurrency} 
                  onChange={(e) => setNewTenantCurrency(e.target.value)}
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowAddTenant(false)} className="btn-apple btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-apple btn-primary">
                Provision Database
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
