"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { socialLinks } from "@/data/data";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.05 4.91A9.8 9.8 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91a9.86 9.86 0 0 0-2.91-7.01Zm-7.01 15.24h-.01a8.22 8.22 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.39c0-4.54 3.69-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.41 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function FloatingSocials() {
  const pathname = usePathname();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const whatsAppLink = socialLinks.find((link) => link.label === "WhatsApp");

  useEffect(() => {
    const footer = document.getElementById("site-footer");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  if (!whatsAppLink || pathname.startsWith("/upload")) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-5 right-5 z-[60] transition duration-300 sm:bottom-6 sm:right-6 ${
        isFooterVisible ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <a
        href={whatsAppLink.href}
        aria-label="Contact Us on WhatsApp"
        target="_blank"
        rel="noreferrer"
        className="grid h-14 w-14 place-items-center rounded-full border border-accent/70 bg-background/90 text-accent shadow-soft backdrop-blur-md transition hover:bg-accent hover:text-primary sm:h-16 sm:w-16"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
