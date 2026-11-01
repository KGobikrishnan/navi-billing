import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ArrowRight, Webhook, Database, FileSpreadsheet, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IntegrationsAccounting({ integrations: initialIntegrations }) {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [syncingId, setSyncingId] = useState(null);

  const handleSyncNow = (id) => {
    setSyncingId(id);
    setTimeout(() => {
      setIntegrations(integrations.map(item => {
        if (item.id === id) {
          return {
            ...item,
            lastSync: 'Just now',
            status: 'Connected',
            recordsSynced: `${parseInt(item.recordsSynced || 0) + 12} entries`
          };
        }
        return item;
      }));
      setSyncingId(null);
      confetti({ particleCount: 40 });
    }, 1000);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
          Accounting Integrations & Webhook Ledgers
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Bi-directional synchronization with Xero, QuickBooks & Tally Prime to prevent manual double-entry accounting.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {integrations.map(int => (
          <div key={int.id} className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{int.name}</h3>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Auto Reconcile: {int.autoReconcile ? 'Enabled' : 'Manual'}
                </div>
              </div>
              <span className={`badge ${int.status.includes('Connected') || int.status.includes('Active') ? 'badge-good' : 'badge-warning'}`}>
                {int.status}
              </span>
            </div>

            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', marginBottom: '16px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Last Push:</span>
                <span style={{ fontWeight: 600, color: '#fff' }}>{int.lastSync}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ledger Entries:</span>
                <span style={{ color: '#64d2ff' }}>{int.recordsSynced}</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => handleSyncNow(int.id)}
                disabled={syncingId === int.id}
                className="btn-apple btn-secondary" 
                style={{ width: '100%', fontSize: '12px' }}
              >
                <RefreshCw size={13} className={syncingId === int.id ? 'spin' : ''} />
                {syncingId === int.id ? 'Pushing Ledger...' : 'Trigger Sync'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Webhook Activity Feed */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Webhook size={16} color="#0071e3" /> Outgoing Webhook Event Dispatcher
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Every invoice lifecycle mutation dispatches HMAC-SHA256 signed JSON payloads to your ERP.
        </p>

        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '14px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#a1a1a6' }}>
          <div style={{ color: '#30d158' }}>POST https://api.quickbooks.com/v3/company/ledger/invoice.created</div>
          <div style={{ marginTop: '6px', color: '#64d2ff' }}>
            {`{ "event": "invoice.paid", "id": "INV-2026-089", "amount": 3856.41, "currency": "USD", "tax_category": "US Sales Tax" }`}
          </div>
        </div>
      </div>
    </div>
  );
}
