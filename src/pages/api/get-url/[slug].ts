import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    return res.send(JSON.stringify({ error: "Please, query a Slug" }));
  }
  if (req.method === "GET") {
    const shortLink = await prisma.shortLink.findFirst({
      where: {
        slug: slug,
      },
    });

    if (!shortLink) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json(shortLink);
  }
}
