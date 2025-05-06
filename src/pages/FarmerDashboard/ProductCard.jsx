// src/pages/FarmerDashboard/ProductCard.jsx
import React from 'react';
import "../../css/ProductCard.css";


function ProductCard({ product, onDelete, onEdit }) {

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={product.image || product.image_url || 'https://via.placeholder.com/150'}
          className="card-img-top"
          alt={product.product_name || 'Product'}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.product_name || product.name}</h5>
          <p className="card-text">{product.description || 'No description available'}</p>
          <p className="product-price">₹ {product.price || '0'}</p>
          <p className="product-stock">{product.stock_availability || '0'} in stock</p>
          <div className="product-actions">
            <button className="btn btn-warning me-2" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
