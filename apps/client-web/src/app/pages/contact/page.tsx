import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const contactDetails = [
  {
    icon: FaPhone,
    title: "Phone",
    value: "(403) 607-2471",
    href: "tel:4036072471",
    description: "Call or text us anytime",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "unicuscontracting@gmail.com",
    href: "mailto:unicuscontracting@gmail.com",
    description: "We respond within 24 hours",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Location",
    value: "Calgary, Alberta",
    href: null,
    description: "Serving the Greater Calgary Area",
  },
  {
    icon: FaClock,
    title: "Hours",
    value: "Mon–Fri: 8am–6pm",
    href: null,
    description: "Weekends by appointment",
  },
];

function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-tertiary py-14 text-white sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-brand-secondary mb-3 text-xs font-semibold uppercase tracking-widest sm:text-sm">
            Reach Out
          </p>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Contact Us Today
          </h1>
          <p className="max-w-xl text-base text-white/75 sm:text-lg">
            Ready to start your next project? We&apos;d love to hear about your
            vision. Get in touch and let&apos;s make something great together.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold sm:mb-10 sm:text-2xl md:text-3xl">
            Get In Touch
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {contactDetails.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-brand-primary/10 text-brand-primary rounded-lg p-2.5">
                    <item.icon className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-brand-primary mb-1 block text-base font-semibold transition-colors hover:underline sm:text-lg"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-brand-primary mb-1 text-base font-semibold sm:text-lg">
                    {item.value}
                  </p>
                )}
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div className="bg-brand-secondary mt-10 rounded-2xl p-8 text-center sm:mt-12 sm:p-10">
            <h3 className="text-brand-tertiary mb-3 text-xl font-bold sm:text-2xl">
              Now Supporting Projects Within the Greater Calgary Area
            </h3>
            <p className="text-brand-tertiary mb-6 text-base sm:text-lg">
              Whether it&apos;s a small renovation or a full commercial build,
              we&apos;re here to help.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="tel:4036072471"
                className="bg-brand-tertiary w-full rounded-xl px-8 py-3 font-semibold text-white transition-colors hover:opacity-90 sm:w-auto"
              >
                Call (403) 607-2471
              </a>
              <a
                href="mailto:unicuscontracting@gmail.com"
                className="border-brand-tertiary text-brand-tertiary hover:bg-brand-tertiary w-full rounded-xl border-2 px-8 py-3 font-semibold transition-colors hover:text-white sm:w-auto"
              >
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
