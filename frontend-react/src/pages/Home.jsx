import { useEffect, useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import {
  Droplets,
  Waves,
  WavesLadder,
  Utensils,
  Martini,
  Baby,
  Gamepad2,
  Presentation,
  Dumbbell,
  CarFront
} from "lucide-react";

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

  {/* 1. Балнео & Медицински център */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Droplets className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Балнео & Медицински център
        </h3>

        <p className="textOfBox dark-text">
          Процедури и програми с лечебни минерални и води.
        </p>
      </div>

    </div>
  </div>


  {/* 2. Басейни & СПА */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <WavesLadder className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Басейни & СПА
        </h3>

        <p className="textOfBox dark-text">
          Закрити басейни, джакузи, сауни, парни бани и контрастни зони за пълен релакс.
        </p>
      </div>

    </div>
  </div>


  {/* 3. Външен INFINITY басейн */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Waves className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Външен INFINITY басейн
        </h3>

        <p className="textOfBox dark-text">
          Панорамен басейн с гледка към зеленината на парка и планината.
        </p>
      </div>

    </div>
  </div>


  {/* 4. Ресторант */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Utensils className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Ресторант
        </h3>

        <p className="textOfBox dark-text">
          Елегантна кухня със сезонни продукти, уют и внимание към детайла.
        </p>
      </div>

    </div>
  </div>


  {/* 5. Лоби бар */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Martini className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Лоби бар
        </h3>

        <p className="textOfBox dark-text">
          Стилен салон за срещи и релакс, с приятна атмосфера и напитки от висок клас.
        </p>
      </div>

    </div>
  </div>


  {/* 6. Детски кът */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Baby className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Детски кът
        </h3>

        <p className="textOfBox dark-text">
          Пространство за игри и забавления, създадено за най-малките гости.
        </p>
      </div>

    </div>
  </div>


  {/* 7. Игрална зала */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Gamepad2 className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Игрална зала
        </h3>

        <p className="textOfBox dark-text">
          Зона за развлечения и игри – идеална за свободното време на всички възрасти.
        </p>
      </div>

    </div>
  </div>


  {/* 8. Конферентни зали */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Presentation className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Конферентни зали
        </h3>

        <p className="textOfBox dark-text">
          Две зали с естествена светлина и модерна техника, подходящи за до 150 участници.
        </p>
      </div>

    </div>
  </div>


  {/* 9. Фитнес */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <Dumbbell className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Фитнес
        </h3>

        <p className="textOfBox dark-text">
          Обособен фитнес център за активен и здравословен престой.
        </p>
      </div>

    </div>
  </div>


  {/* 10. Открит и закрит паркинг */}
  <div className="box white-background dark-border hover-accent-border-glow:hover">
    <div className="innerBox">

      <CarFront className="boxIcon accent-text" />

      <div className="boxContent">
        <h3 className="boxTitle accent-text">
          Открит и закрит паркинг
        </h3>

        <p className="textOfBox dark-text">
          Удобен и обезопасен паркинг на територията на хотела.
        </p>
      </div>

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