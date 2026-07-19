"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Facebook,
  Hammer,
  HardHat,
  Instagram,
  Paintbrush,
  Plug,
  Wrench
} from "lucide-react";
import { HomeGalleryPreview } from "@/components/gallery/HomeGalleryPreview";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { brandData, contactSocialLinks } from "@/data/data";
import { serviceItems } from "@/data/services";
import { fadeUp, stagger } from "@/lib/motion";

const serviceIcons = {
  "residential-construction": Building2,
  "commercial-construction": HardHat,
  "renovation-remodeling": Hammer,
  painting: Paintbrush,
  electrical: Plug,
  plumbing: Wrench
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.05 4.91A9.8 9.8 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91a9.86 9.86 0 0 0-2.91-7.01Zm-7.01 15.24h-.01a8.22 8.22 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.39c0-4.54 3.69-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.41 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

const contactIcons = {
  WhatsApp: WhatsAppIcon,
  Facebook,
  Instagram
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-main">
      <section className="hero-image relative min-h-[92vh] text-white">
        <Navbar />

        <motion.div
          id="top"
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.08fr_0.72fr] lg:pb-24 lg:pt-44"
        >
          <div className="max-w-4xl">
            <motion.p variants={fadeUp} className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Premium construction company
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-6xl font-semibold leading-[0.92] sm:text-7xl lg:text-8xl"
            >
              {brandData.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-white/82">
              Refined residential, commercial, renovation, and specialist trade work
              delivered with clear planning, skilled workmanship, and calm project control.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              <a
                href="/about"
                className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 font-semibold text-primary transition hover:bg-accent"
              >
                Learn About Us
                <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
              <a
                href="/services"
                className="inline-flex h-12 items-center justify-center border border-white/35 px-5 font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/10"
              >
                Explore Services
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="self-end border border-white/18 bg-card/75 p-6 shadow-soft backdrop-blur-md"
          >
            <p className="text-sm leading-6 text-white/75">
              Built for clients who expect premium presentation, practical communication,
              and dependable delivery.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="bg-light px-5 py-20 text-primary sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">About us</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight sm:text-6xl">
              A construction partner focused on trust, detail, and delivery.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl leading-8 text-primary/75">
              {brandData.name} brings together practical site experience, skilled trade
              coordination, and a premium finish mindset. We keep projects organised from
              the first brief to the final handover, so clients can move forward with clarity.
            </p>
            <a
              href="/about"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-primary px-5 font-semibold text-white transition hover:bg-accent hover:text-primary"
            >
              Read About Us
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">Services</p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight sm:text-6xl">
                Everything needed to build, improve, and finish with confidence.
              </h2>
            </div>
            <a
              href="/services"
              className="inline-flex h-12 w-fit items-center justify-center gap-2 border border-accent px-5 font-semibold text-accent transition hover:bg-accent hover:text-primary"
            >
              View All Services
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.slice(0, 3).map((service) => {
              const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];

              return (
                <article
                  key={service.slug}
                  className="border border-accent/20 bg-card p-6 shadow-soft"
                >
                  <Icon aria-hidden className="h-8 w-8 text-accent" />
                  <h3 className="mt-8 text-2xl font-bold">{service.title}</h3>
                  <p className="mt-3 leading-7 text-sub">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-card px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">Gallery</p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight sm:text-6xl">
                Recent work from our project galleries.
              </h2>
            </div>
          </div>

          <div className="mt-12">
            <HomeGalleryPreview />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-light px-5 py-20 text-primary sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">Contact</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight sm:text-6xl">
              Ready to discuss your project?
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-primary/75">
              Message us directly on WhatsApp or connect through our social channels. No
              long forms, just a simple first conversation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {contactSocialLinks.map((link) => {
              const Icon = contactIcons[link.label as keyof typeof contactIcons];

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-40 flex-col justify-between border border-primary/10 bg-white p-6 text-primary shadow-sm transition hover:border-accent"
                >
                  <Icon aria-hidden className="h-9 w-9 text-accent" />
                  <span className="mt-8 text-xl font-bold">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
