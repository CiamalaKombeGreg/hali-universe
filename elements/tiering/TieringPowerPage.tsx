import VerticalNavbar from "@/elements/home/VerticalNavbar";
import TieringSearchBanner from "./TieringSearchBanner";
import TieringSectionHeader from "./TieringSectionHeader";
import TieringMenuButtons from "./TieringMenuButtons";

export default function TieringPowerPage() {
  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-400 flex-col gap-6 px-6 py-6 md:px-10">
          <TieringSearchBanner />

          <TieringSectionHeader
            title="Tiering Power Main Section"
            description="This section is the central hub for the scaling system. From here, you’ll be able to browse our tier definitions, understand every statistic used in versus analysis, and store the full list of recorded abilities used across your universes and characters."
          />

          <TieringMenuButtons />
        </div>
      </div>
    </main>
  );
}