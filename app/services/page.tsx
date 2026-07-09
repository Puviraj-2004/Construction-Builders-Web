import { ArrowRight, Check } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { brandData } from "@/data/data";
import { serviceItems } from "@/data/services";

export const metadata = {
  title: `Services | ${brandData.name}`,
  description:
    "Explore ASR Builders construction services including residential, commercial, renovation, painting, electrical, and plumbing."
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-main">
      <section id="top" className="relative border-b border-accent/20 bg-card text-white">
        <Navbar />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 lg:pb-20 lg:pt-40">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">
            Our services
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            Construction services built around quality, clarity, and control.
          </h1>
          <p className="mt-6 max-w-2xl leading-8 text-sub">
            From full-scale construction to specialist finishing work, {brandData.name}{" "}
            manages each service with practical planning, experienced supervision, and
            dependable workmanship.
          </p>
        </div>
      </section>

      <section id="services" className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8">
          {serviceItems.map((service, index) => (
            <article
              key={service.title}
              className="grid overflow-hidden border border-accent/20 bg-card shadow-soft lg:grid-cols-2"
            >
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""} min-h-[280px]`}>
                <img
                  src={service.image}
                  alt={`${service.title} service`}
                  className="h-full min-h-[280px] w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
                  Service {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                  {service.title}
                </h2>
                <p className="mt-5 leading-8 text-sub">{service.description}</p>

                <div className="mt-7 grid gap-3">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sub">
                      <span className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full border border-accent text-accent">
                        <Check aria-hidden className="h-3 w-3" />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={service.workHref}
                  className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-2 bg-accent px-5 font-semibold text-primary transition hover:bg-white"
                >
                  View Our Work
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
