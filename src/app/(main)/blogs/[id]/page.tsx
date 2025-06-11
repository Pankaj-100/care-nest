import BlogPostPage from "../../../../components/Blog/BlogPagePost";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
interface Params {
  params: Promise<{ id: string }>;
}
export default async function BlogPage({ params }: Params) {
  const { id } = await params;
  console.log("id", id);
  return (
    <>
      <HeroSectionCareProvider title="Blogs" textClasses="lg:ml-10 " />
      <BlogPostPage />
    </>
  );
}
