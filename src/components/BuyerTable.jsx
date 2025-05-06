import { useEffect, useState } from 'react';
import { supabase } from "../supabase/supabaseClient";

function BuyerTable() {
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState('');
  const [buyerTypeFilter, setBuyerTypeFilter] = useState('All');
  const [filteredBuyers, setFilteredBuyers] = useState([]);

  useEffect(() => {
    fetchBuyers();
  }, []);

  useEffect(() => {
    let filtered = buyers.filter(buyer =>
      buyer.address?.toLowerCase().includes(search.toLowerCase())
    );
    if (buyerTypeFilter !== 'All') {
      filtered = filtered.filter(buyer => buyer.buyerType === buyerTypeFilter);
    }
    setFilteredBuyers(filtered);
  }, [search, buyerTypeFilter, buyers]);

  const fetchBuyers = async () => {
    const { data, error } = await supabase.from('buyers').select('*');
    if (error) {
      console.error(error);
    } else {
      setBuyers(data);
      setFilteredBuyers(data);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this buyer?')) return;

    const { error } = await supabase.from('buyers').delete().eq('id', id);
    if (error) console.error(error);
    else fetchBuyers();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Buyers</h2>
        <input
          type="text"
          placeholder="Search by address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <select
          value={buyerTypeFilter}
          onChange={(e) => setBuyerTypeFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="All">All Types</option>
          <option value="Retailer">Retailer</option>
          <option value="Wholesaler">Wholesaler</option>
          <option value="Distributor">Distributor</option>
          <option value="Exporter">Exporter</option>
          <option value="Individual Consumer">Individual Consumer</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-green-100">
            <tr>
              <th className="py-2 px-4 text-left">Buyer Type</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Payment Mode</th>
              <th className="py-2 px-4">Advance</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.map((buyer) => (
              <tr key={buyer.id} className="border-b">
                <td className="py-2 px-4">{buyer.buyerType}</td>
                <td className="py-2 px-4">{buyer.address}</td>
                <td className="py-2 px-4">{buyer.paymentMode}</td>
                <td className="py-2 px-4">{buyer.advancePayment}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(buyer.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredBuyers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BuyerTable;
