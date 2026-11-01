import React, { useState } from 'react';
import { 
  Repeat, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Send, 
  PhoneCall, 
  MessageSquare, 
  CreditCard,
  Plus,
  RefreshCw,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubscriptionsDunning({ 
  subscriptions, 
  setSubscriptions, 
  dunningLogs, 
  setDunningLogs,
  customers,
  currentTenant
}) {
  const [activeTab, setActiveTab] = useState('subscriptions'); // 'subscriptions' | 'dunning'
  const [showNewSubModal, setShowNewSubModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.name || '');
  const [selectedPlan, setSelectedPlan] = useState('Enterprise Cloud Tier');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [amount, setAmount] = useState('1200');

  // Trigger Instant Smart Retry simulation
  const handleTriggerRetry = (dunningId) => {
    setDunningLogs(dunningLogs.map(log => {
      if (log.id === dunningId) {
        return {
          ...log,
          status: 'Recovered',
          action: '3D-Secure secondary card fallback processed successfully'
        };
      }
      return log;
    }));

    // Update subscriptions status too
    setSubscriptions(subscriptions.map(s => {
      if (s.status === 'Past Due') {
        return { ...s, status: 'Active' };
      }
      return s;
    }));

    confetti({
      particleCount: 70,
      spread: 60
    });
  };

  // Dispatch WhatsApp payment recovery alert
  const handleSendWhatsAppAlert = (target) => {
    alert(`🚀 Smart Dunning: WhatsApp & Email Payment link sent to ${target} via Twilio & SendGrid APIs!`);
  };

  const handleCreateSub = (e) => {
    e.preventDefault();
    const newSub = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: selectedCustomer,
      plan: selectedPlan,
      interval: billingCycle,
      billingCycle: `${new Date().getDate()}th of every ${billingCycle === 'Monthly' ? 'month' : 'year'}`,
      amount: parseFloat(amount),
      currency: currentTenant.currency,
      symbol: currentTenant.symbol,
      status: 'Active',
      nextBilling: '2026-12-01',
      gateway: 'Stripe Autopay / e-Mandate'
    };

    setSubscriptions([newSub, ...subscriptions]);
    setShowNewSubModal(false);
    confetti({ particleCount: 50 });
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Tab Switcher & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
            Subscription Billing & Revenue Recovery
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Automated recurring cycles, trial period upgrades, smart card retries & WhatsApp dunning workflows.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('subscriptions')}
            className={`btn-apple ${activeTab === 'subscriptions' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Repeat size={14} /> Subscriptions ({subscriptions.length})
          </button>
          <button 
            onClick={() => setActiveTab('dunning')}
            className={`btn-apple ${activeTab === 'dunning' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Zap size={14} /> Dunning Automation ({dunningLogs.length})
          </button>
          <button 
            onClick={() => setShowNewSubModal(true)} 
            className="btn-apple btn-secondary"
          >
            <Plus size={14} /> Add Recurring Plan
          </button>
        </div>
      </div>

      {activeTab === 'subscriptions' ? (
        /* SUBSCRIPTIONS TABLE */
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 8px' }}>Subscription ID</th>
                  <th style={{ padding: '10px 8px' }}>Customer</th>
                  <th style={{ padding: '10px 8px' }}>Plan</th>
                  <th style={{ padding: '10px 8px' }}>Cadence</th>
                  <th style={{ padding: '10px 8px' }}>Amount</th>
                  <th style={{ padding: '10px 8px' }}>Next Billing</th>
                  <th style={{ padding: '10px 8px' }}>Gateway Engine</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map(sub => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '14px 8px', fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: '#64d2ff' }}>
                      {sub.id}
                    </td>
                    <td style={{ padding: '14px 8px', fontWeight: 600 }}>
                      {sub.customer}
                    </td>
                    <td style={{ padding: '14px 8px' }}>
                      {sub.plan}
                    </td>
                    <td style={{ padding: '14px 8px', color: 'var(--text-secondary)' }}>
                      {sub.interval}
                    </td>
                    <td style={{ padding: '14px 8px', fontWeight: 700 }}>
                      {sub.symbol}{sub.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 8px', color: 'var(--text-muted)' }}>
                      {sub.nextBilling}
                    </td>
                    <td style={{ padding: '14px 8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {sub.gateway}
                    </td>
                    <td style={{ padding: '14px 8px' }}>
                      <span className={`badge ${
                        sub.status === 'Active' ? 'badge-active' : 'badge-overdue'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* DUNNING ENGINE MANAGEMENT */
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="#a855f7" /> Automated Revenue Recovery Stream
                </h2>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Catches card failures, triggers ML retry timing, and dispatches multi-channel payment links.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dunningLogs.map(log => (
                <div key={log.id} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>{log.target}</span>
                      <span className={`badge ${log.status === 'Recovered' ? 'badge-good' : 'badge-warning'}`}>
                        {log.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#ff9f0a', marginBottom: '2px' }}>
                      {log.event}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {log.date} • {log.action}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {log.status !== 'Recovered' && (
                      <button 
                        onClick={() => handleTriggerRetry(log.id)}
                        className="btn-apple btn-primary" 
                        style={{ fontSize: '11.5px', padding: '6px 12px' }}
                      >
                        <RefreshCw size={12} /> Force Retry
                      </button>
                    )}
                    <button 
                      onClick={() => handleSendWhatsAppAlert(log.target)}
                      className="btn-apple btn-secondary" 
                      style={{ fontSize: '11.5px', padding: '6px 10px' }}
                      title="Send WhatsApp & Email Alert"
                    >
                      <MessageSquare size={13} color="#30d158" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dunning Configuration Matrix */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Dunning Rules & Smart Intervals</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 600, color: '#64d2ff' }}>Stage 1 (Hour 0)</div>
                <div style={{ color: 'var(--text-secondary)' }}>Immediate webhook notification & card re-attempt via alternative banking gateway.</div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 600, color: '#ff9f0a' }}>Stage 2 (Hour 48)</div>
                <div style={{ color: 'var(--text-secondary)' }}>Automated WhatsApp notification with pre-authenticated 1-click Razorpay/Stripe checkout link.</div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 600, color: '#ff453a' }}>Stage 3 (Day 7)</div>
                <div style={{ color: 'var(--text-secondary)' }}>Account automatically put on grace period; webhook triggers access restriction in backend tenant.</div>
              </div>
            </div>

            <div style={{ padding: '12px', background: 'rgba(0,113,227,0.1)', borderRadius: '10px', border: '1px solid rgba(0,113,227,0.3)', marginTop: 'auto' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64d2ff' }}>Recovery Performance</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Last 30 days: 88.4% of failed payments were automatically salvaged without manual sales rep follow-up.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Subscription Modal */}
      {showNewSubModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <form onSubmit={handleCreateSub} className="glass-panel" style={{ width: '450px', padding: '28px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Create Recurring Subscription</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Customer</label>
                <select 
                  className="apple-select" 
                  style={{ width: '100%' }}
                  value={selectedCustomer} 
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Plan Name</label>
                <input 
                  type="text" 
                  className="apple-input" 
                  value={selectedPlan} 
                  onChange={(e) => setSelectedPlan(e.target.value)} 
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Interval</label>
                  <select 
                    className="apple-select" 
                    style={{ width: '100%' }}
                    value={billingCycle} 
                    onChange={(e) => setBillingCycle(e.target.value)}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Amount ({currentTenant.symbol})</label>
                  <input 
                    type="number" 
                    className="apple-input" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowNewSubModal(false)} className="btn-apple btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-apple btn-primary">
                Activate Subscription
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
