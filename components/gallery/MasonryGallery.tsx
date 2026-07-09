"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type GalleryImage = {
  key: string;
  url: string;
  uploadedAt: string | null;
  size: number;
};

type MasonryGalleryProps = {
  images: GalleryImage[];
  serviceTitle: string;
};

export function MasonryGallery({ images, serviceTitle }: MasonryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;

      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((activeIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  function showPrevious() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }

  function showNext() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={image.key}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden border border-accent/15 bg-card text-left shadow-soft"
            aria-label={`Open ${serviceTitle} image ${index + 1}`}
          >
            <img
              src={image.url}
              alt={`${serviceTitle} project image ${index + 1}`}
              className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${serviceTitle} image preview`}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-white/25 text-white transition hover:border-accent hover:text-accent"
            aria-label="Close preview"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>

          {images.length > 1 ? (
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/25 text-white transition hover:border-accent hover:text-accent"
              aria-label="Previous image"
            >
              <ChevronLeft aria-hidden className="h-6 w-6" />
            </button>
          ) : null}

          <img
            src={activeImage.url}
            alt={`${serviceTitle} project image ${(activeIndex ?? 0) + 1}`}
            className="max-h-[88vh] max-w-[92vw] object-contain"
          />

          {images.length > 1 ? (
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/25 text-white transition hover:border-accent hover:text-accent"
              aria-label="Next image"
            >
              <ChevronRight aria-hidden className="h-6 w-6" />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
