import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type BoundedProps = {
  className?: string;
  children: ReactNode;
};

export const Bounded = forwardRef<HTMLElement, BoundedProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        className={clsx(
          "px-6 [.header+&]:pt-44 [.header+&]:md:pt-32",
          className,
        )}
        {...rest}
      >
        <div className="mx-auto w-full max-x-6xl">{children}</div>
      </section>
    );
  },
);

Bounded.displayName = "Bounded";
