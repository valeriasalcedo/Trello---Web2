import React from 'react';
import '../styles/Hero.css';
import Aurora from '../components/Aurora.jsx'; 
import Navbar from '../components/Navbar.jsx'; 


const Hero = () => {
  return (
    <section className="hero">
      {/* Fondo Aurora */}
        <div className="aurora-wrapper">

      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
    </div>
     {/* Navbar arriba */}
      <div className="hero-navbar">
        <Navbar />
      </div>

      {/* Contenido encima del fondo */}
      <div className="hero-content">
        <h1>
          luego veo que pone aqui <br />
          <span>Floqo</span><br />
          Everything you need
        </h1>
        <p>
          Through our expert strategic and operational services VÖR will power
          your business to achieve <strong>high-growth</strong> and deliver <strong>sustainable impact</strong>.
        </p>
      </div>
    </section>
  );
};

export default Hero;
