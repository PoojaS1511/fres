// src/pages/Admin/RevenueChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 3200 },
  { month: 'Mar', revenue: 2800 },
  { month: 'Apr', revenue: 3500 },
  { month: 'May', revenue: 4200 },
  { month: 'Jun', revenue: 3900 },
  { month: 'Jul', revenue: 4600 },
  { month: 'Aug', revenue: 4100 },
  { month: 'Sep', revenue: 3800 },
  { month: 'Oct', revenue: 4500 },
  { month: 'Nov', revenue: 4800 },
  { month: 'Dec', revenue: 5100 }
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Monthly Revenue Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${value}`} />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Line type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
