// App.jsx mit React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App_Product_Admin from "./App_Product_Admin";
import App_Login from "./App_Login";


function App() {
  const isAuthenticated = localStorage.getItem('token');  // Überprüfen, ob der Benutzer eingeloggt ist

  return (
    <Router>
      <Routes>

      {/* Route für die Login-Seite */}
      <Route path="/login" element={<App_Login />} />

      {/* Hauptseite, nur zugänglich, wenn der Benutzer eingeloggt ist */}
      <Route
        path="/"
        element={isAuthenticated ? <App_Product_Admin /> : <Navigate to="/login" />}
      />
    </Routes>
  </Router>
  );
}

export default App;
