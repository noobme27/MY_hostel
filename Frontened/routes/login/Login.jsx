import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import videoBg from "./../../src/assets/bg_rotunda.mp4";
import { useContext, useState } from "react";

import apiRequest from "../../lib/apiRequest.js";
import { AuthContext } from "../../context/AuthContext.jsx";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");

    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,

        password,
      });
      // console.log(res);
      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="overlay">
        <video className="video" src={videoBg} autoPlay loop muted />
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Welcome back</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <span className="material-icons">email</span>
              </a>
              <a href="#" className="icon">
                <span className="material-icons">facebook</span>
              </a>

              <a href="#" className="icon">
                <span className="material-icons">business_center</span>
              </a>
            </div>
            <input name="username" type="text" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={isLoading}>Login</button>
            {error && <span>{error}</span>}
            <Link to="/register">{"Don't"} you have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
