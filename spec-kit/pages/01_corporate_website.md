# Pages Spec — Corporate Website (Zone 1)

Covers the main public-facing pages: Home, About, Solutions overview, Technology, Investors, and Contact.

---

## 1. Home Page (`/`)

**Component:** `client/src/pages/Home.tsx`  
**Access:** Public  
**Purpose:** Primary landing page and first impression for enterprise clients.

### Sections (top to bottom)

**Hero Section**
Full-viewport height section with animated gradient background (dark navy to blue). Contains the company logo, headline ("Pioneering AI Solutions for a Smarter Future"), sub-headline describing the company's mission, two CTA buttons ("Explore Solutions" → `/solutions`, "Get Started" → `/contact`), and a subtle particle or grid animation overlay.

**Statistics Bar**
A horizontal strip of 4 key metrics displayed as large numbers with labels:
- 50+ Enterprise Clients
- 6 AI Solution Verticals
- 200+ Team Members
- 5 Years of Innovation

**Solutions Overview Grid**
A 2×3 or 3×2 responsive grid of solution cards. Each card contains an icon, solution name, one-sentence description, and a "Learn More" link. Solutions shown: Aviation Intelligence, Cybersecurity Shield, Education & Cognitive Enhancement, AGI Research, Healthcare AI, Financial Services.

**Featured Case Studies**
Three horizontally arranged cards showcasing flagship case studies:
1. EgyptAir — Predictive Maintenance (Aviation)
2. National Bank of Egypt — Fraud Detection (Finance)
3. Vodafone Egypt — Customer Analytics (Retail)

Each card links to the corresponding case study page.

**Latest News Strip**
Three news cards showing the most recent company announcements. Each card shows the headline, date, category badge, and a "Read More" link. Links to `/news`.

**Partner Logos**
A horizontal scrolling strip of partner logos including ITIDA, TIEC, AUC, Cairo University, Zewail City, and technology partners.

**Contact CTA Banner**
Full-width dark banner with headline "Ready to Transform Your Business with AI?" and two buttons: "Schedule a Demo" (primary) and "Contact Us" (outline).

**Footer**
Four-column footer: Company (logo + description + social links), Solutions (links to all 10 solution pages), Resources (blog, case studies, whitepapers, research), Legal (privacy, terms, sitemap). Bottom bar with copyright text.

---

## 2. About Page (`/about`)

**Component:** `client/src/pages/About.tsx`  
**Access:** Public  
**Purpose:** Build trust and credibility with enterprise clients.

### Sections

**Page Hero**
Dark hero with "About Apex Meridian" heading and a one-paragraph mission statement.

**Mission, Vision, Values**
Three-column layout:
- **Mission:** "To democratise AI technology across the Middle East and Africa through cutting-edge research and enterprise-grade solutions."
- **Vision:** "A future where AI enhances human potential across every industry in the region."
- **Values:** Four pillars — Innovation Excellence, Client Success, Ethical AI, Regional Leadership.

**Company Story**
Two-column layout: left column has a timeline of milestones (founding year, first product, first enterprise client, regional expansion, current state); right column has a professional photo of the New Cairo headquarters.

**Leadership Preview**
A 3-card row showing the CEO, CTO, and COO with photos, names, titles, and a "View Full Team" button linking to `/company/leadership`.

**Key Achievements**
Four metric cards: patents filed, research papers published, countries served, enterprise clients.

**Office Locations**
A map or grid showing New Cairo headquarters address, with future expansion locations indicated.

**Links**
- "View Organization Chart" → `/organization-chart`
- "Meet Our Team" → `/team`
- "Join Our Team" → `/careers`

---

## 3. Solutions Overview (`/solutions`)

**Component:** `client/src/pages/Solutions.tsx`  
**Access:** Public  
**Purpose:** Central hub for all solution verticals.

### Sections

**Page Hero**
"AI Solutions Built for the Real World" headline with a sub-heading describing the breadth of verticals.

**Solutions Grid**
A responsive grid (2 columns on tablet, 3 on desktop) of 10 solution cards. Each card contains:
- Icon (unique per solution)
- Solution name
- 2-sentence description
- Three key feature bullet points
- "Learn More" button linking to the solution sub-page
- Hover state: card lifts with brighter border

**Industry Filter**
A horizontal tab bar allowing filtering by industry category: All, Transportation, Finance, Healthcare, Education, Technology, Media.

**ROI Calculator**
An interactive widget where the user selects their industry and company size, and the system displays estimated ROI figures. Clicking "Get Detailed Analysis" opens a contact form pre-filled with the selection.

**Request Demo CTA**
Full-width banner: "See Our AI in Action — Request a Live Demo" with a form inline (name, email, company, preferred solution).

---

## 4. Technology Page (`/technology`)

**Component:** `client/src/pages/Technology.tsx`  
**Access:** Public  
**Purpose:** Showcase the Meridian Engine platform and technical depth.

### Sections

**Page Hero**
"The Meridian Engine — Our AI Platform" with a brief description of the unified platform.

**Platform Architecture Diagram**
A visual diagram showing the layers of the Meridian Engine: Data Ingestion → Feature Engineering → Model Training → Inference Engine → API Gateway → Client Applications.

**Core Capabilities**
Five cards linking to technology sub-pages:
1. Machine Learning (`/technology/machine-learning`)
2. Natural Language Processing (`/technology/nlp`)
3. Computer Vision (`/technology/computer-vision`)
4. Robotics (`/technology/robotics`)
5. Data Analytics (`/technology/data-analytics`)

**Research Partnerships**
Logos and descriptions of university research partners: AUC, Cairo University, Zewail City.

**Innovation Lab**
Description of the internal R&D lab, ongoing research projects, and publication count.

**Open Source Contributions**
List of open-source tools and libraries published by Apex Meridian.

---

## 5. Investors Page (`/investors`)

**Component:** `client/src/pages/Investors.tsx`  
**Access:** Public  
**Purpose:** Attract investment and provide financial transparency.

### Sections

**Page Hero**
"Invest in the Future of AI in the Middle East" with key investment highlights.

**Financial Highlights**
Four metric cards: Annual Revenue Growth, Total Funding Raised, Enterprise Clients, Countries of Operation.

**Growth Metrics**
Line charts showing year-over-year growth in revenue, client count, and team size.

**Investment Opportunities**
Description of current funding round, use of funds, and growth strategy.

**Quarterly Reports**
A table of available quarterly reports with download links (PDF).

**Investor Relations Contact**
Contact card with email, phone, and a form for investor inquiries.

---

## 6. Contact Page (`/contact`)

**Component:** `client/src/pages/Contact.tsx`  
**Access:** Public  
**Purpose:** Primary lead generation and client communication channel.

### Sections

**Page Hero**
"Get in Touch" with a brief description of response time expectations (within 24 hours).

**Contact Form**
A prominent form with the following fields:
- Full Name (required)
- Email Address (required, validated)
- Phone Number (optional, Egyptian format preferred)
- Company Name (optional)
- Subject (required, dropdown: General Inquiry, Demo Request, Partnership, Support, Other)
- Message (required, textarea, min 20 characters)
- Preferred Contact Method (radio: Email, Phone)
- Submit button: "Send Message"

On submission, the form data is saved to the `contactSubmissions` table and an email is sent to `info@apex-meridian.com` via Resend API. The user sees a success message: "Thank you! We'll be in touch within 24 hours."

**Contact Information Cards**
Three cards side by side:
- **Phone:** +201 2 00 92 90 92 (clickable `tel:` link)
- **Email:** info@apex-meridian.com (clickable `mailto:` link)
- **Address:** New Cairo, Cairo Governorate, Egypt (links to Google Maps)

**Office Hours**
Sunday–Thursday: 9:00 AM – 6:00 PM EET  
Friday–Saturday: Closed

**Google Maps Embed**
Embedded map showing the New Cairo office location.

**Social Media Links**
Icons linking to LinkedIn, Twitter/X, Facebook, Instagram, YouTube — all @apex-meridian.

---

*Next: See `pages/02_solutions.md` for detailed specs of all 10 solution sub-pages.*
