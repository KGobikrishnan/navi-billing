import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, ShieldCheck, DollarSign, Plus, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CustomerCRM({ customers, setCustomers, onOpenClientPortal }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [taxId, setTaxId] = useState('');
  const [address, setAddress] = useState('');

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    const newCust = {
      id: `CUST-${Math.floor(1005 + Math.random() * 900)}`,
      name,
      contactPerson,
      email,
      phone,
      country,
      taxId: taxId || (country === 'India' ? '33AAAAA0000A1Z5' : 'US-EIN-000000'),
      taxCategory: country === 'India' ? 'GST @ 18%' : country === 'Germany' ? 'EU VAT (19%)' : 'Sales Tax (8.25%)',
      currency: country === 'India' ? 'INR' : country === 'Germany' ? 'EUR' : 'USD',
      balance: 0.00,
      status: 'Good Standing',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      address
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    confetti({ particleCount: 50 });
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
            Customer Management (CRM)
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Client billing profiles, legal tax identifiers, payment behavior tracking and direct self-service portal access.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-apple btn-primary">
          <Plus size={15} /> Add New Client
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {customers.map((c) => (
          <div key={c.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={c.avatar} 
                  alt={c.name} 
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-subtle)' }} 
                />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600 }}>{c.name}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.contactPerson}</div>
                </div>
              </div>
              <span className={`badge ${c.status === 'Good Standing' ? 'badge-good' : 'badge-danger'}`}>
                {c.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={13} color="#64d2ff" /> {c.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={13} color="#30d158" /> {c.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={13} color="#ff9f0a" /> {c.country} • {c.taxId}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tax Category</div>
                <div style={{ fontSize: '12.5px', fontWeight: 500 }}>{c.taxCategory}</div>
              </div>
              <button 
                onClick={() => onOpenClientPortal(c.id)} 
                className="btn-apple btn-secondary" 
                style={{ fontSize: '11.5px', padding: '6px 12px' }}
              >
                <ExternalLink size={12} /> Client Portal
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
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
          <form onSubmit={handleCreateCustomer} className="glass-panel" style={{ width: '480px', padding: '28px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Onboard New Client Profile</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Business Name</label>
                <input 
                  type="text" 
                  className="apple-input" 
                  placeholder="e.g. Acme Ventures Ltd"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Contact Person</label>
                  <input 
                    type="text" 
                    className="apple-input" 
                    value={contactPerson} 
                    onChange={(e) => setContactPerson(e.target.value)} 
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Country</label>
                  <select 
                    className="apple-select" 
                    style={{ width: '100%' }}
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="India">India (GST Engine)</option>
                    <option value="United States">United States (Sales Tax)</option>
                    <option value="Germany">Germany (EU VAT)</option>
                    <option value="United Kingdom">United Kingdom (UK VAT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email Address</label>
                <input 
                  type="email" 
                  className="apple-input" 
                  placeholder="accounts@business.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Tax ID (GSTIN / VAT / EIN)</label>
                <input 
                  type="text" 
                  className="apple-input" 
                  placeholder="e.g. 33AABCT9981F1Z1"
                  value={taxId} 
                  onChange={(e) => setTaxId(e.target.value)} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-apple btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-apple btn-primary">
                Save Client
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
