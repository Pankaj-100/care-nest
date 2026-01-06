import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import ContactInfo from "@/components/common/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import FAQBlock from "@/components/Contact/FAQBlock";

export const metadata = {
  title: "Contact",
};

export default function page() {
  return (
    <>
      <HeroSectionCareProvider title="Contact Us" textClasses="lg:ml-10 " />

      {/* Full-width background section */}
      <div className="bg-[#F7F7F3] w-full">
        <div className="lg:mx-[4.2rem] mx-3 sm:mx-4 px-3 sm:px-5 lg:px-6 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:mr-24">
            {/* Left Section */}
            <div className="space-y-4 lg:max-w-lg">
              <h2 className="lg:text-6xl text-3xl text-[var(--navy)] font-semibold leading-tight">
                Get In Touch. We’ll Respond Shortly
              </h2>
              <p className="text-[#667085] text-lg  leading-6">
                If you have any questions or concerns about CareWorks, please don’t
                hesitate to reach out using the contact details below.
              </p>
              <ContactInfo />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[50%]">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:mx-[4.2rem] mx-3 sm:mx-4">
        <FAQBlock />
      </div>
    </>
  );
}
