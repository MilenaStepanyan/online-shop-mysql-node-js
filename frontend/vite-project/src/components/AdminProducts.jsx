import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, quantity: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admin/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/admin/products', newProduct);
      setMessage(response.data.message);
      setNewProduct({ name: '', description: '', price: 0, quantity: 0 });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product');
    }
  };

  return (
    <div>
      <h2>Admin Products Page</h2>
      <div>
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <label>Name:</label>
          <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <label>Description:</label>
          <input type="text" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <label>Price:</label>
          <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <label>Quantity:</label>
          <input type="number" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
          <button type="submit">Add Product</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <div>
        <h3>Product List</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.description} - ${product.price} - {product.quantity} available
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProducts;
