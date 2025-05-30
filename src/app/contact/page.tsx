import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import ContactInfo from "@/components/common/ContactInfo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ContactForm from "@/components/Contact/ContactForm";
import FAQBlock from "@/components/Contact/FAQBlock";

export default function page() {
  return (
    <>
      <Header />
      <HeroSectionCareProvider />

      {/* Full-width background section */}
      <div className="bg-[#F7F7F3] w-full">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mr-24">
            {/* Left Section */}
            <div className="space-y-4 max-w-md">
              <h2 className="text-5xl text-[var(--navy)] font-semibold leading-tight">
                Get in Touch. We’ll Respond Shortly
              </h2>
              <p className="text-[var(--coolgray)] text-md font-semibold leading-6">
                If you have any questions or concerns about CareLinix, please
                don’t hesitate to reach out using the contact details below.
              </p>
              <ContactInfo />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[40%]">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <FAQBlock />
      </div>

      <Footer />
    </>
  );
}
