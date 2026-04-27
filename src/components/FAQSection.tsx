import { useState } from "react";

const FAQ_DATA = [
  {
    question: "What does this unscramble letters tool do?",
    answer:
      "It takes the letters you enter and checks a built-in English word list to find words that can be formed from those letters.",
  },
  {
    question: "Can I use blank tiles or unknown letters?",
    answer:
      "Yes. Use ? or * as a wildcard. Each wildcard can stand in for one missing letter when the tool checks possible words.",
  },
  {
    question: "Why are longer words shown first?",
    answer:
      "Longer matches are often the most useful answers in puzzles and anagram searches, so the tool surfaces them before shorter filler words.",
  },
  {
    question: "Can I filter the results?",
    answer:
      "Yes. You can set minimum and maximum length, plus optional starts with, ends with, and contains filters.",
  },
  {
    question: "Does this tool need a server or paid API?",
    answer:
      "No. It runs in the browser and uses a locally generated word list, which keeps it lightweight and cheap to host.",
  },
  {
    question: "Will every result work in every word game?",
    answer:
      "Not always. Different games and dictionaries accept different words, so treat this as a strong helper rather than the final authority for every ruleset.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="unscramble-letters-faq" className="mt-8 rounded-[20px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-stone-900">Frequently asked questions</h2>
      <div className="mt-6 space-y-3">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className="overflow-hidden rounded-2xl border border-stone-200">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left transition hover:bg-stone-50"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-stone-800">{item.question}</span>
                <span className={`text-lg text-stone-500 transition ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              {isOpen ? (
                <div className="border-t border-stone-200 px-5 py-4 text-sm leading-7 text-stone-600">{item.answer}</div>
              ) : null}
            </div>
          );
        })}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_DATA.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
