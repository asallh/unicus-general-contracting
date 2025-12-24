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
      "Expert installation of fixtures, finishes, and system completed efficiently and to the highest standards.",
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
      "Safe, code-compliant electrical work including wiring, lighting, and power systems, which are planned and executed with precision.",
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
      "Thoughtful and practical design services that align with your business goals, space, and brand, from layout to final details.",
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
      "Heating, cooling, and ventilation systems tailored to your space ensuring efficiency, reliability, and built for long-term comfort.",
    icon: <MdOutlineHvac />,
  },
  {
    title: "Project Management",
    description:
      "Full-scope oversight to keep your project moving, organized, on time, and executed with precision.",
    icon: <FaCheckCircle />,
  },
];

interface ServiceCardsProps {
  services: Service[];
}

const ServiceCards = ({ services }: ServiceCardsProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <div
          key={index}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="text-brand-primary mb-4 text-3xl">{service.icon}</div>
          <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
          <p className="text-base leading-relaxed text-gray-700">
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
      <section className="bg-backgroundDark text-backgroundLight py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
            Our Services
          </h1>
          <p className="text-base leading-relaxed sm:text-lg">
            We offer a wide range of commercial contracting services. Our top
            priority is to create a high quality and reliable build that catersf
            to your business needs.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:py-16">
        <h2 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl md:text-3xl">
          Our services include full commercial services, such as:
        </h2>
        <ServiceCards services={services} />
      </section>
      <ContactBanner
        bannerText="Let’s turn your vision into a space that works as hard as you do."
        buttons={["projects", "contact us"]}
      />
    </HydrateClient>
  );
}
