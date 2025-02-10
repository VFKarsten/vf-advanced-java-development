import { useEffect, useState } from "react";
import "./App_Product_Admin.css"; // CSS-Import

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

  // Benutzerverwaltung
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  // Produkte
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8089/products/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product uploaded successfully");
        fetchProducts();
        resetProductForm();
      } else {
        alert("Failed to upload product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading the product");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await fetch(`http://localhost:8089/products/update/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product updated successfully");
        fetchProducts();
        resetProductForm();
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating the product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8089/products/byProductId/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully");
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting the product");
    }
  };

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

  // Benutzer
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const user = { name: userName, password: userPassword };

    try {
      const response = await fetch("http://localhost:8089/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("User added successfully");
        fetchUsers();
        resetUserForm();
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding the user");
    }
  };

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

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8089/users/byUserId/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully");
        fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting the user");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8089/users/all");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetUserForm = () => {
    setUserName("");
    setUserPassword("");
    setUserId(null);
  };

  return (
    <div className="container">
      <h3>Admin View</h3>

      {/* Produktformular */}
      <h1>Product Shoe Details</h1>
      <h2>{id ? "Update Product" : "Upload New Product"}</h2>
      <form onSubmit={id ? handleUpdateProduct : handleSubmitProduct}>
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Product Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Product Image</label>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">{id ? "Update Product" : "Upload Product"}</button>
      </form>

      {/* Produktfilter und -sortierung */}
      <h2>Product List</h2>
      <div className="filter-sort">
        <div>
          <label>Filter by ID:</label>
          <input
            type="text"
            value={filter.id}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, id: e.target.value }))
            }
            placeholder="Search by ID"
          />
        </div>
        <div>
          <label>Filter by Name:</label>
          <input
            type="text"
            value={filter.name}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Search by Name"
          />
        </div>
        <div>
          <label>Filter by Price:</label>
          <input
            type="text"
            value={filter.price}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="Search by Price"
          />
        </div>
        <div>
          <label>Sort by:</label>
          <select
            onChange={(e) => setSortField(e.target.value)}
            value={sortField}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <label>Order:</label>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Produkt-Tabelle */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Image</th>
            <th>Actions</th>
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
                <button onClick={() => handleEditButtonClick(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Benutzerformular */}
      <h1>User Management</h1>
      <h2>{userId ? "Update User" : "Add New User"}</h2>
      <form onSubmit={userId ? handleUpdateUser : handleUserSubmit}>
        <label>User Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>User Password</label>
        <input
          type="text"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <button type="submit">{userId ? "Update User" : "Add User"}</button>
      </form>

      {/* Benutzer-Tabelle */}
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>User Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEditUserButtonClick(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
