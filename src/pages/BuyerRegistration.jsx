import { useState } from 'react';
import { supabase } from "../supabase/supabaseClient";
import "../css/BuyerRegistration.css"; // Import the CSS for styling

function BuyerRegistration() {
  const [formData, setFormData] = useState({
    buyerType: 'Retailer',
    address: '',
    gstNumber: '',
    businessRegId: '',
    paymentMode: 'Cash',
    advancePayment: 'Yes',
    returnPolicy: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    const { data, error } = await supabase.from('buyers').insert([formData]);

    if (error) {
      alert('❌ Registration failed: ' + error.message);
      console.error('Supabase Error:', error);
    } else {
      alert('✅ Registration successful!');
      console.log('Inserted:', data);
    }
  };

  return (
    <div className="buyer-registration-container">
      <div className="buyer-registration-box">
        <h2>Buyer Registration</h2>
        <form onSubmit={handleSubmit}>
          <h3>Business & Location Details</h3>

          <div className="form-group">
            <label htmlFor="buyerType">Buyer Type</label>
            <select
              className="form-control"
              id="buyerType"
              value={formData.buyerType}
              onChange={handleChange}
              required
            >
              <option value="Retailer">Retailer</option>
              <option value="Wholesaler">Wholesaler</option>
              <option value="Distributor">Distributor</option>
              <option value="Exporter">Exporter</option>
              <option value="Individual Consumer">Individual Consumer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address (Street, City, District, State, Pincode)</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gstNumber">GST Number (If applicable)</label>
            <input
              type="text"
              className="form-control"
              id="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessRegId">Business Registration ID (Optional)</label>
            <input
              type="text"
              className="form-control"
              id="businessRegId"
              value={formData.businessRegId}
              onChange={handleChange}
            />
          </div>

          <h3>Payment & Order Preferences</h3>

          <div className="form-group">
            <label htmlFor="paymentMode">Payment Mode</label>
            <select
              className="form-control"
              id="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              required
            >
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="advancePayment">Advance Payment Required?</label>
            <select
              className="form-control"
              id="advancePayment"
              value={formData.advancePayment}
              onChange={handleChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="returnPolicy">Return Policy (If applicable)</label>
            <textarea
              className="form-control"
              id="returnPolicy"
              value={formData.returnPolicy}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default BuyerRegistration;
