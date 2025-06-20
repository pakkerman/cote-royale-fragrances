"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
};

export default function FadeIn({
  children,
  vars = {},
  start = "top 80%",
  className,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(containerRef.current, {
          y: 0,
          opacity: 1,
          duration: 5,
          ease: "power3.out",
          ...vars,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
          onComplete: () => setDisabled(false),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(containerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "none",
          stagger: 0,
          onComplete: () => setDisabled(false),
        });
      });
    },
    { scope: containerRef },
  );

  const childrenWithDiabledProp = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const supportsDisabled =
        typeof child.type === "string" &&
        ["button", "input", "textarea", "select"].includes(child.type);

      if (supportsDisabled) {
        return cloneElement(child, {
          disabled: disabled,
        } as React.HTMLAttributes<HTMLElement>);
      }
    }
    return child;
  });

  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>
      {childrenWithDiabledProp}
    </div>
  );
}
