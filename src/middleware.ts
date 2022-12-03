import { NextRequest, NextResponse } from "next/server";

// Create a middleware function that will be used for all requests to the next app
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
    console.log("returning EARLY from middleware");
    return;
  }

  // Get slug from the pathname of the request URL (e.g. /api/get-url/[slug])
  const slug = req.nextUrl.pathname.split("/").pop();
  
  // Fetch the short link from the database using the slug from the request path name
  const data = await (
    await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
  ).json();

   // Redirect to the long URL of the short link if it exists in the database
  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}
