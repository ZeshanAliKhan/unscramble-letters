const CTA_EXTERNAL_LINK = "https://www.profitablecpmratenetwork.com/j9f627innq?key=be46e17df9e34aa3b5b8e77e88a34740";

export function SEOContent() {
  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-[20px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-stone-900">How to use Unscramble Letters effectively</h2>
        <p className="mt-4 text-sm leading-7 text-stone-600 md:text-base">
          Start by typing the letters exactly as you have them. If a puzzle includes a blank tile or one missing character, add a <code className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-800">?</code> or <code className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-800">*</code>. Then run the search and scan the grouped results from the longest words down to the shortest ones.
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-600 md:text-base">
          When you already know part of the answer, the filters matter more than the raw word list. Prefix, suffix, and contains filters help you collapse a long result set into something you can review quickly, especially when several words share the same letters.
        </p>
      </div>

      <div className="rounded-[20px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-stone-900">When this tool helps most</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-stone-600 md:text-base">
          <li>Solving simple letter scrambles and classroom vocabulary work</li>
          <li>Checking possible anagrams from a single word</li>
          <li>Finding longer combinations in word games</li>
          <li>Testing whether a wildcard opens more realistic options</li>
          <li>Reducing trial-and-error when you already know a few clue letters</li>
        </ul>
      </div>

      <div className="rounded-[20px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-stone-900">Why the local word list matters</h2>
        <p className="mt-4 text-sm leading-7 text-stone-600 md:text-base">
          This project is set up to generate a local JSON word list at build time. That keeps the tool fast, avoids flaky third-party calls, and makes Netlify deployment predictable. It also means the site stays useful even when an external file host is slow or unavailable.
        </p>
      </div>

      <div className="rounded-[20px] border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-stone-900">Need another quick browser tool?</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700 md:text-base">
          Keep this page handy for letter puzzles, then explore the extra resource below if you want another quick-stop tool page in the same style.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="#unscramble-letters-tool"
            className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Back to the tool
          </a>
          <a
            href={CTA_EXTERNAL_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Explore bonus offers
          </a>
        </div>
      </div>
    </section>
  );
}
