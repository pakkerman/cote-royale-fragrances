"use client";

import { Fragment, useState } from "react";
import { Content, ImageField } from "@prismicio/client";
import clsx from "clsx";

import { AnswerOption, FragranceType } from "./types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PrismicImage } from "@prismicio/react";

gsap.registerPlugin(useGSAP);

type QuestionProps = {
  question: Content.QuizDocumentDataQuestionsItem;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSelected: (fragrenceType: FragranceType) => void;
  onBack: () => void;
};

export function Question({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelected,
  onBack,
}: QuestionProps) {
  const [answers, setAnswers] = useState<AnswerOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<FragranceType | null>(
    null,
  );
  const [disabled, setDisabled] = useState(false);

  useGSAP(() => {
    setSelectedOption(null);

    gsap.set(".answer-option", {
      clearProps: "all",
      opacity: 1,
      scale: 1,
    });

    const answerOptions: AnswerOption[] = [
      {
        text: question.answer_aqua || "",
        value: "Aqua",
      },
      {
        text: question.answer_ignis || "",
        value: "Ignis",
      },
      {
        text: question.answer_terra || "",
        value: "Terra",
      },
    ];

    setAnswers(gsap.utils.shuffle(answerOptions));

    gsap.to(".question-content", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [question]);

  const getImageField = (fragranceType: FragranceType) => {
    switch (fragranceType) {
      case "Terra":
        return question.image_terra;
      case "Ignis":
        return question.image_ignis;
      case "Aqua":
        return question.image_aqua;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      gsap.to(".question-content", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          onAnswerSelected(selectedOption);
        },
      });
    }
  };

  const handleBack = () => {
    gsap.to(".question-content", {
      opacity: 0,
      duration: 0.5,
      y: 10,
      ease: "power2.in",
      onComplete: onBack,
    });
  };

  const handleSelectedAnswer = (answer: FragranceType) => {
    setDisabled(true);

    gsap.set(".answer-option", {
      clearProps: "all",
      opacity: 1,
      scale: 1,
    });

    setSelectedOption(answer);

    const tl = gsap.timeline({ onStart: () => setSelectedOption(answer) });

    tl.to(".answer-option", {
      opacity: 0.5,
      scale: 1,
      duration: 0.2,
      ease: "power1.out",
    }).to(
      `.answer-${answer}`,
      {
        opacity: 1,
        scale: 1.05,
        duration: 0.25,
        ease: "back.out(1.2)",
        onComplete: () => setDisabled(false),
      },
      "-=0.2",
    );
  };

  return (
    <div className="mx-auto max-w-4xl py-10 text-center">
      {/* {step counter} */}
      <div className="mx-auto mb-10 flex w-full max-w-md items-center">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <Fragment key={idx}>
            <div
              className={clsx(
                "relative flex size-14 items-center justify-center rounded-full border border-gray-600 font-semibold translate-all duration-1000 text-xl",
                idx + 1 < questionNumber &&
                  "scale-100 bg-neutral-800 text-neutral-50",
                idx + 1 === questionNumber &&
                  "scale-110 bg-neutral-50 text-neutral-950",
                idx + 1 > questionNumber &&
                  "scale-100 bg-neutral-900 text-neutral-50",
              )}
            >
              {idx + 1}
            </div>

            <div className="h-px w-full flex-1 bg-gray-600 last:hidden"></div>
          </Fragment>
        ))}
      </div>

      <div className="question-content translate-y-2.5 opacity-0">
        <div className="mb-14">
          <p className="mb-3 tracking-widest uppercase">
            Step {questionNumber}
          </p>
          <h2 className="mb-6 font-display text-4xl md:text-5xl lg:text-6xl">
            {question.question_text || ""}
          </h2>
        </div>

        <div className="mb-12 ">
          <fieldset className="mb-12">
            <legend className="sr-only">
              {question.question_text || "Select an option"}
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
              {answers.map((answer, index) => (
                <Answer
                  key={answer.value}
                  index={index}
                  imageField={getImageField(answer.value)}
                  question={answer.text}
                  value={answer.value}
                  checked={selectedOption === answer.value}
                  onClick={() => {
                    handleSelectedAnswer(answer.value);
                  }}
                  disabled={disabled}
                />
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mx-auto flex max-w-md items-center justify-between select-none">
          <button
            onClick={handleBack}
            className="cursor-pointer border border-neutral-700 px-4 py-2 uppercase"
          >
            Back
          </button>

          <div className="text-center">
            {questionNumber} / {totalQuestions}
          </div>
          <button
            onClick={handleNext}
            className="cursor-pointer bg-white px-4 py-2 text-black uppercase disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!selectedOption}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

type AnswerProps = {
  imageField: ImageField | null;
  value: FragranceType;
  question: string;
  index: number;
  checked?: boolean;
  disabled: boolean;
  onClick?: () => void;
};

export function Answer({
  imageField,
  index,
  question,
  value,
  checked,
  disabled,
  onClick,
}: AnswerProps) {
  const optionId = `option-${value}-${index}`;

  return (
    <div className="relative select-none">
      <input
        type="radio"
        id={optionId}
        name="fragrance-option"
        value={value}
        onClick={onClick}
        className="peer absolute h-0 w-0 opacity-0"
        disabled={disabled}
      />
      <label
        htmlFor={optionId}
        className={clsx(
          "answer-option block h-full cursor-pointer border p-3 transition-all duration-300 peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-offset-1 perr-focus:ring-offset-black hover:border-white sm:p-4 md:p-6",
          checked ? "border-white" : "border-neutral-700",
          `answer-${value}`,
        )}
      >
        <div className="sm:max-w-44 relative mx-auto mb-2 aspect-square w-full max-w-32 sm:mb-3 md:max-w-none">
          <PrismicImage
            field={imageField}
            width={200}
            height={200}
            fallback={
              <div
                className={clsx(
                  "h-full w-full",
                  value === "Terra" && "bg-lime-800",
                  value === "Ignis" && "bg-amber-800",
                  value === "Aqua" && "bg-cyan-800",
                )}
              />
            }
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-xl text-balance">{question}</p>
      </label>
    </div>
  );
}
