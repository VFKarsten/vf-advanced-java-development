import { useEffect, useState } from "react";
import "./App_Product_User.css"; // CSS-Import

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
  }); // Filter for Name, Price und ID
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

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage(null);
    setId(null);
  };

  // Filter-Logic
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
      <h3>User View</h3>
      <h1>Product Shoe Details</h1>

      <h2>Product List</h2>

      {/* Filter and sort function */}
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