import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';


const ProtectedPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editProductId, setEditProductId] = useState('');
  const [newProductData, setNewProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found. Please log in.');
        }
        const response = await axios.get('http://localhost:5001/api/admin/products', {
          headers: {
            "auth-token": token
          }
        });
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products: ' + error.message);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. Please log in.');
      }
      await axios.delete(`http://localhost:5001/api/admin/products/${id}`, {
        headers: {
          "auth-token": token
        }
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError('Error deleting product: ' + error.message);
    }
  };

  const handleEditProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. Please log in.');
      }

      const updatedData = { ...newProductData, rating: 0 };
      await axios.put(`http://localhost:5001/api/admin/products/${id}`, updatedData, {
        headers: {
          "auth-token": token
        }
      });
      

      const updatedProducts = products.map(product => {
        if (product.id === id) {
          return { ...product, ...updatedData };
        }
        return product;
      });
      setProducts(updatedProducts);
  

      setEditProductId(null);
      setNewProductData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: ''
      });
    } catch (error) {
      setError('Error updating product: ' + error.message);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({ ...newProductData, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. Please log in.');
      }
      const response = await axios.post('http://localhost:5001/api/admin/products', newProductData, {
        headers: {
          "auth-token": token
        }
      });
      setProducts([...products, response.data]);

      setNewProductData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: ''
      });
    } catch (error) {
      setError('Error adding product: ' + error.message);
    }
  };

  return (
    
    <div>
      <Header/>

      <h2>Products</h2>
      {error && <p>{error}</p>}
      <div>
     
        {products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Category: {product.category}</p>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => setEditProductId(product.id)}>Edit</button>
            {editProductId === product.id && (
              <form onSubmit={() => handleEditProduct(product.id)}>
                <input type="text" name="name" placeholder="Name" value={newProductData.name} onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" value={newProductData.description} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={newProductData.price} onChange={handleChange} />
                <input type="number" name="quantity" placeholder="Quantity" value={newProductData.quantity} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" value={newProductData.category} onChange={handleChange} />
                <button type="submit">Save</button>
              </form>
            )}
          </div>
        ))}
      </div>
      <div>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input type="text" name="name" placeholder="Name" value={newProductData.name} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={newProductData.description} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={newProductData.price} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" value={newProductData.quantity} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={newProductData.category} onChange={handleChange} />
          <button type="submit">Add Product</button>
        </form>
      </div>
     
    </div>
  );
};

export default ProtectedPage;
