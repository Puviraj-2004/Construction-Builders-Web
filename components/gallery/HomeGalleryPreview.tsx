"use client";

import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import { serviceItems } from "@/data/services";

type GalleryImage = {
  key: string;
  url: string;
  uploadedAt: string | null;
  size: number;
};

type GalleryResponse = {
  images: GalleryImage[];
};

type GalleryPreviewItem = {
  category: string;
  title: string;
  image: GalleryImage | null;
};

export function HomeGalleryPreview() {
  const [items, setItems] = useState<GalleryPreviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const responses = await Promise.all(
          serviceItems.map(async (service) => {
            const response = await fetch(`/api/gallery/${service.slug}`);

            if (!response.ok) {
              return {
                category: service.slug,
                title: service.title,
                image: null
              };
            }

            const data = (await response.json()) as GalleryResponse;
            return {
              category: service.slug,
              title: service.title,
              image: (data.images || [])[0] || null
            };
          })
        );

        setItems(responses);
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, []);

  if (isLoading) {
    return (
      <div className="grid min-h-72 place-items-center border border-accent/20 bg-card p-8 text-sub">
        Loading gallery images...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="grid min-h-72 place-items-center border border-dashed border-accent/25 bg-card p-8 text-center">
        <div className="max-w-md">
          <ImageOff aria-hidden className="mx-auto h-11 w-11 text-accent" />
          <h3 className="mt-5 text-2xl font-bold text-white">Gallery images coming soon</h3>
          <p className="mt-3 leading-7 text-sub">
            Uploaded project images from R2 will appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <a
          key={item.category}
          href={`/gallery/${item.category}`}
          className="group block overflow-hidden border border-accent/15 bg-background"
        >
          <div className="grid min-h-72 place-items-center bg-card">
            {item.image ? (
              <img
                src={item.image.url}
                alt={`${item.title} gallery preview`}
                className="h-auto max-h-[360px] w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            ) : (
              <div className="p-6 text-center text-sub">
                <ImageOff aria-hidden className="mx-auto h-9 w-9 text-accent" />
                <p className="mt-4 text-sm">No image uploaded yet</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {item.title}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
