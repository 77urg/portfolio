import React, { useEffect, useRef } from "react";
import "../App.css";

const IMG_W = 1638;
const IMG_H = 2048;

export default function Hero() {
  const heroRef = useRef(null);

  const day = new Date().getDate();
  const month = new Date()
    .toLocaleString("en-US", { month: "short" })
    .toLowerCase();

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const heroTopPage = hero.offsetTop;
      const heroHeight = rect.height;
      const heroWidth = rect.width;
      const heroBottomPage = heroTopPage + heroHeight;

      const imgRatio = IMG_H / IMG_W;
      const heroRatio = heroHeight / heroWidth;

      let scaledHeight;
      if (heroRatio > imgRatio) {
        scaledHeight = heroHeight;
      } else {
        scaledHeight = heroWidth * imgRatio;
      }

      const overflow = Math.max(0, scaledHeight - heroHeight);
      const offsetFull = -overflow / 2;
      const startOffset = -520;
      const maxShift = offsetFull - startOffset;

      const scrollY = window.scrollY;

      const parallaxStart = heroTopPage - viewportHeight;
      const parallaxEnd = heroBottomPage - viewportHeight;

      let shift = 0;

      if (scrollY <= parallaxStart) {
        shift = 0;
      } else if (scrollY < parallaxEnd) {
        const t =
          (scrollY - parallaxStart) /
          Math.max(parallaxEnd - parallaxStart, 1);
        shift = t * maxShift;
      } else {
        shift = maxShift;
      }

      // disable parallax shift entirely
      hero.style.setProperty("--hero-bg-shift", `0px`);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-overlay"></div>

      <div className="calendar-block">
        <span className="calendar-day">{day}</span>

        <div className="calendar-month-section">
          <span className="calendar-month">{month}</span>
          <span className="calendar-availability">
            available<br />for work
          </span>
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-tag">creative</div>

          <div className="hero-title-stack">
            <span className="hero-title-line">DRUMMER</span>
            <span className="hero-amp">&</span>
            <span className="hero-title-line">DEVELOPER</span>
          </div>
        </div>

        <div className="hero-right">
          <p className="hero-right-text">
            I AM A DEVELOPER AND DRUMMER BASED
            IN CANADA. I SPECIALIZE IN BUILDING
            CLEAN DIGITAL EXPERIENCES, CREATING
            MUSIC, AND TURNING IDEAS INTO REAL
            PROJECTS THROUGH TECHNOLOGY AND
            DESIGN.
          </p>
        </div>
      </div>
    </section>
  );
}
