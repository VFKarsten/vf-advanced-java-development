// App.jsx mit React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App_Product_Admin from "./App_Product_Admin";
import App_Login from "./App_Login"; // Correctly import App_Login

function App() {
  const isAuthenticated = localStorage.getItem('token');  // Check if user is authenticated

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<App_Login />} />

        {/* Main page, accessible only if the user is authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <App_Product_Admin /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

