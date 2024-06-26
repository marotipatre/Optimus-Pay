import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(req: Request, res: Response) {
  const { owner } = await req.json();
  if(owner == null) throw new Error('Owner is Undefined');
  const data = await prisma.shop.findMany({
    where: {
      owner,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
