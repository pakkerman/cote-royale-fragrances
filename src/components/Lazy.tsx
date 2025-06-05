"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";

type LazyProps = ComponentProps<"div"> & {
  rootMargin?: string;
};

export default function Lazy({ rootMargin, children, ...rest }: LazyProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0, rootMargin },
    );

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} {...rest}>
      {isInView ? children : null}
    </div>
  );
}
