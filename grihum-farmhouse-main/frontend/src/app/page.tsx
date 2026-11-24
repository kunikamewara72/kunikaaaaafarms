"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroAvailabilityBar from '@/components/home/HeroAvailabilityBar';
import ImageLightbox from '@/components/common/ImageLightbox';
import {
  TreePine,
  Sparkles,
  Utensils,
  Flame,
  Waves,
  Car,
  Dog,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Coffee,
  Sun
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { propertyGalleryImages } from '@/lib/galleryImages';

export default function HomePage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const galleryImages = propertyGalleryImages.map((image) => image.src);

  const roomImageBySlug: Record<string, string> = {
    'entire-farmhouse': '/images/home-gallery/20260411_194735.jpg',
    'mountain-view-cottage': '/images/home-gallery/DSC08216.jpg',
    'water-spring-suite': '/images/home-gallery/DSC08333.jpg',
  };

  const experienceImageBySlug: Record<string, string> = {
    'rajasthani-thali-dining': '/images/home-gallery/rajasthani-traditional-thali.jpg',
    'natural-waterfall-bonfire': '/images/home-gallery/20260411_194735.jpg',
    'organic-farm-breakfast': '/images/home-gallery/loft-hillside-breakfast.jpg',
    'guided-nature-birdwalk': '/images/home-gallery/20260225_163841.jpg'
  };

  const experienceImageAltBySlug: Record<string, string> = {
    'rajasthani-thali-dining': 'Rajasthani thali served outdoors with dal, rice, breads, and traditional accompaniments',
    'natural-waterfall-bonfire': 'The farmhouse warmly lit after dark',
    'organic-farm-breakfast': 'A breakfast spread served in the loft with a hillside view',
    'guided-nature-birdwalk': 'Hibiscus flowers in the farmhouse garden'
  };

  useEffect(() => {
    fetchApi('/rooms').then(setRooms).catch(console.error);
    fetchApi('/experiences').then(setExperiences).catch(console.error);
    fetchApi('/reviews').then(setReviews).catch(console.error);
  }, []);

  const whyUsFeatures = [
    { icon: TreePine, title: "Surrounded by Nature", desc: "Tucked away amidst lush green Aravalli hills with pristine mountain air." },
    { icon: Waves, title: "Natural Water Spring", desc: "Constant soothing sound of running spring water and a natural pool." },
    { icon: ShieldCheck, title: "Private Farmhouse Stay", desc: "Entirely private grounds — no crowds, no city noise." },
    { icon: Utensils, title: "Authentic Local Food", desc: "Traditional Rajasthani thali cooked fresh over firewood using farm herbs." },
    { icon: Flame, title: "Evening Bonfire & Stars", desc: "Gather around the fire pit under crystal-clear night skies." },
    { icon: Dog, title: "Pet Friendly", desc: "Bring your four-legged companions to run freely in garden spaces." },
    { icon: TreePine, title: "Camping Tent Stays", desc: "Camping tents are also available for an outdoor overnight stay." },
  ];

  const faqs = [
    { q: "What time is check-in and check-out at Grihum Farms?", a: "Check-in begins at 1:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be requested in advance depending on availability." },
    { q: "How many total guests can stay at Grihum Farms?", a: "The farmhouse has 3 bedrooms and 2 lofts with beds, and can accommodate up to 16 guests when booked as the Entire Farmhouse Villa. Camping tent stays are also available." },
    { q: "Do you offer camping tent stays?", a: "Yes, camping tent stays are available. Contact the Grihum family to arrange your dates and get the details." },
    { q: "Is breakfast included with our stay?", a: "You can choose rate options including fresh farm-to-table breakfast or add authentic Rajasthani thalis during checkout." },
    { q: "Can I book the entire farmhouse for complete privacy?", a: "Yes! You can reserve the Entire Grihum Farms Villa for exclusive access to all bedrooms, private spring pool, and lawn gardens." },
    { q: "Is parking available?", a: "Yes, secure free parking is available for up to 5 vehicles." },
  ];

  return (
    <div className="min-h-screen text-forest overflow-x-hidden">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/home-hero-user-photo.jpg"
          alt="Evening garden and warmly lit farmhouse at Grihum Farms"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[1.08] saturate-[1.18] contrast-[1.04] transform scale-105 transition-transform duration-10000 hover:scale-100"
          priority
        />
        {/* Subtle forest shading keeps the photo vibrant while preserving text contrast. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,35,25,0.46)_0%,rgba(19,35,25,0.24)_48%,rgba(19,35,25,0.08)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-forest/10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto text-cream pt-16 drop-shadow-[0_2px_18px_rgba(13,27,18,0.55)]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/55 backdrop-blur-md border border-sand/50 text-sand text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Official Single Farmhouse Retreat · Udaipur, India
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-cream mb-6">
            Escape to Nature.
          </h1>

          <p className="text-lg sm:text-xl text-cream/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            A peaceful farmhouse sanctuary surrounded by natural water springs and the serene Aravalli countryside.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-olive hover:bg-cream hover:text-forest text-cream font-medium text-base px-8 py-3.5 rounded-full shadow-luxury transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Your Stay
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-cream backdrop-blur-md font-medium text-base px-8 py-3.5 rounded-full border border-cream/30 transition-all flex items-center justify-center gap-2"
            >
              Explore the Farmhouse
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Hero Availability Search Bar */}
      <HeroAvailabilityBar />

      {/* 3. Welcome / About Intro Section */}
      <section className="py-20 sm:py-28 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-luxury border-4 border-white bg-sage/20 p-1.5">
              <div className="grid h-full grid-cols-4 grid-rows-3 gap-1.5 overflow-hidden rounded-[1.15rem]">
                {[
                  ['20250828_081843.jpg', 'Grihum Farms villa surrounded by greenery'],
                  ['20250901_080025.jpg', 'Waterfall flowing through the green hillside'],
                  ['20251116_131842.jpg', 'Natural spring and garden terrace'],
                  ['20260225_163823.jpg', 'Bright pink flowers at the farmhouse'],
                  ['20260310_144203.jpg', 'Fresh mulberries grown at the farm'],
                  ['20260411_194727.jpg', 'Farmhouse garden at night'],
                  ['20260411_200516.jpg', 'Evening lights among the palms'],
                  ['20260503_213600.jpg', 'Grihum Farms sign among garden lights'],
                  ['20260503_222312.jpg', 'Peaceful spring pool at night'],
                  ['20260516_163950.jpg', 'Sunflower growing at the farm'],
                  ['20260724_222714.jpg', 'Lush garden stream after sunset']
                ].map(([file, alt], index) => (
                  <div
                    key={file}
                    className={`relative overflow-hidden ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                  >
                    <Image
                      src={`/images/farm-collage/${file}`}
                      alt={alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-500 hover:scale-105 ${index === 0 ? 'brightness-[0.82] saturate-[0.88] sepia-[0.08]' : ''}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Host Badge Callout */}
            <div className="absolute -bottom-6 -right-2 sm:bottom-6 sm:-right-6 bg-cream/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-luxury border border-sage/40 flex items-center gap-4 max-w-xs">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-olive">
                <Image
                  src="https://a0.muscache.com/im/pictures/user/User/original/3f877254-66fa-47be-b1d1-b7f5c5f5b205.jpeg"
                  alt="Kumawat Rythem"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-olive font-semibold uppercase tracking-wider">Your Host</p>
                <p className="text-sm font-bold text-forest">Kumawat Rythem</p>
                <p className="text-xs text-forest/70">Superhost · 4.92 ★ (12 Reviews)</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Welcome to Grihum Farms
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-forest">
              A quiet retreat where nature, comfort and authentic countryside living come together.
            </h2>
            <p className="text-base text-forest/80 font-light leading-relaxed">
              Nestled amidst nature in Udaipur, Grihum Farms is a peaceful retreat with 3 bedrooms, 2 lofts with beds, and camping tent stays for guests who want to sleep closer to nature.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sage/30">
              <div>
                <span className="text-2xl font-serif font-bold text-olive block">3 Bedrooms</span>
                <span className="text-xs text-forest/70">2 Lofts with Beds · Up to 16 Guests</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-olive block">Natural Spring</span>
                <span className="text-xs text-forest/70">Private Pool & Stream</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-olive hover:text-forest transition-colors group"
              >
                Discover Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Stay With Us */}
      <section className="bg-sage/20 py-20 px-4 border-y border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Pure Countryside Luxury
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
              Why Stay With Us at Grihum Farms
            </h2>
            <p className="text-sm text-forest/70 mt-3 font-light">
              Designed exclusively for families, couples, and friends seeking complete privacy in raw mountain nature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-soft border border-sage/30 hover:border-olive transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-olive mb-4 group-hover:bg-olive group-hover:text-cream transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-sm text-forest/70 font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Rooms Section — "Stay Your Way" */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
              Stay Your Way
            </h2>
            <p className="text-sm text-forest/70 mt-2 font-light max-w-xl">
              Choose an individual luxury suite or reserve the entire private villa for your exclusive stay.
            </p>
          </div>

          <Link
            href="/rooms"
            className="mt-4 md:mt-0 text-sm font-semibold text-olive hover:text-forest transition-colors flex items-center gap-1"
          >
            View All Rooms <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-soft border border-sage/30 hover:shadow-luxury transition-all flex flex-col group"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={roomImageBySlug[room.slug] || room.coverImage}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {!['entire-farmhouse', 'mountain-view-cottage', 'water-spring-suite'].includes(room.slug) && (
                  <div className="absolute top-3 right-3 bg-forest/80 backdrop-blur-md text-cream text-xs px-3 py-1 rounded-full font-semibold">
                    From ₹{room.pricePerNight.toLocaleString('en-IN')} <span className="font-normal text-[10px]">/ night</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl font-bold text-forest mb-2">{room.name}</h3>
                <p className="text-xs text-forest/70 font-light mb-4 line-clamp-2">{room.subtitle}</p>

                <div className="text-xs text-olive font-medium space-y-1 mb-6 bg-cream/60 p-3 rounded-xl border border-sage/20">
                  <p>👤 Capacity: {room.shortDescription}</p>
                  <p>🛏 Beds: {room.beds}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-sage/20">
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="text-xs font-bold text-forest hover:text-olive transition-colors uppercase tracking-wider"
                  >
                    View Room
                  </Link>
                  <Link
                    href={`/booking?roomId=${room._id}`}
                    className="bg-olive hover:bg-forest text-cream text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    {['entire-farmhouse', 'mountain-view-cottage', 'water-spring-suite'].includes(room.slug) ? 'Book Stay' : 'Book Suite'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Photo Gallery Section */}
      <section className="bg-forest text-cream py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-sand">
            Visual Story
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mt-2">
            The Grihum Farms Gallery
          </h2>
          <p className="text-sm text-cream/70 mt-2 font-light">
            Click any photograph to launch the luxury full-screen photo gallery.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              className="relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-soft"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-forest/20 group-hover:bg-forest/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-xs font-semibold text-cream bg-olive/80 px-4 py-2 rounded-full backdrop-blur-md">
                  View Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Experiences Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            Memorable Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
            Crafted Countryside Experiences
          </h2>
          <p className="text-sm text-forest/70 mt-2 font-light">
            From fresh garden harvests and flowering paths to relaxed meals and evenings at the farmhouse, enjoy the simple pleasures of a countryside stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div key={exp.slug} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-sage/30 flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={experienceImageBySlug[exp.slug] || exp.image} alt={experienceImageAltBySlug[exp.slug] || exp.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-terracotta text-cream text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                  {exp.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-bold text-forest mb-2">{exp.title}</h3>
                <p className="text-xs text-forest/70 font-light mb-4">{exp.shortDescription}</p>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-sage/20 text-xs">
                  <span className="font-bold text-olive">₹{exp.price} <span className="font-normal text-[10px]">{exp.priceUnit}</span></span>
                  <Link href={`/booking?expId=${exp._id}`} className="text-forest font-semibold hover:underline">
                    Add to Stay →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Food & Dining Section */}
      <section className="bg-cream py-20 px-4 border-t border-sage/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Eat Local
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
              Authentic Rajasthani Firewood Cuisine
            </h2>
            <p className="text-sm text-forest/80 font-light leading-relaxed">
              Immerse yourself in authentic Rajasthani food prepared with pure, organic ingredients. From Dal Baati Churma cooked on slow firewood to fresh farm salads and herbal mint infusions, every dish is prepared fresh upon request.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-forest/90">
                <CheckCircle className="w-5 h-5 text-olive shrink-0" />
                <span>Firewood cooked authentic local delicacies</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-forest/90">
                <CheckCircle className="w-5 h-5 text-olive shrink-0" />
                <span>Outdoor garden breakfast under mango trees</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-forest/90">
                <CheckCircle className="w-5 h-5 text-olive shrink-0" />
                <span>Custom dietary requests & family thali dining</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-luxury border-4 border-white bg-forest/5">
            <Image
              src="/images/home-gallery/rajasthani-traditional-thali.jpg"
              alt="Traditional Rajasthani thali with dal, rice, breads, and accompaniments served outdoors at Grihum Farms"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 9. Reviews Section */}
      <section className="bg-sage/20 py-20 px-4 border-y border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Guest Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3 text-olive font-bold">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span>4.92 ★ (12 Verified Stays)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-soft border border-sage/30 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <p className="text-sm text-forest/80 font-light italic leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-sage/20">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sage/30">
                    {rev.avatar ? (
                      <Image src={rev.avatar} alt={rev.guestName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-forest text-sm">
                        {rev.guestName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-forest">{rev.guestName}</p>
                    <p className="text-xs text-forest/60">{rev.guestLocation} · {rev.stayDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Accordion Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            Clear Information
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-sage/30 shadow-soft overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 font-serif text-lg font-bold text-forest flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-olive transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-forest/70 font-light leading-relaxed border-t border-sage/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. Final CTA Banner */}
      <section className="bg-forest text-cream py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-sand">
            Your Private Countryside Retreat
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-cream mt-3 mb-6">
            Your quiet escape is waiting.
          </h2>
          <p className="text-base sm:text-lg text-cream/80 font-light mb-8 max-w-xl mx-auto">
            Plan your stay and experience Grihum Farms at your own pace. Discover raw nature, water springs, and genuine hospitality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-olive hover:bg-cream hover:text-forest text-cream font-semibold text-base px-8 py-3.5 rounded-full shadow-luxury transition-all"
            >
              Book Your Stay
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto border border-cream/30 hover:bg-white/10 text-cream font-semibold text-base px-8 py-3.5 rounded-full transition-all"
            >
              Contact Host
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <ImageLightbox
        images={galleryImages}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        title="Grihum Farms — Photo Gallery"
      />
    </div>
  );
}

