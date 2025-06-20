import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import RevealText from "@/components/RevealText";
import FadeIn from "@/components/FadeIn";
import ButtonLink from "@/components/ButtonLink";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="absolute inset-0 motion-safe:scale-125 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover motion-reduce:opacity-50 select-none"
        />
      </FadeIn>
      <div className="relative flex h-screen flex-col justify-center">
        <RevealText
          field={slice.primary.heading}
          as="h1"
          id="hero-heading"
          className="max-w-xl font-display text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
          staggerAmount={0.2}
          duration={1.7}
        />

        <FadeIn
          vars={{
            delay: 1,
            duration: 1.3,
          }}
          className="mt-6 max-w-md text-lg text-neutral-100 translate-y-8"
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>

        <FadeIn
          vars={{
            delay: 1.7,
            duration: 1.1,
          }}
          className="mt-8 translate-y-5"
        >
          {slice.primary.button.map((link) => (
            <ButtonLink
              key={link.key}
              field={link}
              variant="secondary"
              className="w-fit"
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
