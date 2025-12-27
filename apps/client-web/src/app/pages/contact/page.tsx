function ContactPage() {
  return (
    <section className="m-32 flex justify-between">
      <div className="text-xl">
        <h1 className="text-brand-primary mb-4 text-5xl">Contact us Today!</h1>
        <div className="flex flex-col gap-4">
          <p>Now Supporting projects within the Greater Calgary Area</p>
          <p>
            Call us at:{" "}
            <span className="text-brand-primary font-bold">(403) 607-2471</span>
          </p>
          <p>
            Email us at:{" "}
            <span className="text-brand-primary font-bold">
              unicuscontracting@gmail.com
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
