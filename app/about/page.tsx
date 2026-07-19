import { ArrowRight, Check, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { aboutHighlights, aboutProcess, aboutValues } from "@/data/about";
import { brandData, socialLinks } from "@/data/data";

export const metadata = {
  title: `About | ${brandData.name}`,
  description:
    "Learn about SR Builders, a premium construction company focused on refined workmanship, clear project control, and dependable delivery."
};

export default function AboutPage() {
  const whatsAppLink = socialLinks.find((link) => link.label === "WhatsApp")?.href ?? "/#contact";

  return (
    <main className="min-h-screen bg-background text-main">
      <section id="top" className="relative overflow-hidden bg-card text-white">
        <Navbar />
        <div className="absolute inset-0 opacity-35">
          <Image
            src="/images/HomeBanner.png"
            alt="Premium construction background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/45" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">
              About {brandData.name}
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              Built on careful planning, refined workmanship, and client trust.
            </h1>
            <p className="mt-7 max-w-2xl leading-8 text-sub">
              {brandData.name} delivers construction and finishing work for clients who
              expect clarity, discipline, and lasting quality. We combine practical site
              experience with a premium eye for detail, so every project feels controlled
              from the first conversation to the final handover.
            </p>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex h-12 items-center justify-center gap-2 bg-accent px-5 font-semibold text-primary transition hover:bg-white"
            >
              Contact on WhatsApp
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-light px-5 py-16 text-primary sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">Who we are</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              A construction partner for clients who value order as much as outcome.
            </h2>
            <p className="mt-6 leading-8 text-primary/75">
              We approach each project with a simple belief: excellent construction should
              feel organised, transparent, and respectful of the client’s time. Our role is
              to connect design intent, technical requirements, material choices, and site
              execution into one steady process.
            </p>
            <p className="mt-4 leading-8 text-primary/75">
              Whether the brief is a private residence, a commercial environment, a
              renovation, or specialist trade work, we focus on getting the essentials
              right: careful preparation, skilled workmanship, clear communication, and
              accountable delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">Our standards</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              The details that shape every project.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {aboutValues.map((value, index) => {
              const icons = [ShieldCheck, Trophy, Sparkles];
              const Icon = icons[index];

              return (
                <article key={value.title} className="border border-accent/20 bg-card p-6 shadow-soft">
                  <Icon aria-hidden className="h-8 w-8 text-accent" />
                  <h3 className="mt-8 text-2xl font-bold">{value.title}</h3>
                  <p className="mt-4 leading-7 text-sub">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-light px-5 py-16 text-primary sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden">
            <Image
              src="/images/services/residential-construction.jpg"
              alt="Residential construction project"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">How we work</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              A clear process from first brief to final handover.
            </h2>
            <div className="mt-8 grid gap-5">
              {aboutProcess.map((step, index) => (
                <div key={step} className="flex gap-4 border-b border-primary/10 pb-5">
                  <span className="grid h-10 w-10 flex-none place-items-center bg-primary text-sm font-bold text-accent">
                    {index + 1}
                  </span>
                  <p className="leading-7 text-primary/75">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">
              Why choose us
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Practical construction knowledge with a premium finish mindset.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutHighlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 border border-accent/20 bg-card p-5">
                <Check aria-hidden className="mt-1 h-5 w-5 flex-none text-accent" />
                <p className="leading-7 text-sub">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card px-5 py-16 text-main sm:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">Start with a conversation</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Tell us what you want to build, improve, or finish.
            </h2>
          </div>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-fit items-center justify-center gap-2 bg-accent px-5 font-semibold text-primary transition hover:bg-white"
          >
            Message on WhatsApp
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
