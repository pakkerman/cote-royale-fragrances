import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.body} />
      {slice.primary.button.map((link) => (
        <PrismicNextLink key={link.key} field={link} className={link.variant} />
      ))}
      <PrismicNextImage field={slice.primary.image} />
    </Bounded>
  );
};

export default Hero;
