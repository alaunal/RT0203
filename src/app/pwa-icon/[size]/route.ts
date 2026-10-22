import { notFound } from "next/navigation";
import { logoPng } from "@/lib/icon";

const sizes = ["192", "512", "maskable-512"] as const;

export function generateStaticParams() {
  return sizes.map((size) => ({ size }));
}

export async function GET(_req: Request, { params }: RouteContext<"/pwa-icon/[size]">) {
  const { size } = await params;
  if (!(sizes as readonly string[]).includes(size)) notFound();
  return logoPng(size === "192" ? 192 : 512, { maskable: size.startsWith("maskable") });
}
