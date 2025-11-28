import React, { useEffect } from "react";
import "./App.css";

import Header from "./sections/header";
import Hero from "./sections/Hero";
import About from "./sections/about";
import Works from "./sections/works";
import Music from "./sections/music";
import Contact from "./sections/contact";

export default function App() {
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      const fadeDistance = window.innerHeight * 1.15;

      let fade = scrollY / fadeDistance;
      if (fade < 0) fade = 0;
      if (fade > 1) fade = 1;

      document.documentElement.style.setProperty("--global-fade", fade);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app-wrapper">

      {/* GLOBAL FIXED BACKGROUND */}
      <div className="global-bg-image"></div>
      <div className="global-bg-overlay"></div>

      {/* HEADER */}
      <Header />

      {/* PAGE SECTIONS */}
      <Hero />
      <About />
      <Works />
      <Music />
      <Contact />

      {/* PROJECT TRANSITION OVERLAY */}
      <div id="project-transition" className="project-transition">
        <button id="exit-transition" className="exit-transition-btn">
          <img src="/arrow.png" className="back-arrow" />
        </button>


        {/* DYNAMIC PROJECT TEXT */}
        <div className="project-text">
          <h1 className="project-title">Default Title</h1>
          <p className="project-subtitle">Default description</p>
        </div>
      </div>
    </div>
  );
}
