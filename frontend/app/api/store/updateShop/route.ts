import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(req: Request, res: Response) {
  const { owner, desc, name, slug } = await req.json();

  await prisma.shop.update({
    where: {
      slug,
    },
    data: {
      desc,
      name,
      owner,
      slug,
      sales: "",
    },
  });
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
