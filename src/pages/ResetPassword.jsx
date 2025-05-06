import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../supabase/supabaseClient";
import '../css/ResetPassword.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the access token from the URL hash fragment
    const hashFragment = window.location.hash;
    const accessToken = hashFragment
      .substring(1)
      .split('&')
      .find(param => param.startsWith('access_token='));

    if (!accessToken) {
      setError('No access token found. Please request a new reset link.');
    }

    const handleSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          setError('Error checking session: ' + error.message);
          return;
        }

        if (!data?.session) {
          setError('Session expired or invalid. Please request a new reset link.');
        }
      } catch (err) {
        console.error('Unexpected error checking session:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };

    handleSession();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate password
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setError('Password must contain at least one number.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Password reset error:', error);
        setError('Failed to reset password: ' + error.message);
      } else {
        setMessage('Password updated successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      console.error('Unexpected error during password reset:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="text-center mb-4">Reset Your Password</h2>
      <div className="form-container">
        <form onSubmit={handleReset}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <button type="submit" className="btn btn-success w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
