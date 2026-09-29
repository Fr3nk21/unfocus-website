# francescobugugnoli.com

My personal portfolio — video production, photography and web work under the [UnFocus](https://unfocus.com.au) studio name.

**Live:** [francescobugugnoli.com](https://www.francescobugugnoli.com)

---

## What's inside

- **Project showcase** — video loops, galleries and a lightbox for client work (corporate, documentary, brand and social content).
- **Animated hero** — a custom particle animation drawn on HTML Canvas.
- **Contact form** — a Next.js API route that sends enquiries through [Resend](https://resend.com), with input validation and rate limiting.
- **Light and dark theme**, cookie banner, scroll-reveal animations and a mobile-first layout.

## Stack

- Next.js 16 (App Router) · React 19
- Tailwind CSS 4
- HTML Canvas animation
- Resend (transactional email)
- Deployed on Vercel

## Structure

```
app/
  components/   UI sections (Hero, Services, Gallery, Contact, …)
  api/contact/  Contact form endpoint
  hooks/        Shared React hooks
public/         Images and video assets
```

## Running locally

```bash
npm install
npm run dev
```

The contact form needs a `RESEND_API_KEY` environment variable.

---

Built by [Francesco Bugugnoli](https://www.francescobugugnoli.com) · [LinkedIn](https://www.linkedin.com/in/francesco-bugugnoli-3325b656/)
