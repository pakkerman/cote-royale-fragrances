import { FC } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { Content } from "@prismicio/client";

import { Bounded } from "@/components/Bounded";

export type FragranceListProps =
  SliceComponentProps<Content.FragranceListSlice>;

const FragranceList: FC<FragranceListProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      {slice.primary.eyebrow}
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.body} />
      {slice.primary.fragrances.map((item) => (
        <PrismicNextLink field={item.fragrance}>Link</PrismicNextLink>
      ))}
    </Bounded>
  );
};

export default FragranceList;
