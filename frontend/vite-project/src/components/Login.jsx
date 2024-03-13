import { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log("Logging in...");
      const response = await axios.post('http://localhost:5001/api/login', {
        username,
        password
      });
      console.log("Login response:", response.data);

      const { token, isAdmin } = response.data;
      localStorage.setItem('token', token);
      if (isAdmin) {
        console.log("Redirecting to admin page...");
        window.location.href = '/admin';
      } else {
        console.log("Redirecting to products page...");
        window.location.href = '/products';
      }
    } catch (error) {
      setError('Error logging in: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <Header/>
      {/* <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>} */}
      <div className="formParent">
        <form className="form">
          <p className="title">LogIn </p>
          <p className="message">Sign in now and get full access to our app. </p>
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

          <button className="submit" onClick={handleLogin}>
            Submit
          </button>
          <p className="signin">
            Do not have an acount ? <a href="#">Sign up</a>{" "}
          </p>
        </form>
        {error && <p>{error}</p>} 
      </div>
    </div>
  );
};

export default Login;
