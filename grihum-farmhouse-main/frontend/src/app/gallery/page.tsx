"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from '@/components/common/ImageLightbox';
import { propertyGalleryImages } from '@/lib/galleryImages';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = propertyGalleryImages;

  const categories = ['All', 'Farmhouse', 'Rooms', 'Food', 'Outdoor', 'Nature'];

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Visual Editorial
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          Grihum Farms Photography
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          Explore the grounds, suites, nature spring, local food, and tranquil outdoor settings.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto px-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-semibold px-5 py-2.5 rounded-full transition-all border ${
              activeCategory === cat
                ? 'bg-olive text-cream border-olive shadow-md'
                : 'bg-white text-forest/80 border-sage/40 hover:bg-cream'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => {
              setLightboxIndex(idx);
              setLightboxOpen(true);
            }}
            className="relative h-72 rounded-3xl overflow-hidden shadow-soft border border-sage/30 cursor-pointer group"
          >
            <Image src={img.src} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <span className="text-[10px] text-sand uppercase font-bold tracking-wider">{img.category}</span>
              <span className="text-sm font-bold text-cream font-serif">{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={filteredImages.map(i => i.src)}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        title="Grihum Farms Editorial Gallery"
      />
    </div>
  );
}
