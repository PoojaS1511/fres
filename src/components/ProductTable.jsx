import { useEffect, useState } from 'react';
import { supabase } from "../supabase/supabaseClient";


function ProductTable() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, category, products]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error fetching products:', error);
    else {
      setProducts(data);
      setFiltered(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert('Delete failed');
    else {
      alert('Deleted!');
      fetchProducts();
    }
  };

  const handleFilter = () => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      temp = temp.filter((product) => product.category === category);
    }

    setFiltered(temp);
  };

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Products</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by product name"
          className="border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Farmer</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.productName}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2">{p.unit}</td>
                  <td className="p-2">{p.farmerName}</td>
                  <td className="p-2">
                    <button
                      className="text-red-500 hover:underline mr-2"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                    <button className="text-blue-500 hover:underline">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
