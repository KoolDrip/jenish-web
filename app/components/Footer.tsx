"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Roboto, Orbitron } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/KoolDrip", icon: "github" },
  { name: "LinkedIn", url: "https://in.linkedin.com/in/jenish-thapa", icon: "linkedin" },
  { name: "Email", url: "mailto:thisisjenish05@gmail.com", icon: "email" },
  { name: "Twitter", url: "https://x.com/jenishhh_", icon: "twitter" },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".footer-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full min-h-screen bg-[#080808] relative overflow-hidden flex flex-col justify-center items-center px-8 py-20"
      role="contentinfo"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-[3rem] w-full px-[5%] flex justify-start items-start">
          <div className="flex items-start gap-6">
            <img
              src="/ui-01-blue.svg"
              className="h-[1.2rem] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
            <img
              src="/ui-02.svg"
              className="h-[8rem] scale-y-[-1] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute bottom-[3rem] w-full px-[5%] flex justify-end items-end">
          <div className="flex items-end gap-6">
            <img
              src="/ui-02.svg"
              className="h-[8rem] scale-x-[-1] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
            <img
              src="/ui-01-blue.svg"
              className="h-[1.2rem] scale-x-[-1] animate-flicker-slow"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* Divider line */}
        <div
          ref={lineRef}
          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left footer-item"
        />

        {/* Title */}
        <h2
          className={`${orbitron.className} text-4xl md:text-5xl font-bold text-white uppercase text-center footer-item`}
        >
          Let&apos;s Connect
        </h2>

        {/* Description */}
        <p
          className={`${roboto.className} text-white/70 text-center max-w-2xl text-lg footer-item`}
        >
          Always open to discussing new projects, creative ideas, or opportunities
          to be part of your vision.
        </p>

        {/* Social Links */}
        <nav
          className="flex flex-wrap justify-center gap-6 md:gap-8 footer-item"
          aria-label="Social media links"
        >
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${roboto.className} text-white/80 hover:text-white transition-colors duration-300 text-lg relative group`}
              aria-label={`Visit ${link.name} profile`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div
          className={`${roboto.className} text-white/60 text-center space-y-2 footer-item`}
        >
          <p>
            <a
              href="mailto:thisisjenish05@gmail.com"
              className="hover:text-white transition-colors duration-300"
            >
              thisisjenish05@gmail.com
            </a>
          </p>
          <p className="text-sm">BITS Pilani, India</p>
        </div>

        {/* Copyright */}
        <div
          className={`${roboto.className} text-white/40 text-sm text-center mt-8 footer-item`}
        >
          <p>&copy; {new Date().getFullYear()} Jenish Thapa. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Built with Next.js, Three.js, and GSAP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
