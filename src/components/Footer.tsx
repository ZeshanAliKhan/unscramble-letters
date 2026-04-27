export function Footer() {
  return (
    <footer className="mt-8 rounded-[20px] bg-stone-900 p-6 text-stone-300 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white">Use this tool responsibly</h2>
          <p className="mt-3 text-sm leading-7 text-stone-400">
            Unscramble Letters is built for learning, brainstorming, spelling practice, and puzzle support. Word acceptance can vary by game, classroom list, or dictionary, so always confirm the final answer against the rules you are working with.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">What is included</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-400">
            <li>Local generated English word list</li>
            <li>Wildcard input support with ? and *</li>
            <li>Starts with, ends with, contains, and length filters</li>
            <li>Grouped results with quick copy interaction</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 border-t border-stone-800 pt-6 text-sm text-stone-500">
        &copy; {new Date().getFullYear()} Unscramble Letters. Free to use in the browser.
      </div>
    </footer>
  );
}
