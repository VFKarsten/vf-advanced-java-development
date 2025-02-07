import { useEffect, useState } from "react";

function App() {
  const[image,setImage]=useState(null);
  const[name,setName]=useState("");
  const[price,setPrice]=useState("");
  const[products,setProducts]=useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleFileChange=(e)=>{setImage(e.target.files[0]);}
  const handleSubmit=async (e) => {
    e.preventDefault();

    const formData=new FormData();
    formData.append("name",name);
    formData.append("price",price);
    formData.append("image",image);
try{
    const response= await fetch("http://localhost:8089/products/add",{method:"POST",body:formData});

    if(response.ok){
      alert('Product uploaded successfully')
      fetchProducts();
    }
    else{
      alert("falied to upload product");
    }

}
catch(error){
  console.error("Error:",error);
  alert("Error uploading the product")
}
  };


  const fetchProducts=async () => {
    try{
      const response= await fetch("http://localhost:8089/products/all");
      if(response.ok){
       const data=await response.json();
       setProducts(data);
      }
      else{
       console.error("failed to fetch products")
      }
    }
    catch(error){
      console.error("Error:",error);

    }
  };
  return (
    <div>
        <h1> Product Details to be Added </h1>
            <form onSubmit={handleSubmit}>
            <label>Product Name</label> <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required></input>
            <label>Product Price</label> <textarea value={price} onChange={(e)=>setPrice(e.target.value)} required/>
            <label>Product Image</label> <input type="file" onChange={handleFileChange} required/>
            <button type="submit">Upload product</button>
        </form>

        <h2> product List</h2>

        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Image</th>
                </tr>
            </thead>
            <tbody>
              {
                  products.map((product)=>(
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td><img src={`http://localhost:8089/products/image/${product.imagePath}`} alt='n/a' width="100" height="100"></img></td>
                    </tr>
              ))}

              </tbody>

            </table>
    </div>

  );
}

export default App;
