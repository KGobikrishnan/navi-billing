import React, { useState } from 'react';
import { Package, Plus, Layers, Tag, Check, AlertCircle, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductCatalog({ products, setProducts, currentTenant }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('SaaS Software');
  const [priceUSD, setPriceUSD] = useState(299);
  const [priceINR, setPriceINR] = useState(24900);
  const [taxRate, setTaxRate] = useState(18);
  const [stock, setStock] = useState('Unlimited (Digital)');
  const [type, setType] = useState('recurring');

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProd = {
      id: `PROD-0${products.length + 1}`,
      name,
      code: code || `SKU-${Date.now().toString().slice(-4)}`,
      category,
      priceUSD: Number(priceUSD),
      priceINR: Number(priceINR),
      priceEUR: Math.round(Number(priceUSD) * 0.92),
      taxRate: Number(taxRate),
      stock,
      type,
      interval: type === 'recurring' ? 'monthly' : 'one_time',
      description: 'Enterprise catalog item configured for automated recurring tax calculations.'
    };

    setProducts([...products, newProd]);
    setShowAddModal(false);
    confetti({ particleCount: 60 });
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
            Product & Service Catalog
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Central repository for SaaS tiers, API consumption meters, and real-time inventory allocation.
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-apple btn-primary">
          <Plus size={15} /> Add Catalog Item
        </button>
      </div>

      {/* Grid of Products */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {products.map((p) => (
          <div key={p.id} className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span className="badge badge-blue">{p.category}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                {p.code}
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{p.name}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', flex: 1, lineHeight: '1.4' }}>
              {p.description}
            </p>

            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', marginBottom: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>USD Pricing:</span>
                <span style={{ fontWeight: 600 }}>${p.priceUSD.toLocaleString()} /mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>INR Localized:</span>
                <span style={{ fontWeight: 600 }}>₹{p.priceINR.toLocaleString()} /mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax Standard:</span>
                <span style={{ color: '#30d158' }}>{p.taxRate}% Auto Calculated</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <span>Availability: <strong style={{ color: '#fff' }}>{p.stock}</strong></span>
              <span style={{ textTransform: 'capitalize' }}>Tier: {p.type}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
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
          <form onSubmit={handleAddProduct} className="glass-panel" style={{ width: '480px', padding: '28px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Add Product to Catalog</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Item Title</label>
                <input 
                  type="text" 
                  className="apple-input" 
                  placeholder="e.g. GPU Compute Dedicated Instance"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>SKU Code</label>
                  <input 
                    type="text" 
                    className="apple-input" 
                    placeholder="SFT-CMP-01"
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Category</label>
                  <select 
                    className="apple-select" 
                    style={{ width: '100%' }}
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="SaaS Software">SaaS Software</option>
                    <option value="API Consumption">API Consumption</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Hardware / Cloud Device">Hardware / Cloud Device</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>USD Rate ($)</label>
                  <input 
                    type="number" 
                    className="apple-input" 
                    value={priceUSD} 
                    onChange={(e) => {
                      setPriceUSD(e.target.value);
                      setPriceINR(Math.round(e.target.value * 86.4));
                    }} 
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>INR Auto-Rate (₹)</label>
                  <input 
                    type="number" 
                    className="apple-input" 
                    value={priceINR} 
                    onChange={(e) => setPriceINR(e.target.value)} 
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-apple btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-apple btn-primary">
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
