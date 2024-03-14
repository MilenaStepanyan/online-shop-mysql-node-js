import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const ProtectedPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editProductId, setEditProductId] = useState("");
  const [newProductData, setNewProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found. Please log in.");
        }
        const response = await axios.get(
          "http://localhost:5001/api/admin/products",
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching products: " + error.message);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }
      await axios.delete(`http://localhost:5001/api/admin/products/${id}`, {
        headers: {
          "auth-token": token,
        },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError("Error deleting product: " + error.message);
    }
  };

  const handleEditProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      const updatedData = { ...newProductData, rating: 0 };
      await axios.put(
        `http://localhost:5001/api/admin/products/${id}`,
        updatedData,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return { ...product, ...updatedData };
        }
        return product;
      });
      setProducts(updatedProducts);

      setEditProductId(null);
      setNewProductData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
      });
    } catch (error) {
      setError("Error updating product: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({ ...newProductData, [name]: value });
  };
  const handleFileChange = (e) => {
    setNewProductData({ ...newProductData, picture: e.target.files[0] });
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      const formData = new FormData();
      formData.append("name", newProductData.name);
      formData.append("description", newProductData.description);
      formData.append("price", newProductData.price);
      formData.append("quantity", newProductData.quantity);
      formData.append("category", newProductData.category);
      formData.append("picture", newProductData.picture);

      const response = await axios.post(
        "http://localhost:5001/api/admin/products",
        formData,
        {
          headers: {
            "auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts([...products, response.data]);
      setNewProductData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        picture: null,
      });
    } catch (error) {
      setError("Error adding product: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container1">
        <h2>Products</h2>
        {error && <p className="error">{error}</p>}
        <div className="product-container">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Category: {product.category}</p>
              <button
                className="delete-button"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
              <button
                className="edit-button"
                onClick={() => setEditProductId(product.id)}
              >
                Edit
              </button>
              {editProductId === product.id && (
                <form
                  className="edit-form"
                  onSubmit={() => handleEditProduct(product.id)}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newProductData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newProductData.description}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProductData.price}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newProductData.quantity}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newProductData.category}
                    onChange={handleChange}
                  />
                  <input
                    type="file"
                    name="picture"
                    onChange={handleFileChange}
                  />
                  <button type="submit">Save</button>
                </form>
              )}
            </div>
          ))}
        </div>
        <div className="form-container">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newProductData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProductData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProductData.price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newProductData.quantity}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProductData.category}
              onChange={handleChange}
            />
            <input
              type="file"
              name="picture"
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  picture: e.target.files[0],
                })
              }
            />
            <button type="submit">Add Product</button>
          </form>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default ProtectedPage;
