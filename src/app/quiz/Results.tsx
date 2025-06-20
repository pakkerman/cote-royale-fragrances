"use client";

import { PrismicNextImage } from "@prismicio/next";
import { asText, Content } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { HiStar } from "react-icons/hi2";

import { formatPrice } from "@/utils/formatters";
import { FragranceType, Vote, Winner } from "./types";
import ButtonLink from "@/components/ButtonLink";
import FadeIn from "@/components/FadeIn";

gsap.registerPlugin(useGSAP);

type ResultsProps = {
  votes: Vote;
  fragrances: Content.FragranceDocument[];
  onRetakeQuiz: () => void;
};

export default function Results({
  votes,
  fragrances,
  onRetakeQuiz,
}: ResultsProps) {
  useGSAP(() => {
    gsap.set(".bottle-image", {
      filter: "brightness(0) blur(10px)",
    });
    const tl = gsap.timeline();

    tl.to(
      ".result-item",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stegger: 0.5,
        ease: "power2.inOut",
      },
      "-=0.4",
    ).to(
      ".bottle-image",
      {
        duration: 1,
        filter: "brightness(1) blur(0px)",
        ease: "sine.in",
      },
      "-=0.8",
    );
  }, []);

  const handleRetakeQuiz = () => {
    gsap.to(".results-container", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        onRetakeQuiz();
      },
    });
  };

  const determineWinners = (
    votes: Vote,
    fragrances: Content.FragranceDocument[],
  ): Winner[] => {
    const maxVotes = Math.max(votes.Terra, votes.Ignis, votes.Aqua);
    const winningTypes: FragranceType[] = [];

    if (votes.Terra === maxVotes) winningTypes.push("Terra");
    if (votes.Ignis === maxVotes) winningTypes.push("Ignis");
    if (votes.Aqua === maxVotes) winningTypes.push("Aqua");

    return winningTypes.slice(0, 2).map((fragranceType) => {
      const fragrance = fragrances.find((f) => {
        asText(f.data.title)
          ?.toLowerCase()
          .includes(fragranceType.toLowerCase());
      });

      return {
        fragranceType,
        title: asText(fragrance?.data.title) || fragranceType,
        uid: fragrance?.uid,
      };
    });
  };

  const winners = determineWinners(votes, fragrances);

  return (
    <FadeIn
      className="result-container mx-auto translate-y-5 py-10 text-center opacity-0"
      vars={{
        duration: 0.8,
      }}
    >
      <div className="mb-10">
        <p className="mb-3 tracking-widest uppercase">Results</p>

        <h2 className="mb-6 font-display text-5xl md:text-6xl ">
          Your Personalized Recommendation
        </h2>

        <p className="mb-12 text-lg text-gray-300 ">
          A unique selection of fragrance that are most suited to you and your
          personal taste
        </p>
      </div>

      <div className="flex justify-center gap-10">
        {winners.map((winner, index) => {
          const fragrance = fragrances.find(
            (f) => asText(f.data.title) === winner.title,
          );
          if (!fragrance) return null;

          const formatedPrice = formatPrice(fragrance.data.price);

          return (
            <div
              key={index}
              className="result-item group max-w-md translate-y-5 text-left opacity-0"
            >
              <div className="mt-40 mb-6 grid bg-neutral-200/10 transition-colors duration-700 group-hover:bg-neutral-200/20">
                <PrismicNextImage
                  priority
                  field={fragrance.data.bottle_image}
                  imgixParams={{ width: 450, height: 450, dpr: 2 }}
                  alt=""
                  className="bottle-image -mt-40 max-w-96 -rotate-12 opacity-100 blur-md transition-all duration-700 group-hover:scale-110 group-hover:rotate-0 group-hover:brightness-125"
                />

                <div className="mt-6 p-6">
                  <div className="mt-2 flex items-center">
                    <span className="inline-flex items-center gap-1 text-white">
                      <HiStar />
                      <span className="">4.8</span>
                    </span>
                    <span className="ml-3 text-gray-400">(120 Reviews)</span>
                  </div>
                  <div className="">
                    <h3 className="font-display mt-2 text-3xl">
                      <PrismicText field={fragrance.data.title} /> Eau De Parfum
                    </h3>

                    <p className="mb-8 text-lg font-semibold">
                      {formatedPrice}
                    </p>

                    <div className="mb-6">
                      <ButtonLink document={fragrance} className="w-full">
                        View Details
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleRetakeQuiz}
        className="mt-12 inline-block cursor-pointer border border-white px-12 py-4 font-extrabold tracking-wider text-white uppercase"
      >
        Retake Quiz
      </button>
    </FadeIn>
  );
}
