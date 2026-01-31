import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Orbitron } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { useEffect, useRef, useCallback } from "react";
import AnimatedText from "./AnimatedText";
const BlueStripes = "/ui-01-blue.svg";
const WhiteLines = "/ui-02.svg";
const Me = "/me.jpeg";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const mainRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = imgRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.2,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const element = imgRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.2,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainRef.current,
        { rotate: "10deg", transformOrigin: "left center" },
        {
          rotate: "0deg",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className={`w-full h-fit min-h-screen relative overflow-hidden bg-[#080808] py-20 px-32 flex flex-col`}
    >
      <div className="absolute inset-0">
        <div className="absolute top-[3rem] w-full px-[5%] flex justify-end items-end">
          <div className="flex items-start gap-6">
            <img
              src={WhiteLines}
              className="h-[8rem] scale-x-[-1] scale-y-[-1] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
            <img
              src={BlueStripes}
              className="h-[1.2rem] scale-x-[-1] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute bottom-[3rem] w-full px-[5%] flex justify-start items-end">
          <div className="flex items-end gap-6">
            <img
              src={BlueStripes}
              className="h-[1.2rem] scale-x-[-1] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
            <img
              src={WhiteLines}
              className="h-[8rem] scale-x-[-1] scale-y-[-1] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col justify-center items-center">
        <AnimatedText
          title={`Ordinary is <br />`}
          lastWord="overrated!"
          containerClass={`${orbitron.className} uppercase text-6xl z-10 font-bold text-center mix-blend-difference`}
        />
        <div className="relative h-[25rem] aspect-square z-[5] -translate-y-10">
          <img
            ref={imgRef}
            src={Me}
            alt="Jenish Thapa - Portfolio Photo"
            className="absolute inset-0 cursor-pointer"
            style={{
              clipPath: "polygon(0 0, 100% 20%, 100% 97%, 0% 100%)",
              filter: "url(#blur-filter)",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          <svg className="absolute size-0">
            <defs>
              <filter id="blur-filter">
                <feGaussianBlur stdDeviation="24" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className={`text-white/60 text-center ${openSans.className}`} role="text">
        End-to-End Developer | Scalable Web Apps | AWS & Docker
      </div>
      <section className="grow text-xl flex flex-col items-center justify-between py-8 text-center gap-8" aria-label="About me">
        <p className={`w-[45%] ${roboto.className}`}>
          &quot;I&apos;m a 2nd-year BSc student at BITS Pilani, focused on building things
          that stand out. I believe in innovation over imitation and am
          currently working on creating my own brand. The goal? To make
          something truly impactful.&quot;
        </p>
      </section>
    </main>
  );
};

export default About;
