import NovelEditPage from "@/elements/lorebook/NovelEditPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <NovelEditPage slug={slug} />;
}