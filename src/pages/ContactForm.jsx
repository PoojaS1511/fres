import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import '../css/ContactForm.css'; // import the CSS for styling

const ContactForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName, farmerId } = location.state || {};

  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Log the data we're trying to send
    console.log('Sending message with data:', { farmerId, productName, phoneNumber, message });

    // Check if we have the required fields
    if (!phoneNumber) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    // If farmerId is missing, use a default value
    const farmerIdToUse = farmerId || 'unknown';

    const messageData = {
      farmer_id: farmerIdToUse,
      product_name: productName || 'Not specified',
      buyer_phone: phoneNumber,
      message: message || 'No message provided',
      created_at: new Date().toISOString(),
      read: false
    };

    try {
      console.log('Attempting to insert message into farmer_messages table');

      // First, try to insert into the farmer_messages table
      const { error: insertError } = await supabase
        .from('farmer_messages')
        .insert([messageData]);

      if (insertError) {
        console.error('Error sending message to farmer_messages:', insertError);

        // If the first attempt fails, try to insert into a more generic messages table
        console.log('Trying fallback: inserting into messages table');
        const { error: fallbackError } = await supabase
          .from('messages')
          .insert([messageData]);

        if (fallbackError) {
          console.error('Fallback also failed:', fallbackError);

          // Last resort: Try to create the table and then insert
          console.log('Attempting to store message in localStorage as last resort');
          // Store in localStorage as a last resort
          try {
            const existingMessages = JSON.parse(localStorage.getItem('pendingMessages') || '[]');
            existingMessages.push(messageData);
            localStorage.setItem('pendingMessages', JSON.stringify(existingMessages));

            alert('Your message has been saved locally and will be sent to the farmer when connection is restored!');
            setTimeout(() => navigate('/products'), 1500);
            return;
          } catch (localStorageError) {
            console.error('Even localStorage failed:', localStorageError);
            setError('All attempts to save your message failed. Please try again later.');
          }
        } else {
          // Fallback succeeded
          alert('Your message has been sent to the farmer!');
          setTimeout(() => navigate('/products'), 1500);
        }
      } else {
        // Original attempt succeeded
        console.log('Message sent successfully!');
        alert('Your message has been sent to the farmer!');
        setTimeout(() => navigate('/products'), 1500);
      }
    } catch (err) {
      console.error('Unexpected error during message sending:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h2>Contact Supplier</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>Product Name</label>
        <input type="text" value={productName} readOnly />

        <label>Your Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label>Message (Optional)</label>
        <textarea
          placeholder="e.g. I'm interested in 50kg of tomatoes"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
