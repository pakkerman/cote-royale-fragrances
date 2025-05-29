import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { FadeIn } from "@/components/FadeIn";
import ButtonLink from "@/components/ButtonLink";
import { HiPlus } from "react-icons/hi2";
import { FragranceAttribute } from "@/components/FragranceAttribute";

type FragranceDisplayProps = {
  id: string;
};

export default async function FragranceDisplay({ id }: FragranceDisplayProps) {
  const client = createClient();
  const fragrance = await client.getByID<Content.FragranceDocument>(id);

  return (
    <FadeIn className="relative z-10 grid min-h-[85vh] w-full translate-y-20 items-center justify-items-start border-white/10 p-4 text-left md:p-14 lg:p-20">
      <div className="absolute inset-0 z-0">
        <PrismicNextImage
          field={fragrance.data.feature_image}
          className="object-cover opacity-40 md:opacity-100 "
          fill
          width={1150}
          quality={90}
          alt=""
        />
      </div>
      <FadeIn className="relative z-10 grid translate-y-8 ">
        <h3 className="mb-3 font-display text-5xl md:text-6xl lg:text-7xl">
          <PrismicText field={fragrance.data.title} />
        </h3>
        <p className="mb-8 text-base font-semibold text-gray-300">
          Eau de Parfum
        </p>

        <div className="mb-10 max-w-md text-lg text-gray-300">
          <PrismicRichText field={fragrance.data.description} />
        </div>

        <FragranceAttribute
          mood={fragrance.data.mood}
          scentProfile={fragrance.data.scent_profile}
          className="mt-10"
        />
        <div className="flex flex-wrap gap-4 mt-6">
          <ButtonLink document={fragrance} variant="secondary">
            Discover
          </ButtonLink>

          <ButtonLink href="#" variant="primary">
            <HiPlus /> <span className="">Add to Bag</span>
          </ButtonLink>
        </div>
      </FadeIn>
    </FadeIn>
  );
}
