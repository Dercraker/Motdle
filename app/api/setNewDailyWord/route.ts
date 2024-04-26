import { env } from "@/lib/server";
import { setNewDailyWordAction } from "@/lib/server-actions/setNewDailyWord.action";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  if (req.headers.get("Authorization") !== `Bearer ${env.CRON_SECRET}`)
    return NextResponse.json({
      status: 401,
      statusText: "Unauthorized",
    });

  await setNewDailyWordAction(null);

  return NextResponse.json({
    status: 200,
  });
};
