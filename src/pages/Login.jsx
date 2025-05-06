import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from "../supabase/supabaseClient";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError('Invalid email or password');
    } else {
      localStorage.setItem('role', role);
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (role === 'buyer') {
        navigate('/buyer-dashboard');
      }
    }
  };

  const handleForgotPassword = async () => {
    setResetMessage('');
    setError('');
    if (!email) {
      setError('Please enter your email first to reset password.');
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError('Failed to send reset email. Try again.');
    } else {
      setResetMessage('Password reset email sent!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Farmer Connect</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              margin: '10px 0',
              borderRadius: '8px',
              border: '1px solid #cceccc',
              fontSize: '1rem',
            }}
          >
            <option value="admin">Admin</option>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>

          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {resetMessage && <div className="alert alert-success mt-2">{resetMessage}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={handleForgotPassword}
            style={{ padding: 0 }}
          >
            Forgot Password?
          </button>
        </div>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
