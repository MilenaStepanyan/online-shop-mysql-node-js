import { Link } from "react-router-dom";
import logoMobile from "../../../images/logoMobile.png";
import phonePic from "../../../images/iphone.png";
import iphone14Pic from "../../../images/iphone-14.png";
import iphone14plus from "../../../images/iphone-14-and-plus.jpg";
const HomePage = () => {
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
      <div className="getStarted">
        <div className="beginingOfMobile">
          <div className="MobileStore">
            <p className="mobile text-title">Mobile</p>
            <p className="store text-title">Store</p>
          </div>
          <div className="buttonRegistering">
            <button className="button type1">
              <Link to="/register" className="linkGetStarted">
                {" "}
                <span className="btn-txt">Get Started</span>
              </Link>
            </button>
          </div>
        </div>
        <div className="phonePic">
          <img src={phonePic} alt="" />
        </div>
      </div>
      <div className="iphone-14">
        <div className="text-Iphone-14">
          <p>IPhone 14 Pro</p>
          <p className="pro">Pro.Beyond.</p>
        </div>
        <div className="pic-of-iphone-14-pro">
          <img src={iphone14Pic} alt="" />
        </div>
      </div>
      <div className="hands-phone">
        <div className="text">
          <p>iPhone 14</p>
          <p>Big and Bigger</p>
        </div>
        <img src={iphone14plus} alt="" />
      </div>
    </div>
  );
};

export default HomePage;
