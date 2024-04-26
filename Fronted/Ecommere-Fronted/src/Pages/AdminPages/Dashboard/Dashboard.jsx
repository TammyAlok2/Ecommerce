import React, { useState } from 'react';
import ProfilePage from './Profile';
import ShopListPage from './ShopListPage';
import AddShop from './AddShop';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-900 text-gray-100 p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <ul>
            <li
              className={`cursor-pointer h-full py-3 px-4 rounded text-xl ${
                activeTab === 'dashboard' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer h-full py-3 px-4 rounded text-xl ${
                activeTab === 'profile' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabChange('profile')}
            >
              Profile
            </li>
            <li
              className={`cursor-pointer h-full py-3 px-4 rounded text-xl ${
                activeTab === 'shops' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabChange('shops')}
            >
              Shops
            </li>

            <li
              className={`cursor-pointer h-full py-3 px-4 rounded text-xl ${
                activeTab === 'addShop' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabChange('addShop')}
            >
              Add A shop 
            </li>
            <li
              className={`cursor-pointer h-full py-3 px-4 rounded text-xl ${
                activeTab === 'orders' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabChange('orders')}
            >
              Orders
            </li>
            <li
              className={`cursor-pointer h-full py-3 px-4 rounded text-xl ${
                activeTab === 'payments' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabChange('payments')}
            >
              Payments
            </li>
          </ul>
        </div>
        <div>
          <button className="bg-red-500 text-white px-4 py-2 rounded w-full">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, User!</h1>
        {activeTab === 'dashboard' && <div>Dashboard Content</div>}
        {activeTab === 'profile' && <ProfilePage/>}
        {activeTab === 'shops' && <ShopListPage/>}
        {activeTab === 'addShop' && <AddShop/>}

        {activeTab === 'orders' && <div><ShopListPage/></div>}
        {activeTab === 'payments' && <div>Payments Content</div>}
      </div>
    </div>
  );
};

export default Dashboard;
