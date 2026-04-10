import NovelChapterCreatePage from "@/elements/lorebook/NovelChapterCreatePage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <NovelChapterCreatePage slug={slug} />;
}