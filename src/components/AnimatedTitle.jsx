import gsap from "gsap";
import { useEffect, useRef } from "react";

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100px bottom",
          end: "center bottom",
          scrub: 0.5,
          toggleActions: "play none none reverse",
        },
      });
      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        stagger: 0.02,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`animated-title ${containerClass}`} ref={containerRef}>
      {title.split("<br />").map((line, index) => (
        <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
          {line.split(" ").map((word, index) => (
            <span key={index} className={`animated-word`} dangerouslySetInnerHTML={{ __html: word }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
