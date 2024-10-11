import "./homePage.scss";
import reactIcon from './assets/explore.svg';
import heroImage from './assets/image.jpg';
function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Human-centered care when they need it most</h1>
          <button className="lockroom">Select your Room</button>
          <div className="boxes">
            <div className="box">
            <img src={reactIcon} alt="Description of Icon" />
              <h1>Explore</h1>
            </div>
            <div className="box">
              <h1>View Your Bhawan</h1>
            </div>
            <div className="box">
              <h1>Raise a Complain</h1>
            </div>
            <div className="box">
              <h1>Search Community</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer">
      <img src={heroImage} alt="Hero" /> 
      </div>
    </div>
  );
}

export default HomePage;
