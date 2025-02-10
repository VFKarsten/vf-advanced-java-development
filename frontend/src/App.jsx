import { useEffect, useState } from "react";
import "./App_Product_Admin.css"; // CSS-Import

function App() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState(null);
  const [products, setProducts] = useState([]);
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

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
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
        resetForm();
      } else {
        alert("Failed to upload product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading the product");
    }
  };

  const handleUpdate = async (e) => {
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
        resetForm();
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating the product");
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

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage(null);
    setId(null);
  };

  const handleEditButtonClick = (product) => {
    setId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  const handleDelete = async (productId) => {
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

  // Filter-Logik
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

  return (
    <div className="container">
      <h3>Admin View</h3>
      <h1>Product Shoe Details</h1>

      <h2>{id ? "Update Product" : "Upload New Product"}</h2>
      <form onSubmit={id ? handleUpdate : handleSubmit}>
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

      <h2>Product List</h2>

      {/* Filter und Sortierfunktionen */}
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

      {/* Tabelle */}
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
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;