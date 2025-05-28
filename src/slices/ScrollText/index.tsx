import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { asText } from "@prismicio/client/richtext";

export type ScrollTextProps = SliceComponentProps<Content.ScrollTextSlice>;

const ScrollText: FC<ScrollTextProps> = ({ slice }) => {
  const words = asText(slice.primary.text).split(" ");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex h-screen items-center justify-center relative bg-neutral-950"
    >
      <div className="glow-background --opacity-0 absolute inset-0 z-0 h-full w-full"></div>
      <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-multiply"></div>

      <div className="">
        <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
          {slice.primary.eyebrow}
        </div>

        {/* Paragraph */}
        <div className="text-center">
          <p className="flex flex-wrap justify-center font-display text-5xl leading-tight text-balance uppercase md:text-7xl">
            {words.map((word, wordIdx) => (
              <span key={`${word}-${wordIdx}`} className="inline">
                {word.split("").map((char, charIdx) => (
                  <span key={`${char}-${charIdx}`} className="inline">
                    {char}
                  </span>
                ))}
                {wordIdx < words.length - 1 ? (
                  <span className="inline">&nbsp;</span>
                ) : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Bounded>
  );
};

export default ScrollText;
