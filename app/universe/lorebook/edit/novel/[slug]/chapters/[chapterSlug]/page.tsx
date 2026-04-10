import NovelChapterEditPage from "@/elements/lorebook/NovelChapterEditPage";

type PageProps = {
  params: Promise<{
    slug: string;
    chapterSlug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug, chapterSlug } = await params;
  return <NovelChapterEditPage slug={slug} chapterSlug={chapterSlug} />;
}