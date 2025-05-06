// src/pages/FarmerDashboard/Stats.jsx
import React from 'react';

function Stats({ stats }) {
  return (
    <div className="row text-center mb-4">
      <div className="col-md-6">
        <div className="card shadow-sm p-3">
          <h5>Total Products</h5>
          <h2>{stats?.totalProducts || 0}</h2>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card shadow-sm p-3">
          <h5>Estimated Revenue</h5>
          <h2>₹ {(stats?.totalRevenue || 0).toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Stats;
