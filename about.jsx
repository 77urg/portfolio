import React from "react";
import "../App.css";
import Caesar from "../components/caesar";

export default function About() {
  return (
    <section id="about" className="about-section">

      <div className="about-overlap-title">
        <h2 className="about-hello">HELLO I AM JULIAN</h2>
        <h3 className="about-name">Julian Grande</h3>

        <div className="about-content-wrapper">
          <p className="about-description">
            I am a 1st-year BComp student at the University of Guelph studying computer science
            with an area of emphasis in Cybersecurity. I use my passion for technology, creativity, and music to build clean digital
            experiences. Brands, creators, and independent clients rely on me for
            thoughtful design, sharp implementation, and reliable management of
            their projects. As an independent developer, I collaborate with
            studios, startups, and individuals to bring ideas to life through
            code, design, and sound.
          </p>

          <Caesar />
        </div>
      </div>

    </section>
  );
}
