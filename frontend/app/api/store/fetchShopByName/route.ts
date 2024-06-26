import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(req: Request, res: Response) {
  const { slug } = await req.json();

  const data = await prisma.shop.findMany({
    where: {
      slug,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
