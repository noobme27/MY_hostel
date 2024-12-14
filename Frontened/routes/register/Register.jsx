import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import videoBg from "./assets/bg_short_login_1.mp4";
import inlogo from "./assets/in logojp.jpg";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
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
            <h1 className="welcome-text">
              Lited
              <img src={inlogo} alt="Logo" className="inlogo" />
            </h1>
            {/* <div className="social-icons">
              <a href="#" className="icon">
                <span className="material-icons">email</span>
              </a>
              <a href="#" className="icon">
                <span className="material-icons">facebook</span>
              </a>

              <a href="#" className="icon">
                <span className="material-icons">business_center</span>
              </a>
            </div> */}
            <input name="username" type="text" placeholder="Username" />
            <input name="email" type="" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={isLoading}>Register</button>
            {error && <span>{error}</span>}
            <Link to="/login">Have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
