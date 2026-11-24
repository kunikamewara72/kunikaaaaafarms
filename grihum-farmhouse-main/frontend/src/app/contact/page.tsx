"use client";

import React, { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';

const contactPhone = '+918952027373';
const contactEmail = 'grihum.udr@gmail.com';
const initialFormData = {
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guestsCount: 2,
  message: ''
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [submittedInquiry, setSubmittedInquiry] = useState<typeof initialFormData | null>(null);
  const [emailDeliveryFailed, setEmailDeliveryFailed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const preferredDates = `${formData.checkIn} to ${formData.checkOut}`;
    const inquiryMessage = [
      'New Grihum Farms booking inquiry',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Preferred dates: ${preferredDates}`,
      `Guests: ${formData.guestsCount}`,
      `Message: ${formData.message}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/918952027373?text=${encodeURIComponent(inquiryMessage)}`;
    // Reserve a WhatsApp tab during the form submit gesture to avoid popup blockers.
    const whatsappWindow = window.open('about:blank', '_blank');

    try {
      await fetchApi('/inquiries', {
        method: 'POST',
        body: JSON.stringify({ ...formData, preferredDates })
      });
      if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
      setSubmittedInquiry({ ...formData });
      setStatus('success');
      setFormData(initialFormData);
    } catch (err: any) {
      if (err.message?.includes('Inquiry was saved, but the email could not be sent')) {
        if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
        setSubmittedInquiry({ ...formData });
        setEmailDeliveryFailed(true);
        setFormData(initialFormData);
        setStatus('success');
        return;
      }
      whatsappWindow?.close();
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send message');
    }
  };

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const nextCheckOutDate = formData.checkIn ? new Date(`${formData.checkIn}T00:00:00`) : null;
  if (nextCheckOutDate) nextCheckOutDate.setDate(nextCheckOutDate.getDate() + 1);
  const checkOutMinDate = nextCheckOutDate
    ? `${nextCheckOutDate.getFullYear()}-${String(nextCheckOutDate.getMonth() + 1).padStart(2, '0')}-${String(nextCheckOutDate.getDate()).padStart(2, '0')}`
    : minDate;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Direct Host Communication
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          Contact Grihum Farms
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          Have questions about room availability, custom Rajasthani meals, or group bookings? We are here to help.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-forest text-cream p-8 sm:p-10 rounded-3xl shadow-luxury space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-sand">Host Details</span>
            <h2 className="font-serif text-3xl font-bold text-cream">Grihum Family</h2>
            <p className="text-xs text-cream/70 font-light">Superhost · Responds within 1 hour</p>

            <div className="space-y-4 pt-4 border-t border-cream/10 text-sm font-light">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-olive shrink-0" />
                <a href={`tel:${contactPhone}`} className="hover:text-sand">+91 89520 27373</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-olive shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-sand">{contactEmail}</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                <span>Dei Mata Temple, Kaya, Udaipur</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-cream/10">
            <a
              href={`https://wa.me/918952027373?text=${encodeURIComponent("Hi! I'm interested in booking a stay at Grihum Farmhouse. Could you please share the room availability, pricing, and booking details for my preferred dates?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-olive hover:bg-forest text-cream font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp Directly
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-luxury border border-sage/30">
          <h2 className="font-serif text-2xl font-bold text-forest mb-6">Send an Inquiry</h2>

          {status === 'success' ? (
            <div className="bg-sage/30 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-olive mx-auto" />
              <h3 className="font-serif text-xl font-bold text-forest">Inquiry Received!</h3>
              <p className="text-xs text-forest/70 font-light">
                {emailDeliveryFailed
                  ? `Your inquiry was saved, but automatic email delivery failed. A WhatsApp draft is ready; press Send in WhatsApp, or use the email draft below.`
                  : `Your inquiry has been saved and emailed to ${contactEmail}. A WhatsApp draft is ready; press Send in WhatsApp to deliver it to the host.`}
              </p>
              {submittedInquiry && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={`https://wa.me/918952027373?text=${encodeURIComponent([
                      'New Grihum Farms booking inquiry',
                      `Name: ${submittedInquiry.name}`,
                      `Email: ${submittedInquiry.email}`,
                      `Phone: ${submittedInquiry.phone}`,
                      `Preferred dates: ${submittedInquiry.checkIn} to ${submittedInquiry.checkOut}`,
                      `Guests: ${submittedInquiry.guestsCount}`,
                      `Message: ${submittedInquiry.message}`
                    ].join('\n'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-olive hover:bg-forest text-cream font-semibold px-5 py-3 rounded-full text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Open WhatsApp Draft
                  </a>
                  {emailDeliveryFailed && (
                    <a
                      href={`mailto:${contactEmail}?subject=${encodeURIComponent('Grihum Farms booking inquiry')}&body=${encodeURIComponent([
                        'New Grihum Farms booking inquiry',
                        `Name: ${submittedInquiry.name}`,
                        `Email: ${submittedInquiry.email}`,
                        `Phone: ${submittedInquiry.phone}`,
                        `Preferred dates: ${submittedInquiry.checkIn} to ${submittedInquiry.checkOut}`,
                        `Guests: ${submittedInquiry.guestsCount}`,
                        `Message: ${submittedInquiry.message}`
                      ].join('\n'))}`}
                      className="inline-flex items-center justify-center gap-2 bg-olive text-cream font-semibold px-5 py-3 rounded-full text-xs"
                    >
                      <Mail className="w-4 h-4" /> Open Email Draft
                    </a>
                  )}
                </div>
              )}
              <button
                onClick={() => { setSubmittedInquiry(null); setEmailDeliveryFailed(false); setStatus('idle'); }}
                className="text-xs font-semibold text-olive underline pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                    placeholder="e.g. rahul@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Check-in *</label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value, checkOut: '' })}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Check-out *</label>
                  <input
                    type="date"
                    required
                    min={checkOutMinDate}
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Guests *</label>
                  <select
                    required
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                  >
                    {Array.from({ length: 16 }, (_, index) => index + 1).map((count) => (
                      <option key={count} value={count}>{count} {count === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                  placeholder="Tell us about your trip plans or questions..."
                />
              </div>

              {status === 'error' && (
                <p className="text-xs text-terracotta font-semibold">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-olive hover:bg-forest text-cream font-semibold py-4 rounded-full shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {status === 'submitting' ? 'Sending Message...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
