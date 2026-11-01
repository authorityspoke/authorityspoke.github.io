import { useState } from 'react'
import { Seo, breadcrumbJsonLd } from '../components/Seo'

export function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact us about backlink indexing services, directory imports, or indexing consultation."
        path="/contact"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact' }])}
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">Contact Us</h1>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Tell us about your backlink list or indexing question. This form is a front-end
          demonstration for the static site — it does not send email by itself. To receive
          messages, connect it to a form service (for example Formspree or Netlify Forms) and
          update the form action in <code>src/pages/Contact.tsx</code>.
        </p>
        {sent ? (
          <p className="mt-8 rounded-xl border border-green-300 bg-green-50 p-5 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200" role="status">
            Thank you — your message has been recorded locally. We will reply once a form backend
            is connected.
          </p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold">Name</label>
              <input id="contact-name" name="name" required autoComplete="name" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold">Email</label>
              <input id="contact-email" name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-semibold">Subject</label>
              <input id="contact-subject" name="subject" required className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold">Message</label>
              <textarea id="contact-message" name="message" rows={6} required className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <button type="submit" className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white">
              Send message
            </button>
          </form>
        )}
      </section>
    </>
  )
}
