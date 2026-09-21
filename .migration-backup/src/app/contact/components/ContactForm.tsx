'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  date: string;
  time: string;
  meetingType: string;
  projectSummary: string;
}

interface FormErrors {
  [key: string]: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const meetingTypes = [
  'Video Call (Google Meet)',
  'Video Call (Zoom)',
  'Phone Call',
  'In-Person Meeting',
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM',
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: '',
    time: '',
    meetingType: '',
    projectSummary: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.company.trim()) newErrors.company = 'Company name is required';
    if (!form.meetingType) newErrors.meetingType = 'Please select a meeting type';
    if (!form.projectSummary.trim()) newErrors.projectSummary = 'Please describe your project';
    else if (form.projectSummary.trim().length < 30) newErrors.projectSummary = 'Please provide at least 30 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', date: '', time: '', meetingType: '', projectSummary: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 border-glow" aria-label="Consultation booking form">
      <div className="mb-8">
        <h2 className="font-bold text-2xl text-foreground mb-2">Book a Consultation</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about your project. We'll review and respond with a structured proposal within 24 hours.
        </p>
      </div>

      {status === 'success' ? (
        <div className="text-center py-16">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
          >
            <Icon name="CheckCircleIcon" size={32} className="text-green-400" variant="solid" />
          </div>
          <h3 className="font-bold text-xl text-foreground mb-3">Inquiry Received!</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out. Our team will review your requirements and get back to you within 24 business hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="btn-secondary mt-8 text-sm px-6 py-2.5"
            aria-label="Submit another inquiry"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
          {status === 'error' && <div role="alert" className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">We couldn’t send your request. Please check your connection and try again.</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Full Name <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Rajesh Kumar"
                className="form-input"
                aria-required="true"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-xs mt-1.5" role="alert">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email Address <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="rajesh@company.com"
                className="form-input"
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-xs mt-1.5" role="alert">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                Phone Number <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="form-input"
                aria-required="true"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-400 text-xs mt-1.5" role="alert">{errors.phone}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                Company Name <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Manufacturing Pvt. Ltd."
                className="form-input"
                aria-required="true"
                aria-describedby={errors.company ? 'company-error' : undefined}
                aria-invalid={!!errors.company}
              />
              {errors.company && (
                <p id="company-error" className="text-red-400 text-xs mt-1.5" role="alert">{errors.company}</p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-foreground mb-2">
                Preferred Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
                aria-label="Preferred consultation date"
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-foreground mb-2">
                Preferred Time (IST)
              </label>
              <select
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="form-input"
                aria-label="Preferred consultation time"
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Meeting Type */}
          <div className="mb-5">
            <label htmlFor="meetingType" className="block text-sm font-semibold text-foreground mb-2">
              Meeting Type <span className="text-accent" aria-hidden="true">*</span>
            </label>
            <select
              id="meetingType"
              name="meetingType"
              value={form.meetingType}
              onChange={handleChange}
              className="form-input"
              aria-required="true"
              aria-describedby={errors.meetingType ? 'meetingType-error' : undefined}
              aria-invalid={!!errors.meetingType}
            >
              <option value="">Select meeting type</option>
              {meetingTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.meetingType && (
              <p id="meetingType-error" className="text-red-400 text-xs mt-1.5" role="alert">{errors.meetingType}</p>
            )}
          </div>

          {/* Project Summary */}
          <div className="mb-8">
            <label htmlFor="projectSummary" className="block text-sm font-semibold text-foreground mb-2">
              Project Summary <span className="text-accent" aria-hidden="true">*</span>
            </label>
            <textarea
              id="projectSummary"
              name="projectSummary"
              value={form.projectSummary}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your project — what software do you need, what problem does it solve, and what's your approximate timeline and budget?"
              className="form-input resize-none"
              aria-required="true"
              aria-describedby={errors.projectSummary ? 'projectSummary-error' : undefined}
              aria-invalid={!!errors.projectSummary}
            />
            <div className="flex justify-between mt-1.5">
              {errors.projectSummary ? (
                <p id="projectSummary-error" className="text-red-400 text-xs" role="alert">{errors.projectSummary}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-muted-foreground">{form.projectSummary.length} chars</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full flex items-center justify-center gap-3 text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Submit consultation request"
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Icon name="PaperAirplaneIcon" size={18} />
                Submit Consultation Request
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By submitting, you agree to our{' '}
            <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
            We'll respond within 24 business hours.
          </p>
        </form>
      )}
    </div>
  );
}
