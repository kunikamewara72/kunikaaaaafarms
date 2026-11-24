"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { propertyGalleryImages } from '@/lib/galleryImages';

const experienceMoments = [
  {
    src: '/images/home-gallery/farm-garden-day.jpg',
    title: 'A Slow Walk Through the Garden',
    description: 'Take in the garden paths, green lawn, and quiet corners of the farm in the daylight.',
    category: 'Garden',
  },
  {
    src: '/images/home-gallery/natural-spring-water.jpg',
    title: 'By the Natural Spring',
    description: 'Spend a peaceful moment beside the spring and enjoy the sound of water moving through the property.',
    category: 'Nature',
  },
  {
    src: '/images/home-gallery/rajasthani-traditional-thali.jpg',
    title: 'Authentic Rajasthani Traditional Thali',
    description: 'Share a traditional thali with rice, dal, curries, breads, and fresh accompaniments in the garden.',
    category: 'Dining',
  },
  {
    src: '/images/home-gallery/1773302391873-2.png',
    title: 'Fresh Mulberries from the Garden',
    description: 'See the seasonal harvest gathered right here at Grihum Farms.',
    category: 'Farm Life',
  },
  {
    src: '/images/home-gallery/20260225_163841.jpg',
    title: 'Hibiscus in Bloom',
    description: 'Pause among the bright hibiscus flowers and leafy garden paths.',
    category: 'Garden',
  },
  {
    src: '/images/home-gallery/20260411_194735.jpg',
    title: 'The Farmhouse After Sunset',
    description: 'As evening falls, warm lights bring a calm glow to the farmhouse and garden.',
    category: 'Evening',
  },
  {
    src: '/images/home-gallery/DSC08237.jpg',
    title: 'A Garden Balcony Retreat',
    description: 'Take a seat among the plants and enjoy an open view of the surrounding greenery.',
    category: 'Outdoor Living',
  },
  {
    src: '/images/home-gallery/DSC08156.jpg',
    title: 'A Flower Petal Bath',
    description: 'Unwind in the soaking bath, prepared with floating petals and candlelight.',
    category: 'Relaxation',
  },
  {
    src: '/images/home-gallery/farm-bedroom.jpg',
    title: 'Rest in a Wood-Beamed Room',
    description: 'Settle into a comfortable bedroom with warm timber details and soft natural light.',
    category: 'Stay',
  },
  {
    src: '/images/home-gallery/20240815_143104.jpg',
    title: 'A Quiet Moment Outdoors',
    description: 'Find a peaceful spot outside and take in the slower rhythm of countryside life.',
    category: 'Outdoor Living',
  },
];

export default function ExperiencesPage() {
  const galleryImagePaths = new Set(propertyGalleryImages.map((image) => image.src));

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Curated Farm Experiences
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          Unforgettable Countryside Moments
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          Wander the garden, pause by the spring, share an easy breakfast, and settle into the quiet comforts of Grihum Farms.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experienceMoments.filter((moment) => galleryImagePaths.has(moment.src)).map((moment) => (
          <article
            key={moment.src}
            className="bg-white rounded-3xl overflow-hidden shadow-luxury border border-sage/30 flex flex-col group"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={moment.src}
                alt={moment.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-terracotta text-cream text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {moment.category}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="font-serif text-2xl font-bold text-forest mb-3">{moment.title}</h2>
              <p className="text-sm text-forest/70 font-light leading-relaxed flex-grow">{moment.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-14 px-4">
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 bg-olive hover:bg-forest text-cream font-semibold text-sm px-7 py-3.5 rounded-full transition-colors"
        >
          Plan Your Stay <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
