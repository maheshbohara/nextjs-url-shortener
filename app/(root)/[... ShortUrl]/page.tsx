"use client";

import { getByShortUrl } from "@/lib/actions/shortUrl.actions";
import { usePathname, redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ShortUrl = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  const shortPathname = usePathname().slice(1);

  useEffect(() => {
    const getUrl = async () => {
      try {
        const { fullUrl } = await getByShortUrl(shortPathname);
        setUrl(fullUrl);
      } catch (error) {
        setError(true);
      }
    };

    if (!url) {
      getUrl();
    } else if (url) {
      redirect(url);
    }

    if (error) {
      redirect("/");
    }
  }, [url, error]);

  return (
    <section className="flex flex-col min-h-screen items-center px-5 md:px-0 py-10">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-center gap-3">
          <span className="text-md">Redirecting...</span>
          <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Redirecting...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortUrl;
