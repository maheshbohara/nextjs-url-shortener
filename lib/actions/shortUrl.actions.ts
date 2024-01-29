"use server";

import { CreateShortUrlParams } from "@/types";
import { connectToDatabase } from "@/lib/database";
import shortUrl from "@/lib/database/models/shortUrl.model";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

// CREATE
export async function createShortUrl({ fullUrl, path }: CreateShortUrlParams) {
  try {
    await connectToDatabase();

    const newShortUrl = await shortUrl.create({
      fullUrl,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newShortUrl));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE SHORT URL
export async function getByShortUrl(shortPathname: string) {
  await connectToDatabase();

  try {
    const url = await shortUrl.findOne({ shortUrl: shortPathname });
    if (!url) throw new Error("Url not found");

    url.clicks++;
    url.save();

    return JSON.parse(JSON.stringify(url));
  } catch (error) {
    handleError(error);
  }
}
