import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, AlertOctagon, Key, RefreshCw, Zap } from 'lucide-react';

export default function GatewaysCompliance() {
  const [stripeLive, setStripeLive] = useState(true);
  const [razorpayLive, setRazorpayLive] = useState(true);
  const [paypalLive, setPaypalLive] = useState(false);
  const [achActive, setAchActive] = useState(true);

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
          Payment Gateways & PCI-DSS Compliance
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Secure merchant tokenization, 3D-Secure 2.0 liability shift, end-to-end TLS 1.3 encryption, and Razorpay/Stripe APIs.
        </p>
      </div>

      {/* PCI-DSS Level 1 Certification Badge Card */}
      <div className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(0, 113, 227, 0.15) 0%, rgba(48, 209, 88, 0.08) 100%)',
        border: '1px solid rgba(0, 113, 227, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 113, 227, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={28} color="#64d2ff" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              PCI-DSS Service Provider Level 1 Certified
              <span className="badge badge-good">Audit Passed</span>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Raw card numbers never touch your application server. Handled purely via client-side hosted tokens (Elements/Checkout iframe).
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MFA Enforcement:</div>
          <div style={{ fontWeight: 600, color: '#30d158', fontSize: '13px' }}>Mandatory for all Admins</div>
        </div>
      </div>

      {/* Gateways Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Stripe */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#64d2ff' }}>Stripe Billing Engine</div>
            <span className={`badge ${stripeLive ? 'badge-paid' : 'badge-overdue'}`}>
              {stripeLive ? 'Connected' : 'Offline'}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Global Cards (Visa, MC, Amex), Apple Pay, Google Pay & SEPA Direct Debit for international accounts.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Radar Fraud Prevention</span>
            <span style={{ color: '#30d158', fontWeight: 600 }}>Active (0.01% Churn)</span>
          </div>
        </div>

        {/* Razorpay */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#0071e3' }}>Razorpay SmartCollect</div>
            <span className={`badge ${razorpayLive ? 'badge-paid' : 'badge-overdue'}`}>
              {razorpayLive ? 'Connected' : 'Offline'}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            India Domestic UPI, NetBanking, e-Mandate auto-debit, and GST-compliant invoice reconciliation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>UPI Autopay (₹)</span>
            <span style={{ color: '#30d158', fontWeight: 600 }}>Zero Friction Active</span>
          </div>
        </div>

        {/* PayPal */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#ff9f0a' }}>PayPal Enterprise</div>
            <span className="badge badge-pending">Sandbox Demo</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Fallback for enterprise procurement departments requiring purchase order & wallet settlement.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Direct ACH Transfer</span>
            <span style={{ color: '#64d2ff', fontWeight: 600 }}>Supported (US/EU)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
