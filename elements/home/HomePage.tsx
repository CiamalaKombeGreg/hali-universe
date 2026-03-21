import HeaderBanner from "./HeaderBanner";
import NotesBubble from "./NotesBubble";
import VerseLeaderboard from "./VerseLeaderboard";
import VerticalNavbar from "./VerticalNavbar";

export default function HomePage() {
  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-400 flex-col gap-6 px-6 py-6 md:px-10">
          <HeaderBanner>
            <p className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
              Haliverse
            </p>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Build your fantasy multiverse, your lore, your fighters, your legends.
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-white/70 md:text-lg">
              A vivid anime-inspired control room for verses, canon and uncanon
              characters, original creations, battle scaling, and all the hidden
              lore that shapes your universe.
            </p>
          </HeaderBanner>

          <NotesBubble>
            <h2 className="text-lg font-bold text-white">Author Note</h2>
            <div className="mt-2 text-sm leading-7 text-white/65">
              <p>All information gathered from external sources will be clearly and properly referenced 📚🔍. This ensures full transparency and makes it easy to trace where each piece of information comes from.</p>

              <p>Any detail presented without a reference? That’s original content, thoughtfully created by the author ✍️✨—fresh, unique, and crafted just for you!</p>
            </div>
          </NotesBubble>

          <VerseLeaderboard />
        </div>
      </div>
    </main>
  );
}