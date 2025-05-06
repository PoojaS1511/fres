import React, { useEffect, useState } from 'react';
import { supabase } from "../supabase/supabaseClient";


const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = orders.filter(order =>
    order.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by buyer or product"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-1 mb-4 w-full"
      />

      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Buyer</th>
            <th className="p-2">Product</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{order.buyer_name}</td>
                <td className="p-2">{order.product_name}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">₹{order.price}</td>
                <td className="p-2 font-semibold">₹{order.total_price}</td>
                <td className="p-2">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="p-2 capitalize">{order.status}</td>
              </tr>
            ))
          ) : (
            <tr><td className="p-4 text-center" colSpan="7">No orders found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
