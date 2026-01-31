import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  title: string;
  lastWord: string;
  containerClass: string;
}

const AnimatedTitle = ({
  title,
  lastWord,
  containerClass,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          z: 0,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx(containerClass)}>
      {title.split(/<br\s*\/?>/g).map((line, index) => (
        <div key={index} className="flex text-left flex-wrap gap-6">
          {line.split(" ").map((word, wordIdx) => (
            <div
              key={wordIdx}
              className="animated-word inline-block opacity-0 z-0"
              dangerouslySetInnerHTML={{ __html: word.trim() }}
            />
          ))}
        </div>
      ))}
      <div className="animated-word text-blue-500">{lastWord}</div>
    </div>
  );
};

export default AnimatedTitle;
