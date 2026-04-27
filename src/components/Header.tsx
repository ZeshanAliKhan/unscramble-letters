export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">
            Free browser tool
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Unscramble Letters
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600 md:text-lg">
            Find words from mixed letters, solve anagrams, and narrow results with practical filters. The tool runs in your browser and is built for quick puzzle checks without signup friction.
          </p>
        </div>
      </div>
    </header>
  );
}
