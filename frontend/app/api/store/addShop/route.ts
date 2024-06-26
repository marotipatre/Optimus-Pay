import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(req: Request, res: Response) {
  try {
    const { owner, desc, name, slug } = await req.json();
  
  await prisma.shop.create({
    data: {
      desc,
      name,
      owner,
      slug,
      sales: "",
    },
  });
  return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
