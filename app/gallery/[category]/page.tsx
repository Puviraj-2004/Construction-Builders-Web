import { ArrowRight, ImageOff } from "lucide-react";
import { notFound } from "next/navigation";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { brandData } from "@/data/data";
import { serviceItems } from "@/data/services";

type GalleryImage = {
  key: string;
  url: string;
  uploadedAt: string | null;
  size: number;
};

type GalleryResponse = {
  category: string;
  images: GalleryImage[];
};

type GalleryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: GalleryPageProps) {
  const { category } = await params;
  const service = serviceItems.find((item) => item.slug === category);

  if (!service) {
    return {
      title: `Gallery | ${brandData.name}`
    };
  }

  return {
    title: `${service.title} Gallery | ${brandData.name}`,
    description: service.description
  };
}

async function getGalleryImages(category: string) {
  const workerApiUrl = process.env.NEXT_PUBLIC_WORKER_API_URL;

  if (!workerApiUrl) {
    return [];
  }

  try {
    const response = await fetch(`${workerApiUrl.replace(/\/$/, "")}/gallery/${category}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as GalleryResponse;
    return data.images || [];
  } catch {
    return [];
  }
}

export default async function GalleryCategoryPage({ params }: GalleryPageProps) {
  const { category } = await params;
  const service = serviceItems.find((item) => item.slug === category);

  if (!service) {
    notFound();
  }

  const images = await getGalleryImages(category);

  return (
    <main className="min-h-screen bg-background text-main">
      <section id="top" className="relative border-b border-accent/20 bg-card text-white">
        <Navbar />
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-36 sm:px-8 lg:pb-20 lg:pt-40">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">
            Gallery
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl leading-8 text-sub">{service.description}</p>
          <a
            href="/services"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 border border-accent px-5 font-semibold text-accent transition hover:bg-accent hover:text-primary"
          >
            Back to Services
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {images.length > 0 ? (
            <MasonryGallery images={images} serviceTitle={service.title} />
          ) : (
            <div className="grid min-h-[360px] place-items-center border border-dashed border-accent/25 bg-card p-8 text-center">
              <div className="max-w-md">
                <ImageOff aria-hidden className="mx-auto h-12 w-12 text-accent" />
                <h2 className="mt-5 text-2xl font-bold">No images uploaded yet</h2>
                <p className="mt-3 leading-7 text-sub">
                  Once images are uploaded for {service.title}, they will appear here
                  automatically from the gallery storage.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
