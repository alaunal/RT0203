"use client";

import clsx from "clsx";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site, type NavItem } from "@/data/site";
import { waChatUrl } from "@/lib/format";
import { LogoMark, WhatsAppIcon } from "@/components/ui/icons";
import { EASE } from "@/components/ui/motion";

/** Section beranda → label menu yang di-highlight (scrollspy). */
const sectionToNav: Record<string, string> = {
  lokasi: "Profil",
  "visi-misi": "Profil",
  pengurus: "Profil",
  aktivitas: "Kegiatan",
  jadwal: "Kegiatan",
  "karang-taruna": "Kegiatan",
  kas: "Kas RT",
  "bank-sampah": "Bank Sampah",
  dokumen: "Dokumen",
  panduan: "Panduan",
};

const pageToNav = (path: string) => {
  if (path.startsWith("/aktivitas") || path.startsWith("/jadwal")) return "Kegiatan";
  if (path.startsWith("/kas")) return "Kas RT";
  if (path.startsWith("/dokumen")) return "Dokumen";
  if (path.startsWith("/panduan")) return "Panduan";
  return "Beranda";
};

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("Beranda");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const els = Object.keys(sectionToNav)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveSection(sectionToNav[visible[0].target.id]);
        else if (window.scrollY < 400) setActiveSection("Beranda");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const solid = !isHome || scrolled || drawer;
  const active = isHome ? activeSection : pageToNav(pathname);
  const wa = waChatUrl(site.waResmi, "Halo Pengurus RT 02, saya ingin bertanya.");

  return (
    <>
      <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-700">
        Lewati ke konten
      </a>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-250",
          solid ? "bg-white/95 text-ink shadow-soft backdrop-blur-md" : "bg-transparent text-white",
        )}
      >
        <nav className="mx-auto flex h-16 lg:h-[72px] max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6" aria-label="Navigasi utama">
          <Link href="/" className="flex items-center gap-2.5 font-bold" onClick={() => setDrawer(false)}>
            <motion.span whileHover={{ rotate: -8, scale: 1.06 }} className="inline-block">
              <LogoMark className="size-10" />
            </motion.span>
            <span className="leading-tight">
              <span className="block text-[15px]">RT 02 / RW 03</span>
              <span className={clsx("block text-xs font-medium", solid ? "text-muted" : "text-white/75")}>Jatiluhur · Jatiasih</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                active={active === item.label}
                solid={solid}
                open={openMenu === item.label}
                setOpen={(v) => setOpenMenu(v ? item.label : null)}
              />
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href={wa}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-md bg-accent-500 px-4 text-sm font-semibold text-primary-900 shadow-soft hover:bg-accent-400"
            >
              <WhatsAppIcon className="size-4" /> Hubungi
            </motion.a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-md lg:hidden"
              aria-label={drawer ? "Tutup menu" : "Buka menu"}
              aria-expanded={drawer}
              onClick={() => setDrawer((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={drawer ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {drawer ? <X className="size-6" /> : <Menu className="size-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} active={active} wa={wa} />
    </>
  );
}

function DesktopItem({
  item,
  active,
  solid,
  open,
  setOpen,
}: {
  item: NavItem;
  active: boolean;
  solid: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const linkCls = clsx(
    "relative flex h-10 items-center gap-1 rounded-md px-3 text-[15px] font-medium transition-colors",
    solid ? "hover:bg-primary-50 hover:text-primary-700" : "hover:bg-white/10",
    active && (solid ? "text-primary-700" : "text-white"),
  );
  const underline = active && (
    <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
  );

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkCls} aria-current={active ? "page" : undefined}>
          {item.label}
          {underline}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className={linkCls} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        {item.label}
        <ChevronDown className={clsx("size-4 transition-transform duration-200", open && "rotate-180")} />
        {underline}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full mt-1 w-56 origin-top rounded-lg border border-line bg-white p-2 text-ink shadow-lift"
          >
            {item.children.map((c) => (
              <li key={c.href}>
                <Link href={c.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 text-[15px] hover:bg-primary-50 hover:text-primary-700">
                  {c.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileDrawer({ open, onClose, active, wa }: { open: boolean; onClose: () => void; active: string; wa: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-primary-900/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-40 flex w-[min(86vw,360px)] flex-col bg-white pt-20 shadow-lift lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            aria-label="Menu"
          >
            <motion.ul
              className="flex-1 overflow-y-auto px-3"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {navItems.map((item) => (
                <motion.li key={item.label} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }} className="border-b border-line/70">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className={clsx("flex h-14 w-full items-center justify-between px-3 text-[17px] font-semibold", active === item.label && "text-primary-600")}
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={clsx("size-5 transition-transform", expanded === item.label && "rotate-180")} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} onClick={onClose} className="flex h-12 items-center px-3 text-[16px] text-muted hover:text-primary-700">
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} onClick={onClose} className={clsx("flex h-14 items-center px-3 text-[17px] font-semibold", active === item.label && "text-primary-600")}>
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
            <div className="border-t border-line p-4">
              <a href={wa} target="_blank" rel="noopener" className="flex h-12 items-center justify-center gap-2 rounded-md bg-accent-500 font-semibold text-primary-900">
                <WhatsAppIcon className="size-5" /> Hubungi Pengurus
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
