import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { SHORT_COMPANY_NAME, COMPANY_ADDRESS, COMPANY_CONTACT_EMAIL, COMPANY_CONTACT_PHONE_FORMATTED, CONTACT_MAP_PLACEHOLDER_URL } from '../constants';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form data submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', company: '', subject: '', message: '' }); 
    
    setTimeout(() => {
        setIsSubmitted(false);
    }, 6000);
  };

  return (
    <div className="bg-brand-bg font-sans pt-12 md:pt-16"> {/* Added top padding here */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Get In Touch With Us"
          subtitle="We'd love to hear from you. Reach out for B2B inquiries about our Quality rice, to build a Trusted partnership, or discuss reliable Supply solutions."
        />

        <div className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16"> {/* Adjusted padding */}
          {/* Contact Information */}
          <div className="lg:col-span-5 bg-brand-bg-alt p-8 md:p-10 rounded-xl shadow-subtle">
            <h3 className="text-2xl font-serif font-semibold text-text-heading mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-brand-orange mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-medium text-text-heading mb-0.5">Our Address</h4>
                  <p className="text-text-body text-base leading-relaxed">{SHORT_COMPANY_NAME}<br/>{COMPANY_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start">
                <EnvelopeIcon className="h-6 w-6 text-brand-orange mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-medium text-text-heading mb-0.5">Email Us</h4>
                  <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="text-brand-orange hover:text-text-heading transition-colors duration-300 break-all hover:underline text-base">{COMPANY_CONTACT_EMAIL}</a>
                  <p className="text-sm text-text-muted mt-0.5">For sales and general inquiries regarding Quality, Trust, and Supply.</p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 text-brand-orange mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-medium text-text-heading mb-0.5">Call Us</h4>
                  <a href={`tel:${COMPANY_CONTACT_PHONE_FORMATTED.replace(/\s|-/g, "")}`} className="text-brand-orange hover:text-text-heading transition-colors duration-300 hover:underline text-base">{COMPANY_CONTACT_PHONE_FORMATTED}</a>
                   <p className="text-sm text-text-muted mt-0.5">Mon - Sat, 9 AM - 6 PM IST.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200/70">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.9789240473942!2d79.59740769999999!3d16.876937100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35250429b5232d%3A0x97c88d0bd3e943fd!2sVagdevi%20Food%20Products%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756100292717!5m2!1sen!2sin" width="100%" height="240" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg shadow-subtle"></iframe>
                <p className="text-xs text-text-muted mt-2 text-center">Visual representation of our location area.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-brand-bg-alt p-8 md:p-10 rounded-xl shadow-subtle">
            <h3 className="text-2xl font-serif font-semibold text-text-heading mb-6">Send Us a Message</h3>
            {isSubmitted ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-bold font-serif text-lg">Thank You!</p>
                    <p className="text-sm">Your message has been sent successfully. We will get back to you shortly.</p>
                </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-brown-medium mb-1">Full Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required 
                         className="block w-full px-3.5 py-2.5 bg-brand-bg border border-gray-300/70 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange/70 focus:border-brand-orange text-base text-text-body transition-shadow duration-200 hover:border-brand-orange/60"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-brown-medium mb-1">Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required
                         className="block w-full px-3.5 py-2.5 bg-brand-bg border border-gray-300/70 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange/70 focus:border-brand-orange text-base text-text-body transition-shadow duration-200 hover:border-brand-orange/60"/>
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-brand-brown-medium mb-1">Company Name (Optional)</label>
                <input type="text" name="company" id="company" value={formData.company} onChange={handleChange}
                       className="block w-full px-3.5 py-2.5 bg-brand-bg border border-gray-300/70 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange/70 focus:border-brand-orange text-base text-text-body transition-shadow duration-200 hover:border-brand-orange/60"/>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-brand-brown-medium mb-1">Subject</label>
                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required
                       className="block w-full px-3.5 py-2.5 bg-brand-bg border border-gray-300/70 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange/70 focus:border-brand-orange text-base text-text-body transition-shadow duration-200 hover:border-brand-orange/60"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-brown-medium mb-1">Your Message</label>
                <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} required
                          className="block w-full px-3.5 py-2.5 bg-brand-bg border border-gray-300/70 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange/70 focus:border-brand-orange text-base text-text-body transition-shadow duration-200 hover:border-brand-orange/60"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-brand-orange hover:bg-opacity-90 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;