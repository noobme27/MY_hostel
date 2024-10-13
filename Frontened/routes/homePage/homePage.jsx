import "./homePage.scss";
import reactIcon from './assets/explore.svg';
import heroImage from './assets/image.jpg';

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Let's connect & grow and make college unforgettable.</h1>
          <button className="lockroom">Select your Room</button>

          {/* Boxes Section */}
          <div className="boxes">
            <div className="ag-format-container">
              <div className="ag-courses_box">
                
                {/* First Course Item */}
                <div className="ag-courses_item">
                  <a href="#" className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <div className="ag-courses-item_title">
                      {/* <img src={reactIcon} alt="Explore Icon" className="icon" /> */}
                      <div className="ag-courses-item_content">Explore</div>
                    </div>
                  </a>
                </div>

                {/* Second Course Item */}
                <div className="ag-courses_item">
                  <a href="#" className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <div className="ag-courses-item_title">
                      View Your Bhawan
                    </div>
                  </a>
                </div>

                {/* Third Course Item */}
                <div className="ag-courses_item">
                  <a href="#" className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <div className="ag-courses-item_title">
                      Raise a Complain
                    </div>
                  </a>
                </div>

                {/* Fourth Course Item */}
                <div className="ag-courses_item">
                  <a href="#" className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <div className="ag-courses-item_title">
                      Search Community
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="imgContainer">
        <img src={heroImage} alt="Hero" />
      </div>
    </div>
  );
}

export default HomePage;



