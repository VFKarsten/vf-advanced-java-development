import { useEffect, useState } from "react";
import "./App_Product_User.css"; // CSS-Import

function App() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    price: "",
    id: ""
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [cart, setCart] = useState([]); // Zustand für den Warenkorb
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Fehlernachricht für Passwortänderung
  const [passwordSuccess, setPasswordSuccess] = useState(""); // Erfolgsmeldung

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8089/products/all");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetProductForm = () => {
    setName("");
    setPrice("");
    setImage(null);
    setId(null);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(filter.name.toLowerCase())
    )
    .filter((product) =>
      product.price.toString().includes(filter.price.toString())
    )
    .filter((product) =>
      product.id.toString().includes(filter.id.toString())
    )
    .sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortField === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      }
      return 0;
    });

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      return newCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product, index) => index !== productId));
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.reload();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Überprüfen, ob die neuen Passwörter übereinstimmen
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      setPasswordSuccess("");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8089/users/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        setPasswordSuccess("Password updated successfully.");
        setPasswordError("");
      } else {
        setPasswordError("Failed to update password. Please check your old password.");
        setPasswordSuccess("");
      }
    } catch (error) {
      console.error("Error:", error);
      setPasswordError("An error occurred while changing your password.");
      setPasswordSuccess("");
    }
  };

  return (
    <div className="container">
      <h3>User View</h3>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <div className="filter">
        <label>Filter by Name</label>
        <input
          type="text"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <label>Filter by Price</label>
        <input
          type="text"
          value={filter.price}
          onChange={(e) => setFilter({ ...filter, price: e.target.value })}
        />
        <label>Filter by ID</label>
        <input
          type="text"
          value={filter.id}
          onChange={(e) => setFilter({ ...filter, id: e.target.value })}
        />
      </div>

      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSort("id")}>ID</button>
            </th>
            <th>
              <button onClick={() => handleSort("name")}>Product Name</button>
            </th>
            <th>
              <button onClick={() => handleSort("price")}>Product Price</button>
            </th>
            <th>Product Image</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={`http://localhost:8089/products/image/${product.imagePath}`}
                  alt="Product"
                  width="100"
                  height="100"
                />
              </td>
              <td>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={`http://localhost:8089/products/image/${product.imagePath}`}
                  alt="Cart Product"
                  width="50"
                  height="50"
                />
              </td>
              <td>
                <button onClick={() => handleRemoveFromCart(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Passwortänderungsformular */}
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>

      {/* Fehlermeldung oder Erfolg */}
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      {passwordSuccess && <p style={{ color: "green" }}>{passwordSuccess}</p>}
    </div>
  );
}

export default App;
