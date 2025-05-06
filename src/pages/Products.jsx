import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Products.css';
import { supabase } from '../supabase/supabaseClient';

// Sample products as fallback if database fetch fails
const sampleProducts = [
  {
    name: 'Broccoli',
    price: '₹70/Kg',
    quality: 'A Grade',
    packagingSize: '10 Kg',
    packagingType: 'Carton',
    description: `Broccoli is a fast-growing annual plant that can grow up to 35 inches tall.
It has a thick, light green stalk with large, dark green flower heads that branch out in a tree-like structure.
The flower heads are surrounded by leaves. Broccoli is celebrated for its crisp, edible florets and tender stems.
Packed with vitamins and fiber, it offers a slightly bitter yet nutty taste, making it a nutritious addition to a variety of dishes.`,
    image: 'https://www.bigbasket.com/media/uploads/p/l/10000063_15-fresho-broccoli.jpg',
    farmer: 'Pooja',
    location: 'M.G.R. Nagar, Komarapalayam',
    farmName: 'SK Enterprises',
  },
  {
    name: 'Red Indian Guava',
    price: '₹30/Kg',
    quality: 'A Grade',
    color: 'Red',
    packagingType: 'Carton',
    organic: 'Yes',
    description: `The Red Indian guava is a type of guava that is often considered the best to eat fresh.
It has a strong guava aroma, beautiful red interior, and plenty of soft flesh.
Its flavor is described as a mix between pear and strawberry, making it delicious and refreshing.
It is also rich in vitamin C and antioxidants, making it a healthy choice.`,
    image: 'https://4.imimg.com/data4/CS/CS/GLADMIN-/red-guava-500x500.jpg',
    farmer: 'Pooja',
    location: 'M.G.R. Nagar, Komarapalayam',
    farmName: 'SK Enterprises',
  },
  {
    name: 'Indian A Grade Fresh Tomato',
    price: '₹15/Kg',
    specialty: 'Indian',
    color: 'Red',
    packagingSize: 'Loose',
    quality: 'A Grade',
    packagingType: 'Gunny Bag',
    minOrder: '100 Kg',
    description: `Fresh and delicious tomatoes are a summer favorite.
Perfect for sauces, salads, and salsas, tomatoes add flavor and color to a wide range of dishes.
They are rich in vitamin C, potassium, and lycopene — a powerful antioxidant.
Try marinating them in herbs and olive oil, enjoy them in a tomato soup, or use them as a topping on your favorite pizza.
Our tomatoes are freshly harvested and ready to be delivered to your doorstep.`,
    image: 'https://www.bigbasket.com/media/uploads/p/l/10000184_27-fresho-tomato-hybrid.jpg',
    farmer: 'Pooja',
    location: 'M.G.R. Nagar, Komarapalayam',
    farmName: 'SK Enterprises',
  }
];

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.error('Error fetching products:', error);
          setError('Failed to load products. Using sample data instead.');
          setProducts(sampleProducts); // Use sample products as fallback
        } else if (data && data.length > 0) {
          console.log('Products fetched successfully:', data);
          setProducts(data);
        } else {
          console.log('No products found in database, using sample data');
          setProducts(sampleProducts); // Use sample products if no data
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Using sample data instead.');
        setProducts(sampleProducts); // Use sample products as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract search query from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.farmer_name && product.farmer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.farmer && product.farmer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="product-container">
      <h1>Our Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && (
        <div className="loading-container">
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-info">
            <div className="product-img-container">
              <img
                src={product.image || product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={product.name || product.product_name || 'Product'}
                className="product-img"
              />
            </div>
            <div className="product-content">
              <h2>{product.name || product.product_name}</h2>
              <p><strong>Price:</strong> {product.price ? product.price : `₹${product.price || 0}`}</p>

              <div className="product-details">
                {product.quality && <p><strong>Quality:</strong> {product.quality}</p>}
                {product.color && <p><strong>Color:</strong> {product.color}</p>}
                {product.specialty && <p><strong>Specialty:</strong> {product.specialty}</p>}
                {product.packagingSize && <p><strong>Packaging Size:</strong> {product.packagingSize}</p>}
                {product.packaging_type && <p><strong>Packaging Type:</strong> {product.packaging_type}</p>}
                {product.packagingType && <p><strong>Packaging Type:</strong> {product.packagingType}</p>}
                {product.minOrder && <p><strong>Minimum Order Quantity:</strong> {product.minOrder}</p>}
                {product.moq && <p><strong>Minimum Order Quantity:</strong> {product.moq}</p>}
                {product.organic && <p><strong>Organic Status:</strong> {product.organic}</p>}
                {product.weight_per_unit && <p><strong>Weight Per Unit:</strong> {product.weight_per_unit}</p>}
                {product.variety && <p><strong>Variety:</strong> {product.variety}</p>}
                {product.category && <p><strong>Category:</strong> {product.category}</p>}
              </div>

              <div className="product-description">
                <p><strong>Description:</strong> {product.description}</p>
              </div>

              <div className="farmer-info">
                <p><strong>Farmer:</strong> {product.farmer || product.farmer_name}</p>
                <p><strong>Location:</strong> {product.location}</p>
                <p><strong>Farm Name:</strong> {product.farmName || product.farm_name}</p>
              </div>

              <button
                className="contact-button"
                onClick={() => navigate('/contact', {
                  state: {
                    productName: product.name || product.product_name,
                    farmerId: product.id || product.farmer_id || product.email || 'unknown',
                  }
                })}
              >
                Contact Supplier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
