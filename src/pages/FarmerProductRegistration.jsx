import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../css/FarmerProductRegistration.css";

const initialFormData = {
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
};

const FarmerProductRegistration = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");
    console.log("Submitted Product Data:", formData);

    // Get the current user's email
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      setError("Error getting user information. Please log in again.");
      setLoading(false);
      return;
    }

    const userEmail = userData?.user?.email || formData.email;

    try {
      // Insert product data into Supabase
      const { error } = await supabase.from("products").insert([{
        farmer_name: formData.farmer_name,
        farm_name: formData.farm_name,
        mobile_number: formData.mobile_number,
        whatsapp_number: formData.whatsapp_number,
        email: userEmail, // Use the user's email for filtering in dashboard
        location: formData.location,
        farm_registration_id: formData.farm_registration_id,
        product_name: formData.product_name,
        category: formData.category,
        variety: formData.variety,
        description: formData.description,
        harvest_date: formData.harvest_date,
        price: parseFloat(formData.price), // Ensure it's a number
        moq: formData.moq,
        packaging_type: formData.packaging_type,
        weight_per_unit: formData.weight_per_unit,
        stock_availability: formData.stock_availability,
        payment_mode: formData.payment_mode,
        advance_payment: formData.advance_payment,
        return_policy: formData.return_policy,
        created_at: new Date().toISOString(), // Add creation timestamp
      }]);

      if (error) {
        throw new Error(error.message); // If there's an error, throw it
      }

      setSuccessMessage("Product successfully added!");
      setFormData(initialFormData); // Reset form data on successful submission
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="farmer-product-registration-container">
      <div>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(initialFormData).map((key) => (
            <div key={key} className="form-group">
              <label htmlFor={key}>
                {key.replace(/_/g, " ")}
              </label>
              <input
                type={key.includes("date") ? "date" : key === "email" ? "email" : key === "mobile_number" ? "tel" : "text"}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {error && (
            <div className="alert">
              <p>{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="alert success">
              <p>{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Product"}
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={() => setFormData(initialFormData)}
            disabled={loading}
            className="clear-button"
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerProductRegistration;
