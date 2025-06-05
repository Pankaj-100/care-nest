import Header from "@/components/common/Header";
import BlogPostPage from "./BlogPagePost";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import Footer from "@/components/common/Footer";

interface Params {
  params: Promise<{ id: string }>;
}
export default async function BlogPage({ params }: Params) {
  const { id } = await params;
  console.log("id", id);
  return (
    <>
      <HeroSectionCareProvider />
      <BlogPostPage />
    </>
  );
}
