import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Send, 
  CheckCircle, 
  FileText, 
  Percent, 
  DollarSign, 
  Building,
  ArrowRight,
  Download,
  Eye,
  RefreshCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InvoiceEngine({ 
  invoices, 
  setInvoices, 
  customers, 
  products, 
  currencyRates, 
  currentTenant 
}) {
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0] || null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form State for dynamic builder
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]
  );
  const [currency, setCurrency] = useState(currentTenant.currency);
  const [discountPercent, setDiscountPercent] = useState(5);
  const [taxRate, setTaxRate] = useState(18);
  const [taxName, setTaxName] = useState('GST (India) / VAT');
  const [notes, setNotes] = useState('Payment terms: Net 15. Electronic transfer or Credit Card via PCI-DSS portal.');

  const [lineItems, setLineItems] = useState([
    {
      id: 'item-1',
      description: products[0]?.name || 'Cloud Platform License',
      qty: 1,
      unitPrice: products[0]?.priceUSD || 1200
    }
  ]);

  // Handle customer selection tax auto-computation
  const handleCustomerChange = (id) => {
    setCustomerId(id);
    const cust = customers.find(c => c.id === id);
    if (cust) {
      if (cust.country === 'India') {
        setTaxRate(18);
        setTaxName('GST @ 18% (9% CGST + 9% SGST)');
        setCurrency('INR');
      } else if (cust.country === 'United States') {
        setTaxRate(8.25);
        setTaxName('US Sales Tax (CA State)');
        setCurrency('USD');
      } else if (cust.country === 'Germany') {
        setTaxRate(19);
        setTaxName('EU VAT Standard (19%)');
        setCurrency('EUR');
      } else if (cust.country === 'United Kingdom') {
        setTaxRate(20);
        setTaxName('UK Standard VAT (20%)');
        setCurrency('GBP');
      }
    }
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: `item-${Date.now()}`,
        description: '',
        qty: 1,
        unitPrice: 100
      }
    ]);
  };

  const updateLineItem = (id, field, value) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const removeLineItem = (id) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const applyProductPreset = (itemId, productId) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const priceKey = currency === 'INR' ? 'priceINR' : currency === 'EUR' ? 'priceEUR' : 'priceUSD';
    const price = prod[priceKey] || prod.priceUSD;
    setLineItems(lineItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          description: prod.name,
          unitPrice: price
        };
      }
      return item;
    }));
  };

  // Calculations
  const subtotal = lineItems.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.unitPrice || 0)), 0);
  const discountAmount = (subtotal * (Number(discountPercent) || 0)) / 100;
  const taxableBase = subtotal - discountAmount;
  const taxAmount = (taxableBase * (Number(taxRate) || 0)) / 100;
  const grandTotal = taxableBase + taxAmount;
  const currSymbol = currencyRates[currency]?.symbol || '$';

  // Save new invoice
  const handleSaveInvoice = (e) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === customerId);
    const newInv = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId,
      customerName: cust ? cust.name : 'Client Company',
      customerEmail: cust ? cust.email : 'billing@client.com',
      date: invoiceDate,
      dueDate: dueDate,
      currency,
      symbol: currSymbol,
      items: lineItems.map(i => ({
        ...i,
        amount: Number(i.qty) * Number(i.unitPrice)
      })),
      discountPercent: Number(discountPercent),
      discountAmount,
      subtotal,
      taxRate: Number(taxRate),
      taxName,
      taxAmount,
      total: grandTotal,
      status: 'Pending',
      paidAt: null,
      paymentMethod: 'Instant Link (Stripe/Razorpay)',
      notes
    };

    setInvoices([newInv, ...invoices]);
    setSelectedInvoice(newInv);
    setIsCreating(false);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const markAsPaid = (invId) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === invId) {
        return { ...inv, status: 'Paid', paidAt: new Date().toISOString().split('T')[0] };
      }
      return inv;
    }));
    if (selectedInvoice && selectedInvoice.id === invId) {
      setSelectedInvoice(prev => ({ ...prev, status: 'Paid', paidAt: new Date().toISOString().split('T')[0] }));
    }
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
            Core Billing & Invoicing Engine
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Dynamic builder with automated line-item discounts, multi-currency live conversions, and legal tax engines.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setIsCreating(!isCreating)} 
            className="btn-apple btn-primary"
          >
            {isCreating ? <FileText size={15} /> : <Plus size={15} />}
            {isCreating ? 'View All Invoices' : 'Create New Invoice'}
          </button>
        </div>
      </div>

      {isCreating ? (
        /* INVOICE BUILDER FORM */
        <form onSubmit={handleSaveInvoice} className="glass-panel" style={{ padding: '28px', maxWidth: '960px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Draft Professional Invoice</h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tenant Domain: {currentTenant.domain}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setIsCreating(false)} className="btn-apple btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-apple btn-primary">
                <Sparkles size={15} /> Issue & Finalize
              </button>
            </div>
          </div>

          {/* Customer & Multi-currency metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Select Customer (CRM)
              </label>
              <select 
                className="apple-select" 
                style={{ width: '100%' }}
                value={customerId} 
                onChange={(e) => handleCustomerChange(e.target.value)}
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.country})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Billing Currency
              </label>
              <select 
                className="apple-select" 
                style={{ width: '100%' }}
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
              >
                {Object.keys(currencyRates).map(curr => (
                  <option key={curr} value={curr}>
                    {curr} ({currencyRates[curr].symbol}) - {currencyRates[curr].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Invoice Date
              </label>
              <input 
                type="date" 
                className="apple-input" 
                value={invoiceDate} 
                onChange={(e) => setInvoiceDate(e.target.value)} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Due Date
              </label>
              <input 
                type="date" 
                className="apple-input" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
              />
            </div>
          </div>

          {/* Line items table */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Invoice Line Items</h3>
              <button 
                type="button" 
                onClick={addLineItem} 
                className="btn-apple btn-secondary" 
                style={{ fontSize: '12px', padding: '4px 10px' }}
              >
                <Plus size={13} /> Add Item
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lineItems.map((item, idx) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 80px 120px 100px 40px', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="apple-input"
                    placeholder="Description or service title"
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    required
                  />

                  {/* Preset Catalog Dropdown */}
                  <select
                    className="apple-select"
                    style={{ fontSize: '12px' }}
                    onChange={(e) => applyProductPreset(item.id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Catalog Preset...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    className="apple-input"
                    min="1"
                    placeholder="Qty"
                    value={item.qty}
                    onChange={(e) => updateLineItem(item.id, 'qty', e.target.value)}
                    required
                  />

                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      {currSymbol}
                    </span>
                    <input
                      type="number"
                      className="apple-input"
                      style={{ paddingLeft: '24px' }}
                      min="0"
                      step="any"
                      placeholder="Rate"
                      value={item.unitPrice}
                      onChange={(e) => updateLineItem(item.id, 'unitPrice', e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ textAlign: 'right', fontWeight: 600, fontSize: '13.5px' }}>
                    {currSymbol}{(Number(item.qty || 0) * Number(item.unitPrice || 0)).toLocaleString()}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeLineItem(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ff453a', cursor: 'pointer', padding: '6px' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Engine & Totals Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Tax Engine Configuration
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    className="apple-input"
                    value={taxName}
                    onChange={(e) => setTaxName(e.target.value)}
                    placeholder="Tax designation"
                  />
                  <div style={{ width: '100px', position: 'relative' }}>
                    <input
                      type="number"
                      className="apple-input"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      placeholder="%"
                    />
                    <span style={{ position: 'absolute', right: '10px', top: '10px', color: 'var(--text-muted)' }}>%</span>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Discount (%)
                </label>
                <div style={{ width: '120px', position: 'relative' }}>
                  <input
                    type="number"
                    className="apple-input"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    min="0"
                    max="100"
                  />
                  <span style={{ position: 'absolute', right: '10px', top: '10px', color: 'var(--text-muted)' }}>%</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Notes & Legal Disclaimers
                </label>
                <textarea
                  className="apple-input"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Price Breakdown Panel */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)', height: 'fit-content' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '14px' }}>
                Summary Calculations
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span>{currSymbol}{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Discount ({discountPercent}%)</span>
                  <span style={{ color: '#30d158' }}>-{currSymbol}{discountAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{taxName} ({taxRate}%)</span>
                  <span>+{currSymbol}{taxAmount.toFixed(2)}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px' }}>
                  <span>Grand Total</span>
                  <span style={{ color: '#64d2ff' }}>{currSymbol}{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="btn-apple btn-primary" style={{ width: '100%', marginTop: '20px', padding: '12px' }}>
                Create Invoice Now
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* INVOICE MASTER-DETAIL LIST & APPLE PREVIEW */
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }}>
          {/* Invoices List */}
          <div className="glass-panel" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '0 4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>All Generated Invoices</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{invoices.length} Records</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {invoices.map((inv) => {
                const isSelected = selectedInvoice?.id === inv.id;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(0, 113, 227, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: isSelected ? '1px solid rgba(0, 113, 227, 0.4)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 600, color: '#64d2ff' }}>
                        {inv.id}
                      </span>
                      <span className={`badge ${
                        inv.status === 'Paid' ? 'badge-paid' :
                        inv.status === 'Pending' ? 'badge-pending' : 'badge-overdue'
                      }`}>
                        {inv.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13.5px' }}>{inv.customerName}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Due: {inv.dueDate}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>{inv.symbol}{inv.total.toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{inv.currency}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Apple-Style Invoice Preview Sheet */}
          {selectedInvoice && (
            <div className="glass-panel" style={{ padding: '32px', position: 'relative' }}>
              {/* Header Action Bar */}
              <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${
                    selectedInvoice.status === 'Paid' ? 'badge-paid' :
                    selectedInvoice.status === 'Pending' ? 'badge-pending' : 'badge-overdue'
                  }`}>
                    {selectedInvoice.status}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Payment Mode: {selectedInvoice.paymentMethod}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {selectedInvoice.status !== 'Paid' && (
                    <button onClick={() => markAsPaid(selectedInvoice.id)} className="btn-apple btn-success" style={{ fontSize: '12px' }}>
                      <CheckCircle size={14} /> Record Payment
                    </button>
                  )}
                  <button onClick={() => window.print()} className="btn-apple btn-secondary" style={{ fontSize: '12px' }}>
                    <Printer size={14} /> Print / PDF
                  </button>
                </div>
              </div>

              {/* Printable Invoice Document Body */}
              <div className="printable-invoice" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                padding: '30px',
                border: '1px solid var(--border-subtle)'
              }}>
                {/* Brand & Invoice Meta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                        N
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '-0.4px' }}>
                        {currentTenant.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      Cloud Infrastructure & Billing Gateway Service<br />
                      Domain: {currentTenant.domain}<br />
                      Tax/GSTIN: 33AABCT9981F1Z1
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                      TAX INVOICE
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#64d2ff', fontWeight: 600 }}>
                      {selectedInvoice.id}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Date: {selectedInvoice.date}<br />
                      Due: {selectedInvoice.dueDate}
                    </div>
                  </div>
                </div>

                {/* Bill To Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', marginBottom: '28px' }}>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Billed To Client:
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '14.5px', marginTop: '2px' }}>
                      {selectedInvoice.customerName}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {selectedInvoice.customerEmail}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Currency & Settlement
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>
                      {selectedInvoice.currency} ({currencyRates[selectedInvoice.currency]?.name || 'Standard'})
                    </div>
                    <div style={{ fontSize: '12px', color: selectedInvoice.status === 'Paid' ? '#30d158' : '#ff9f0a' }}>
                      {selectedInvoice.status === 'Paid' ? `Settled on ${selectedInvoice.paidAt}` : 'Awaiting Payment'}
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '24px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '8px 4px' }}>Item Description</th>
                      <th style={{ padding: '8px 4px', textAlign: 'center' }}>Qty</th>
                      <th style={{ padding: '8px 4px', textAlign: 'right' }}>Rate</th>
                      <th style={{ padding: '8px 4px', textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px 4px', fontWeight: 500 }}>{item.description}</td>
                        <td style={{ padding: '12px 4px', textAlign: 'center' }}>{item.qty}</td>
                        <td style={{ padding: '12px 4px', textAlign: 'right' }}>{selectedInvoice.symbol}{item.unitPrice.toLocaleString()}</td>
                        <td style={{ padding: '12px 4px', textAlign: 'right', fontWeight: 600 }}>{selectedInvoice.symbol}{item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Tax & Grand Total */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Subtotal</span>
                      <span>{selectedInvoice.symbol}{selectedInvoice.subtotal.toLocaleString()}</span>
                    </div>

                    {selectedInvoice.discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#30d158' }}>
                        <span>Discount ({selectedInvoice.discountPercent}%)</span>
                        <span>-{selectedInvoice.symbol}{selectedInvoice.discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>{selectedInvoice.taxName} ({selectedInvoice.taxRate}%)</span>
                      <span>+{selectedInvoice.symbol}{selectedInvoice.taxAmount.toFixed(2)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '18px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                      <span>Total Amount</span>
                      <span style={{ color: '#64d2ff' }}>{selectedInvoice.symbol}{selectedInvoice.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Notes & Security Stamp */}
                <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', maxWidth: '420px' }}>
                    <strong>Terms & Notes:</strong> {selectedInvoice.notes}
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '10.5px', color: 'var(--text-muted)' }}>
                    Digitally signed & encrypted • PCI-DSS Safe
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
