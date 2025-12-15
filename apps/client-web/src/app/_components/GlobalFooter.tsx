import Image from "next/image";
export default function GlobalFooter() {
  return (
    <div className="bg-brand-secondary p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="container mx-auto flex flex-col items-center text-center">
        <Image
          src={"/secondary logo/secondary logo-23.png"}
          alt={"Unicus Secondary Logo"}
          height={220}
          width={220}
          className="h-auto w-32 sm:w-40 md:w-48 lg:w-[220px]"
        />
        <p className="text-brand-primary pt-3 sm:pt-4 text-sm sm:text-base md:text-lg">
          Produly Serving <span className="font-bold">Alberta</span> since{" "}
          <span className="font-bold">2020</span>
        </p>
      </div>
    </div>
  );
}
