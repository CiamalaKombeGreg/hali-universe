import LorebookWikiPage from "@/elements/lorebook/LorebookWikiPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <LorebookWikiPage slug={slug} />;
}