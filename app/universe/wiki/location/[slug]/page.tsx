import LocationEntryWikiPage from "@/elements/universe/LocationEntryWikiPage";

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
  return <LocationEntryWikiPage slug={slug} showEditButton={false} returnTo={returnTo || "/universe/wiki"} />;
}