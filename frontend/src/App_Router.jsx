// App.jsx mit React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App_Product_Admin from "./App_Product_Admin";
import App_Login from "./App_Login"; // Correctly import App_Login
import App_Product_User from "./App_Product_User";

function App() {
  const userRole = localStorage.getItem('role')

  return (
    <Router>
      <Routes>
        <Route path="/" element={ userRole ? <UserSite role={userRole}/> : < App_Login />} />
      </Routes>
    </Router>
  );
}

export default App;

