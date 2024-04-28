import { GetWordBySlugAction } from "@/lib/server-actions/GetWordBySlug.action";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const word = await GetWordBySlugAction(slug as string);
  console.log("🚀 ~ GET ~ word:", word);

  if (word.serverError)
    return NextResponse.json({
      status: 500,
      error: word.serverError,
    });

  if (!word.data)
    return NextResponse.json({
      status: 404,
      error: "Word not found",
    });

  if (word.data)
    return NextResponse.json({
      word: word.data.word.trim(),
    });
};
