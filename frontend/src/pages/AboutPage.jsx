import React from "react";
import { Link } from "react-router"; // Import Link for navigation

const AboutPage = () => {
  return (
    <div className="pt-32 min-h-screen bg-white text-slate-900 font-sans">
      {/* --- Section 1: Hero / Philosophy --- */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 mb-4">
              Our Philosophy
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-8">
              Defining the lines of <span className="text-slate-400">tomorrow.</span>
            </h1>
          </div>
          <div className="text-lg text-gray-600 leading-relaxed border-l-4 border-slate-900 pl-8">
            TMYLINES is more than an architecture firm; it is a laboratory for spatial innovation. 
            We believe that every structure should tell a story of precision, durability, 
            and aesthetic harmony. From conceptual sketches to final reality, our focus remains 
            on the intersection of human experience and structural integrity.
          </div>
        </div>
      </section>

      {/* --- Section 2: Core Values Stats --- */}
      <section className="bg-slate-900 py-20 text-white mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Projects Done", val: "150+" },
            { label: "Global Partners", val: "12" },
            { label: "Design Awards", val: "08" },
            { label: "Expert Architects", val: "24" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-5xl font-black mb-2">{stat.val}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 3: Accreditations (Certificates) --- */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 mb-4">
            Trust & Compliance
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold">Official Certifications</h3>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            We operate with complete transparency and adhere to the highest international 
            standards of financial and architectural excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Certificate 1: Money Laundering */}
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-2xl transition-all duration-500 group-hover:shadow-indigo-100 group-hover:-translate-y-2">
              <img 
                src="https://www.image2url.com/r2/default/images/1776383885290-adcc1213-3a3b-4b2c-90e0-f99b7fa7cd4d.jpg" 
                alt="Anti-Money Laundering Certificate" 
                className="w-full h-auto object-contain bg-gray-50 p-4 md:p-8"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300"></div>
            </div>
            <div className="mt-8 text-center md:text-left">
              <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Financial Compliance</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Certified Anti-Money Laundering (AML) verification, ensuring all our international 
                contracts and financial operations meet global transparency standards.
              </p>
            </div>
          </div>

          {/* Certificate 2: TMYLINES Core */}
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-2xl transition-all duration-500 group-hover:shadow-indigo-100 group-hover:-translate-y-2">
              <img 
                src="https://i.ibb.co/gFw3Zt9v/temp.jpg" 
                alt="TMYLINES Certificate" 
                className="w-full h-auto object-contain bg-gray-50 p-4 md:p-8"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300"></div>
            </div>
            <div className="mt-8 text-center md:text-left">
              <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Architectural Accreditation</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our primary licensure and accreditation for TMYLINES, confirming our 
                legal and professional standing as a leading architectural studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Call to Action --- */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h3 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">
          Ready to build your vision?
        </h3>
        {/* Changed from <button> to <Link> and directed to /about */}
        <Link 
          to="/contact"
          className="inline-block px-12 py-5 bg-slate-900 text-white font-bold rounded-full hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-xs"
        >
          Let's Collaborate
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
