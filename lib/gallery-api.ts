import { getRuntimeEnv } from "@/lib/runtime-env";

export async function getGalleryWorkerApiUrl() {
  const workerApiUrl =
    (await getRuntimeEnv("GALLERY_WORKER_API_URL")) ||
    (await getRuntimeEnv("NEXT_PUBLIC_WORKER_API_URL"));

  return workerApiUrl.replace(/\/$/, "");
}
