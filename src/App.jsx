import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Pages
import Homepage from './pages/Homepage';
import TestPage from './pages/TestPage';
import Login from './pages/login';
import Registration from './pages/Registration';
import FarmerRegistration from './pages/FarmerRegistration';
import BuyerRegistration from './pages/BuyerRegistration';
import Products from './pages/Products';
import ProductSingle from './pages/ProductSingle';
import TodaysPricesPage from './pages/TodaysPricesPage';
import ResetPassword from './pages/ResetPassword';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SignupPage from './pages/Signup';
import FarmerProductRegistration from './pages/FarmerProductRegistration';
import NavigatePage from './pages/NavigatePage';
import ContactForm from './pages/ContactForm';


function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/farmer-registration" element={<FarmerRegistration />} />
          <Route path="/buyer-registration" element={<BuyerRegistration />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductSingle />} />
          <Route path="/today_price" element={<TodaysPricesPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-product" element={<FarmerProductRegistration />} />
          <Route path="/farmer-product-registration" element={<FarmerProductRegistration />} />
          <Route path="/FarmerProductRegistration" element={<FarmerProductRegistration />} />
          <Route path="/navigate" element={<NavigatePage />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

