import { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found. Please log in.');
        }
        const response = await axios.get('http://localhost:5001/api/user/products', {
          headers: {
            "auth-token":  token
          }
        });
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products: ' + error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {error && <p>{error}</p>}
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
