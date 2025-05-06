// src/pages/FarmerDashboard/EditProductModal.jsx
import React, { useState } from 'react';
import { supabase } from "../../supabase/supabaseClient";
import "../../css/EditProductModal.css";



function EditProductModal({ product, onClose, onUpdated }) {
  const [formData, setFormData] = useState({ ...product });
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      // Make sure we're updating the correct table
      const { error } = await supabase.from('products').update(formData).eq('id', product.id);

      if (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
      } else {
        console.log('Product updated successfully');
        // Call the onUpdate callback to refresh the products list
        if (typeof onUpdated === 'function') {
          onUpdated();
        }
        onClose();
      }
    } catch (err) {
      console.error('Unexpected error updating product:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label" htmlFor="product_name">Product Name</label>
              <input
                type="text"
                id="product_name"
                className="form-control"
                value={formData.product_name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={formData.price || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="stock_availability">Stock Availability</label>
              <input
                type="number"
                id="stock_availability"
                className="form-control"
                value={formData.stock_availability || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate} disabled={updating}>
              {updating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
