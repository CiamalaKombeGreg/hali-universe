import AbilityNodeEditPage from "@/elements/tiering/AbilityNodeEditPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <AbilityNodeEditPage slug={slug} />;
}