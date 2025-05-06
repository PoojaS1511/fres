import { useEffect, useState } from 'react';
import { supabase } from "../supabase/supabaseClient";

function FarmerTable() {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredFarmers, setFilteredFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  useEffect(() => {
    const filtered = farmers.filter(farmer =>
      farmer.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFarmers(filtered);
  }, [search, farmers]);

  const fetchFarmers = async () => {
    const { data, error } = await supabase.from('farmers').select('*');
    if (error) {
      console.error(error);
    } else {
      setFarmers(data);
      setFilteredFarmers(data);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this farmer?')) return;

    const { error } = await supabase.from('farmers').delete().eq('id', id);
    if (error) console.error(error);
    else fetchFarmers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Farmers</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-green-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id} className="border-b">
                <td className="py-2 px-4">{farmer.name}</td>
                <td className="py-2 px-4">{farmer.email}</td>
                <td className="py-2 px-4">{farmer.phone}</td>
                <td className="py-2 px-4">{farmer.productName}</td>
                <td className="py-2 px-4">{farmer.price}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(farmer.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredFarmers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FarmerTable;
