import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Header />

      {/* <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
  <button onClick={handleRegister}>Register</button>*/}
      <div className="formParent">
        <form className="form">
          <p className="title">Register </p>
          <p className="message">Signup now and get full access to our app. </p>
          <div className="flex">
            <label htmlFor="text">
              <input
                required=""
                placeholder="UserName"
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </label>
          </div>
          <label htmlFor="email">
            {" "}
            <input
              required=""
              placeholder="Email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </label>
          <label htmlFor="password">
            <input
              required=""
              placeholder="Password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </label>

          <button className="submit" onClick={handleRegister}>
            Submit
          </button>
          <p className="signin">
            Already have an acount ? <a href="#">Signin</a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
