"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Orbitron } from "next/font/google";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

const LandingHead = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { x: "0", y: "100vh", opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 2,
        }
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={titleRef}
      className={`absolute top-[50%] left-[5%] -translate-y-[50%] w-[30%] text-5xl uppercase font-bold text-red-500 leading-[5rem] cursor-pointer select-none ${orbitron.className}`}
      aria-label="Jenish Thapa - Portfolio"
    >
      <span
        className={`text-2xl text-white/70 font-normal normal-case ${roboto.className}`}
      >
        My name is
      </span>{" "}
      Jenish <br /> <span className="ml-[5rem] text-white stroke">thapa</span>
    </h1>
  );
};

export default LandingHead;
