import "./register.scss";
import { Link } from "react-router-dom";
import videoBg from "./../../public/bg.mp4";

function Register() {
  return (
    <div className="login">
      <div className="overlay">
        <video className="video" src={videoBg} autoPlay loop muted />
        <div className="formContainer">
          <form>
            <h1>Register Yourself</h1>
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
            <input name="name" type="text" placeholder="name" />
            <input name="username" type="text" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />
            <button>Register</button>
            <Link to="/register">Have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
