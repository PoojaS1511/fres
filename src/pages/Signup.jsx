import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient'; // adjust path if needed
import { useNavigate, Link } from 'react-router-dom';
import '../css/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'farmer',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { email, password, name, role } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const userId = data?.user?.id;

    if (userId) {
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userId,
          email,
          name,
          role, // 'farmer' or 'buyer'
        },
      ]);

      if (insertError) {
        setErrorMsg(insertError.message);
      } else {
        // Redirect to login page after successful signup
        navigate('/login');
      }
    }

    setLoading(false);
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Select Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
