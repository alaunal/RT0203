import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const font = readFile(join(process.cwd(), "src/assets/fonts/PlusJakartaSans-800.ttf"));

/** Logo RT (lingkaran hijau + cincin kunyit) sebagai PNG persegi. `maskable` memberi ruang aman 20% untuk ikon Android. */
export async function logoPng(px: number, { maskable = false } = {}) {
  const pad = maskable ? px * 0.2 : 0;
  const d = px - pad * 2;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: maskable ? "#1F6F4A" : "transparent" }}>
        <div
          style={{
            width: d,
            height: d,
            borderRadius: d / 2,
            background: "#1F6F4A",
            border: `${Math.max(2, d * 0.035)}px solid #E8A33D`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            fontFamily: "Jakarta",
          }}
        >
          <span style={{ fontSize: d * 0.3, color: "white" }}>RT</span>
          <span style={{ fontSize: d * 0.19, color: "#F0B85A", marginTop: d * 0.03 }}>02/03</span>
        </div>
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Jakarta", data: await font, weight: 800, style: "normal" }] },
  );
}
