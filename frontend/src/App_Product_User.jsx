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
  }); // Filter für Name, Price und ID
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("name");

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

  // Filter- und Sortierlogik für Produkte
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



  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const user = { name: userName, password: userPassword };

    try {
      const response = await fetch(`http://localhost:8089/users/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("User updated successfully");
        fetchUsers();
        resetUserForm();
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating the user");
    }
  };

  // Sortieren der Produkte nach Feld
  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Logout-Funktion
  const handleLogout = () => {
    // Hier entfernst du das Authentifizierungs-Token (wenn verwendet) oder machst eine andere Logout-Logik
    localStorage.removeItem("authToken"); // Beispiel: Entfernen des Tokens aus dem lokalen Speicher
    alert("You have logged out successfully!");
    window.location.href = "/login"; // Umleitung zur Login-Seite nach dem Logout
  };

  return (
    <div className="container">
      <h3>User View</h3>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>


      {/* Filter für Produkte */}
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

      {/* Product Table */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

