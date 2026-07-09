import { NextResponse } from "next/server";
import { getGalleryWorkerApiUrl } from "@/lib/gallery-api";

export async function POST(request: Request) {
  const workerApiUrl = getGalleryWorkerApiUrl();

  if (!workerApiUrl) {
    return NextResponse.json(
      { error: "Gallery Worker API URL is not configured." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const response = await fetch(`${workerApiUrl}/upload`, {
    method: "POST",
    body: formData
  });
  const data = await response.json().catch(() => ({ error: "Upload failed." }));

  return NextResponse.json(data, { status: response.status });
}
