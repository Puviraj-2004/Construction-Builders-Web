"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { brandData } from "@/data/data";
import { navigationItems } from "@/data/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="grid h-12 w-12 place-items-center overflow-hidden">
            <Image
              src={brandData.logo.src}
              alt={brandData.logo.alt}
              width={48}
              height={48}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="font-display text-2xl font-semibold text-white">{brandData.name}</span>
        </motion.a>

        <div className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
          {navigationItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setIsGalleryOpen(true)}
                onMouseLeave={() => setIsGalleryOpen(false)}
              >
                <a
                  className="inline-flex items-center gap-1.5 py-3 transition hover:text-white"
                  href={item.href}
                  aria-haspopup="menu"
                  aria-expanded={isGalleryOpen}
                >
                  {item.label}
                  <ChevronDown aria-hidden className="h-4 w-4" />
                </a>
                <AnimatePresence>
                  {isGalleryOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full w-72 -translate-x-1/2 border border-accent/35 bg-card/95 p-2 shadow-soft backdrop-blur-xl"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-sub transition hover:bg-accent hover:text-primary"
                          role="menuitem"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <a key={item.label} className="transition hover:text-white" href={item.href}>
                {item.label}
              </a>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <a
            href="/#contact"
            className="inline-flex h-11 items-center justify-center border border-accent bg-accent px-4 text-sm font-semibold text-primary transition hover:bg-white"
          >
            Start Project
          </a>
        </div>

        <button
          className="grid h-11 w-11 place-items-center border border-accent/70 text-white transition hover:bg-accent hover:text-primary lg:hidden"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsMenuOpen((open) => !open);
            setIsMobileGalleryOpen(false);
          }}
        >
          {isMenuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-5 border border-accent/30 bg-card/98 p-3 shadow-soft backdrop-blur-xl sm:mx-8 lg:hidden"
          >
            <div className="flex flex-col">
              {navigationItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-white/10 py-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-3 text-left font-semibold text-white"
                      aria-expanded={isMobileGalleryOpen}
                      aria-controls="mobile-gallery-menu"
                      onClick={() => setIsMobileGalleryOpen((open) => !open)}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={`h-4 w-4 text-accent transition ${isMobileGalleryOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isMobileGalleryOpen ? (
                        <motion.div
                          id="mobile-gallery-menu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-1 pb-2 pl-5">
                            <a
                              href={item.href}
                              className="px-3 py-2 text-sm font-semibold text-accent transition hover:text-white"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              View Gallery
                            </a>
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className="px-3 py-2 text-sm text-sub transition hover:text-accent"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {child.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="border-b border-white/10 px-3 py-4 font-semibold text-white transition last:border-b-0 hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <a
                href="/#contact"
                className="mt-3 inline-flex h-12 items-center justify-center bg-accent px-4 font-semibold text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Project
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
