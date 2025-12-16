import Image from "next/image";
export default function GlobalFooter() {
  return (
    <div className="bg-brand-secondary p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="container mx-auto flex flex-col">
        <Image
          src={"/secondary logo/secondary logo-23.png"}
          alt={"Unicus Secondary Logo"}
          height={220}
          width={220}
          className="h-auto w-32 sm:w-40 md:w-48 lg:w-[220px]"
        />
        <p className="text-brand-primary pt-3 text-sm sm:pt-4 sm:text-base md:text-lg">
          Produly Serving <span className="font-bold">Alberta</span> since{" "}
          <span className="font-bold">2020</span>
        </p>

        <div className="mt-8 font-bold underline">
          <p className="cursor-pointer">(403) 607-2471</p>
          <a
            href="mailto:unicuscontracting@gmail.com"
            className="cursor-pointer"
          >
            unicuscontracting@gmail.com{" "}
          </a>
        </div>
      </div>
      <div className="mt-4 border-t">
        We acknowledge that our work takes place on the traditional territories
        of Indigenous Peoples across Alberta, including Treaty 7 in Calgary and
        the Métis Nation of Alberta. © Unicus General Contracting 2025. All
        rights reserved.
      </div>
    </div>
  );
}
