import UniverseLocationEditPage from "@/elements/universe/UniverseLocationEditPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <UniverseLocationEditPage slug={slug} />;
}