"use client";

import { ArrowRight, ImageUp, Lock, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { brandData } from "@/data/data";
import { serviceItems } from "@/data/services";

type UploadStatus = {
  type: "idle" | "success" | "error" | "loading";
  message: string;
};

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

export default function UploadPage() {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [category, setCategory] = useState(serviceItems[0].slug);
  const [files, setFiles] = useState<File[]>([]);
  const [authStatus, setAuthStatus] = useState<UploadStatus>({ type: "idle", message: "" });
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ type: "idle", message: "" });

  useEffect(() => {
    setIsUnlocked(sessionStorage.getItem("sr-upload-unlocked") === "true");
  }, []);

  const previews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file)
      })),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthStatus({ type: "loading", message: "Checking passcode..." });

    const response = await fetch("/api/upload-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ passcode })
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({ message: "Incorrect passcode." }));
      setAuthStatus({ type: "error", message: result.message || "Incorrect passcode." });
      return;
    }

    sessionStorage.setItem("sr-upload-unlocked", "true");
    setIsUnlocked(true);
    setAuthStatus({ type: "success", message: "" });
  }

  function handleFileChange(selectedFiles: FileList | null) {
    const nextFiles = Array.from(selectedFiles || []);
    const validFiles = nextFiles.filter((file) => acceptedTypes.includes(file.type));

    setFiles(validFiles);

    if (nextFiles.length !== validFiles.length) {
      setUploadStatus({
        type: "error",
        message: "Only JPG, PNG, and WEBP images are allowed."
      });
    } else {
      setUploadStatus({ type: "idle", message: "" });
    }
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (files.length === 0) {
      setUploadStatus({ type: "error", message: "Please select at least one image." });
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    files.forEach((file) => formData.append("files", file));

    setUploadStatus({ type: "loading", message: "Uploading images..." });

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      setUploadStatus({
        type: "error",
        message: result?.error || "Upload failed. Please try again."
      });
      return;
    }

    setFiles([]);
    setUploadStatus({
      type: "success",
      message: `${result?.uploaded?.length || 0} image(s) uploaded successfully.`
    });
  }

  if (!isUnlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-5 text-main">
        <form onSubmit={handleUnlock} className="w-full max-w-md border border-accent/25 bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-accent text-accent">
              <Lock aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">Private Upload</p>
              <h1 className="font-display text-3xl font-semibold">{brandData.name}</h1>
            </div>
          </div>

          <p className="mt-6 leading-7 text-sub">
            Enter the upload passcode to manage gallery images.
          </p>

          <label className="mt-7 block text-sm font-semibold text-sub" htmlFor="passcode">
            Passcode
          </label>
          <input
            id="passcode"
            type="password"
            autoComplete="new-password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            className="mt-2 h-12 w-full border border-white/15 bg-background px-4 text-main outline-none transition focus:border-accent"
            required
          />

          {authStatus.message ? (
            <p className={`mt-4 text-sm ${authStatus.type === "error" ? "text-red-300" : "text-sub"}`}>
              {authStatus.message}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-accent px-5 font-semibold text-primary transition hover:bg-white"
          >
            Enter Upload Page
            <ArrowRight aria-hidden className="h-4 w-4" />
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-main sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-accent/20 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-accent">Gallery Upload</p>
            <h1 className="mt-3 font-display text-5xl font-semibold">Upload Project Images</h1>
            <p className="mt-4 max-w-2xl leading-7 text-sub">
              Select a service category, choose one or more images, and upload them to the matching R2 folder.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("sr-upload-unlocked");
              setIsUnlocked(false);
              setPasscode("");
            }}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 border border-accent/50 px-4 text-sm font-semibold text-accent transition hover:bg-accent hover:text-primary"
          >
            Lock Page
            <X aria-hidden className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleUpload} className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="border border-accent/20 bg-card p-5 shadow-soft sm:p-6">
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-accent" htmlFor="category">
              Service Folder
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-3 h-12 w-full border border-white/15 bg-background px-4 text-main outline-none focus:border-accent"
            >
              {serviceItems.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>

            <label
              htmlFor="files"
              className="mt-6 flex min-h-52 cursor-pointer flex-col items-center justify-center border border-dashed border-accent/45 bg-background/60 p-6 text-center transition hover:border-accent"
            >
              <UploadCloud aria-hidden className="h-10 w-10 text-accent" />
              <span className="mt-4 font-semibold">Choose images</span>
              <span className="mt-2 text-sm text-sub">JPG, PNG, or WEBP. Multiple files allowed.</span>
            </label>
            <input
              id="files"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(event) => handleFileChange(event.target.files)}
            />

            <button
              type="submit"
              disabled={uploadStatus.type === "loading"}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-accent px-5 font-semibold text-primary transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploadStatus.type === "loading" ? "Uploading..." : "Upload Images"}
              <ImageUp aria-hidden className="h-4 w-4" />
            </button>

            {uploadStatus.message ? (
              <p className={`mt-4 text-sm ${uploadStatus.type === "error" ? "text-red-300" : "text-sub"}`}>
                {uploadStatus.message}
              </p>
            ) : null}
          </section>

          <section className="border border-accent/20 bg-card p-5 shadow-soft sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Preview</h2>
              <span className="text-sm text-sub">{files.length} selected</span>
            </div>

            {previews.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {previews.map((preview) => (
                  <div key={`${preview.file.name}-${preview.file.size}`} className="overflow-hidden border border-white/10 bg-background">
                    <div className="relative h-48">
                      <Image src={preview.url} alt={preview.file.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-semibold">{preview.file.name}</p>
                      <p className="mt-1 text-xs text-sub">{(preview.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 grid min-h-80 place-items-center border border-dashed border-white/15 bg-background/50 p-6 text-center text-sub">
                Selected image previews will appear here.
              </div>
            )}
          </section>
        </form>
      </div>
    </main>
  );
}
