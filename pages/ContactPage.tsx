import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../components/ScrollReveal';
import { SHORT_COMPANY_NAME, COMPANY_ADDRESS, COMPANY_CONTACT_EMAIL, COMPANY_CONTACT_PHONE_FORMATTED } from '../constants';
import { MapPinIcon, EnvelopeIcon, PhoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Vagdevi Food Products",
    "description": "Get in touch with Vagdevi Food Products. We'd love to hear from you for orders, inquiries, or feedback.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Vagdevi Food Products",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": COMPANY_CONTACT_PHONE_FORMATTED,
        "contactType": "customer service",
        "email": COMPANY_CONTACT_EMAIL,
        "areaServed": "IN",
        "availableLanguage": ["en", "te", "hi"]
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
    // Clear error when user types
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
    block w-full px-6 py-4 bg-brand-bg/50 border rounded-xl transition-all duration-300 ease-out font-medium
    ${errors[fieldName]
      ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
      : focusedField === fieldName
        ? 'border-brand-secondary ring-2 ring-brand-secondary/20 shadow-lg scale-[1.01]'
        : 'border-brand-primary/10 hover:border-brand-secondary/50'
    }
    text-brand-primary placeholder-brand-primary/40 focus:outline-none
  `;

  const labelClasses = "block text-sm font-bold text-brand-primary mb-2 tracking-wide uppercase";

  return (
    <div className="bg-brand-bg font-sans pt-24 md:pt-32 min-h-screen relative overflow-hidden">
      <SEO
        title="Contact Us - Vagdevi Food Products"
        description="Get in touch with Vagdevi Food Products. We'd love to hear from you for orders, inquiries, or feedback."
        keywords="contact vagdevi foods, rice suppliers contact, food products inquiry"
        structuredData={structuredData}
      />

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-secondary/10 to-brand-gold/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        <ScrollReveal width="100%">
          <SectionTitle
            title="Get In Touch"
            subtitle="We'd love to hear from you. Whether it's a question about our products, a partnership opportunity, or just saying hello."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12">
          {/* Contact Form - Display First on Mobile */}
          <div className="lg:col-span-7 lg:order-2">
            <ScrollReveal delay={0.3}>
              <div className="bg-white rounded-3xl shadow-premium p-8 md:p-12 border border-brand-primary/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-secondary via-brand-gold to-brand-secondary"></div>

                <div className="mb-10">
                  <h3 className="text-3xl font-display font-bold text-brand-primary mb-3">Send a Message</h3>
                  <p className="text-text-muted font-light">Fill out the form below and we'll get back to you within 24 hours.</p>
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
                          className="w-full sm:w-auto min-w-[200px] flex items-center justify-center px-8 py-5 border border-transparent text-lg font-bold rounded-xl text-brand-primary bg-brand-secondary hover:bg-brand-primary hover:text-white shadow-lg hover:shadow-premium transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-secondary/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group relative overflow-hidden uppercase tracking-wider">
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

          {/* Contact Information - Second on Mobile */}
          <div className="lg:col-span-5 space-y-8 lg:order-1">
            <ScrollReveal delay={0.2} direction="right" className="h-full">
              <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-premium border border-white/50 hover:shadow-glass-hover transition-shadow duration-500 h-full flex flex-col">
                <h3 className="text-2xl font-display font-bold text-brand-primary mb-8 flex items-center">
                  Contact Information
                  <span className="ml-4 h-px flex-grow bg-gradient-to-r from-brand-secondary/50 to-transparent"></span>
                </h3>

                <div className="space-y-8">
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start group p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-brand-secondary group-hover:text-white text-brand-secondary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                      <MapPinIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-primary mb-1 group-hover:text-brand-secondary transition-colors">Visit Us</h4>
                      <p className="text-text-body text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{SHORT_COMPANY_NAME}<br />{COMPANY_ADDRESS}</p>
                    </div>
                  </a>

                  <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="flex items-start group p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-brand-secondary group-hover:text-white text-brand-secondary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                      <EnvelopeIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-primary mb-1 group-hover:text-brand-secondary transition-colors">Email Us</h4>
                      <p className="text-brand-primary font-medium break-all opacity-80 group-hover:opacity-100 transition-opacity">{COMPANY_CONTACT_EMAIL}</p>
                      <p className="text-sm text-text-muted mt-1">For sales and general inquiries.</p>
                    </div>
                  </a>

                  <a href={`tel:${COMPANY_CONTACT_PHONE_FORMATTED.replace(/\s|-/g, "")}`} className="flex items-start group p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-brand-secondary group-hover:text-white text-brand-secondary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                      <PhoneIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-primary mb-1 group-hover:text-brand-secondary transition-colors">Call Us</h4>
                      <p className="text-brand-primary font-medium opacity-80 group-hover:opacity-100 transition-opacity">{COMPANY_CONTACT_PHONE_FORMATTED}</p>
                      <p className="text-sm text-text-muted mt-1">Mon - Sat, 9 AM - 6 PM IST.</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Full Width Map Section */}
        <div className="mt-16 lg:mt-24">
          <ScrollReveal width="100%">
            <div className="rounded-3xl overflow-hidden shadow-premium border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.9789240473942!2d79.59740769999999!3d16.876937100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35250429b5232d%3A0x97c88d0bd3e943fd!2sVagdevi%20Food%20Products%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756100292717!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
