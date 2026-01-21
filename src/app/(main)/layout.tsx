import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="overflow-hidden">
      <Header />
      <main className="pt-[85px] sm:pt-[100px] md:pt-[110px] lg:pt-[128px]">
      {children}
      </main>
      <Footer />
    </section>
  );
}
