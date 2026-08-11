import { useEffect, useState } from "react";
import "../styles.css";

export default function Home() {
  const [roomType, setRoomType] = useState("Choose room type");

  useEffect(() => {
    // тук няма нужда от DOM event listeners както в main.js
    // React state вече ги замества
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div 
        id="hero"
        style={{
          "--hero1": "url('/Photos/hero-image-bar.jpg')",
          "--hero2": "url('/Photos/sauna-image.jpg')",
          "--hero3": "url('/Photos/hotel-image.PNG')"
        }}
      >
        <div id="head">
          <h1 id="text">MY HOTEL PARK&SPA</h1>
          <p className="mainText">Безкрайно усещане за релакс и хармония</p>

          {/* BEST DEALS */}
          <button type="button" id="dealsBtn" class="btn btn-outline-light">BEST DEALS</button>
         
        </div>
      </div>
       {/* btn.addEventListener("click", () =>{

          }) */}


      {/* MAIN CONTENT */}
      <div className="main-content">
        <h2 id="title1">-FOR THE HOTEL</h2>
        <p className="body1">
          We provide the best hotel experience with premium rooms and services.
        </p>

        {/* CARDS */}
        <div id="cards">
          <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Bar</p>
            </div>
          </div>

          <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Spa</p>
            </div>
          </div>

          <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
       
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
        
         <div className="box">
            <div className="innerBox">
              <p className="textOfBox">Rooms</p>
            </div>
          </div>
         </div>

        {/* LOCATION */}
        <div id="location">
          <div>
            <h2 id="title3">Find us</h2>
            <p className="body1">We are located in the city center.</p>
          </div>
        </div>
      </div>
    </>
  );
}