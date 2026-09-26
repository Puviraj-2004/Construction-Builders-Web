import { getCloudflareContext } from "@opennextjs/cloudflare";

type RuntimeEnvName =
  | "GALLERY_WORKER_API_URL"
  | "NEXT_PUBLIC_WORKER_API_URL"
  | "UPLOAD_PASSCODE";

declare global {
  interface CloudflareEnv {
    GALLERY_WORKER_API_URL?: string;
    NEXT_PUBLIC_WORKER_API_URL?: string;
    UPLOAD_PASSCODE?: string;
  }
}

export async function getRuntimeEnv(name: RuntimeEnvName) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = env[name];

    if (typeof value === "string" && value) {
      return value;
    }
  } catch {
    // Local Next.js development uses process.env instead of Worker bindings.
  }

  return process.env[name] || "";
}
