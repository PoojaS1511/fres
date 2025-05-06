import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Stats from "./Stats";
import EditProductModal from "./EditProductModal";
import "../../css/FarmerDashboard.css";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalRevenue: 0 });
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error getting user:', userError);
        return;
      }

      const email = userData?.user?.email;

      if (!email) {
        console.log('No user email found');
        return;
      }

      console.log('Fetching products for farmer email:', email);

      // Fetch products with email field
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("email", email);

      if (productsError) {
        console.error('Error fetching products:', productsError);
        setProducts([]);
        setStats({ totalProducts: 0, totalRevenue: 0 });
        return;
      }

      // Sort products by creation date (newest first)
      const sortedProducts = [...(products || [])];
      sortedProducts.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
        const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
        return dateB - dateA;
      });

      console.log(`Found ${sortedProducts.length} products for this farmer`);

      if (sortedProducts.length > 0) {
        setProducts(sortedProducts);
        const totalProducts = sortedProducts.length;
        const totalRevenue = sortedProducts.reduce(
          (sum, item) =>
            sum + parseFloat(item.price || 0) * parseInt(item.stock_availability || 0),
          0
        );
        setStats({ totalProducts, totalRevenue });
      } else {
        setProducts([]);
        setStats({ totalProducts: 0, totalRevenue: 0 });
      }
    } catch (err) {
      console.error('Unexpected error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const user = await supabase.auth.getUser();
      const email = user?.data?.user?.email;

      if (!email) {
        console.log('No user email found, using default ID');
        // If no email is found, try to fetch messages for the default/unknown farmer ID
        await fetchMessagesForId('unknown');
        return;
      }

      console.log('Fetching messages for email:', email);
      await fetchMessagesForId(email);

      // Also check for any messages in localStorage (from offline mode)
      try {
        const pendingMessages = JSON.parse(localStorage.getItem('pendingMessages') || '[]');
        if (pendingMessages.length > 0) {
          console.log('Found pending messages in localStorage:', pendingMessages.length);
          // Add these to the messages state
          setMessages(prevMessages => {
            // Combine with existing messages, avoiding duplicates
            const combined = [...prevMessages];
            pendingMessages.forEach(pendingMsg => {
              if (!combined.some(msg =>
                msg.buyer_phone === pendingMsg.buyer_phone &&
                msg.message === pendingMsg.message &&
                msg.created_at === pendingMsg.created_at
              )) {
                combined.push({
                  ...pendingMsg,
                  id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
                  read: false
                });
              }
            });
            return combined;
          });
        }
      } catch (localStorageErr) {
        console.error('Error reading from localStorage:', localStorageErr);
      }
    } catch (err) {
      console.error('Unexpected error in fetchMessages:', err);
    }
  };

  const fetchMessagesForId = async (farmerId) => {
    try {
      // Try to fetch from farmer_messages table first
      const { data: farmerMessagesData, error: farmerMessagesError } = await supabase
        .from('farmer_messages')
        .select('*')
        .eq('farmer_id', farmerId)
        .order('created_at', { ascending: false });

      if (farmerMessagesError) {
        console.error('Error fetching from farmer_messages:', farmerMessagesError);
      }

      // Then try to fetch from the generic messages table
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('farmer_id', farmerId)
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error fetching from messages:', messagesError);
      }

      // Combine results from both tables
      const combinedMessages = [
        ...(farmerMessagesData || []),
        ...(messagesData || [])
      ];

      // Sort by date (newest first)
      combinedMessages.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );

      console.log('Combined messages count:', combinedMessages.length);
      setMessages(combinedMessages);
    } catch (err) {
      console.error('Error in fetchMessagesForId:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMessages();

    // Set up a polling interval to check for new messages every 30 seconds
    const messageInterval = setInterval(fetchMessages, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(messageInterval);
  }, []);

  const handleAddProduct = () => {
    navigate("/FarmerProductRegistration"); // Navigate to the FarmerProductRegistration page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabase.from("products").delete().eq("id", id);

        if (error) {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        } else {
          console.log('Product deleted successfully');
          fetchProducts(); // Refresh the products list
        }
      } catch (err) {
        console.error('Unexpected error deleting product:', err);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleToggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      // Check if this is a local message (from localStorage)
      if (messageId.startsWith('local-')) {
        // Just update the local state
        setMessages(messages.map(msg =>
          msg.id === messageId ? { ...msg, read: true } : msg
        ));
        return;
      }

      // Try to update in farmer_messages table
      const { error: farmerMessagesError } = await supabase
        .from('farmer_messages')
        .update({ read: true })
        .eq('id', messageId);

      if (farmerMessagesError) {
        console.error('Error marking message as read in farmer_messages:', farmerMessagesError);

        // Try the messages table as fallback
        const { error: messagesError } = await supabase
          .from('messages')
          .update({ read: true })
          .eq('id', messageId);

        if (messagesError) {
          console.error('Error marking message as read in messages:', messagesError);
        }
      }

      // Update the local messages state regardless of database success
      // This ensures the UI is updated even if the database update fails
      setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (err) {
      console.error('Unexpected error marking message as read:', err);
    }
  };

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-header">
        <h2>👨‍🌾 Farmer Dashboard</h2>
        <div className="dashboard-actions">
          <button
            className="messages-btn"
            onClick={handleToggleMessages}
          >
            ✉️ Messages
            {messages.filter(msg => !msg.read).length > 0 && (
              <span className="message-badge">{messages.filter(msg => !msg.read).length}</span>
            )}
          </button>
          <button className="add-product-btn" onClick={handleAddProduct}>
            ➕ Insert Product
          </button>
        </div>
      </div>

      <div className="stats-container">
        <Stats stats={stats} />
      </div>

      <div className="product-grid">
        {loading ? (
          <div className="loading-container">
            <p>Loading your products...</p>
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product.id)}
              onEdit={() => handleEdit(product)}
            />
          ))
        ) : (
          <div className="no-products">
            <p>No products added yet.</p>
            <button className="add-product-btn" onClick={handleAddProduct}>
              Add Your First Product
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <EditProductModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onUpdate={fetchProducts}
        />
      )}

      {showMessages && (
        <div className="messages-panel">
          <div className="messages-header">
            <h3>Customer Messages</h3>
            <button className="close-btn" onClick={handleToggleMessages}>✕</button>
          </div>
          <div className="messages-list">
            {messages.length === 0 ? (
              <p className="no-messages">No messages yet.</p>
            ) : (
              messages.map(msg => (
                <div
                  key={msg.id}
                  className={`message-item ${!msg.read ? 'unread' : ''}`}
                  onClick={() => handleMarkAsRead(msg.id)}
                >
                  <div className="message-header">
                    <span className="message-product">{msg.product_name}</span>
                    <span className="message-date">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="message-contact">
                    <strong>Phone:</strong> {msg.buyer_phone}
                  </div>
                  <div className="message-content">{msg.message}</div>
                  {!msg.read && <div className="unread-badge">New</div>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmerDashboard;
