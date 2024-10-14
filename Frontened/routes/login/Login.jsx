import "./login.scss";
import { Link } from "react-router-dom";
import videoBg from "./../../public/bg.mp4";

function Login() {
  return (
    <div className="login">
      <div className="overlay">
        <video className="video" src={videoBg} autoPlay loop muted />
        <div className="formContainer">
          <form>
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
            <button>Login</button>
            <Link to="/register">{"Don't"} you have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
