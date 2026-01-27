import Section3 from "@/components/Blog/Section3";
import CardSection from "@/components/Blog/CardSection";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";


export const metadata = {
  title: "Blogs",
};

// allow dynamic server fetches (params-dependent) so Next doesn't throw the sync-dynamic-apis error
export const dynamic = "force-dynamic";

// Helper to fetch blogs server-side
async function fetchBlogs(page: number, pageSize: number) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/blog?page=${page}&pageSize=${pageSize}`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      return json?.data ?? {};
    }
  } catch {
    // ignore error
  }
  return {};
}

export default async function BlogsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  // Await searchParams in Next.js 15+
  const params = await searchParams;
  const rawPage = Array.isArray(params?.page) ? params.page[0] : params?.page;
  const page = Math.max(1, Number(rawPage) || 1);
  const pageSize = 10;
  
  const data = await fetchBlogs(page, pageSize);
  const blogs = data.blogs ?? [];
  const pagination = data.pagination ?? {};
  const totalItems = Number(pagination.totalItems ?? blogs.length) || blogs.length;
  const totalPages = Number(pagination.totalPages) || Math.max(1, Math.ceil(totalItems / pageSize));

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <span className="text-red-600">No blogs found</span>
      </div>
    );
  }

  const latest = blogs.length > 0 ? blogs[0] : null;
  const rest = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <main>
      <HeroSectionCareProvider title="Blogs" textClasses="lg:ml-10 " />
      <Section3 blog={latest} />
      <CardSection blogs={rest} />
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-8">
          <a
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer"
            href={`?page=${Math.max(1, page - 1)}`}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
            style={page === 1 ? { pointerEvents: 'none', opacity: 0.5 } : {}}
          >
            Previous
          </a>
          {Array.from({ length: totalPages }, (_, i) => (
            <a
              key={i + 1}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-[#233D4D] text-white" : "bg-gray-200 text-gray-700"}`}
              href={`?page=${i + 1}`}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </a>
          ))}
          <a
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer"
            href={`?page=${Math.min(totalPages, page + 1)}`}
            aria-disabled={page === totalPages}
            tabIndex={page === totalPages ? -1 : 0}
            style={page === totalPages ? { pointerEvents: 'none', opacity: 0.5 } : {}}
          >
            Next
          </a>
        </div>
      )}
    </main>
  );
}
