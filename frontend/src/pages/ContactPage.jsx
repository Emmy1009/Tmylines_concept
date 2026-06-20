import React from "react";
import {  MessageCircle } from "lucide-react";

// TikTok SVG icon (lucide-react doesn't have one)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.75a4.85 4.85 0 01-1.02-.06z" />
  </svg>
);

// Marquee strip label
const MarqueeLabel = () => (
  <span className="text-[10px] font-black uppercase tracking-[1em] mx-8 opacity-20 shrink-0">
    TMYLINES ARCHITECTURE STUDIO
  </span>
);

const ContactPage = () => {
  const socialLinks = [
    {
      name: "Instagram",
      handle: "@tmylines_studio",
      icon: "",
      color: "hover:text-pink-600",
      link: "https://instagram.com/tmylines_studio",
    },
    {
      name: "Facebook",
      handle: "TMYLINES Architecture",
      icon: "",
      color: "hover:text-blue-600",
      link: "https://facebook.com",
    },
    {
      name: "TikTok",
      handle: "@tmylines",
      // FIX 3: Use actual TikTok SVG instead of Send icon placeholder
      icon: <TikTokIcon />,
      color: "hover:text-black",
      link: "https://vm.tiktok.com/ZS9LbJCnGmD1x-6AlBs/",
    },
    {
      name: "WhatsApp",
      handle: "+234 911 659 0688",
      icon: <MessageCircle size={24} />,
      color: "hover:text-green-500",
      link: "https://wa.me/2349116590688",
    },
  ];

  return (
    <>
      {/* FIX 2: Inject marquee keyframes via a style tag since we can't edit tailwind.config.js here */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

      <div className="pt-32 min-h-screen bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6">

          {/* --- Hero Section --- */}
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl mx-auto transform hover:rotate-12 transition-transform duration-500">
                {/* FIX 1: Corrected broken image URL (was missing the 'g' in .jpg) */}
                <img
                  src="https://www.image2url.com/r2/default/images/1776383996260-24bd13ae-f23c-4f43-9bbc-f4898980db48.jpg"
                  alt="TMYLINES Logo"
                  className="h-full w-full object-cover"
                  // Graceful fallback if image still fails
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-indigo-600 mb-4">
              Connect With Us
            </h2>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6">
              Let's Build <span className="text-slate-300 italic">Together.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-500 text-lg">
              Whether you have a question about a project or just want to say hi,
              our digital doors are always open. Reach out on any of our platforms.
            </p>
          </div>

          {/* --- Social Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2"
              >
                <div className={`mb-4 text-slate-400 transition-colors duration-300 ${social.color}`}>
                  {social.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-1">{social.name}</h3>
                <p className="text-gray-500 font-medium">{social.handle}</p>
              </a>
            ))}
          </div>

          {/* --- Detailed Info Footer --- */}
          <div className="border-t border-gray-100 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 text-center md:text-left">
                  Email Us
                </h4>
                <a
                  href="mailto:hello@tmylines.com"
                  className="text-xl font-bold hover:text-indigo-600 transition-colors"
                >
                  hello@tmylines.com
                </a>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 text-center md:text-left">
                  Visit Studio
                </h4>
                <p className="text-xl font-bold">
                  123 Design Avenue, Suite 404
                  <br />
                  Lagos, Nigeria
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 text-center md:text-left">
                  Work Hours
                </h4>
                <p className="text-xl font-bold">
                  Mon — Fri: 9am - 6pm
                  <br />
                  Sat: By Appointment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Scrolling Marquee Strip --- */}
        {/* FIX 2: Changed animate-pulse (fade) to animate-marquee (scroll).
            Items are doubled (20 total) so the loop is seamless — when the
            first half scrolls off-screen, the second half takes its place. */}
        <div className="bg-slate-900 py-12 text-white overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(20)].map((_, i) => (
              <MarqueeLabel key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;