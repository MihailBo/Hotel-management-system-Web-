import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';





function Footer() { return ( 
<footer id="footer" className="dark-background light-text">
   
  <div id="footer-info-divs">
      <div className="lowBox"> 
        <h3 className="accent-text">FOR THE HOTEL</h3> 
        <p className="light-text"> SPA Hotel Infinity Park Velingrad — място, в което ще намерите комфорт и планинско спокойствие. Минерални басейни и СПА зони, балнео и уелнес услуги, стилни стаи и апартаменти, ресторант и пространства за събития — всичко за пълноценна почивка през всеки сезон. </p>
        </div>
          <div className="lowBox">
            <h3 className="accent-text">Контакти</h3> 
            <p className="light-text"> Рецепция 24/7
          <br /> +359 878 550 585 <br />
          <br /> Резервации (Пон–Нед 08:00–18:00) <br />
            +359 878 616 150 <br /> +359 878 111 819 <br />
            <br /> Email <br /> reservation@hotelinfinity.bg </p>
            </div> 
            <div className="lowBox"> 
              <div classname="lowBoxElement">
                  <h3 className="accent-text">Навигация</h3>
                  <Link to="/rooms" className="light-text"> 
                  Настаняване 
                  </Link>
              </div>
              <div classname="lowBoxElement">
                  <Link to="/about" className="light-text">
                  За нас 
                  </Link>
              </div>
                <div id="icons" classname="lowBoxElement" >
                                  <a href="https://facebook.com/"
                            aria-label="Facebook"
                            target="_blank"
                            rel="noreferrer"
                            className="accent-text"
                            >
                            <i className="bi bi-facebook fs-3"></i>
                          </a>

                          <a href="https://instagram.com"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noreferrer"
                            className="accent-text"
                            >
                            <i className="bi bi-instagram fs-3"></i>
                          </a>

                          <a href="https://tiktok.com/"
                            aria-label="TikTok"
                            target="_blank"
                            rel="noreferrer"
                            className="accent-text">
                            <i className="bi bi-tiktok fs-3"></i>
                          </a>
                    </div> 
              </div> 
  </div>
          <div id="footer-copyright-about">
                <span className="about-copyright">
              © {new Date().getFullYear()} MYHOTEL Grand Hotel. A fictional
              hotel concept.
            </span>
        </div>
     </footer> ); 

} export default Footer;