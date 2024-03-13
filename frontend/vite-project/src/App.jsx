import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './components/HomePage';
import Login from './components/Login';
import "./App.css"
import Register from './components/Register';
import ProductsPage from './components/Products';
import ProtectedPage from './components/ProtectedPage';


function App() {

  return (
    <Router>
      <Routes> 
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/admin" element={<ProtectedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
