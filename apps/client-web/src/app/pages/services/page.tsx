import { HydrateClient } from "~/trpc/server";
import { FaCheckCircle, FaTools } from "react-icons/fa";
import {
  MdCarpenter,
  MdDesignServices,
  MdElectricalServices,
  MdOutlineHvac,
  MdOutlinePlumbing,
} from "react-icons/md";
import { LuConstruction } from "react-icons/lu";
import type { ReactNode } from "react";
import ContactBanner from "~/app/_components/ContactBanner";

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: "Installations",
    description:
      "Expert installation of fixtures, finishes, and systems completed efficiently and to the highest standards.",
    icon: <FaTools />,
  },
  {
    title: "Plumbing",
    description:
      "Reliable plumbing solutions, from rough-ins to final fixtures, ensuring everything runs smoothly and meets all safety requirements.",
    icon: <MdOutlinePlumbing />,
  },
  {
    title: "Electrical",
    description:
      "Safe, code-compliant electrical work including wiring, lighting, and power systems planned and executed with precision.",
    icon: <MdElectricalServices />,
  },
  {
    title: "Carpentry",
    description:
      "Skilled carpentry services including framing, partitions, doors, and custom woodwork built for strength and style.",
    icon: <MdCarpenter />,
  },
  {
    title: "Designing",
    description:
      "Thoughtful and practical design services that align with your business goals, space, and brand — from layout to final details.",
    icon: <MdDesignServices />,
  },
  {
    title: "Construction",
    description:
      "Full-scope construction services that bring your space to life, coordinated, on time, and built to last.",
    icon: <LuConstruction />,
  },
  {
    title: "HVAC",
    description:
      "Heating, cooling, and ventilation systems tailored to your space, ensuring efficiency, reliability, and long-term comfort.",
    icon: <MdOutlineHvac />,
  },
  {
    title: "Project Management",
    description:
      "Full-scope oversight to keep your project moving, organized, on time, and executed with precision from start to finish.",
    icon: <FaCheckCircle />,
  },
];

const ServiceCards = ({ services }: { services: Service[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="border-brand-primary/0 hover:border-brand-primary/25 group rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-brand-primary mb-4 text-3xl transition-transform duration-300 group-hover:scale-110">
            {service.icon}
          </div>
          <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function ServicesPage() {
  return (
    <HydrateClient>
      {/* Hero */}
      <section className="bg-backgroundDark text-backgroundLight py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-brand-secondary mb-3 text-xs font-semibold uppercase tracking-widest sm:text-sm">
            What We Do
          </p>
          <h1 className="mb-4 max-w-2xl text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            Our Services
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            We offer a wide range of commercial contracting services. Our top
            priority is to create a high-quality and reliable build tailored to
            your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-brand-accent py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="mb-8 text-xl font-bold sm:mb-10 sm:text-2xl md:text-3xl">
            Full Commercial Services, Including:
          </h2>
          <ServiceCards services={services} />
        </div>
      </section>

      <ContactBanner
        bannerText="Let's turn your vision into a space that works as hard as you do."
        buttons={["projects", "contact us"]}
      />
    </HydrateClient>
  );
}
