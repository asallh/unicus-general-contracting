"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { HydrateClient } from "~/trpc/server";

interface ImageDisplaySection {
  url: string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageDisplaySection[];
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeModal = () => setSelectedIndex(null);
  const showNext = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  const showPrev = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
        {images.map((img, idx) => (
          <motion.div
            key={img.url}
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-xl"
            onClick={() => setSelectedIndex(idx)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && images[selectedIndex] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // Close on backdrop click
          >
            <motion.div
              className="relative w-full max-w-5xl p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
            >
              <div className="relative mx-auto aspect-3/2 w-full max-w-3xl overflow-hidden rounded-lg bg-black/20">
                <Image
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>

              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300"
                onClick={closeModal}
              >
                <X size={28} className="sm:h-7 sm:w-7" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-3xl text-white hover:text-gray-300"
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-3xl text-white hover:text-gray-300"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ImageGallery;
