import WorldEntryWikiPage from "@/elements/universe/WorldEntryWikiPage";

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    returnTo?: string;
  };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { returnTo } = await searchParams;
  return <WorldEntryWikiPage slug={slug} showEditButton={false} returnTo={returnTo || "/universe/wiki"} />;
}