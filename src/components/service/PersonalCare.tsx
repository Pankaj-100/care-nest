import { ContactItem } from "@/components/common/ContactInfo";
import Image from "next/image";

const PersonalCare = () => {
  const services = [
    "Bathing and Grooming Assistance",
    "Skin and Hair Care",
    "Toileting and Incontinence Care",
    "Dressing and Undressing",
    "Mobility and Feeding Help",
    "Meal Prep and Feeding Help",
    "Transfer and Walking Assistance",
    "Personal Appearance Care Like Skin Care, Nail Care",
    "Personal Hygiene Assistance",
    "Assistance With Morning And Evening Daily Routines",
  ];

  const beneficiaries = [
    "Seniors Who Want To Age In Place",
    "Individuals Recovering From Surgery Or Illness",
    "People With Disabilities Needing Daily Support",
    "Loved Ones Requiring Help With Routine Activities",
  ];

  return (
    <div className="">
      <section className="max-w-7xl mx-auto mt-10 flex lg:flex-row flex-col lg:py-10 px-6 md:px-16">
        <div>
          <h2 className="lg:text-5xl text-3xl text-[var(--navy)] font-Urbanist font-bold mb-4 leading-tight">
            What Is Personal Care?
          </h2>
        </div>
        <div>
          <p className="text-[var(--coolgray)] max-w-3xl leading-[130%] font-normal text-lg">
            If you are searching for a trusted caregiving platform where you can
            offer compassionate care to seniors, you’re in the right place. We
            are community-dedicated to making personal care easily available and
            affordable — whether you are a caregiver in need of work or a family
            in search of the perfect platform to connect, support and ease your
            caregiving journey.
            <br />
            <br />
            You have the flexibility to select the type of personal care
            services that fits your care recipient’s condition or diagnosis.
            From short-term needs to long-term companionship, our network of
            dependable home care professionals is here to offer support whenever
            you need it. From bathing assistance to medication reminders, our
            caregivers are trained to provide high-quality care and to find a
            solution that fits your budgetary needs and your lifestyle.
          </p>
        </div>
      </section>

      {/*  service we provide */}

      {/* <div className="bg-[#F7F7F3] mt-10 relative">
        <img
          src="/dot.png"
          alt="dot"
          className="absolute top-6 left-10 w-10 h-10 z-0"
        />
        <section className=" max-w-7xl mx-auto py-16 px-6 md:px-16 relative z-10">
          <div className="mb-16 ">
            <h2 className="text-5xl text-[var(--navy)] font-bold mb-6 leading-0.5 ">
              Services We Provide
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6 ">
            <ul className="pl-6 flex-1 text-[var(--navy)] text-lg leading-[100%] font-bold">
              {services.map((service, idx) => (
                <li key={idx} className="flex items-center gap-2 py-3">
                  <img
                    src="/ci_check.png"
                    alt="check mark"
                    className="w-6 bg-[#233D4D] rounded-full "
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <img
              src="/service.png"
              alt="Caregiver assistance"
              className="rounded-lg w-full md:w-1/2 object-cover h-75 md:h-96"
            />
          </div>
        </section>
      </div> */}

      <div className="bg-[#F7F7F3] mt-10 relative">
        {/* Decorative Dot Image Positioned Absolutely */}
        <img
          src="/dot.png"
          alt="dot"
          className="absolute top-0 right-0 w-64 h-64 z-0 pointer-events-none"
        />

        <section className="max-w-7xl mx-auto lg:py-16 py-12 px-6 md:px-16 relative z-10">
          <div className="lg:mb-16 mb-8">
            <h2 className="text-5xl  text-[var(--navy)] font-bold mb-6 lg:leading-[0.5]">
              Services We Provide
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <ul className="pl-6 flex-1 text-[var(--navy)] text-lg leading-[100%] font-bold">
              {services.map((service, idx) => (
                <li key={idx} className="flex items-center gap-2 py-3">
                  <img
                    src="/ci_check.png"
                    alt="check mark"
                    className="w-6 bg-[#233D4D] rounded-full"
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <img
              src="/service.png"
              alt="Caregiver assistance"
              className="rounded-lg w-full md:w-1/2 object-cover h-75 md:h-96"
            />
          </div>
        </section>
      </div>
      {/* Who can Benefit */}

      <div className="relative w-full h-[450px] ">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/personal-care.png"
            alt="Personal Care Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#1c303d80] to-[#233D4D] z-10 pointer-events-none" />

        <div className="absolute inset-0 z-20 flex flex-col items-end justify-center pr-6 sm:pr-36 text-white  font-urbanist">
          <div className="max-w-[90%] sm:max-w-[60%] space-y-4">
            <h2 className="lg:text-5xl text-3xl font-bold leading-[100%]">
              Who Can Benefit from <br></br> Personal Care?
            </h2>
            <ul className="text-lg text-[#FFFFFFB2] font-bold leading-[100%] pl-5 lg:mt-12 mt-4">
              {beneficiaries &&
                beneficiaries.map((beneficiary, idx) => (
                  <li key={idx} className="mb-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/dark-tick.png"
                        alt="check mark"
                        width={6}
                        height={6}
                        className="w-6 h-6 bg-[#FFFFFFB2] rounded-full"
                      />
                      <span className="text-lg">{beneficiary}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="lg:mt-20 mt-12 px-6 md:px-16 text-[var(--navy)] max-w-7xl mx-auto flex lg:flex-row flex-col justify-between gap-16 lg:mb-20 mb-12">
        <div className="lg:w-1/2">
          <h2 className="lg:text-5xl text-4xl leading-[100%] font-bold mb-4">
            Ready To Get The Support You Need?
          </h2>
          <p className="mb-6 text-[var(--coolgray)] text-lg leading-[130%] font-normal">
            Connect with us to discuss your needs and find the best personal
            caregiver for you.
          </p>
          <div className="space-y-6  ">
            <ContactItem
              icon={"/Contact/phone.png"}
              label={"Phone Number"}
              value={"976543210"}
            />
            <ContactItem
              icon={"/Contact/email.png"}
              label={"Email ID"}
              value={"care@wellnurtured.com"}
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          {/* Image on top of background */}
          <Image
            src="/personal-care-img3.png"
            alt="Personal Care"
            width={550}
            height={460}
            className="object-cover "
          />
        </div>
      </section>
    </div>
  );
};

export default PersonalCare;
