"use client";

import { useState } from "react";
import { createShortUrl } from "@/lib/actions/shortUrl.actions";
import Link from "next/link";
import toast from "react-hot-toast";

const ShortUrlForm = () => {
  const [fullUrl, setFullUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [urlProcessed, setUrlProcessed] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { shortUrl, fullUrl: originalUrl } = await createShortUrl({
        fullUrl,
        path: "/",
      });

      setFullUrl(BASE_URL + shortUrl);
      setOriginalUrl(originalUrl);

      setLoading(false);
      setUrlProcessed(true);
    } catch (error) {
      console.log(error);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);

      toast.success("URL Copied.");
    } catch (error) {
      console.error("Failed to copy: ", error);
      toast.error("Failed to shorten URL. Please try again.");
    }
  };

  const shortenAnother = () => {
    setUrlProcessed(false);
    setFullUrl("");
    setOriginalUrl("");
  };

  return (
    <>
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row items-center w-full mb-3 gap-4">
          <div className="relative w-full md:w-[70%]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>
            </div>
            <input
              type="url"
              className="w-full pl-11 p-4 text-md rounded-lg bg-gray-50 border text-gray-900 border-gray-300 focus:ring-gray-500 focus:border-gray-500 focus-visible:outline-gray-500"
              placeholder="Enter the link here"
              required
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
            />
          </div>
          {!urlProcessed ? (
            <button
              type="submit"
              className="flex items-center justify-center gap-2 flex-grow px-4 py-4 w-full md:w-auto text-md font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800"
              disabled={loading}
            >
              Shorten URL
              {loading && (
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center justify-center gap-2 flex-grow px-4 py-4 w-full md:w-auto text-md font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800"
              onClick={copyUrl}
            >
              Copy URL
            </button>
          )}
        </div>
      </form>
      {urlProcessed ? (
        <>
          <p className="mb-4 break-words">
            Long URL:{" "}
            <Link href={originalUrl} className="underline" target="_blank">
              {originalUrl}
            </Link>
          </p>
          <button
            className="px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800"
            onClick={shortenAnother}
          >
            Shorten another URL
          </button>
        </>
      ) : (
        <p className="text-center">
          Shorten and customize URLs with precision using our Next.js-powered
          app.
        </p>
      )}
    </>
  );
};

export default ShortUrlForm;
