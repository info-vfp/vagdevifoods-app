import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  COMPANY_CONTACT_EMAIL, COMPANY_CONTACT_PHONE, COMPANY_WHATSAPP_NUMBER, WHATSAPP_BULK_QUOTE_LINK,
  FARMER_PAYMENTS_PHONE_FORMATTED, FARMER_PAYMENTS_WHATSAPP_NUMBER, MILL_ADDRESS_LINES,
  REGISTERED_OFFICE_LINES, GOOGLE_MAPS_EMBED_URL,
} from '../constants';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Vagdevi Food Products",
    "description": "WhatsApp the sales desk, call, email, or visit the mill at Yadgarpally, Miryalaguda.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Vagdevi Food Products",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": COMPANY_CONTACT_PHONE,
        "contactType": "customer service",
        "email": COMPANY_CONTACT_EMAIL,
        "areaServed": "IN",
        "availableLanguage": ["en", "hi", "te", "ta", "kn"]
      }
    }
  };

  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError("EmailJS configuration is missing. Please check your .env file.");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        form.current!,
        publicKey
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError("Failed to send message. Please try again later.");
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: string) => `
    block w-full px-6 py-4 bg-brand-cream/50 border rounded-xl transition-all duration-300 ease-out font-medium
    ${errors[fieldName]
      ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
      : focusedField === fieldName
        ? 'border-brand-secondary ring-2 ring-brand-secondary/20 shadow-lg scale-[1.01]'
        : 'border-brand-line hover:border-brand-secondary/50'
    }
    text-brand-dark placeholder-brand-dark/40 focus:outline-none
  `;

  const labelClasses = "block text-sm font-bold text-brand-dark mb-2 tracking-wide uppercase";

  return (
    <div className="bg-brand-cream font-sans">
      <SEO
        title="Contact Us - Vagdevi Food Products"
        description="Talk to the mill directly. WhatsApp is the fastest way to reach the sales desk, Monday to Saturday, 9 am to 6 pm IST."
        keywords="contact vagdevi foods, rice suppliers contact, food products inquiry"
        structuredData={structuredData}
      />

      <section className="relative bg-brand-dark text-white overflow-hidden py-16 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_70%_at_80%_15%,rgba(212,175,55,0.18),transparent_62%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-5">{t.navContact}</div>
          <h1 className="font-display text-[34px] sm:text-6xl leading-[1.05] tracking-tight max-w-2xl mb-6">{t.contactTitle}</h1>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/78 max-w-xl">WhatsApp is the fastest way to reach the sales desk. Monday to Saturday, 9 am to 6 pm IST.</p>
        </div>
      </section>

      <section className="bg-brand-cream py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            <ScrollReveal width="100%">
              <a
                href={WHATSAPP_BULK_QUOTE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#1D9E5A] hover:bg-[#188A4E] transition-colors duration-300 text-white p-8 flex flex-col gap-4 h-full"
              >
                <WhatsAppIcon className="w-8 h-8" />
                <div>
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase opacity-80 mb-2">Fastest</div>
                  <div className="font-display text-[27px] leading-tight">WhatsApp the sales desk</div>
                </div>
                <div className="text-[13px] font-semibold tracking-wide mt-auto">{COMPANY_CONTACT_PHONE}</div>
              </a>
            </ScrollReveal>

            <ScrollReveal width="100%">
              <div className="bg-white border border-brand-line p-8 flex flex-col gap-6 h-full">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#A8842A] mb-2.5">Call or email</div>
                  <a href={`tel:+${COMPANY_WHATSAPP_NUMBER}`} className="block font-display text-2xl text-gray-900 mb-1.5 hover:text-[#A8842A]">{COMPANY_CONTACT_PHONE}</a>
                  <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="text-sm text-gray-600 font-medium hover:text-[#A8842A]">{COMPANY_CONTACT_EMAIL}</a>
                </div>
                <div className="border-t border-[#F0EBDD] pt-5">
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#A8842A] mb-2.5">Farmers · paddy payments</div>
                  <a href={`https://wa.me/${FARMER_PAYMENTS_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-display text-xl text-gray-900 hover:text-[#A8842A]">{FARMER_PAYMENTS_PHONE_FORMATTED}</a>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">Bring your pattadar passbook, bank passbook and Aadhaar copy.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal width="100%">
              <div className="bg-white border border-brand-line p-8 flex flex-col gap-6 h-full">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#A8842A] mb-2.5">Mill &amp; works</div>
                  <p className="text-[14.5px] leading-relaxed text-gray-700">{MILL_ADDRESS_LINES.map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</p>
                </div>
                <div className="border-t border-[#F0EBDD] pt-5">
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#A8842A] mb-2.5">Registered office</div>
                  <p className="text-[14.5px] leading-relaxed text-gray-700">{REGISTERED_OFFICE_LINES.map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal width="100%">
            <div className="border border-brand-line overflow-hidden bg-white mb-20">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="440"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vagdevi Food Products location"
                className="w-full block"
              ></iframe>
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%">
            <div className="bg-white rounded-3xl shadow-premium p-8 md:p-12 border border-brand-line relative overflow-hidden max-w-4xl mx-auto">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-secondary via-[#E8CE74] to-brand-secondary"></div>

              <div className="mb-10">
                <h3 className="text-3xl font-display font-bold text-brand-dark mb-3">Send a Message</h3>
                <p className="text-gray-500 font-light">Prefer email? Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-50/50 border border-green-100 rounded-3xl p-12 text-center"
                  >
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 shadow-sm">
                      <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-display font-bold text-green-800 mb-3">Message Sent!</h4>
                    <p className="text-green-700 mb-8 max-w-md mx-auto">Thank you for reaching out. Our team will review your message and get back to you shortly.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-300 uppercase tracking-wide"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {submitError && (
                      <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl text-sm flex items-center">
                        <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {submitError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="group">
                        <label htmlFor="name" className={labelClasses}>Full Name <span className="text-brand-secondary">*</span></label>
                        <input
                          type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                          onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                          className={inputClasses('name')}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="mt-2 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors.name}</p>}
                      </div>

                      <div className="group">
                        <label htmlFor="email" className={labelClasses}>Email Address <span className="text-brand-secondary">*</span></label>
                        <input
                          type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                          onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                          className={inputClasses('email')}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="mt-2 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="group">
                        <label htmlFor="phone" className={labelClasses}>Phone Number <span className="text-gray-400 font-normal ml-1 normal-case tracking-normal">(Optional)</span></label>
                        <input
                          type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange}
                          onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                          className={inputClasses('phone')}
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="group">
                        <label htmlFor="company" className={labelClasses}>Company Name <span className="text-gray-400 font-normal ml-1 normal-case tracking-normal">(Optional)</span></label>
                        <input
                          type="text" name="company" id="company" value={formData.company} onChange={handleChange}
                          onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                          className={inputClasses('company')}
                          placeholder="Your Company Ltd."
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="subject" className={labelClasses}>Subject <span className="text-brand-secondary">*</span></label>
                      <input
                        type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange}
                        onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                        className={inputClasses('subject')}
                        placeholder="Inquiry about Rice Supply"
                      />
                      {errors.subject && <p className="mt-2 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors.subject}</p>}
                    </div>

                    <div className="group">
                      <label htmlFor="message" className={labelClasses}>Your Message <span className="text-brand-secondary">*</span></label>
                      <textarea
                        name="message" id="message" rows={5} value={formData.message} onChange={handleChange}
                        onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                        className={`${inputClasses('message')} resize-none`}
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                      {errors.message && <p className="mt-2 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors.message}</p>}
                    </div>

                    <div className="pt-4">
                      <button type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-w-[200px] flex items-center justify-center px-8 py-5 border border-transparent text-lg font-bold rounded-xl text-brand-dark bg-brand-secondary hover:bg-brand-dark hover:text-white shadow-lg hover:shadow-premium transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-secondary/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group relative overflow-hidden uppercase tracking-wider">
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <PaperAirplaneIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
