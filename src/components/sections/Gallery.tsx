"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-soft"
            aria-label={`Perbesar foto ${i + 1}`}
          >
            <Image src={src} alt={`${alt} — foto ${i + 1}`} fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
          </motion.button>
        ))}
      </div>
      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={images.map((src) => ({ src }))} plugins={[Zoom]} />
    </>
  );
}
