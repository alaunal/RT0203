"use client";

import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

/** Lightbox foto — dimuat lazy saat pengguna pertama kali membuka foto. */
export default function PhotoLightbox({ slides, index, close }: { slides: SlideImage[]; index: number; close: () => void }) {
  const hasCaptions = slides.some((s) => s.title);
  return <Lightbox open index={index} close={close} slides={slides} plugins={hasCaptions ? [Captions, Zoom] : [Zoom]} />;
}
