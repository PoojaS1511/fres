import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/NavigatePage.css';
import { supabase } from '../supabase/supabaseClient';

const NavigatePage = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sampleFarmers = [
    {
      name: 'Pooja',
      farmName: 'SK Enterprises',
      lat: 11.1828,
      lng: 77.8476,
      location: 'M.G.R. Nagar, Komarapalayam',
      product: 'Broccoli',
    },
    {
      name: 'Ravi',
      farmName: 'Green Fields',
      lat: 11.1900,
      lng: 77.8500,
      location: 'Komarapalayam',
      product: 'Tomatoes',
    },
  ];

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('farmer_name, farm_name, location, product_name');

        if (productsError) {
          console.error('Error fetching products:', productsError);
          throw new Error(productsError.message);
        }

        const uniqueFarmers = {};

        if (productsData && productsData.length > 0) {
          productsData.forEach(product => {
            if (product.farmer_name && product.location) {
              if (!uniqueFarmers[product.farmer_name]) {
                uniqueFarmers[product.farmer_name] = {
                  name: product.farmer_name,
                  farmName: product.farm_name || 'Farm',
                  location: product.location,
                  lat: 11.1828 + (Math.random() * 0.02 - 0.01),
                  lng: 77.8476 + (Math.random() * 0.02 - 0.01),
                  products: [],
                };
              }
              uniqueFarmers[product.farmer_name].products.push(product.product_name || 'Product');
            }
          });
        }

        const farmersArray = Object.values(uniqueFarmers);

        if (farmersArray.length > 0) {
          console.log('Farmers fetched successfully:', farmersArray);
          setFarmers(farmersArray);
        } else {
          console.log('No farmers found in database, using sample data');
          setFarmers(sampleFarmers);
        }
      } catch (err) {
        console.error('Error fetching farmers:', err);
        setError('Failed to load farmers. Using sample data instead.');
        setFarmers(sampleFarmers);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="navigate-container">
      <h1>Navigate to Farmers</h1>
      <p className="navigate-description">
        Use this map to find farmers near you and their available products.
      </p>

      <input
        type="text"
        placeholder="Search by location or farmer name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {loading && (
        <div className="loading-message">
          <p>Loading farmer locations...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="map-container">
        <MapContainer
          center={[11.1828, 77.8476]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredFarmers.map((farmer, index) => (
            <Marker
              key={index}
              position={[farmer.lat, farmer.lng]}
              icon={new L.Icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>
                <h3>{farmer.farmName}</h3>
                <p className="farmer-location">{farmer.location}</p>
                <p className="farmer-contact">Contact: {farmer.name}</p>
                {farmer.products && farmer.products.length > 0 ? (
                  <div className="farmer-products">
                    <p><strong>Products:</strong></p>
                    <ul>
                      {farmer.products.map((product, idx) => (
                        <li key={idx}>{product}</li>
                      ))}
                    </ul>
                  </div>
                ) : farmer.product ? (
                  <p className="farmer-product"><strong>Product:</strong> {farmer.product}</p>
                ) : null}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default NavigatePage;
