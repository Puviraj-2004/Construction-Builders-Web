import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { brandData, contactData, legalLinks } from "@/data/data";
import { galleryItems, navigationItems } from "@/data/navigation";

const contactItems = [
  {
    icon: Phone,
    ...contactData.phone
  },
  {
    icon: Mail,
    ...contactData.email
  },
  {
    icon: MapPin,
    ...contactData.address
  }
];

const serviceLinks = galleryItems;

export function Footer() {
  const year = new Date().getFullYear();
  const primaryLinks = navigationItems.filter((item) => item.label !== "Gallery");

  return (
    <footer id="site-footer" className="border-t border-accent/20 bg-background px-5 text-main sm:px-8">
      <div className="mx-auto max-w-7xl py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_0.8fr_0.9fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center overflow-hidden">
                <Image
                  src={brandData.logo.src}
                  alt={brandData.logo.alt}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-display text-3xl font-semibold">{brandData.name}</span>
            </a>
            <p className="mt-5 max-w-sm leading-7 text-sub">{brandData.footerDescription}</p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-accent">Navigation</h2>
            <div className="mt-5 grid gap-3">
              {primaryLinks.map((item) => (
                <a key={item.label} href={item.href} className="text-sub transition hover:text-accent">
                  {item.label}
                </a>
              ))}
              <a href="/gallery" className="text-sub transition hover:text-accent">
                Gallery
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-accent">Services</h2>
            <div className="mt-5 grid gap-3">
              {serviceLinks.map((item) => (
                <a key={item.label} href={item.href} className="text-sub transition hover:text-accent">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-accent">Contact</h2>
            <div className="mt-5 grid gap-4">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-3 text-sub transition hover:text-accent"
                >
                  <item.icon aria-hidden className="mt-0.5 h-5 w-5 flex-none text-accent" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            <a
              href="/#contact"
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 border border-accent px-4 text-sm font-semibold text-accent transition hover:bg-accent hover:text-primary"
            >
              Request Consultation
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-sub sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {brandData.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#top" className="transition hover:text-accent">
              Back to top
            </a>
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-accent">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
