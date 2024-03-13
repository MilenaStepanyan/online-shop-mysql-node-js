import { Link } from "react-router-dom";
import logoMobile from "../../../images/logoMobile.png";
const Header = () => {
  return (
    <div className="HomePage">
      <div className="header">
        <div className="container">
          <div className="logo">
            <img className="img-logo" src={logoMobile} alt="" />
          </div>
          <div className="list">
            <nav className="nav-bar">
              <ul className="untitled-lists-header">
                <span>
                  <li>Home</li>
                </span>
                <li>
                  <Link className="path-to-login" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="path-to-register" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="path-to-login" to="/products">
                    Shop
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      </div>
      )}
      export default Header