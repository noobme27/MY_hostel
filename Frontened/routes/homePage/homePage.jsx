import "./homePage.scss";
import reactIcon from "./assets/explore.svg";
import heroImage from "./assets/image.jpg";
import { Link } from "react-router-dom";
import gandhiImage from "./assets/gandhi.jpg";
import meera0Image from "./assets/meera-0.jpg";
import meera1Image from "./assets/meera-1.jpg";
import meera2Image from "./assets/meera-2.jpg";
import meera3Image from "./assets/meera-3.jpg";
import meera4Image from "./assets/meera-4.jpg";
import meera5Image from "./assets/meera-5.jpg";
import meera6Image from "./assets/meera-6.jpg";
import meera7Image from "./assets/meera-7.jpg";
import meera8Image from "./assets/meera-8.jpg";
import meera9Image from "./assets/meera-9.jpg";
import ramImage from "./assets/ram.jpg";
import rpImage from "./assets/rp.jpg";
import shankerImage from "./assets/shanker.jpg";
import vkImage from "./assets/vk.jpg";
import vyasImage from "./assets/vyas.jpg";
import bhagirathImage from "./assets/bhagirath.jpg";
import ashokImage from "./assets/ashok.jpg";
import budhImage from "./assets/budh.jpg";
import malviyaAImage from "./assets/malviya-A.jpg";
import malviyaBImage from "./assets/malviya-B.jpg";
import malviyaCImage from "./assets/malviya-C.jpg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Let's connect & grow and make college unforgettable.
          </h1>

          <Link to="/update" className="lockroom">
            Select Your Room
          </Link>

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

      {/* <div className="imgContainer">
        <img src={heroImage} alt="Hero" />
      </div>  */}

      <div className="imgContainer">
        <input type="radio" name="slider" id="item-1" defaultChecked />
        <input type="radio" name="slider" id="item-2" />
        <input type="radio" name="slider" id="item-3" />
        <input type="radio" name="slider" id="item-4" />

        <div className="cards">
          <label className="card" htmlFor="item-1" id="song-1">
            <img src={vyasImage} alt="Vyas" />
          </label>
          <label className="card" htmlFor="item-2" id="song-2">
            <img src={meera0Image} alt="Meera 0" />
          </label>
          <label className="card" htmlFor="item-3" id="song-3">
            <img src={gandhiImage} alt="Gandhi" />
          </label>
          {/* <label className="card" htmlFor="item-4" id="song-4">
           <img src={budhImage} alt="Budh" />
        </label> */}
        </div>

        <div className="player">
          <div className="upper-part">
            <div className="play-icon">
              <svg
                width="20"
                height="20"
                fill="#2992dc"
                stroke="#2992dc"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="feather feather-play"
                viewBox="0 0 24 24"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
            <div className="info-area" id="test">
              <label className="song-info" id="song-info-1">
                <div className="title">Bunker</div>
                <div className="sub-line">
                  <div className="subtitle">Balthazar</div>
                  <div className="time">4:05</div>
                </div>
              </label>
              <label className="song-info" id="song-info-2">
                <div className="title">Words Remain</div>
                <div className="sub-line">
                  <div className="subtitle">Moderator</div>
                  <div className="time">4:05</div>
                </div>
              </label>
              <label className="song-info" id="song-info-3">
                <div className="title">Falling Out</div>
                <div className="sub-line">
                  <div className="subtitle">Otzeki</div>
                  <div className="time">4:05</div>
                </div>
              </label>
            </div>
          </div>

          <div className="progress-bar">
            <span className="progress"></span>

            <div className="info-area" id="test">
              <label className="song-info" id="song-info-1">
                <div className="title">Vyas Bhawan</div>
                <div className="sub-line">
                  {/* <div className="subtitle">Balthazar</div>
                <div className="time">4:05</div> */}
                </div>
              </label>
              <label className="song-info" id="song-info-2">
                <div className="title">Meera-0 Bhawan</div>
                <div className="sub-line">
                  {/* <div className="subtitle">Moderator</div>
                <div className="time">4:05</div> */}
                </div>
              </label>
              <label className="song-info" id="song-info-3">
                <div className="title">Gandhi Bhawan</div>
                <div className="sub-line">
                  {/* <div className="subtitle">Otzeki</div>
                <div className="time">4:05</div> */}
                </div>
              </label>
              {/* <label className="song-info" id="song-info-4">
              <div className="title">Budh Bhawan</div>
              <div className="sub-line">
              </div>
            </label> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
{
  /*   <img src={gandhiImage} alt="Gandhi" />
      <img src={meera0Image} alt="Meera 0" />
      <img src={meera1Image} alt="Meera 1" />
      <img src={meera2Image} alt="Meera 2" />
      <img src={meera3Image} alt="Meera 3" />
      <img src={meera4Image} alt="Meera 4" />
      <img src={meera5Image} alt="Meera 5" />
      <img src={meera6Image} alt="Meera 6" />
      <img src={meera7Image} alt="Meera 7" />
      <img src={meera8Image} alt="Meera 8" />
      <img src={meera9Image} alt="Meera 9" />
      <img src={ramImage} alt="Ram" />
      <img src={rpImage} alt="RP" />
      <img src={shankerImage} alt="Shanker" />
      <img src={vkImage} alt="VK" />
      <img src={vyasImage} alt="Vyas" />
      <img src={bhagirathImage} alt="Bhagirath" />
      <img src={ashokImage} alt="Ashok" />
      <img src={budhImage} alt="Budh" />
      <img src={malviyaAImage} alt="Malviya A" />
      <img src={malviyaBImage} alt="Malviya B" />
      <img src={malviyaCImage} alt="Malviya C" />
 */
}
