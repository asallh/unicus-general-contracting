import Image from "next/image";
import { HydrateClient } from "~/trpc/server";

export default function About() {
  return (
    <HydrateClient>
      <div className="container mx-auto flex flex-col gap-16 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:py-16">
        <section>
          <h1 className="mb-4 text-2xl leading-normal font-bold tracking-wide sm:mb-6 sm:text-3xl md:text-4xl">
            We’re a Calgary-based contracting team passionate about helping
            businesses bring their dream spaces to life. From first idea to
            final build, we’re here to make the process smooth, collaborative,
            and built to last.
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              Our brand emphasizes a unique & quality experiences as we
              transform your space through reliable construction.
            </p>
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              We pride ourselves on prioritizing our client&apos;s needs so you
              receive the best experience with an even better end results.
            </p>
          </div>
        </section>
        <section>
          <h1 className="text-brand-primary text-4xl font-bold">
            Meet the Face Behind Unicus General Contracting!
          </h1>
          <div className="flex">
            <div className="m-auto mx-16 flex flex-col gap-4">
              <p>
                At the heart of our growing team is our founder, Baldev Sallh.
              </p>
              <p>
                Unicus Contracting was built on the belief that great spaces
                should be both functional and inspiring. With Baldev’s
                background in diverse trades, our founder set out to bring a
                hands-on, reliable, and people-first approach to commercial
                contracting.{" "}
              </p>
              <p>
                His passion for helping businesses and communities thrive is
                what brought the Unicus team together, and it&apos;s what drives
                us to bring something truly unique to every project. Baldev take
                pride in doing things right, and is here to support Unicus’s
                clients every step of the way.
              </p>
            </div>
            <Image
              src="https://unicus-general-contracting-storage-dev.s3.ca-west-1.amazonaws.com/pops.webp"
              alt="pops"
              width={600}
              height={600}
              className="mt-6 h-auto w-72 rounded-lg sm:w-96 md:w-[448px] lg:w-[512px]"
            />
          </div>
        </section>
      </div>
      <section className="bg-backgroundDark w-full flex flex-col gap-10">
        <h1 className="text-white text-center text-4xl pt-16">
          Let&apos;s chat about how we can make your space unique!
        </h1>
        <div className="flex justify-center pb-16">
          <button className="text-brand-secondary border-brand-secondary hover:bg-brand-secondary hover:text-backgroundDark rounded-lg border-2 px-6 py-3 text-center font-semibold transition-colors sm:px-8 sm:py-4">
            Lets Chat!
          </button>
        </div>
      </section>
    </HydrateClient>
  );
}
