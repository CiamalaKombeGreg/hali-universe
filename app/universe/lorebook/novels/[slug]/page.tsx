import NovelPrePage from "@/elements/lorebook/NovelPrePage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <NovelPrePage slug={slug} />;
}