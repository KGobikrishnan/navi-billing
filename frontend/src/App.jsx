import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import InvoiceEngine from './components/InvoiceEngine';
import SubscriptionsDunning from './components/SubscriptionsDunning';
import ProductCatalog from './components/ProductCatalog';
import CustomerCRM from './components/CustomerCRM';
import ClientSelfPortal from './components/ClientSelfPortal';
import GatewaysCompliance from './components/GatewaysCompliance';
import SecurityRBAC from './components/SecurityRBAC';
import IntegrationsAccounting from './components/IntegrationsAccounting';

import {
  initialTenants,
  userRoles,
  initialCustomers,
  initialProducts,
  currencyRates,
  initialInvoices,
  initialSubscriptions,
  dunningLogs as initialDunningLogs,
  accountingIntegrations
} from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [tenants, setTenants] = useState(initialTenants);
  const [currentTenant, setCurrentTenant] = useState(initialTenants[0]);
  const [currentRole, setCurrentRole] = useState(userRoles[0]);
  const [customers, setCustomers] = useState(initialCustomers);
  const [products, setProducts] = useState(initialProducts);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [dunningLogs, setDunningLogs] = useState(initialDunningLogs);
  const [selectedPortalCustomerId, setSelectedPortalCustomerId] = useState(initialCustomers[0].id);

  const handleOpenClientPortal = (customerId) => {
    setSelectedPortalCustomerId(customerId);
    setCurrentTab('client_portal');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-primary)' }}>
      {/* Apple-grade Nav Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        currentTenant={currentTenant}
        setCurrentTenant={setCurrentTenant}
        tenants={tenants}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        roles={userRoles}
      />

      {/* Main App Canvas */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', minWidth: 0 }}>
        {currentTab === 'dashboard' && (
          <DashboardOverview 
            invoices={invoices}
            subscriptions={subscriptions}
            customers={customers}
            currentTenant={currentTenant}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'invoices' && (
          <InvoiceEngine 
            invoices={invoices}
            setInvoices={setInvoices}
            customers={customers}
            products={products}
            currencyRates={currencyRates}
            currentTenant={currentTenant}
          />
        )}

        {currentTab === 'subscriptions' && (
          <SubscriptionsDunning 
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            dunningLogs={dunningLogs}
            setDunningLogs={setDunningLogs}
            customers={customers}
            currentTenant={currentTenant}
          />
        )}

        {currentTab === 'products' && (
          <ProductCatalog 
            products={products}
            setProducts={setProducts}
            currentTenant={currentTenant}
          />
        )}

        {currentTab === 'customers' && (
          <CustomerCRM 
            customers={customers}
            setCustomers={setCustomers}
            onOpenClientPortal={handleOpenClientPortal}
          />
        )}

        {currentTab === 'client_portal' && (
          <ClientSelfPortal 
            customers={customers}
            invoices={invoices}
            setInvoices={setInvoices}
            selectedCustomerId={selectedPortalCustomerId}
            setSelectedCustomerId={setSelectedPortalCustomerId}
            currentTenant={currentTenant}
          />
        )}

        {currentTab === 'gateways' && (
          <GatewaysCompliance />
        )}

        {currentTab === 'security' && (
          <SecurityRBAC 
            tenants={tenants}
            setTenants={setTenants}
            currentRole={currentRole}
            roles={userRoles}
            currentTenant={currentTenant}
          />
        )}

        {currentTab === 'integrations' && (
          <IntegrationsAccounting 
            integrations={accountingIntegrations}
          />
        )}
      </main>
    </div>
  );
}
