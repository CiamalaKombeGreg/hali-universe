import LorebookEditPage from "@/elements/lorebook/LorebookEditPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <LorebookEditPage slug={slug} />;
}