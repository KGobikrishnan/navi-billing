import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  Lock, 
  ExternalLink, 
  Clock, 
  FileText, 
  ShieldCheck,
  Building2,
  DollarSign,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClientSelfPortal({ 
  customers, 
  invoices, 
  setInvoices, 
  selectedCustomerId, 
  setSelectedCustomerId, 
  currentTenant 
}) {
  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];
  const clientInvoices = invoices.filter(inv => inv.customerName === currentCustomer?.name || inv.customerId === currentCustomer?.id);

  const [payingInvoice, setPayingInvoice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayNow = (inv) => {
    setPayingInvoice(inv);
  };

  const executePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Update invoice in state
      setInvoices(invoices.map(i => {
        if (i.id === payingInvoice.id) {
          return {
            ...i,
            status: 'Paid',
            paidAt: new Date().toISOString().split('T')[0],
            paymentMethod: 'Instant 3D-Secure Verified (PCI-DSS Safe)'
          };
        }
        return i;
      }));

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });

      setTimeout(() => {
        setPayingInvoice(null);
        setPaymentSuccess(false);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Client Portal Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(48,209,88,0.1) 0%, rgba(0, 113, 227, 0.08) 100%)',
        border: '1px solid rgba(48,209,88,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src={currentCustomer?.avatar} 
            alt={currentCustomer?.name} 
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: 700 }}>
                {currentCustomer?.name} — Self-Service Client Portal
              </h1>
              <span className="badge badge-good">Logged in via SSO</span>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Welcome back {currentCustomer?.contactPerson}. View estimates, download statements, and manage corporate cards.
            </div>
          </div>
        </div>

        {/* Switch Client Profile Demo Simulator */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Previewing As Client:
          </label>
          <select
            className="apple-select"
            value={currentCustomer?.id}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Total Invoices on Record</div>
          <div className="stat-value">{clientInvoices.length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Across {currentCustomer?.country} Entity</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Pending Settlement</div>
          <div className="stat-value" style={{ color: '#ff9f0a' }}>
            {clientInvoices.filter(i => i.status !== 'Paid').length} Due
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Auto-debit active on primary card</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Corporate Tax ID</div>
          <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#64d2ff' }}>
            {currentCustomer?.taxId}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Verified with Tax Authorities</div>
        </div>
      </div>

      {/* Customer Invoices & Live Pay */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Your Invoices & Statements</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PCI-DSS Encrypted 256-bit</span>
        </div>

        {clientInvoices.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No pending invoices for this account.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clientInvoices.map((inv) => (
              <div 
                key={inv.id}
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '13.5px', color: '#64d2ff' }}>
                      {inv.id}
                    </span>
                    <span className={`badge ${
                      inv.status === 'Paid' ? 'badge-paid' :
                      inv.status === 'Pending' ? 'badge-pending' : 'badge-overdue'
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Billed: {inv.date} • Due: <strong>{inv.dueDate}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 700 }}>
                      {inv.symbol}{inv.total.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Includes {inv.taxName}</div>
                  </div>

                  {inv.status !== 'Paid' ? (
                    <button 
                      onClick={() => handlePayNow(inv)}
                      className="btn-apple btn-primary"
                      style={{ fontSize: '12.5px', padding: '8px 16px' }}
                    >
                      <CreditCard size={14} /> Pay Instant
                    </button>
                  ) : (
                    <button 
                      onClick={() => window.print()}
                      className="btn-apple btn-secondary"
                      style={{ fontSize: '12.5px', padding: '8px 14px' }}
                    >
                      <Download size={14} /> Receipt PDF
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PCI-DSS Secure Instant Checkout Modal */}
      {payingInvoice && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-panel" style={{ width: '460px', padding: '28px', border: '1px solid rgba(0, 113, 227, 0.4)' }}>
            {paymentSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={56} color="#30d158" style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Payment Authorized & Settled!</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Transaction receipt sent to {currentCustomer.email}. Ledger updated.
                </p>
              </div>
            ) : (
              <form onSubmit={executePayment}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={16} color="#30d158" />
                    <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Stripe / Razorpay PCI-DSS Safe</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setPayingInvoice(null)} 
                    style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}
                  >
                    ×
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Paying Invoice: {payingInvoice.id}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: '#64d2ff' }}>
                    {payingInvoice.symbol}{payingInvoice.total.toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Cardholder Name
                    </label>
                    <input type="text" className="apple-input" defaultValue={currentCustomer.contactPerson} required />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Card Number (Simulated PCI Token)
                    </label>
                    <input type="text" className="apple-input" defaultValue="4242 •••• •••• 4242" required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Expiry</label>
                      <input type="text" className="apple-input" defaultValue="12/28" required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '4px' }}>CVC</label>
                      <input type="password" className="apple-input" defaultValue="888" required />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="btn-apple btn-primary" 
                  style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                >
                  {isProcessing ? 'Verifying 3D-Secure Protocol...' : `Confirm & Pay ${payingInvoice.symbol}${payingInvoice.total.toLocaleString()}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
