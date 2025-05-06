import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../css/FarmerRegistration.css";

function FarmerRegistration() {
  const [formData, setFormData] = useState({
    farmer_name: "",
    farm_name: "",
    mobile_number: "",
    whatsapp_number: "",
    email: "",
    location: "",
    farm_registration_id: "",
    product_name: "",
    category: "",
    variety: "",
    description: "",
    harvest_date: "",
    price: "",
    moq: "",
    packaging_type: "",
    weight_per_unit: "",
    stock_availability: "",
    payment_mode: "",
    advance_payment: "",
    return_policy: "",
  });

  const [productImages, setProductImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    setProductImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    // 1. Upload images to Supabase Storage
    const imageUrls = [];
    for (const file of productImages) {
      const filePath = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (error) {
        setMessage("Image upload failed");
        setSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from("product-images")
        .getPublicUrl(filePath);
      imageUrls.push(publicUrlData.publicUrl);
    }

    // 2. Insert data into the "farmers" table
    const { error } = await supabase.from("farmers").insert([
      {
        ...formData,
        product_images: imageUrls, // array of image URLs
      },
    ]);

    if (error) {
      setMessage("Failed to register farmer");
    } else {
      setMessage("🎉 Farmer registered successfully!");
      // Reset form
      setFormData({
        farmer_name: "",
        farm_name: "",
        mobile_number: "",
        whatsapp_number: "",
        email: "",
        location: "",
        farm_registration_id: "",
        product_name: "",
        category: "",
        variety: "",
        description: "",
        harvest_date: "",
        price: "",
        moq: "",
        packaging_type: "",
        weight_per_unit: "",
        stock_availability: "",
        payment_mode: "",
        advance_payment: "",
        return_policy: "",
      });
      setProductImages([]);
      document.getElementById("farmer-signup-form").reset();
    }

    setSubmitting(false);
  };

  return (
    <div className="farmer-registration-container">
      <div className="farmer-registration-box">
        <h2>Farmer Registration</h2>
        <form id="farmer-signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="farmer_name"
            placeholder="Farmer Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="farm_name"
            placeholder="Farm Name"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            id="mobile_number"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            id="whatsapp_number"
            placeholder="Whatsapp Number"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="farm_registration_id"
            placeholder="Farm Registration ID"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="product_name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="category"
            placeholder="Category"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="variety"
            placeholder="Variety"
            onChange={handleChange}
            required
          />
          <textarea
            id="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            id="harvest_date"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            id="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            id="moq"
            placeholder="Minimum Order Quantity"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="packaging_type"
            placeholder="Packaging Type"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            id="weight_per_unit"
            placeholder="Weight per Unit"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="stock_availability"
            placeholder="Stock Availability"
            onChange={handleChange}
            required
          />
          <select
            id="payment_mode"
            onChange={handleChange}
            required
          >
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <input
            type="number"
            id="advance_payment"
            placeholder="Advance Payment"
            onChange={handleChange}
            required
          />
          <textarea
            id="return_policy"
            placeholder="Return Policy"
            onChange={handleChange}
            required
          />
          
          <div className="form-group">
            <label htmlFor="product-images">Product Images</label>
            <input
              type="file"
              id="product-images"
              className="form-control"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Register"}
          </button>

          {message && <div className="alert">{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default FarmerRegistration;
