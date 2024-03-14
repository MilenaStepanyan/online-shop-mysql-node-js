import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [reviewContents, setReviewContents] = useState({});
  const [ratings, setRatings] = useState({});
  const [orderQuantities, setOrderQuantities] = useState({});
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found. Please log in.");
        }
        const response = await axios.get(
          "http://localhost:5001/api/user/products",
          {
            headers: {
              "auth-token": token,
            },
            params: {
              sortBy,
              sortOrder,
              search,
              minPrice,
              maxPrice,
              page,
              limit,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching products: " + error.message);
      }
    };

    fetchProducts();
  }, [sortBy, sortOrder, search, minPrice, maxPrice, page, limit]);

  const handleReviewSubmit = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }
      await axios.post(
        `http://localhost:5001/api/user/products/review/${productId}`,
        { content: reviewContents[productId] },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      const response = await axios.get(
        "http://localhost:5001/api/user/products",
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      setError("Error adding review: " + error.message);
    }
  };

  const handleRatingSubmit = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }
      await axios.post(
        `http://localhost:5001/api/user/products/${productId}/ratings`,
        { rating: ratings[productId] },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      const response = await axios.get(
        "http://localhost:5001/api/user/products",
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      setError("Error rating product: " + error.message);
    }
  };

  const handleOrder = async (productId, productName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }
      await axios.post(
        "http://localhost:5001/api/user/products/order",
        { productName, quantity: orderQuantities[productId] },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      const response = await axios.get(
        "http://localhost:5001/api/user/products",
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      setError("Error processing order: " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="main-container">
      <h2 className="productsTitle">Our Products</h2>
      {error && <p>{error}</p>}
<div className="sort-filter-limit">
      <label className="sorting">
        Sort By:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
      </label>
      <label className="sortOrder"> 
        Sort Order:
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </label>

      <label className="pagination">
        Page Limit:
        <input 
          className="pagInput"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </label>

      <input
      className="search"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
      className="minPrice"
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
      className="maxPrice"
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
</div>
      <div className="container-for-products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.available_quantity}</p>
            <img 
            className="product-image"
              src={`http://localhost:5001/${product.image_url}`}
              alt={product.image_url}
              style={{ maxWidth: "200px", height: "auto" }}
            />
            <h4>Reviews:</h4>
            {product.reviews &&
              product.reviews.map((review) => (
                <div key={review.id}>
                  <p>{review.content}</p>
                </div>
              ))}

            <input
    type="text"
    placeholder="Add your review"
    value={reviewContents[product.id] || ""}
    onChange={(e) =>
      setReviewContents({
        ...reviewContents,
        [product.id]: e.target.value,
      })
    }
  />
            <button onClick={() => handleReviewSubmit(product.id)}>
              Submit Review
            </button>

            <select
              value={ratings[product.id] || "0"}
              onChange={(e) =>
                setRatings({ ...ratings, [product.id]: e.target.value })
              }
            >
              <option value="0">Select Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button onClick={() => handleRatingSubmit(product.id)}>
              Rate Product
            </button>

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={orderQuantities[product.id] || ""}
              onChange={(e) =>
                setOrderQuantities({
                  ...orderQuantities,
                  [product.id]: e.target.value,
                })
              }
            />
            <button onClick={() => handleOrder(product.id, product.name)}>
              Order
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Products;
