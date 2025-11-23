import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { SHORT_COMPANY_NAME, COMPANY_ADDRESS, COMPANY_CONTACT_EMAIL, COMPANY_CONTACT_PHONE_FORMATTED } from '../constants';
import { MapPinIcon, EnvelopeIcon, PhoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Animation states
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });

      // Reset success message after 6 seconds
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
    block w-full px-5 py-4 bg-white border rounded-xl transition-all duration-300 ease-out
    ${errors[fieldName]
      ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
      : focusedField === fieldName
        ? 'border-brand-saffron ring-4 ring-brand-saffron/10 shadow-lg scale-[1.01]'
        : 'border-gray-200 hover:border-brand-saffron/50'
    }
    text-brand-espresso placeholder-gray-400 focus:outline-none
  `;

  const labelClasses = "block text-sm font-bold text-brand-espresso mb-2 tracking-wide";

  return (
    <div className="bg-brand-bg font-sans pt-24 md:pt-32 min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-saffron/10 to-brand-gold/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4 pointer-events-none animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-espresso/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none animate-float-delayed"></div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle
            title="Get In Touch"
            subtitle="We'd love to hear from you. Whether it's a question about our products, a partnership opportunity, or just saying hello."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className={`lg:col-span-5 space-y-8 transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500">
              <h3 className="text-2xl font-serif font-bold text-brand-espresso mb-8 flex items-center">
                Contact Information
                <span className="ml-4 h-px flex-grow bg-gradient-to-r from-brand-saffron/50 to-transparent"></span>
              </h3>

              <div className="space-y-8">
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start group p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-brand-saffron/10 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-brand-saffron group-hover:text-white text-brand-saffron transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-espresso mb-1 group-hover:text-brand-saffron transition-colors">Visit Us</h4>
                    <p className="text-text-body text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{SHORT_COMPANY_NAME}<br />{COMPANY_ADDRESS}</p>
                  </div>
                </a>

                <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="flex items-start group p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-brand-saffron/10 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-brand-saffron group-hover:text-white text-brand-saffron transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-espresso mb-1 group-hover:text-brand-saffron transition-colors">Email Us</h4>
                    <p className="text-brand-espresso font-medium break-all opacity-80 group-hover:opacity-100 transition-opacity">{COMPANY_CONTACT_EMAIL}</p>
                    <p className="text-sm text-text-muted mt-1">For sales and general inquiries.</p>
                  </div>
                </a>

                <a href={`tel:${COMPANY_CONTACT_PHONE_FORMATTED.replace(/\s|-/g, "")}`} className="flex items-start group p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-brand-saffron/10 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-brand-saffron group-hover:text-white text-brand-saffron transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-espresso mb-1 group-hover:text-brand-saffron transition-colors">Call Us</h4>
                    <p className="text-brand-espresso font-medium opacity-80 group-hover:opacity-100 transition-opacity">{COMPANY_CONTACT_PHONE_FORMATTED}</p>
                    <p className="text-sm text-text-muted mt-1">Mon - Sat, 9 AM - 6 PM IST.</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.9789240473942!2d79.59740769999999!3d16.876937100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35250429b5232d%3A0x97c88d0bd3e943fd!2sVagdevi%20Food%20Products%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756100292717!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-saffron"></div>

              <div className="mb-10">
                <h3 className="text-3xl font-serif font-bold text-brand-espresso mb-3">Send a Message</h3>
                <p className="text-text-muted">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50/50 border border-green-100 rounded-3xl p-12 text-center animate-fade-in-up">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 shadow-sm">
                    <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-green-800 mb-3">Message Sent!</h4>
                  <p className="text-green-700 mb-8 max-w-md mx-auto">Thank you for reaching out. Our team will review your message and get back to you shortly.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-8">
                  {submitError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl text-sm flex items-center animate-fade-in-up">
                      <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="group">
                      <label htmlFor="name" className={labelClasses}>Full Name <span className="text-brand-saffron">*</span></label>
                      <input
                        type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                        onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                        className={inputClasses('name')}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-2 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors.name}</p>}
                    </div>

                    <div className="group">
                      <label htmlFor="email" className={labelClasses}>Email Address <span className="text-brand-saffron">*</span></label>
                      <input
                        type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                        onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                        className={inputClasses('email')}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-2 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="company" className={labelClasses}>Company Name <span className="text-gray-400 font-normal ml-1">(Optional)</span></label>
                    <input
                      type="text" name="company" id="company" value={formData.company} onChange={handleChange}
                      onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                      className={inputClasses('company')}
                      placeholder="Your Company Ltd."
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="subject" className={labelClasses}>Subject <span className="text-brand-saffron">*</span></label>
                    <input
                      type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange}
                      onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                      className={inputClasses('subject')}
                      placeholder="Inquiry about Rice Supply"
                    />
                    {errors.subject && <p className="mt-2 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors.subject}</p>}
                  </div>

                  <div className="group">
                    <label htmlFor="message" className={labelClasses}>Your Message <span className="text-brand-saffron">*</span></label>
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
                      className="w-full sm:w-auto min-w-[200px] flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-brand-espresso bg-brand-saffron hover:bg-brand-gold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-saffron/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-espresso" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

