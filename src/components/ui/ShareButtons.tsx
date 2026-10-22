"use client";

import clsx from "clsx";
import { Check, Link2, Share2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { FacebookIcon, TelegramIcon, WhatsAppIcon, XIcon } from "./icons";

const noop = () => () => {};
/** Web Share API hanya ada di browser (umumnya HP) — server selalu `false` agar hidrasi cocok. */
const useCanNativeShare = () => useSyncExternalStore(noop, () => typeof navigator.share === "function", () => false);

type Props = {
  /** URL absolut halaman yang dibagikan. */
  url: string;
  title: string;
  /** Teks pengantar untuk WhatsApp/Telegram/X (default: judul). */
  text?: string;
  className?: string;
};

export function ShareButtons({ url, title, text = title, className }: Props) {
  const canNative = useCanNativeShare();
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);

  const targets = [
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, Icon: WhatsAppIcon, hover: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon, hover: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" },
    { name: "X", href: `https://x.com/intent/post?text=${t}&url=${u}`, Icon: XIcon, hover: "hover:bg-ink hover:text-white hover:border-ink" },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, Icon: TelegramIcon, hover: "hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]" },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Salin tautan ini:", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Warna netral dipisah dari `item` agar tidak bentrok dengan warna state (mis. "disalin").
  const item = "grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-300 sm:size-11";
  const idle = "border-line bg-surface text-ink";

  return (
    <div className={clsx("flex flex-wrap items-center gap-2 sm:gap-3", className)}>
      <span className="w-full text-[15px] font-semibold text-muted sm:mr-1 sm:w-auto">Bagikan:</span>
      {canNative && (
        <motion.button type="button" onClick={() => navigator.share({ title, text, url }).catch(() => {})} whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} className={clsx(item, idle, "hover:border-primary-600 hover:bg-primary-600 hover:text-white")} aria-label="Bagikan lewat aplikasi lain" title="Bagikan">
          <Share2 className="size-5" />
        </motion.button>
      )}
      {targets.map(({ name, href, Icon, hover }) => (
        <motion.a key={name} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} className={clsx(item, idle, hover)} aria-label={`Bagikan ke ${name}`} title={name}>
          <Icon className="size-5" />
        </motion.a>
      ))}
      <motion.button type="button" onClick={copy} whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} className={clsx(item, copied ? "border-primary-600 bg-primary-600 text-white" : clsx(idle, "hover:bg-primary-50"))} aria-label="Salin tautan" title="Salin tautan">
        {copied ? <Check className="size-5" /> : <Link2 className="size-5" />}
      </motion.button>
      <span role="status" aria-live="polite" className="text-[14px] font-medium text-primary-700">
        <AnimatePresence>
          {copied && (
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="inline-block">
              Tautan disalin
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </div>
  );
}
