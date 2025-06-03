import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export type ButtonLinkProps = PrismicNextLinkProps & {
  variant?: "primary" | "secondary" | "Primary" | "Secondary";
};

export default function ButtonLink({
  className,
  variant = "primary",
  ...rest
}: ButtonLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold uppercase transition-colors tracking-wider duration-300",
        variant.toLowerCase() === "secondary"
          ? "border border-white text-white hover:bg-white/20 "
          : "bg-white text-black hover:bg-white/80",
        "w-fit",
        className,
      )}
      {...rest}
    />
  );
}
