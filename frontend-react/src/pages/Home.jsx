import { useEffect, useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

export default function Home() {
  const [roomType, setRoomType] = useState("Choose room type");

  useEffect(() => {
    // тук няма нужда от DOM event listeners както в main.js
    // React state вече ги замества
  }, []);

  return (
    <>
      <div
        id="bodyOfHome"
        className="light-background dark-text"
      >

        {/* HERO SECTION */}
        <div
          id="hero"
          className="dark-background white-text"
          style={{
            "--hero1": "url('/Photos/hero-image-bar.jpg')",
            "--hero2": "url('/Photos/sauna-image.jpg')",
            "--hero3": "url('/Photos/hotel-image.PNG')"
          }}
        >
          <div id="head">
            <h1 id="text" className="white-text">
              MY HOTEL PARK&SPA
            </h1>

            <p className="mainText light-text">
              Безкрайно усещане за релакс и хармония
            </p>

            {/* BEST DEALS */}
            <Link
              to="/rooms"
              className="btn accent-background dark-text dark-border hover-dark-background hover-white-text"
              id="dealsBtn"
            >
              BEST DEALS
            </Link>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content light-background dark-text">
          <h2 id="title1" className="accent-text">
            -FOR THE HOTEL
          </h2>

          <p className="body1 dark-text">
            We provide the best hotel experience with premium rooms and services.
          </p>

          {/* CARDS */}
          <div id="cards">

            <div className="box white-background dark-border hover-accent-border-glow" >
              <div className="innerBox">
                <p className="textOfBox dark-text">Bar</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Spa</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

            <div className="box white-background dark-border hover-accent-border-glow">
              <div className="innerBox">
                <p className="textOfBox dark-text">Rooms</p>
              </div>
            </div>

          </div>

          {/* LOCATION */}
<div id="location" className="dark-background white-text dark-border">
  <div>
    <h2 id="title3" className="accent-text">
      -Find us
    </h2>
  </div>

  <div className="map-container accent-border">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23457.65994944912!2d23.292155102863894!3d42.699327073306264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85426e131a0d%3A0x635e2be5e3b2a5db!2sHotel%20Anel!5e0!3m2!1sen!2sbg!4v1787148497178!5m2!1sen!2sbg"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      title="Hotel Anel location"
    />
  </div>
</div>

        </div>
      </div>
    </>
  );
}