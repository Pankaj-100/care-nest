import Image from "next/image";
import Link from "next/link";

interface CustomCardProp {
  imgSrc: string;
  profileImg: string;
  name: string;
  desc: string;
  para: string;
  href: string;
  date: string;
  key: number;
}

export const CustomCard = ({
  imgSrc,
  profileImg,
  name,
  desc,
  para,
  href,
  date,
  key,
}: CustomCardProp) => {
  return (
    <div className="p-4 w-full max-w-md  rounded-2xl " key={key}>
      {/* Image Section */}
      <div className="w-full  h-56 relative rounded-2xl overflow-hidden mb-4">
        <Image
          src={imgSrc}
          alt="Personal Care Service"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-x-2">
          <div className="relative w-6 h-6 rounded-full border border-[var(--navy)] overflow-hidden">
            <Image
              src={profileImg}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-[var(--navy)] text-sm font-medium">{name}</p>
        </div>
        <p className="text-[var(--navy)] text-sm">{date}</p>
      </div>

      <h3 className="font-semibold text-base text-[var(--navy)] mb-1">
        {desc}
      </h3>

      <p className="text-sm text-[var(--navy)] mb-4">{para}</p>

      {href ? (
        <Link href={href}>
          <div className="text-[var(--navy)] font-semibold text-sm cursor-pointer hover:underline flex items-center gap-1">
            Learn More
            
              <Image
                src="/Blog/dark-right-arrow.png"
                alt="arrow"
                width={16}
                height={12}
                className=" mt-1"
              />
           
          </div>
        </Link>
      ) : (
        <div className="text-[var(--navy)] font-semibold text-sm opacity-60 flex items-center gap-1 cursor-not-allowed">
          Learn More
          
            <Image
              src="/Blog/dark-right-arrow.png"
              alt="arrow"
              width={16}
              height={12}
              className=" mt-1"
            />
         
        </div>
      )}
    </div>
  );
};
