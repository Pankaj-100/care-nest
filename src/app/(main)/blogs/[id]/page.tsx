import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import BlogPostPage from "@/components/Blog/BlogPagePost";

// allow dynamic server fetches (params-dependent) so Next doesn't throw the sync-dynamic-apis error
export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPage({ params }: any) {
  const id = params?.id as string | undefined;

  if (!id) {
    return (
      <>
        <HeroSectionCareProvider title="Blogs" textClasses="lg:ml-10 " />
        <div className="min-h-screen flex items-center justify-center py-12">
          <p className="text-red-600">Invalid blog id</p>
        </div>
      </>
    );
  }

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/blog/${id}`;

  let blog = null;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      blog = json?.data?.blog ?? null;
    } else {
      console.error("Blog fetch failed:", res.status);
    }
  } catch (err) {
    console.error("Blog fetch error:", err);
  }

  return (
    <>
      <HeroSectionCareProvider title="Blogs" textClasses="lg:ml-10 " />
      <BlogPostPage blog={blog} />
    </>
  );
}