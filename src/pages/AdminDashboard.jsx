import React, { useState } from 'react';
import AdminStats from '../components/AdminStats';
import RevenueChart from '../components/RevenueChart';
import FarmerTable from '../components/FarmerTable';
import BuyerTable from "../components/BuyerTable"; // ✅
import ProductTable from '../components/ProductTable';
import OrdersTable from '../components/OrdersTable'; // ✅ Importing OrdersTable component

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const tabs = ['Stats', 'Revenue', 'Farmers', 'Buyers', 'Products', 'Orders'];

  const renderTab = () => {
    switch (activeTab) {
      case 'stats':
        return <><AdminStats /><RevenueChart /></>;
      case 'farmers':
        return <FarmerTable />;
      case 'buyers':
        return <BuyerTable />;
      case 'products':
        return <ProductTable />;
      case 'orders':
        return <OrdersTable />; // ✅ Now renders actual OrdersTable
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setActiveTab('stats')} className={`px-4 py-2 rounded ${activeTab === 'stats' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Stats</button>
        <button onClick={() => setActiveTab('farmers')} className={`px-4 py-2 rounded ${activeTab === 'farmers' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Farmers</button>
        <button onClick={() => setActiveTab('buyers')} className={`px-4 py-2 rounded ${activeTab === 'buyers' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Buyers</button>
        <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Products</button>
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Orders</button>
      </div>
      <div className="bg-white shadow rounded p-4">
        {renderTab()}
      </div>
    </div>
  );
}

export default AdminDashboard;
