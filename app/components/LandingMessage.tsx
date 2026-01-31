"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const LandingMessage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { x: "100vw", y: "100vh", opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 2.3,
        }
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <h2
      ref={titleRef}
      className={`absolute top-[50%] right-[5%] -translate-y-[50%] w-[20%] text-2xl text-white/70 leading-[3rem] cursor-pointer select-none text-right ${roboto.className}`}
      aria-label="Personal philosophy"
    >
      I love exploring technology and pushing boundaries.
    </h2>
  );
};

export default LandingMessage;
