import Image from "next/image";
export default function GlobalFooter() {
  return (
    <div className="bg-brand-secondary p-16">
      <Image
        src={"/secondary logo/secondary logo-23.png"}
        alt={"Unicus Secondary Logo"}
        height={220}
        width={220}
      />
      <p className="text-brand-primary pt-2">
        Produly Serving <span className="font-bold">Alberta</span> since{" "}
        <span className="font-bold">2020</span>
      </p>
    </div>
  );
}
