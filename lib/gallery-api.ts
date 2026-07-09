export function getGalleryWorkerApiUrl() {
  return (
    process.env.GALLERY_WORKER_API_URL ||
    process.env.NEXT_PUBLIC_WORKER_API_URL ||
    ""
  ).replace(/\/$/, "");
}
