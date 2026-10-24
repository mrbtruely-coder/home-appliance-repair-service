# Doorstep Home Appliance Services — Next.js Website

Customer-facing home-service website built with Next.js App Router, JavaScript, and responsive CSS. The project is configured for static export (`out/`).

## Run locally (Windows PowerShell)

```powershell
cd C:\path\to\doorstep-services
npm install
npm run dev
```

Open `http://localhost:3000`. For a production static export, run `npm run build`; the exported site should be generated in `out/`. The project build has not been verified in this environment, so run the build locally before deployment.

## Main routes

- `/` — redesigned home page, service search suggestions, area links, sign-in-only member offers, app promotion, review placeholder
- `/services/` and `/services/[slug]/` — service catalogue and individual SEO pages
- `/locations/` and `/locations/[slug]/` — location coverage pages
- `/search/` — service search
- `/booking/` — booking enquiry form
- `/checkout/` — guided enquiry review; sends a prepared request to WhatsApp, no payment is taken
- `/login/`, `/register/` — account UI preview
- `/notifications/` — notification centre UI preview
- `/plans/` — membership information page
- `/app/` — mobile app promotion landing page
- `/articles/` and `/articles/[slug]/` — editorial hub and SEO-focused appliance care guides
- `/about/`, `/faqs/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/cancellation-policy/`

## Included UX

- Responsive header and navigation, search suggestions as the user types, and call/WhatsApp links
- Location selection dialog that appears on first visit until an area is selected or the dialog is dismissed. Browser geolocation is only requested after the visitor clicks “Use my current location”; the visitor can select an area manually. A browser location permission does not itself determine the correct service locality, so the customer chooses the nearest listed area and the business confirms exact coverage.
- ₹299 displayed price across service cards, service enquiry actions, and checkout. Confirm the included scope and any additional charges before approving work.
- Login/register demo state and member offers shown on the home page after a preview sign-in
- App promotion section with a mobile UI mockup and launch-notification placeholder
- No invented customer reviews. Add only verified reviews with permission.
- Per-page metadata, canonical URLs, Open Graph tags, JSON-LD, sitemap and robots rules

## Important production work before launch

1. In `src/lib/site.js`, replace `https://doorstepservices.example` with your real HTTPS domain.
2. The login/register flows only create a local demo profile in the visitor’s browser. They are **not authentication**. Implement server-side accounts, OTP verification, secure sessions, rate limiting, consent and account recovery before production. Optional Cloudflare Turnstile UI can be enabled with `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; because this project uses static export, the token is not validated server-side here. Add a server-side Siteverify check in your real backend and reject requests without a valid token before treating CAPTCHA as security.
3. The notification centre is a UI preview. Connect a database, booking API, email/SMS/WhatsApp provider, and authorization checks for real notifications and booking history.
4. The checkout route is an enquiry flow, not a payment gateway. Integrate payment only if required, using a compliant backend and verified payment webhooks.
5. Add the official Google Play / Apple App Store links once the mobile apps are published.
6. Confirm whether ₹299 is the full service price or a visit/inspection/enquiry fee. Current copy intentionally tells customers to confirm scope and additional charges before work; align this with the actual approved pricing policy.
7. VIP savings are presented as a membership concept only. Publish discounts only after the offer terms are approved. Tenant verification, rental agreements and painting are not shown as active Doorstep services because they are outside the current appliance-repair catalogue.
8. Add genuine customer reviews, verified business details, service hours, cancellation/refund terms and real images. Do not publish fabricated testimonials, ratings or guarantees.
9. Review privacy/legal text with a qualified professional and ensure forms comply with applicable privacy requirements.
10. Run `npm run lint` and `npm run build` locally, test all routes on mobile/desktop, then deploy the `out/` directory to a static host that supports HTTPS and the chosen domain.

## CAPTCHA, articles and content publishing

- Optional Turnstile widget is shown on login and registration when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured in the build environment. A client-side widget alone is not security; validate every token on the server using your backend secret, rate-limit requests, and keep the secret out of `NEXT_PUBLIC_*` variables.
- `/articles/` contains initial educational articles with individual metadata, canonical URLs, Open Graph metadata, `BlogPosting` JSON-LD and sitemap entries. Editorial dates currently represent the initial content date; review and update them when publishing.
- Have a qualified technician review safety guidance and an editor verify all article content before publication. Do not present general information as a diagnosis or a guarantee.

## Business configuration

- Phone / WhatsApp: `+91 95156 61677`
- Listed service areas: Ameerpet Main Road, Chanda Nagar, Alwal and Suchitra, Hyderabad
- Services: AC, refrigerator, washing machine, oven/microwave, geyser and TV

## Help Center and booking details

- `/help-center/` provides customer support topics and quick FAQs.
- Service detail pages include service-specific FAQs, preferred appointment windows, payment guidance, cancellation links and area coverage notes.
- Booking and checkout forms include a preferred date/time window and payment preference. These are requests only; appointment times and accepted payment methods must be confirmed by the team.
- The current site sends enquiries to WhatsApp and does not process online payments or persist bookings. A production release should connect authentication, booking records, notifications, payment processing (if needed), and admin operations to a secure backend.

## Service filters and checkout price breakdown

- The services directory supports live text search, category chips/dropdown, listed-area selection, and sorting controls. Service-detail pages show related services from the same category first where available.
- Every service card continues to display the base service price of ₹299.
- Checkout currently displays configurable example values from `src/lib/site.js`: `GST_RATE = 18` and `PLATFORM_FEE = 10`. These are **not tax/legal advice or verified business settings**. Confirm GST applicability, the correct rate and tax base, platform-fee policy, and final customer disclosures with your accountant/business team before launch.
- Checkout remains an enquiry flow: it calculates and includes the estimated breakdown in the WhatsApp enquiry, but does not charge the customer or create a confirmed order.
