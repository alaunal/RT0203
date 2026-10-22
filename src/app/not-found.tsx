import clsx from "clsx";
import { MapPinOff } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/motion";
import { btn } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center px-4 pt-24">
      <Reveal className="text-center">
        <MapPinOff className="mx-auto size-14 text-primary-600" strokeWidth={1.5} />
        <h1 className="mt-4 text-[30px] font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-muted">Sepertinya alamat ini nyasar. Yuk kembali ke beranda.</p>
        <Link href="/" className={clsx(btn.base, btn.primary, "mt-6")}>
          Kembali ke Beranda
        </Link>
      </Reveal>
    </div>
  );
}
