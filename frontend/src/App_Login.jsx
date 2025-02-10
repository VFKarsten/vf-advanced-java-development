import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // navigate to main page
import "./App_Login.css"; // CSS-Import

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();  // Für Navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setErrorMessage('user name and password are needed');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8089/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // save the token
        navigate('/'); // forward to main page
        //window.location.href = '/';
      } else {
        setErrorMessage('wrong user name or setPassword');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('Problem with authentication');
    } finally {
      setIsLoading(false);
    }
  };

   return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div>
            <label>Benutzername</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Lade...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  export default Login;