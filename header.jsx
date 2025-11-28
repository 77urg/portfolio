import React, { useEffect } from "react";
import "../App.css";

export default function Header() {
  useEffect(() => {
    const nav = document.querySelector(".top-nav");
    if (!nav) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // how far you have to scroll before it's at max blur
      const maxBlurPoint = 350; // tweak this number

      // from 0px to 8px blur
      const blur = Math.min((scrollY / maxBlurPoint) * 8, 8);

      nav.style.backdropFilter = `blur(${blur}px)`;
      nav.style.webkitBackdropFilter = `blur(${blur}px)`; 
    };

    // run once on load
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">

        {/* LEFT SIDE */}
        <div className="top-nav-left">
          <span className="brand-name">JULIAN GRANDE</span>
          <span className="brand-divider"></span>
          <span className="brand-role">developer & drummer</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="top-nav-right">
          <a href="#works" className="nav-link">works</a>
          <a href="#about" className="nav-link">about</a>
          <a href="#music" className="nav-link">music</a>
          <a href="#contact" className="nav-link">contact</a>
        </div>

      </div>
    </nav>
  );
}
