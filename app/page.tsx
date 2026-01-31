"use client";
import { useEffect, useRef } from "react";
import LandingHead from "./components/LandingHead";
import ThreeScene from "./components/ThreeScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Orbitron } from "next/font/google";
import LandingMessage from "./components/LandingMessage";
import About from "./components/About";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { Roboto } from "next/font/google";

const RedStripes = "/ui-01.svg";
const WhiteLines = "/ui-02.svg";
const Ring = "/ring.svg";
const NumberRing = "/number-ring.svg";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!pageRef.current || !textRef.current) return;

    // Reset scroll position on mount
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    const ctx = gsap.context(() => {
      gsap.set(pageRef.current, {
        clipPath: "polygon(16% 0%, 72% 0%, 90% 70%, 0% 100%)",
        borderRadius: "0 0 90% 10%",
        y: "-50vh",
      });

      gsap.from(pageRef.current, {
        y: "0vh",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0 0 0 0",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });

      gsap.fromTo(
        textRef.current,
        { y: "0vh" },
        {
          y: "-50vh",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "center center",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-screen overflow-y-auto overflow-x-hidden bg-blue-500/30">
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 flex justify-center items-center">
          <p
            ref={textRef}
            className={`absolute top-[50%] right-[5%] -translate-y-[50%] w-[20%] text-2xl text-red-500 leading-[3rem] cursor-pointer select-none text-right ${roboto.className}`}
            aria-label="Personal philosophy"
          >
            I love exploring technology and pushing boundaries.
          </p>
          <h2
            className={`absolute bottom-[5rem] w-[30%] text-5xl uppercase font-bold text-red-500 leading-[4rem] cursor-pointer select-none text-right ${orbitron.className}`}
          >
            Create <br /> something <br />{" "}
            <span className="text-6xl text-white mt-1 inline-block">
              extraordinary
            </span>
          </h2>
        </div>
        <main
          ref={pageRef}
          className="w-full h-full relative overflow-hidden bg-[#080808]"
        >
          <ThreeScene />
          <div className="absolute inset-0">
            <LandingHead />
            <LandingMessage />
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              {/* <div className="absolute w-[55rem] h-[55rem] z-[-2] rounded-full border border-red-500/60 animate-flicker translate-x-[-1rem] translate-y-[-2rem]"></div> */}
              <img
                src={Ring}
                className="absolute z-[-5] w-[60rem] animate-custom-spin"
                alt=""
                aria-hidden="true"
              />
              <img
                src={NumberRing}
                className="absolute w-[40rem] z-[-5] animate-custom-reverse-spin translate-x-[2rem]"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className="absolute w-full top-[3rem] px-[5%] flex justify-between items-end">
              <div className="flex items-start gap-6">
                <img src={RedStripes} className="h-[1.2rem]" alt="" aria-hidden="true" />
                <img src={WhiteLines} className="h-[8rem] scale-y-[-1]" alt="" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute w-full bottom-[3rem] px-[5%] flex justify-end items-end">
              <div className="flex items-end gap-6">
                <img
                  src={WhiteLines}
                  className="h-[8rem] scale-x-[-1] animate-flicker-slow"
                  alt=""
                  aria-hidden="true"
                />
                <img
                  src={RedStripes}
                  className="h-[1.2rem] scale-x-[-1] animate-flicker-slow"
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
