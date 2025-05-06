// src/pages/AdminDashboard/AdminStats.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from "../supabase/supabaseClient";


function AdminStats() {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalBuyers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: farmers }, { count: buyers }, { data: products }] = await Promise.all([
        supabase.from('farmers').select('*', { count: 'exact', head: true }),
        supabase.from('buyers').select('*', { count: 'exact', head: true }),
        supabase.from('farmers').select('price, stock_availability'),
      ]);

      const totalProducts = products.length;
      const totalRevenue = products.reduce(
        (acc, product) => acc + parseFloat(product.price || 0) * parseInt(product.stock_availability || 0),
        0
      );

      setStats({
        totalFarmers: farmers || 0,
        totalBuyers: buyers || 0,
        totalProducts,
        totalRevenue,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="row mb-4">
      {[
        { label: 'Total Farmers', value: stats.totalFarmers },
        { label: 'Total Buyers', value: stats.totalBuyers },
        { label: 'Total Products', value: stats.totalProducts },
        { label: 'Total Revenue', value: `₹ ${stats.totalRevenue.toFixed(2)}` },
      ].map((item, idx) => (
        <div key={idx} className="col-md-3 mb-3">
          <div className="card shadow-sm text-center p-3 border-success">
            <h6>{item.label}</h6>
            <h4>{item.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;
