import { Link } from 'react-router-dom';
import logo from "../../../images/logo.png"

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className='header'>
        <div className="container">
          <div className="logo">
            <img className='img-logo' src={logo} alt="" />
          </div>
          <div className="list">
            <nav className='nav-bar'>
              <ul className='untitled-lists-header'>
                <span><li>Home</li></span> 
                <li><Link className='path-to-login'  to="/login">Login</Link></li>
                <li><Link className='path-to-register'  to="/register">Sign Up</Link></li>
                <li><Link className='path-to-login'  to="/products">Shop</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="getStarted">
        <button><Link to="/register">Get Started</Link></button>
      </div>
    </div>
  );
};

export default HomePage;
