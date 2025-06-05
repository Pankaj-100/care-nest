import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
