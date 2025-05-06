import React, { useEffect, useState } from 'react';
import { supabase } from "../supabase/supabaseClient";

import { useNavigate } from 'react-router-dom';

function BuyerDashboard() {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    ordersCount: 0,      // Placeholder
    totalSpent: 0        // Placeholder
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuyer = async () => {
      setLoading(true);
      const { data: session } = await supabase.auth.getUser();
      const email = session?.user?.email;

      const { data, error } = await supabase
        .from('buyers')
        .select('*')
        .eq('email', email)
        .single();

      if (!error) {
        setBuyer(data);
        setStats({
          ordersCount: 0,      // Replace with actual query when orders are added
          totalSpent: 0        // Replace with actual logic
        });
      } else {
        console.error(error.message);
      }

      setLoading(false);
    };

    fetchBuyer();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading buyer data...</p>;

  if (!buyer) return <p className="text-center text-danger">No buyer data found.</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">🛒 Buyer Dashboard</h2>

      {/* Stats */}
      <div className="row text-center mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>Total Orders</h5>
            <h2>{stats.ordersCount}</h2>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>Total Spent</h5>
            <h2>₹ {stats.totalSpent.toFixed(2)}</h2>
          </div>
        </div>
      </div>

      {/* Buyer Info Card */}
      <div className="card shadow-sm p-4">
        <h4 className="mb-3">Business Details</h4>
        <p><strong>Type:</strong> {buyer.buyerType}</p>
        <p><strong>Address:</strong> {buyer.address}</p>
        <p><strong>GST Number:</strong> {buyer.gstNumber || 'N/A'}</p>
        <p><strong>Business Reg ID:</strong> {buyer.businessRegId || 'N/A'}</p>

        <h4 className="mt-4 mb-3">Payment Preferences</h4>
        <p><strong>Mode:</strong> {buyer.paymentMode}</p>
        <p><strong>Advance Payment Required:</strong> {buyer.advancePayment}</p>
        <p><strong>Return Policy:</strong> {buyer.returnPolicy || 'N/A'}</p>

        <button
          className="btn btn-warning mt-3"
          onClick={() => navigate('/edit-buyer')}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}

export default BuyerDashboard;
