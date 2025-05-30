"use client";

import { useRef } from "react";
import { asText, RichTextField } from "@prismicio/client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

gsap.registerPlugin(useGSAP);

type RevealTextProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "center" | "start" | "end";
};

export const RevealText = ({
  field,
  id,
  className,
  staggerAmount = 0.1,
  align = "start",
  as: Component = "div",
  duration = 0.8,
}: RevealTextProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const words = asText(field).split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: staggerAmount,
          duration,
          ease: "power3.out",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "none",
        });
      });
    },
    { scope: componentRef },
  );

  return (
    <Component
      ref={componentRef}
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "start" && "text-start",
        align === "end" && "text-end",
        className,
      )}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}-${id}`}
          className="mb-0 inline-block overflow-hidden pb-4"
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[150%] will-change-transform">
            {word}
            {idx < words.length - 1 ? <>&nbsp;</> : null}
          </span>
        </span>
      ))}
    </Component>
  );
};
