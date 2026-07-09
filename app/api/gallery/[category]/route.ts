import { NextResponse } from "next/server";
import { getGalleryWorkerApiUrl } from "@/lib/gallery-api";

type GalleryRouteProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function GET(_request: Request, { params }: GalleryRouteProps) {
  const { category } = await params;
  const workerApiUrl = getGalleryWorkerApiUrl();

  if (!workerApiUrl) {
    return NextResponse.json(
      { category, images: [], message: "Gallery Worker API URL is not configured." },
      { status: 500 }
    );
  }

  const response = await fetch(`${workerApiUrl}/gallery/${category}`, {
    cache: "no-store"
  });
  const data = await response.json().catch(() => ({ category, images: [] }));

  return NextResponse.json(data, { status: response.status });
}
