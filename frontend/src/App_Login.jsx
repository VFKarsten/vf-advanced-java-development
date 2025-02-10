import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App_Login.css"; // CSS-Import

function Auth() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);  // Zustand, um zwischen Login und Register zu wechseln
  const navigate = useNavigate();  // Für Navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setErrorMessage('Benutzername und Passwort sind erforderlich');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Hinzufügen der Role ID für den User (ID 2)
    const role_id = 2

    try {
      const response = await fetch('http://localhost:8089/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, role_id }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Speichere das Token
        setName('');
        setPassword('');
        navigate('/'); // Weiter zur Hauptseite
      } else {
        setErrorMessage('Benutzername oder Passwort sind falsch');
      }
    } catch (error) {
      console.error('Fehler bei der Authentifizierung:', error);
      setErrorMessage('Es gab ein Problem mit der Authentifizierung');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setErrorMessage('Benutzername und Passwort sind erforderlich');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8089/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        navigate('/login');  // Weiter zur Login-Seite nach erfolgreicher Registrierung
      } else {
        setErrorMessage('Fehler bei der Registrierung');
      }
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      setErrorMessage('Es gab ein Problem bei der Registrierung');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>{isRegistering ? 'Registrieren' : 'Login'}</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
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
          {isLoading ? 'Lade...' : isRegistering ? 'Registrieren' : 'Login'}
        </button>
      </form>

      <div>
        {isRegistering ? (
          <div>
            Schon ein Konto?{' '}
            <button onClick={() => setIsRegistering(false)}>Zurück zum Login</button>
          </div>
        ) : (
          <div>
            Noch keinen Account?{' '}
            <button onClick={() => setIsRegistering(true)}>Jetzt registrieren</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
