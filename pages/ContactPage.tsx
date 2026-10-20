import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  COMPANY_CONTACT_EMAIL, COMPANY_CONTACT_PHONE, COMPANY_TEL_HREF, WHATSAPP_BULK_QUOTE_LINK,
  FARMER_PAYMENTS_PHONE_FORMATTED, FARMER_PAYMENTS_WHATSAPP_NUMBER, MILL_ADDRESS_LINES,
  REGISTERED_OFFICE_LINES, GOOGLE_MAPS_EMBED_URL,
} from '../constants';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { buildGraph, breadcrumbSchema, organizationSchema } from '../content/structuredData';
import { absoluteUrl } from '../content/seo';
import { useLanguage } from '../context/LanguageContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

// Field names double as the EmailJS template's variables — renaming one silently drops it
// from the email the sales desk receives.
interface FormFields {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormFields = { name: '', email: '', phone: '', company: '', subject: '', message: '' };

/** Order the fields appear in, so validation can focus the first one that needs fixing. */
const FIELD_ORDER: (keyof FormFields)[] = ['name', 'email', 'phone', 'company', 'subject', 'message'];

/** The enquiries the sales desk actually gets, as one-tap starting points for the subject. */
const ENQUIRY_TOPICS = ['Bulk quote', 'Private label', 'Export enquiry', 'Become a dealer', 'Mill visit', 'Lab report / samples'];

const ContactPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = MAIN_TRANSLATIONS[lang];

  const structuredData = buildGraph(
    { '@type': 'ContactPage', name: 'Contact Vagdevi Food Products', url: absoluteUrl('/contact') },
    organizationSchema(),
    breadcrumbSchema('/contact')
  );

  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Partial<Record<keyof FormFields, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter an email address so we can reply.';
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      newErrors.email = 'That email address does not look right — check it for a typo.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Pick a topic above, or write one in.';
    if (!formData.message.trim()) newErrors.message = 'Add a line or two — variety, quantity and city is plenty.';

    setErrors(newErrors);
    // Send keyboard and screen-reader users straight to the first thing that needs fixing,
    // rather than leaving them on a submit button that silently did nothing.
    const first = FIELD_ORDER.find((f) => newErrors[f]);
    if (first) document.getElementById(first)?.focus();
    return !first;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormFields;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    if (submitError) setSubmitError(null);
  };

  // Topic chips fill the subject field rather than replacing it with a <select>, so the
  // EmailJS template — which reads `subject` — keeps working unchanged, and anyone whose
  // enquiry fits none of them can still type their own.
  const pickTopic = (topic: string) => {
    setFormData({ ...formData, subject: topic });
    if (errors.subject) setErrors({ ...errors, subject: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // A visitor cannot act on "check your .env file", and this is a public marketing site.
    // Whatever is wrong with the configuration, what they need is another way to reach us.
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS is not configured — VITE_EMAILJS_* missing from this build.');
      setSubmitError("We couldn't send that just now.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Loaded on submit rather than with the page: most visitors use WhatsApp and never
      // send the form, so they should not download the mail client either.
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(
        serviceId,
        templateId,
        form.current!,
        publicKey
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch (error) {
      // "Try again later" was actively misleading: a 404 from EmailJS means the account or
      // template is misconfigured, and no amount of retrying will fix it — the enquiry just
      // gets lost. Say something honest and put the mill's real channels next to it.
      console.error('EmailJS Error:', error);
      setSubmitError("We couldn't send that just now.");
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: keyof FormFields) => `
    block w-full px-5 py-4 bg-brand-cream/60 border transition-colors duration-200 font-medium
    text-brand-dark placeholder:text-gray-500 focus:outline-none focus:bg-white
    ${errors[fieldName]
      ? 'border-red-700 focus:ring-2 focus:ring-red-700/20'
      : 'border-brand-line hover:border-brand-gold-ink/50 focus:border-brand-gold-ink focus:ring-2 focus:ring-brand-secondary/25'
    }
  `;

  // Wires a field to its error message: announced on focus, and flagged as invalid.
  const fieldA11y = (fieldName: keyof FormFields) => ({
    'aria-invalid': errors[fieldName] ? true : undefined,
    'aria-describedby': errors[fieldName] ? `${fieldName}-error` : undefined,
  });

  const fieldError = (fieldName: keyof FormFields) =>
    errors[fieldName] ? (
      <p id={`${fieldName}-error`} className="mt-2 text-[13px] text-red-700 font-medium">{errors[fieldName]}</p>
    ) : null;

  const labelClasses = "block text-[11px] font-extrabold text-gray-800 mb-2.5 tracking-[0.16em] uppercase";
  const optional = <span className="text-gray-500 font-medium ms-1 normal-case tracking-normal text-xs">(optional)</span>;
  const required = <span className="text-brand-gold-ink" aria-hidden="true">*</span>;

  return (
    <div className="bg-brand-cream font-sans">
      <SEO
        keywords="contact vagdevi foods, rice suppliers contact, food products inquiry"
        structuredData={structuredData}
      />

      <section className="relative bg-brand-dark text-white overflow-hidden py-16 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_70%_at_80%_15%,rgba(212,175,55,0.18),transparent_62%)]" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-[#E8CE74] mb-5">{t.navContact}</div>
          <h1 className="font-display text-[34px] sm:text-6xl leading-[1.05] tracking-tight max-w-2xl mb-6">{t.contactTitle}</h1>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/80 max-w-xl">WhatsApp is the fastest way to reach the sales desk. Monday to Saturday, 9 am to 6 pm IST.</p>
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
                className="block bg-brand-whatsapp hover:bg-[#076B34] transition-colors duration-300 text-white p-8 flex flex-col gap-4 h-full"
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
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold-ink mb-2.5">Call or email</div>
                  {/* These are the primary actions on the page for anyone on a phone, so each
                      gets a full 44px row rather than only the height of its own text. */}
                  <a href={COMPANY_TEL_HREF} className="flex items-center min-h-[44px] font-display text-2xl text-gray-900 hover:text-brand-gold-ink">{COMPANY_CONTACT_PHONE}</a>
                  <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="flex items-center min-h-[44px] text-sm text-gray-600 font-medium hover:text-brand-gold-ink">{COMPANY_CONTACT_EMAIL}</a>
                </div>
                <div className="border-t border-[#F0EBDD] pt-5">
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold-ink mb-2.5">Farmers · paddy payments</div>
                  <a href={`https://wa.me/${FARMER_PAYMENTS_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] font-display text-xl text-gray-900 hover:text-brand-gold-ink">{FARMER_PAYMENTS_PHONE_FORMATTED}</a>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">Bring your pattadar passbook, bank passbook and Aadhaar copy.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal width="100%">
              <div className="bg-white border border-brand-line p-8 flex flex-col gap-6 h-full">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold-ink mb-2.5">Mill &amp; works</div>
                  <p className="text-[14.5px] leading-relaxed text-gray-700">{MILL_ADDRESS_LINES.map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</p>
                </div>
                <div className="border-t border-[#F0EBDD] pt-5">
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold-ink mb-2.5">Registered office</div>
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
            <div className="bg-white border border-brand-line p-7 sm:p-12 max-w-4xl mx-auto">
              <div className="mb-9">
                <div className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-brand-gold-ink mb-4">Prefer email?</div>
                <h2 className="font-display text-3xl sm:text-4xl leading-tight text-gray-900 mb-3">Send the details and we will reply in writing.</h2>
                <p className="text-[15px] leading-relaxed text-gray-600 font-light">We answer within one working day. For a price today, WhatsApp is faster.</p>
              </div>

              {isSubmitted ? (
                <div role="status" className="border border-brand-line bg-brand-cream p-8 sm:p-12 text-center animate-[vf-fade-in_0.4s_ease-out]">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-dark mb-6">
                    <svg className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-gray-900 mb-3">Message sent.</h3>
                  <p className="text-[15px] text-gray-600 mb-8 max-w-md mx-auto">Thank you. The sales desk will reply within one working day — usually sooner.</p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center min-h-[44px] px-6 rounded-full border-[1.5px] border-brand-dark/30 text-brand-dark text-[11px] font-extrabold tracking-[0.13em] uppercase hover:bg-brand-dark/5 transition-colors duration-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-7 animate-[vf-fade-in_0.4s_ease-out]"
                >
                  {/* A failed send used to be a dead end — the visitor was told to try again
                      later, which does not help when the mail provider is misconfigured, and
                      the enquiry was simply lost. Offer the channels the mill actually runs on
                      instead; most visitors here are on a phone with WhatsApp open anyway. */}
                  {submitError && (
                    <div role="alert" className="bg-red-50 border border-red-200 text-red-800 px-6 py-5 text-sm">
                      <p className="font-semibold">{submitError}</p>
                      <p className="mt-1">Reach us directly and we will reply the same working day.</p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        <a
                          href={WHATSAPP_BULK_QUOTE_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 min-h-[44px] bg-brand-whatsapp text-white px-5 rounded-full text-[11px] font-extrabold tracking-[0.12em] uppercase"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          WhatsApp us
                        </a>
                        <a
                          href={COMPANY_TEL_HREF}
                          className="inline-flex items-center gap-2 min-h-[44px] border-[1.5px] border-brand-dark/30 text-brand-dark px-5 rounded-full text-[11px] font-extrabold tracking-[0.12em] uppercase"
                        >
                          {COMPANY_CONTACT_PHONE}
                        </a>
                        <a
                          href={`mailto:${COMPANY_CONTACT_EMAIL}`}
                          className="inline-flex items-center gap-2 min-h-[44px] border-[1.5px] border-brand-dark/30 text-brand-dark px-5 rounded-full text-[11px] font-extrabold tracking-[0.12em] uppercase"
                        >
                          Email
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="name" className={labelClasses}>Your name {required}</label>
                      <input
                        type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange}
                        className={inputClasses('name')} placeholder="e.g. Ramesh Reddy" {...fieldA11y('name')}
                      />
                      {fieldError('name')}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>Email {required}</label>
                      <input
                        type="email" name="email" id="email" autoComplete="email" inputMode="email" value={formData.email} onChange={handleChange}
                        className={inputClasses('email')} placeholder="you@company.com" {...fieldA11y('email')}
                      />
                      {fieldError('email')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone / WhatsApp {optional}</label>
                      <input
                        type="tel" name="phone" id="phone" autoComplete="tel" value={formData.phone} onChange={handleChange}
                        className={inputClasses('phone')} placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClasses}>Company {optional}</label>
                      <input
                        type="text" name="company" id="company" autoComplete="organization" value={formData.company} onChange={handleChange}
                        className={inputClasses('company')} placeholder="e.g. Sri Lakshmi Traders"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClasses}>What is it about? {required}</label>
                    <div role="group" aria-label="Common topics" className="flex flex-wrap gap-2 mb-3">
                      {ENQUIRY_TOPICS.map((topic) => {
                        const active = formData.subject === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            aria-pressed={active}
                            onClick={() => pickTopic(topic)}
                            className={`min-h-[44px] px-4 rounded-full border text-[11px] font-extrabold tracking-[0.1em] uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/50 ${active
                              ? 'bg-brand-dark text-white border-brand-dark'
                              : 'bg-white text-gray-800 border-brand-line hover:border-brand-gold-ink/60'
                              }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange}
                      className={inputClasses('subject')} placeholder="Or type your own topic" {...fieldA11y('subject')}
                    />
                    {fieldError('subject')}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>Details {required}</label>
                    <textarea
                      name="message" id="message" rows={5} value={formData.message} onChange={handleChange}
                      className={`${inputClasses('message')} resize-y`}
                      placeholder="Variety, quantity, packing and delivery city — whatever you know so far."
                      {...fieldA11y('message')}
                    ></textarea>
                    {fieldError('message')}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2.5 min-w-[220px] bg-brand-dark text-white px-8 py-[19px] rounded-full text-xs font-extrabold tracking-[0.13em] uppercase transition-all duration-300 hover:bg-brand-secondary hover:text-brand-dark hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-brand-dark disabled:hover:text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <PaperAirplaneIcon className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-500"><span className="text-brand-gold-ink" aria-hidden="true">*</span> Required</p>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
