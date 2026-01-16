# Apex Meridian Website - Administrator Documentation

**Prepared by:** Amro Gaber  
**Last Updated:** January 16, 2026  
**Version:** 1.0

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Project Structure](#project-structure)
5. [Features & Functionality](#features--functionality)
6. [Content Management](#content-management)
7. [Database Schema](#database-schema)
8. [Authentication & Security](#authentication--security)
9. [Email Notifications](#email-notifications)
10. [Deployment Guide](#deployment-guide)
11. [Maintenance & Troubleshooting](#maintenance--troubleshooting)
12. [API Reference](#api-reference)
13. [Environment Variables](#environment-variables)

---

## Executive Summary

The Apex Meridian website is a comprehensive corporate platform showcasing AI technology solutions with a focus on regional markets (Egypt, North Africa, Middle East, Rest of Africa, and Europe). The platform features a full-stack web application built with modern technologies, including employee management systems, HR dashboards, career portals, and automated email notifications.

### Key Statistics

| Metric | Value |
|--------|-------|
| Total Pages | 50+ |
| Departments | 13 |
| Job Positions | 97 |
| Solution Pages | 9 |
| Technology Pages | 5 |
| Resource Pages | 4 |
| Data Centers | 6 (planned) |

### Target Markets (Priority Order)

1. **Egypt** (Primary) - Headquarters in New Cairo
2. **North Africa** (Secondary) - Regional expansion
3. **Middle East** (Tertiary) - Strategic partnerships
4. **Rest of Africa** (Quaternary) - Growth markets
5. **Europe** (Quinary) - International presence

---

## Technology Stack

### Frontend Technologies

The client-side application leverages modern React ecosystem tools to deliver a responsive and performant user experience.

**Core Framework:**
- **React 19** - Latest version with concurrent features and automatic batching
- **TypeScript** - Type-safe development with full IDE support
- **Vite** - Lightning-fast development server and optimized production builds

**Styling & UI:**
- **Tailwind CSS 4** - Utility-first CSS framework with custom design system
- **shadcn/ui** - High-quality React components built on Radix UI primitives
- **Lucide React** - Beautiful, consistent icon library

**Routing & State:**
- **Wouter** - Lightweight client-side routing (2KB)
- **TanStack Query (React Query)** - Server state management and caching

**Forms & Validation:**
- **React Hook Form** - Performant form handling with minimal re-renders
- **Zod** - TypeScript-first schema validation

### Backend Technologies

The server-side infrastructure provides type-safe API endpoints with end-to-end type safety from database to client.

**Runtime & Framework:**
- **Node.js 22** - Latest LTS with enhanced performance
- **Express 4** - Minimal and flexible web application framework
- **tRPC 11** - End-to-end typesafe APIs without code generation

**Database:**
- **MySQL/TiDB** - Relational database with cloud-native scalability
- **Drizzle ORM** - TypeScript ORM with SQL-like syntax

**Authentication:**
- **Manus OAuth** - Integrated OAuth 2.0 authentication
- **JWT** - JSON Web Tokens for session management
- **bcryptjs** - Password hashing for employee accounts

**Email Service:**
- **Resend** - Modern email API for transactional emails

### Development Tools

**Testing:**
- **Vitest** - Fast unit test framework compatible with Vite
- **Testing Library** - User-centric testing utilities

**Code Quality:**
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Static type checking

**Version Control:**
- **Git** - Distributed version control
- **GitHub** - Repository hosting at `cptamrgaber/apex-meridian.com-final-2026`

---

## Architecture Overview

### System Architecture

The Apex Meridian platform follows a modern three-tier architecture pattern with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (React 19 + TypeScript + Tailwind CSS + shadcn/ui)        │
│                                                              │
│  - Public Pages (Home, About, Solutions, etc.)              │
│  - Protected Pages (Employee Portal, HR Dashboard)          │
│  - Authentication UI (Login, Session Management)            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ tRPC (Type-safe API)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      Server Layer                            │
│         (Node.js + Express + tRPC + Drizzle ORM)            │
│                                                              │
│  - API Routers (auth, employee, careers, requests)          │
│  - Business Logic (authentication, authorization)           │
│  - Email Service (Resend integration)                       │
│  - File Storage (S3 integration)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ SQL Queries
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                     Database Layer                           │
│                  (MySQL/TiDB + Drizzle)                      │
│                                                              │
│  - users (Manus OAuth users)                                │
│  - employees (Internal authentication)                      │
│  - jobApplications (Career applications)                    │
│  - employeeRequests (Vacation, duty, reports)               │
│  - departmentProjects (Project tracking)                    │
│  - companyDocuments (Policy documents)                      │
└─────────────────────────────────────────────────────────────┘
```

### Infrastructure Strategy

Apex Meridian operates on a **self-hosted infrastructure** model with planned data centers across target regions. The company does not rely on third-party cloud providers (AWS, Azure, GCP) for production hosting, ensuring data sovereignty and regional compliance.

**Planned Data Centers:**

| Location | Status | Capacity | Launch Date |
|----------|--------|----------|-------------|
| Cairo, Egypt | Active | 5,000 servers | Q1 2026 |
| Alexandria, Egypt | Active | 3,000 servers | Q2 2026 |
| Casablanca, Morocco | Planning | 2,500 servers | Q3 2026 |
| Dubai, UAE | Planning | 4,000 servers | Q4 2026 |
| Nairobi, Kenya | Planning | 2,000 servers | Q1 2027 |
| Lagos, Nigeria | Planning | 3,500 servers | Q2 2027 |

---

## Project Structure

### Directory Organization

The project follows a modular structure with clear separation between client and server code.

```
apex-meridian-web/
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   │   ├── images/          # Image files
│   │   ├── favicon.ico      # Browser icon
│   │   └── favicon-*.png    # High-res favicons
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── Footer.tsx  # Site footer
│   │   │   ├── Header.tsx  # Navigation header
│   │   │   ├── DashboardLayout.tsx  # Dashboard shell
│   │   │   └── Map.tsx     # Google Maps integration
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   │   └── trpc.ts    # tRPC client setup
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Solutions.tsx
│   │   │   ├── Careers.tsx
│   │   │   ├── EmployeePortal.tsx
│   │   │   ├── HRDashboard.tsx
│   │   │   ├── HRRequests.tsx
│   │   │   ├── DataCenterRoadmap.tsx
│   │   │   ├── OnboardingPortal.tsx
│   │   │   ├── DepartmentPortal.tsx
│   │   │   └── solutions/  # Solution sub-pages
│   │   ├── App.tsx         # Main app component & routing
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles & theme
│   └── index.html          # HTML template
├── server/                   # Backend application
│   ├── _core/              # Core server infrastructure
│   │   ├── index.ts       # Server entry point
│   │   ├── trpc.ts        # tRPC setup
│   │   ├── context.ts     # Request context
│   │   ├── env.ts         # Environment config
│   │   ├── cookies.ts     # Cookie management
│   │   ├── systemRouter.ts # System routes
│   │   └── oauth/         # OAuth integration
│   ├── db.ts              # Database connection
│   ├── routers.ts         # API route definitions
│   ├── employeeDb.ts      # Employee data access
│   ├── careersDb.ts       # Career application logic
│   ├── email.ts           # Email service (contact form)
│   ├── notifications.ts   # Email notifications (HR)
│   ├── *.test.ts          # Vitest test files
│   └── storage.ts         # S3 file storage
├── drizzle/                 # Database schema & migrations
│   └── schema.ts          # Table definitions
├── shared/                  # Shared types & constants
├── storage/                 # S3 storage helpers
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── drizzle.config.ts       # Drizzle ORM config
└── README.md               # Project documentation
```

### Key Files Explained

**Client-Side:**

- **`client/src/App.tsx`** - Main application component containing all route definitions. Add new routes here.
- **`client/src/lib/trpc.ts`** - tRPC client configuration. Provides type-safe API calls throughout the app.
- **`client/src/index.css`** - Global styles, CSS variables for theming, and Tailwind configuration.
- **`client/src/components/Header.tsx`** - Navigation header with dropdown menus for all sections.
- **`client/src/components/Footer.tsx`** - Site footer with company info, links, and social media.
- **`client/src/components/DashboardLayout.tsx`** - Reusable dashboard shell with sidebar navigation.

**Server-Side:**

- **`server/routers.ts`** - All tRPC API endpoints. Contains auth, employee, careers, and request routers.
- **`server/db.ts`** - Database connection and query helpers.
- **`server/employeeDb.ts`** - Employee authentication and management functions.
- **`server/notifications.ts`** - Email notification service with HTML templates.
- **`drizzle/schema.ts`** - Database table definitions. Modify this file to change database structure.

---

## Features & Functionality

### Public Pages (No Authentication Required)

The public-facing website provides comprehensive information about Apex Meridian's services, technology, and company information.

#### Core Pages

**Home Page** (`/`)
- Hero section with company tagline and call-to-action buttons
- Featured solutions overview
- Technology highlights
- Client testimonials section
- Latest news and updates

**About Us** (`/about`)
- Company mission, vision, and values
- Leadership team profiles
- Company history and milestones
- Global presence with regional priorities
- Office locations with images
- Organization structure link

**Solutions** (`/solutions`)
- Overview of all AI solutions
- Nine solution categories with dedicated pages:
  1. Aviation Intelligence
  2. Cybersecurity Shield
  3. Education & Cognitive Enhancement
  4. AGI Research
  5. Media Production (NEW)
  6. Healthcare AI
  7. Financial Services AI
  8. Manufacturing Optimization
  9. Retail Intelligence

**Technology** (`/technology`)
- Meridian Engine platform overview
- Technical architecture diagram
- Self-hosted infrastructure details
- Data center strategy
- Machine learning capabilities
- Natural language processing
- Computer vision systems
- Robotics integration

**Investors** (`/investors`)
- Financial highlights and growth metrics
- Market opportunity analysis
- Regional expansion strategy
- Investment opportunities
- Contact information for investor relations

**Contact** (`/contact`)
- Contact form with email integration
- Office address: New Cairo, Cairo Governorate, Egypt
- Phone: +20 1 2 00 92 90 92
- Email: info@apex-meridian.com
- Department-specific email addresses
- Social media links: @apex-meridian

#### Resource Pages

**Careers** (`/careers`)
- 97 job positions across 13 departments
- Detailed job descriptions with requirements
- Education requirements (including regional universities)
- Required certifications and qualifications
- Online application form with resume upload
- Application tracking system

**Blog** (`/resources/blog`)
- Technical articles and thought leadership
- Industry insights and trends
- Company announcements
- Research updates

**Case Studies** (`/resources/case-studies`)
- Real-world implementation examples
- Client success stories from target regions
- ROI analysis and metrics
- Industry-specific solutions

**Whitepapers** (`/resources/whitepapers`)
- Technical deep-dives
- Research findings
- Best practices guides
- Downloadable PDF documents

**Research** (`/resources/research`)
- Academic publications
- Collaboration with universities
- Innovation initiatives

#### Company Pages

**Team** (`/company/team`)
- Leadership profiles
- Department heads
- Advisory board

**Partners** (`/company/partners`)
- Technology partners (NVIDIA, Intel, Microsoft)
- Academic partners (AUC, Cairo University, Ain Shams, Alexandria)
- Egyptian tech organizations (ITIDA, TIEC, Egyptian AI Society)
- Research institutions
- Industry collaborations

**Organization Chart** (`/company/organization`)
- Visual hierarchy of 13 departments
- Department email addresses
- Leadership structure
- Reporting relationships

**Awards** (`/company/awards`)
- Industry recognition
- Certifications
- Achievements

**Press** (`/company/press`)
- Media coverage
- Press releases
- Media kit

**Site Map** (`/sitemap`)
- Complete navigation structure
- All 50+ pages organized by category

### Protected Pages (Authentication Required)

The internal systems provide comprehensive employee management, HR operations, and administrative functions.

#### Employee Portal

**Login** (`/login`)
- Employee authentication with username/password
- Session management with JWT tokens
- Secure cookie-based sessions
- Password hashing with bcrypt

**Employee Portal Dashboard** (`/employee`)
- Personal information display
- Department information
- Quick links to common tasks
- Announcements and updates
- Access to department-specific resources

**Department Portals** (`/departments/:dept`)
- 13 department-specific pages:
  1. Engineering
  2. Research & Development
  3. Sales
  4. Marketing
  5. Operations
  6. Human Resources
  7. Finance & Accounting
  8. Legal
  9. Customer Success
  10. Product Management
  11. Security & Safety
  12. Quality Assurance
  13. Art & Design (NEW)

Each department portal includes:
- Department policies and rules
- Current projects with progress tracking
- Team member directory
- Department-specific resources
- Document library

**Employee Requests** (`/employee/requests`)
- Submit vacation requests
- Request duty assignments
- Submit reports
- Track request status (pending, approved, rejected)
- View request history
- Email notifications on status changes

**Onboarding Portal** (`/onboarding`)
- New hire orientation materials
- Training modules with progress tracking
- Company policies and procedures
- Department-specific onboarding
- Document library
- Milestone notifications

#### HR Dashboard

**HR Dashboard** (`/hr-dashboard`)
- Employee management interface
- Add, edit, delete employees
- Activate/deactivate employee accounts
- View employee list with filters
- Access to all HR functions

**HR Requests Management** (`/hr-requests`)
- View all employee requests
- Filter by status (pending, approved, rejected)
- Filter by request type (vacation, duty assignment, report)
- Search by employee name or department
- Approve requests with optional notes
- Reject requests with required reason
- Automatic email notifications to employees
- Request details with employee information

**Job Applications** (`/applications`)
- View all career applications
- Filter by position and department
- Review resumes and cover letters
- Application status tracking
- Applicant contact information

**Data Center Roadmap** (`/data-center-roadmap`)
- Visual timeline of data center expansion
- 6 planned facilities across target regions
- Capacity and status information
- Strategic benefits of each location
- Infrastructure investment details

### Email Notification System

The platform includes a comprehensive email notification system powered by Resend API with professional HTML templates.

**Notification Types:**

1. **Request Approval Notifications**
   - Sent to employees when HR approves requests
   - Includes request details and reviewer name
   - Professional branded template

2. **Request Rejection Notifications**
   - Sent to employees when HR rejects requests
   - Includes reason for rejection
   - Contact information for follow-up

3. **Onboarding Milestone Notifications**
   - Sent when employees complete training modules
   - Includes next steps and progress updates
   - Links to onboarding portal

4. **HR Alert Notifications**
   - Sent to HR when new requests are submitted
   - Includes request details and employee information
   - Direct link to review interface

**Email Template Features:**
- Responsive HTML design
- Company branding (logo, colors)
- Professional styling
- Clear call-to-action buttons
- Footer with company information

---

## Content Management

### Adding New Pages

To add a new page to the website:

1. **Create Page Component**
   ```typescript
   // client/src/pages/NewPage.tsx
   export default function NewPage() {
     return (
       <div className="container py-12">
         <h1 className="text-4xl font-bold">New Page Title</h1>
         <p>Page content here...</p>
       </div>
     );
   }
   ```

2. **Add Route in App.tsx**
   ```typescript
   import NewPage from "./pages/NewPage";
   
   // Inside Switch component:
   <Route path={"/new-page"} component={NewPage} />
   ```

3. **Add Navigation Link** (if needed)
   - Edit `client/src/components/Header.tsx`
   - Add link to appropriate dropdown menu

4. **Update Site Map**
   - Edit `client/src/pages/SiteMap.tsx`
   - Add new page to appropriate category

### Modifying Existing Content

**Text Content:**
- Page text is directly in component files under `client/src/pages/`
- Edit the JSX content in the respective `.tsx` file
- No database changes needed for static content

**Images:**
- Store images in `client/public/images/`
- Reference with absolute paths: `/images/filename.jpg`
- Use descriptive filenames with content hashes for cache busting
- Maintain aspect ratios and optimize file sizes

**Styling:**
- Global styles in `client/src/index.css`
- Component-specific styles use Tailwind utility classes
- Theme colors defined as CSS variables in `index.css`

### Managing Job Listings

Job positions are defined in `client/src/pages/Careers.tsx` as a JavaScript array.

**Job Object Structure:**
```typescript
{
  id: number,
  title: string,
  department: string,
  location: "Cairo, Egypt",
  type: "Full-time",
  description: string,
  requirements: {
    education: string[],
    experience: string,
    skills: string[],
    certificates: string[]
  }
}
```

**To Add a New Job:**
1. Open `client/src/pages/Careers.tsx`
2. Add new job object to `allJobs` array
3. Ensure all required fields are filled
4. Save and restart server

**To Remove a Job:**
1. Open `client/src/pages/Careers.tsx`
2. Remove or comment out the job object
3. Save and restart server

### Managing Departments

Departments are defined in `client/src/pages/DepartmentPortal.tsx`.

**To Add a New Department:**
1. Open `client/src/pages/DepartmentPortal.tsx`
2. Add new department object to `departmentData`
3. Include policies, projects, team members, and resources
4. Update organization chart in `/company/organization`
5. Add department jobs to Careers page

---

## Database Schema

### Tables Overview

The database uses MySQL/TiDB with Drizzle ORM for type-safe queries.

| Table Name | Purpose | Key Fields |
|------------|---------|------------|
| `users` | Manus OAuth users | id, openId, email, role |
| `employees` | Internal employee accounts | id, username, password, email, department, role |
| `jobApplications` | Career applications | id, fullName, email, position, resume, status |
| `employeeRequests` | Employee requests | id, employeeId, requestType, status, reviewedBy |
| `departmentProjects` | Project tracking | id, department, projectName, progress, status |
| `companyDocuments` | Policy documents | id, title, category, fileUrl, department |

### Users Table

Stores Manus OAuth authenticated users (external users, not employees).

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### Employees Table

Stores internal employee accounts with password authentication.

```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,  -- bcrypt hashed
  name TEXT NOT NULL,
  email VARCHAR(320) NOT NULL,
  department VARCHAR(100),
  role ENUM('admin', 'employee', 'hr') DEFAULT 'employee' NOT NULL,
  isActive INT DEFAULT 1 NOT NULL,  -- 1=active, 0=inactive
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  lastLogin TIMESTAMP
);
```

**Default Admin Account:**
- Username: `admin`
- Password: `admin` (change immediately after first login)

### Job Applications Table

Stores career application submissions.

```sql
CREATE TABLE jobApplications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(200) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  position VARCHAR(200) NOT NULL,
  department VARCHAR(100) NOT NULL,
  coverLetter TEXT NOT NULL,
  resumeUrl VARCHAR(500) NOT NULL,
  linkedinUrl VARCHAR(500),
  portfolioUrl VARCHAR(500),
  status ENUM('pending', 'reviewing', 'interviewed', 'accepted', 'rejected') DEFAULT 'pending' NOT NULL,
  appliedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### Employee Requests Table

Stores employee requests for vacation, duty assignments, and reports.

```sql
CREATE TABLE employeeRequests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeId INT NOT NULL,
  employeeName VARCHAR(200) NOT NULL,
  department VARCHAR(100) NOT NULL,
  requestType ENUM('vacation', 'duty_assignment', 'report', 'other') NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  startDate TIMESTAMP,
  endDate TIMESTAMP,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
  hrNotes TEXT,
  reviewedBy INT,  -- Employee ID of HR reviewer
  reviewedByName VARCHAR(200),
  reviewedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
```

### Department Projects Table

Tracks department projects and their progress.

```sql
CREATE TABLE departmentProjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(100) NOT NULL,
  projectName VARCHAR(200) NOT NULL,
  description TEXT,
  progress INT DEFAULT 0,  -- 0-100 percentage
  status ENUM('planning', 'in_progress', 'on_hold', 'completed') DEFAULT 'planning' NOT NULL,
  startDate TIMESTAMP,
  targetDate TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
```

### Company Documents Table

Stores company policies, procedures, and documentation.

```sql
CREATE TABLE companyDocuments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,  -- 'policy', 'procedure', 'manual', etc.
  fileUrl VARCHAR(500) NOT NULL,
  department VARCHAR(100),  -- NULL for company-wide documents
  isPublic INT DEFAULT 0,  -- 1=visible to all employees, 0=restricted
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
```

### Database Migrations

The project uses Drizzle ORM for schema management and migrations.

**To modify the database schema:**

1. Edit `drizzle/schema.ts`
2. Run migration command:
   ```bash
   pnpm db:push
   ```
3. Drizzle will automatically generate and apply migrations

**Migration Commands:**
- `pnpm db:push` - Push schema changes to database
- `pnpm db:generate` - Generate migration files
- `pnpm db:migrate` - Apply pending migrations
- `pnpm db:studio` - Open Drizzle Studio (visual database browser)

---

## Authentication & Security

### Authentication Flow

The platform supports two authentication methods:

1. **Manus OAuth** - For external users (currently not actively used)
2. **Employee Authentication** - For internal staff with username/password

#### Employee Login Process

1. User visits `/login` and enters username/password
2. Server validates credentials against `employees` table
3. Password is compared using bcrypt
4. If valid, server creates JWT token with employee data
5. Token is stored in HTTP-only cookie
6. User is redirected to Employee Portal
7. All subsequent requests include cookie for authentication

#### Session Management

- Sessions use JWT (JSON Web Tokens) stored in HTTP-only cookies
- Cookie name: `manus_session`
- Cookie is secure (HTTPS only in production)
- Cookie is SameSite=Lax for CSRF protection
- Session expires after 30 days of inactivity

#### Protected Routes

Protected routes check for valid session cookie before rendering:

```typescript
// In component
const { user, isLoading } = useAuth();

if (isLoading) return <LoadingSpinner />;
if (!user) return <Navigate to="/login" />;

// Render protected content
```

### Security Best Practices

**Password Security:**
- All passwords hashed with bcrypt (cost factor: 10)
- Never store plaintext passwords
- Password requirements: minimum 8 characters (recommended)

**Session Security:**
- HTTP-only cookies prevent XSS attacks
- Secure flag ensures HTTPS transmission
- SameSite attribute prevents CSRF attacks
- Short session lifetime reduces exposure

**Input Validation:**
- All API inputs validated with Zod schemas
- SQL injection prevented by Drizzle ORM parameterized queries
- XSS prevented by React's automatic escaping

**File Upload Security:**
- Resume uploads limited to PDF format
- File size limited to 5MB
- Files stored in S3 with unique keys
- No executable files allowed

### Role-Based Access Control

The system supports three employee roles:

| Role | Permissions |
|------|-------------|
| `admin` | Full system access, employee management, all dashboards |
| `hr` | HR dashboard, employee requests, job applications |
| `employee` | Employee portal, department resources, submit requests |

**Implementing Role Checks:**

```typescript
// In tRPC procedure
protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'hr' && ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({ ctx });
})
```

---

## Email Notifications

### Resend Integration

The platform uses Resend API for sending transactional emails.

**Configuration:**
- API Key stored in `RESEND_API_KEY` environment variable
- From address: `notifications@apex-meridian.com`
- Service wrapper: `server/notifications.ts`

### Email Templates

All emails use professional HTML templates with company branding.

**Template Features:**
- Responsive design (mobile-friendly)
- Company logo and colors
- Clear call-to-action buttons
- Footer with company information
- Consistent styling across all emails

### Notification Functions

**`notifyRequestApproval()`**
- Sent when HR approves an employee request
- Parameters: employeeEmail, employeeName, requestType, requestDetails, reviewerName
- Template: Green success styling

**`notifyRequestRejection()`**
- Sent when HR rejects an employee request
- Parameters: employeeEmail, employeeName, requestType, requestDetails, reviewerName, reason
- Template: Red alert styling

**`notifyOnboardingMilestone()`**
- Sent when employee completes onboarding milestone
- Parameters: employeeEmail, employeeName, milestone, nextSteps
- Template: Blue informational styling

**`notifyHRNewRequest()`**
- Sent to HR when new employee request submitted
- Parameters: requestType, employeeName, requestDetails, requestId
- Template: Yellow alert styling
- Recipient: hr@apex-meridian.com

### Testing Email Notifications

**Using Vitest:**
```bash
pnpm test notifications
```

**Manual Testing:**
1. Create test employee account
2. Submit employee request
3. Approve/reject request from HR dashboard
4. Check email inbox for notification

**Email Service Status:**
- Check Resend dashboard for delivery status
- View email logs and bounce reports
- Monitor sending limits and quotas

---

## Deployment Guide

### Prerequisites

Before deploying, ensure you have:

- Node.js 22+ installed
- MySQL/TiDB database accessible
- Domain name configured
- SSL certificate (for HTTPS)
- Environment variables configured

### Environment Setup

Create `.env` file in project root:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-secret-key-here
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Email
RESEND_API_KEY=re_your_resend_api_key

# Application
VITE_APP_ID=your-app-id
VITE_APP_TITLE=Apex Meridian
VITE_APP_LOGO=/images/ai-logo.svg

# Owner Information
OWNER_OPEN_ID=owner-open-id
OWNER_NAME=Amro Gaber

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### Build Process

**1. Install Dependencies**
```bash
pnpm install
```

**2. Run Database Migrations**
```bash
pnpm db:push
```

**3. Build Frontend**
```bash
pnpm build
```

This creates optimized production files in `dist/` directory.

**4. Start Production Server**
```bash
pnpm start
```

Server runs on port 3000 by default.

### Deployment Options

#### Option 1: Manus Platform (Recommended)

The project is already configured for Manus platform deployment.

1. Save checkpoint in Manus interface
2. Click "Publish" button in dashboard
3. Configure custom domain (optional)
4. Site is live at `xxx.manus.space`

**Benefits:**
- Zero-configuration deployment
- Automatic SSL certificates
- Built-in analytics
- Database included
- Email service configured

#### Option 2: Self-Hosted Server

Deploy to your own infrastructure:

1. **Prepare Server**
   - Ubuntu 22.04 LTS recommended
   - Install Node.js 22+
   - Install MySQL/TiDB
   - Configure firewall (allow ports 80, 443)

2. **Clone Repository**
   ```bash
   git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git
   cd apex-meridian-web
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

4. **Install & Build**
   ```bash
   pnpm install
   pnpm db:push
   pnpm build
   ```

5. **Setup Process Manager**
   ```bash
   pnpm install -g pm2
   pm2 start pnpm --name apex-meridian -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name apex-meridian.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d apex-meridian.com
   ```

#### Option 3: GitHub Pages (Static Only)

For static content only (no backend features):

1. Build static site
2. Push to `gh-pages` branch
3. Enable GitHub Pages in repository settings

**Note:** This option does not support:
- Employee authentication
- HR dashboard
- Email notifications
- Database features

### Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test employee login
- [ ] Test HR dashboard functionality
- [ ] Submit test job application
- [ ] Submit test employee request
- [ ] Verify email notifications work
- [ ] Check mobile responsiveness
- [ ] Test contact form
- [ ] Verify SSL certificate
- [ ] Check analytics tracking
- [ ] Test all navigation links
- [ ] Verify images load properly
- [ ] Check site performance (PageSpeed Insights)

---

## Maintenance & Troubleshooting

### Common Issues

#### Issue: Server Won't Start

**Symptoms:** Error when running `pnpm start`

**Solutions:**
1. Check Node.js version: `node --version` (should be 22+)
2. Reinstall dependencies: `rm -rf node_modules && pnpm install`
3. Check environment variables in `.env`
4. Verify database connection
5. Check port 3000 is not in use: `lsof -i :3000`

#### Issue: Database Connection Failed

**Symptoms:** "Database not available" errors

**Solutions:**
1. Verify `DATABASE_URL` in `.env`
2. Check database server is running
3. Test connection: `mysql -h host -u user -p`
4. Verify firewall allows database port
5. Check SSL requirements for database

#### Issue: Email Notifications Not Sending

**Symptoms:** No emails received after request approval

**Solutions:**
1. Verify `RESEND_API_KEY` in `.env`
2. Check Resend dashboard for errors
3. Verify sender domain is verified in Resend
4. Check email logs: `grep "email" server/logs/*.log`
5. Test email service: `pnpm test notifications`

#### Issue: Login Not Working

**Symptoms:** "Invalid credentials" error with correct password

**Solutions:**
1. Verify employee exists in database
2. Check `isActive` field is 1
3. Reset password using admin account
4. Check JWT_SECRET is set in `.env`
5. Clear browser cookies and try again

#### Issue: Images Not Loading

**Symptoms:** Broken image icons on pages

**Solutions:**
1. Verify images exist in `client/public/images/`
2. Check file paths use absolute paths: `/images/file.jpg`
3. Check file permissions: `chmod 644 client/public/images/*`
4. Verify build process copied images to `dist/`
5. Check browser console for 404 errors

### Monitoring & Logs

**Server Logs:**
```bash
# View real-time logs
pm2 logs apex-meridian

# View last 100 lines
pm2 logs apex-meridian --lines 100

# View error logs only
pm2 logs apex-meridian --err
```

**Database Logs:**
```bash
# MySQL error log
sudo tail -f /var/log/mysql/error.log

# Query log (if enabled)
sudo tail -f /var/log/mysql/query.log
```

**Nginx Logs:**
```bash
# Access log
sudo tail -f /var/log/nginx/access.log

# Error log
sudo tail -f /var/log/nginx/error.log
```

### Performance Optimization

**Frontend Optimization:**
- Enable gzip compression in Nginx
- Use CDN for static assets
- Optimize images (WebP format)
- Lazy load images below the fold
- Code splitting for large pages
- Enable browser caching

**Backend Optimization:**
- Add database indexes on frequently queried fields
- Enable query caching in MySQL
- Use connection pooling
- Implement Redis for session storage
- Enable HTTP/2 in Nginx

**Database Optimization:**
```sql
-- Add indexes for common queries
CREATE INDEX idx_employee_department ON employees(department);
CREATE INDEX idx_request_status ON employeeRequests(status);
CREATE INDEX idx_application_position ON jobApplications(position);

-- Analyze tables
ANALYZE TABLE employees, employeeRequests, jobApplications;
```

### Backup Strategy

**Database Backups:**
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
mysqldump -u user -p database > backup_$DATE.sql
gzip backup_$DATE.sql

# Keep last 30 days
find /backups -name "backup_*.sql.gz" -mtime +30 -delete
```

**File Backups:**
```bash
# Backup uploaded files
tar -czf files_backup_$(date +%Y%m%d).tar.gz client/public/uploads/

# Backup to S3 (if using AWS)
aws s3 sync /backups s3://apex-meridian-backups/
```

**Automated Backups:**
Add to crontab:
```cron
# Daily database backup at 2 AM
0 2 * * * /path/to/backup_script.sh

# Weekly file backup on Sunday at 3 AM
0 3 * * 0 /path/to/file_backup.sh
```

### Security Updates

**Regular Updates:**
```bash
# Update dependencies
pnpm update

# Check for security vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit fix
```

**System Updates:**
```bash
# Update Ubuntu packages
sudo apt update && sudo apt upgrade

# Update Node.js (using nvm)
nvm install 22
nvm use 22
```

---

## API Reference

### tRPC Routers

The API is organized into logical routers, each handling a specific domain.

#### Auth Router (`trpc.auth.*`)

**`auth.me`** - Get current user
- Type: Query
- Auth: Public
- Returns: User object or null

**`auth.logout`** - Logout current user
- Type: Mutation
- Auth: Public
- Returns: `{ success: true }`

#### Employee Router (`trpc.employee.*`)

**`employee.login`** - Employee login
- Type: Mutation
- Auth: Public
- Input: `{ username: string, password: string }`
- Returns: `{ success: true, employee: Employee }`

**`employee.getAll`** - Get all employees
- Type: Query
- Auth: Protected (HR/Admin)
- Returns: `Employee[]`

**`employee.getById`** - Get employee by ID
- Type: Query
- Auth: Protected
- Input: `{ id: number }`
- Returns: `Employee | null`

**`employee.create`** - Create new employee
- Type: Mutation
- Auth: Protected (HR/Admin)
- Input: `{ username, password, name, email, department, role }`
- Returns: `{ success: true, employee: Employee }`

**`employee.update`** - Update employee
- Type: Mutation
- Auth: Protected (HR/Admin)
- Input: `{ id, ...updateFields }`
- Returns: `{ success: true }`

**`employee.delete`** - Delete employee
- Type: Mutation
- Auth: Protected (HR/Admin)
- Input: `{ id: number }`
- Returns: `{ success: true }`

**`employee.toggleStatus`** - Activate/deactivate employee
- Type: Mutation
- Auth: Protected (HR/Admin)
- Input: `{ id: number }`
- Returns: `{ success: true }`

#### Careers Router (`trpc.careers.*`)

**`careers.submitApplication`** - Submit job application
- Type: Mutation
- Auth: Public
- Input: `{ fullName, email, phone, position, department, coverLetter, resumeUrl, linkedinUrl?, portfolioUrl? }`
- Returns: `{ success: true }`

**`careers.getApplications`** - Get all applications
- Type: Query
- Auth: Protected (HR/Admin)
- Returns: `JobApplication[]`

#### Employee Requests Router (`trpc.employeeRequests.*`)

**`employeeRequests.create`** - Create new request
- Type: Mutation
- Auth: Protected
- Input: `{ employeeId, employeeName, department, requestType, title, description, startDate?, endDate? }`
- Returns: `{ success: true }`

**`employeeRequests.getAll`** - Get all requests
- Type: Query
- Auth: Protected
- Returns: `EmployeeRequest[]`

**`employeeRequests.approve`** - Approve request
- Type: Mutation
- Auth: Protected (HR/Admin)
- Input: `{ requestId, hrNotes?, reviewedBy, reviewedByName }`
- Returns: `{ success: true }`
- Side Effect: Sends approval email to employee

**`employeeRequests.reject`** - Reject request
- Type: Mutation
- Auth: Protected (HR/Admin)
- Input: `{ requestId, hrNotes, reviewedBy, reviewedByName }`
- Returns: `{ success: true }`
- Side Effect: Sends rejection email to employee

#### Contact Router (`trpc.contact.*`)

**`contact.sendMessage`** - Send contact form message
- Type: Mutation
- Auth: Public
- Input: `{ name, email, company?, phone?, message }`
- Returns: `{ success: true }`
- Side Effect: Sends email to info@apex-meridian.com

### Using the API

**From React Components:**

```typescript
import { trpc } from '@/lib/trpc';

function MyComponent() {
  // Query
  const { data, isLoading } = trpc.employee.getAll.useQuery();
  
  // Mutation
  const createEmployee = trpc.employee.create.useMutation({
    onSuccess: () => {
      // Refetch employees list
      trpc.useUtils().employee.getAll.invalidate();
    }
  });
  
  const handleSubmit = (formData) => {
    createEmployee.mutate(formData);
  };
  
  return (/* JSX */);
}
```

**From Server-Side:**

```typescript
import { appRouter } from './routers';

const caller = appRouter.createCaller({ req, res, user });
const employees = await caller.employee.getAll();
```

---

## Environment Variables

### Required Variables

These variables must be set for the application to function:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-min-32-chars` |
| `RESEND_API_KEY` | Resend API key for emails | `re_xxxxxxxxxxxxx` |

### Optional Variables

These variables enhance functionality but are not required:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `VITE_APP_TITLE` | Site title | `Apex Meridian` |
| `VITE_APP_LOGO` | Logo path | `/images/ai-logo.svg` |
| `VITE_ANALYTICS_ENDPOINT` | Analytics endpoint | (none) |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics site ID | (none) |

### Manus Platform Variables

These are automatically injected by Manus platform:

| Variable | Description |
|----------|-------------|
| `VITE_APP_ID` | Manus application ID |
| `OAUTH_SERVER_URL` | OAuth server URL |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal URL |
| `OWNER_OPEN_ID` | Owner's Manus ID |
| `OWNER_NAME` | Owner's name |
| `BUILT_IN_FORGE_API_URL` | Manus API URL |
| `BUILT_IN_FORGE_API_KEY` | Manus API key |

---

## Appendix

### Contact Information

**Company:**
- Name: Apex Meridian LLC (A p e x - M e r i d i a n ® LLC)
- Address: New Cairo, Cairo Governorate, Egypt
- Phone: +20 1 2 00 92 90 92
- Email: info@apex-meridian.com
- Website: https://apex-meridian.com

**Social Media:**
- All platforms: @apex-meridian
- LinkedIn: https://linkedin.com/company/apex-meridian
- Twitter/X: https://twitter.com/apex-meridian
- Facebook: https://facebook.com/apex-meridian
- Instagram: https://instagram.com/apex-meridian

**Department Emails:**
- Engineering: engineering@apex-meridian.com
- Sales: sales@apex-meridian.com
- Marketing: marketing@apex-meridian.com
- HR: hr@apex-meridian.com
- Support: support@apex-meridian.com
- Finance: finance@apex-meridian.com
- Legal: legal@apex-meridian.com

### Useful Links

- GitHub Repository: https://github.com/cptamrgaber/apex-meridian.com-final-2026
- Manus Platform: https://manus.im
- Resend Dashboard: https://resend.com/dashboard
- Drizzle ORM Docs: https://orm.drizzle.team
- tRPC Docs: https://trpc.io
- React Docs: https://react.dev
- Tailwind CSS Docs: https://tailwindcss.com

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 16, 2026 | Initial documentation release |

---

**Document Prepared By:** Amro Gaber  
**Last Updated:** January 16, 2026  
**For:** Apex Meridian LLC

*This documentation is confidential and intended for authorized administrators only.*
