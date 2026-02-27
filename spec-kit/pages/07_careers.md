# Pages Spec — Careers & Recruitment (Zone 3)

---

## 1. Careers Page (`/careers`)

**Component:** `pages/Careers.tsx`  
**Access:** Public

### Page Structure

**Hero Section**
Headline: "Build the Future of AI with Apex Meridian." Sub-heading describing the company culture and growth opportunity. Two CTAs: "View Open Positions" (scrolls to jobs grid) and "Learn About Us" (links to `/about`).

**Culture & Benefits Strip**
Six icon-cards showing company benefits: Competitive Salary, Health Insurance, Flexible Hours, Learning Budget, Remote Options, Stock Options.

**Department Filter Bar**
A horizontal scrollable tab bar listing all 13 departments. Clicking a tab filters the job grid to show only positions in that department. "All Departments" is the default selected tab.

**Jobs Grid**
A responsive grid (1 column mobile, 2 tablet, 3 desktop) of job cards. Each card is structured as follows:

```
┌──────────────────────────────────────────────┐
│  Full Job Title                  [Available] │
│                                              │
│  Short 2-sentence description of the role   │
│                                              │
│  🏢 Department  📍 Cairo, Egypt  ⏰ Full-time │
│                                              │
│  [Apply Now →]   [View Requirements]         │
└──────────────────────────────────────────────┘
```

**Critical layout rule:** The job title must never be truncated. The "Available" badge is right-aligned using `flex justify-between items-start` so the title wraps naturally without being covered.

**Expandable Requirements Panel**
Clicking "View Requirements" toggles an accordion panel below the card containing four sections:

| Section | Content |
|---|---|
| Education | Degree level, field of study, preferred Egyptian universities |
| Experience | Years of experience, specific domain experience required |
| Skills | Technical skills (tools, languages, frameworks) and soft skills |
| Certificates | Required and preferred professional certifications |

### Complete Job Listings (92 Positions)

The 92 positions are distributed across 13 departments as follows:

**Engineering (15 positions)**
Senior AI Research Scientist, Machine Learning Engineer, Deep Learning Specialist, Computer Vision Engineer, NLP Engineer, Data Engineer, Backend Engineer (Node.js), Frontend Engineer (React), Full-Stack Engineer, DevOps Engineer, Cloud Infrastructure Engineer, Embedded Systems Engineer, Robotics Engineer, IoT Solutions Architect, Site Reliability Engineer

**Research & Development (8 positions)**
Principal Research Scientist, Research Engineer (AGI), Research Engineer (NLP), Research Engineer (Computer Vision), Research Intern (PhD), Data Scientist, Algorithm Developer, Research Programme Manager

**Sales & Business Development (10 positions)**
Enterprise Account Executive, Business Development Manager (Aviation), Business Development Manager (Finance), Sales Engineer (Pre-Sales), Regional Sales Manager (North Africa), Regional Sales Manager (Middle East), Channel Partner Manager, Proposal Writer, Sales Operations Analyst, CRM Administrator

**Marketing & Communications (6 positions)**
Head of Marketing, Content Marketing Manager, Digital Marketing Specialist, SEO/SEM Specialist, Graphic Designer, Social Media Manager

**Operations & Project Management (7 positions)**
Project Manager (AI Implementation), Scrum Master, Business Analyst, Operations Manager, Process Improvement Specialist, Programme Coordinator, Executive Assistant

**Human Resources (4 positions)**
HR Manager, Talent Acquisition Specialist, HR Business Partner, Learning & Development Specialist

**Finance & Accounting (5 positions)**
Chief Financial Officer, Financial Controller, Senior Accountant, Financial Analyst, Payroll Specialist

**Legal & Compliance (3 positions)**
General Counsel, Compliance Officer, IP & Contracts Specialist

**Customer Success & Support (6 positions)**
Customer Success Manager, Technical Support Engineer (L1), Technical Support Engineer (L2), Implementation Consultant, Training Specialist, Support Operations Analyst

**Product Management (5 positions)**
Head of Product, Senior Product Manager (Aviation AI), Product Manager (Social Platform), Product Designer (UX/UI), Product Analyst

**Security & Safety (6 positions)**
Chief Information Security Officer, Security Engineer (Offensive), Security Engineer (Defensive), Security Analyst (SOC), Compliance & Risk Analyst, Aviation Safety Specialist

**Quality Assurance (5 positions)**
QA Lead, QA Automation Engineer, Manual Test Engineer, Performance Test Engineer, QA Analyst

**Art & Design (12 positions)**
Creative Director, Senior UI/UX Designer, UI Designer, UX Researcher, Motion Graphics Designer, 3D Artist, Brand Designer, Illustrator, Video Editor, Photographer, Art Director, Design Systems Engineer

---

## 2. Career Application Form (`/careers/apply`)

**Component:** `pages/CareerApply.tsx`  
**Access:** Public

### Form Fields

| Field | Type | Required | Validation |
|---|---|---|---|
| Full Name | Text | Yes | Min 3 characters |
| Email Address | Email | Yes | Valid email format |
| Phone Number | Tel | Yes | Egyptian format (+20...) |
| Position Applying For | Text (pre-filled from query param) | Yes | — |
| Department | Text (pre-filled from query param) | Yes | — |
| Resume / CV | File upload | Yes | PDF only, max 5MB |
| Cover Letter | Textarea | Yes | Min 100 characters |
| LinkedIn Profile URL | URL | No | Valid URL format |
| Years of Experience | Number | Yes | 0–40 |
| Expected Salary (EGP/month) | Number | No | — |
| Available to Start | Date | Yes | Must be future date |
| How did you hear about us? | Dropdown | No | LinkedIn, Website, Referral, Job Board, Other |

### Submission Flow
1. Client validates all fields with Zod schema
2. Resume file is uploaded to S3 via `storagePut()` and the URL is saved
3. Application record is created in `jobApplications` table with status `new`
4. Email notification sent to `hr@apex-meridian.com` via Resend API with applicant details and resume link
5. Applicant receives confirmation email: "Thank you for applying to [Position] at Apex Meridian. We'll review your application and be in touch within 5–7 business days."
6. Success page shown with reference number

### URL Parameters
The form accepts `?position=Senior+AI+Research+Scientist&department=Engineering` query parameters to pre-fill the position and department fields when linked from the careers page.

---

*Next: See `pages/08_research_partnerships.md` for research and partnership page specifications.*
