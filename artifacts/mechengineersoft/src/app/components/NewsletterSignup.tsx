'use client';

import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState('loading');
    setMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setState('error');
        setMessage(data?.message || 'We could not subscribe you right now.');
        return;
      }
      setState('done');
      setMessage(data?.message || 'You are subscribed. Thank you.');
      setEmail('');
    } catch {
      setState('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="glass-card rounded-3xl p-7 md:p-8">
      <h2 className="text-lg font-bold">Business software insights</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Practical notes on automation, ERP, and operational dashboards. One email a month, no spam.
      </p>
      <form onSubmit={submit} className="mt-5 flex flex-col sm:flex-row gap-3" aria-label="Newsletter subscription">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="form-input w-full"
            autoComplete="email"
          />
        </label>
        <button type="submit" className="btn-primary px-6 py-3 text-sm whitespace-nowrap" disabled={state === 'loading'}>
          {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p aria-live="polite" className={`text-sm mt-3 ${state === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
