import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App_Login.css"; // CSS-Import

function Auth() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);  // State to switch between Login and Register
  const navigate = useNavigate();  // For Navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setErrorMessage('Username and Password are required');
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
        localStorage.setItem('role', data.role.role); // Save role of user.
        localStorage.setItem('userID', data.id); //save id of user
        setName('');
        setPassword('');
        navigate('/'); // navigate to main page
      } else {
        localStorage.removeItem('role')
        localStorage.removeItem('userID')
        setErrorMessage('Username or Password wrong');
      }
    } catch (error) {
      localStorage.removeItem('role')
      console.error('Failure with Authentification:', error);
      setErrorMessage('Problem with Authentification');
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

    //Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setErrorMessage('Userername und Password required');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8089/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        setIsRegistering(false)
        setPassword(null)
        navigate('/');  // move to Login-page after successful registration
      } else {
        setErrorMessage('Failure with registration');
      }
    } catch (error) {
      console.error('Failure with registration:', error);
      setErrorMessage('Problem with registration');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('role');  // Clear user role
    localStorage.removeItem('userID')
    navigate('/');  // Navigate to login page
  };

  return (
    <div className="auth-container">
      <h1>{isRegistering ? 'Registration' : 'Login'}</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div>
          <label>Userername</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : isRegistering ? 'Registration' : 'Login'}
        </button>
      </form>

      <div>
        {isRegistering ? (
          <div>
            Account available?{' '}
            <button onClick={() => setIsRegistering(false)}>back to Login</button>
          </div>
        ) : (
          <div>
            still no Account?{' '}
            <button onClick={() => setIsRegistering(true)}>now register</button>
          </div>
        )}
      </div>

      {/* Show Logout button if user is logged in */}
      {localStorage.getItem('role') && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Auth;
