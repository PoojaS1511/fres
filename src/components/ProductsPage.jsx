// src/components/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient'; // Import the supabase client

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products') // Your table name
      .select('*'); // Get all columns (you can change this to select specific columns)

    if (error) {
      setError(error.message); // Set error message if there's an issue
    } else {
      setProducts(data); // Set the fetched products to state
    }

    setLoading(false); // Stop loading
  };

  useEffect(() => {
    fetchProducts(); // Call the fetch function when component mounts
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.farmer_name}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
