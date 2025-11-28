import React, { useEffect } from "react";
import gsap from "gsap";
import "../App.css";

let activeClone = null;
let activeOriginal = null;

function openProjectTransition(e) {
  const overlay = document.getElementById("project-transition");

  // TEXT SETUP
  const title = e.currentTarget.dataset.title;
  const desc = e.currentTarget.dataset.desc;
  document.querySelector(".project-title").textContent = title;
  document.querySelector(".project-subtitle").textContent = desc;

  // GET IMAGE + CURRENT BOX
  const originalImg = e.currentTarget.querySelector(".work-image");
  const rect = originalImg.getBoundingClientRect();
  activeOriginal = originalImg;

  // CREATE CLONE
  const clone = originalImg.cloneNode(true);
  activeClone = clone;

  // COPY CURRENT TRANSFORM (hover zoom)
  const computed = getComputedStyle(originalImg);
  clone.style.transform = computed.transform;
  clone.style.transformOrigin = computed.transformOrigin || "center center";
  clone.style.filter = computed.filter;

  // POSITION CLONE EXACTLY WHERE THE IMAGE CURRENTLY IS
  Object.assign(clone.style, {
    position: "fixed",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    margin: 0,
    zIndex: 999999999,
    pointerEvents: "none",
  });

  document.body.appendChild(clone);

  // DISABLE ORIGINAL
  originalImg.style.opacity = "0";

  // OVERLAY FADE-IN
  overlay.classList.add("active");
  gsap.to(overlay, {
    opacity: 1,
    duration: 0.7,
    ease: "power4.out",
    onStart: () => (overlay.style.pointerEvents = "auto"),
  });

  // FINAL SIZE + POSITION
  const finalWidth = window.innerWidth * 0.55;
  const finalHeight = (finalWidth * rect.height) / rect.width;
  const finalX = window.innerWidth * 0.65 - finalWidth / 2;
  const finalY = window.innerHeight * 0.50 - finalHeight / 2;

  // EXPONENTIAL ANIMATION
  gsap.timeline()
    .to(clone, {
      top: finalY,
      left: finalX,
      width: finalWidth,
      height: finalHeight,
      duration: 1.2,
      ease: "expo.in",
    }, 0)
    .to(clone, {
      filter: "grayscale(0%) contrast(1) brightness(1.05) saturate(1)",
      duration: 0.9,
      ease: "expo.in",
    }, 0.15);

  // TEXT FADE-IN
  gsap.fromTo(
    ".project-text",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.7,
      delay: 0.35,
      ease: "power4.out",
    }
  );
}


function closeProjectTransition() {
  const overlay = document.getElementById("project-transition");
  if (!activeClone || !activeOriginal) return;

  // fade out text
  gsap.to(".project-text", {
    opacity: 0,
    duration: 0.3,
    ease: "power4.out",
  });

  // fade overlay
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.6,
    ease: "power4.out",
    onComplete: () => {
      overlay.style.pointerEvents = "none";
      overlay.classList.remove("active");
    },
  });

  const rect = activeOriginal.getBoundingClientRect();

  //  CLOSE ANIMATION — movement + fade-out start immediately
  gsap.timeline()
    .to(activeClone, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      duration: 0.9,
      ease: "power4.out",
    }, 0)
    .to(activeClone, {
      filter: "grayscale(100%) contrast(0.85) brightness(1.05) saturate(0.4)",
      duration: 0.05,
      ease: "power4.out",
    }, 0)
    .eventCallback("onComplete", () => {
      activeOriginal.style.opacity = "1";
      activeClone.remove();
      activeClone = null;

      // re-enable clicking
      document
        .querySelectorAll(".work-image-wrapper")
        .forEach((el) => (el.style.pointerEvents = ""));
    });
}

export default function Works() {
  useEffect(() => {
    const btn = document.getElementById("exit-transition");
    if (!btn) return;

    btn.addEventListener("click", closeProjectTransition);
    return () => btn.removeEventListener("click", closeProjectTransition);
  }, []);

  return (
    <section id="works" className="works-section">
      <div className="works-header">
        <h1 className="works-heading">WHAT HAVE I DONE?</h1>
      </div>

      {/* PROJECT 1 */}
      <div className="work-row work-link">
        <div className="work-text">
          <h2 className="work-title">THIS WEBSITE</h2>
          <p className="work-subtitle">DESIGN · DEVELOPMENT</p>
        </div>

        <div
          className="work-image-wrapper"
          onMouseDown={openProjectTransition}
          data-title="THIS WEBSITE"
          data-desc="A fully custom-built portfolio powered by React and GSAP, featuring advanced FLIP animations, dynamic content injection, and smooth scrolling mechanics."
        >
          <img src="/work1.jpg" className="work-image" />
        </div>
      </div>

      {/* PROJECT 2 */}
      <div className="work-row reverse work-link">
        <div
          className="work-image-wrapper"
          onMouseDown={openProjectTransition}
          data-title="COURSE SCRAPER"
          data-desc="A Python-powered scraper designed to automatically collect, parse, and organize university course data. The tool handles HTML parsing, filtering logic, and structured output generation—showcasing a clean approach to automation, data extraction, and utility-driven development."
        >
          <img src="/work2.png" className="work-image" />
        </div>

        <div className="work-text">
          <h2 className="work-title">COURSE SCRAPER</h2>
          <p className="work-subtitle">PYTHON · DATA SCRAPING</p>
        </div>
      </div>
    </section>
  );
}
