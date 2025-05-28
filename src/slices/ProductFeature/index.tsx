import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export type ProductFeatureProps =
  SliceComponentProps<Content.ProductFeatureSlice>;

const ProductFeature: FC<ProductFeatureProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.description} />
      <PrismicNextLink field={slice.primary.fragrance}>Link</PrismicNextLink>
      <PrismicNextImage field={slice.primary.image} />
    </Bounded>
  );
};

export default ProductFeature;
