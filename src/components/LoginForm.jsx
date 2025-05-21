import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  

const handleGoogleCallback = (response) => {
  const decoded = jwtDecode(response.credential);
  console.log('Decoded Google User:', decoded);

  
  const userName = decoded.name || 'User';
  alert(`Hello ${userName}, Google Sign-In Success`);

  localStorage.setItem('token', response.credential);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };
  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: '707994528594-gpq1r702m2uljko48mso4idfb05p96ss.apps.googleusercontent.com',
        callback: handleGoogleCallback
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    }
  }, []);


  return (
    <div className="login-container">
      <h2 className="login-title">Login to Your Account</h2>

      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="input-wrapper">
          <label htmlFor="email" className="input-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="input-label">Password</label>
          <div className="password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      <div id="google-signin-button" style={{ marginTop: '16px' }}></div>

      <div className="login-footer">
        <a href="#" className="footer-link">Forgot password?</a>
        <p>
          Don’t have an account? <a href="#" className="footer-link">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
