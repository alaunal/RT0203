import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/data/site";

/** Ukuran standar kartu OG (Facebook, WhatsApp, X, LinkedIn, Telegram). */
export const ogSize = { width: 1200, height: 630 };
/** JPEG, bukan PNG: foto jadi ±100 KB sehingga pratinjau WhatsApp tetap muncul (batasnya ~300 KB). */
export const ogContentType = "image/jpeg";

const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "PlusJakartaSans-600.ttf")),
  readFile(join(fontDir, "PlusJakartaSans-800.ttf")),
]);

async function photoDataUri(src: string) {
  const buf = await sharp(join(process.cwd(), "public", src))
    .resize(ogSize.width, ogSize.height, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

type OgInput = {
  /** Judul utama kartu. */
  title: string;
  /** Label kecil di atas judul, mis. "Aktivitas · Rapat". */
  eyebrow: string;
  /** Path foto di /public sebagai latar. */
  photo: string;
  /** Baris tambahan di bawah judul (opsional). */
  subtitle?: string;
};

export async function ogImage(input: OgInput) {
  return new Response(await renderOg(input), { headers: { "Content-Type": ogContentType } });
}

/**
 * Di-cache ("use cache") karena membaca file & memproses foto (I/O async) —
 * tanpa ini rute OG jadi dinamis dan dirender ulang setiap permintaan.
 */
async function renderOg({ title, eyebrow, photo, subtitle }: OgInput) {
  "use cache";
  cacheLife("max");

  const [[semibold, extrabold], bg] = await Promise.all([fonts, photoDataUri(photo)]);
  const titleSize = title.length > 70 ? 50 : title.length > 40 ? 60 : 72;

  const png = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Jakarta", color: "white" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori hanya mengenal <img> */}
        <img src={bg} alt="" width={ogSize.width} height={ogSize.height} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(100deg, rgba(13,51,34,.96) 0%, rgba(13,51,34,.86) 48%, rgba(13,51,34,.35) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                background: "#1F6F4A",
                border: "3px solid #E8A33D",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 800 }}>RT</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#F0B85A", marginTop: 2 }}>02/03</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 800 }}>{site.namaRt}</span>
              <span style={{ fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,.75)" }}>
                {site.kecamatan} · {site.kota}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#F0B85A" }}>{eyebrow}</span>
            <span style={{ marginTop: 14, fontSize: titleSize, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1 }}>{title}</span>
            {subtitle && <span style={{ marginTop: 18, fontSize: 26, fontWeight: 600, lineHeight: 1.4, color: "rgba(255,255,255,.85)" }}>{subtitle}</span>}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,.85)" }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E8A33D" }} />
            {site.domain}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: semibold, weight: 600, style: "normal" },
        { name: "Jakarta", data: extrabold, weight: 800, style: "normal" },
      ],
    },
  );

  const jpg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Uint8Array(jpg);
}
