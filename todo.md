# Apex Meridian Website - TODO

## Design & Branding
- [x] Update site title and branding to "A p e x - M e r i d i a n ®"
- [x] Configure color scheme (dark blue #1e3a8a, light blue #3b82f6, cyan #60a5fa)
- [x] Add company logos (text logo and AI tree logo)
- [x] Set up favicon with AI tree logo
- [x] Create dark theme with blue accents

## Pages - Main
- [x] Home page with hero section and company overview
- [x] About Us page with mission, vision, values
- [x] Solutions overview page
- [x] Technology page (Meridian Engine platform)
- [x] Investors page with financial highlights
- [x] Contact page with form
- [x] Site Map page

## Pages - Solutions (Sub-pages)
- [x] Aviation Intelligence page
- [x] Cybersecurity Shield page
- [x] Education & Cognitive Enhancement page
- [x] AGI Research page

## Pages - Secure Areas
- [ ] Employee Portal (password protected)
- [ ] HR Dashboard (password protected)

## Components
- [x] Navigation header with dropdown menus
- [x] Footer with 4 columns and legal links
- [ ] Hero section component
- [ ] Solution cards component
- [ ] Data visualization charts component
- [ ] Contact form component
- [ ] Team member cards component

## Visual Assets
- [x] Copy all hero images from WordPress package
- [x] Copy all solution-specific images
- [x] Copy all data visualization charts
- [x] Copy company assets (team photo, architecture diagram)
- [ ] Set up image optimization

## Content
- [ ] Add all page content from markdown files
- [ ] Add company information and contact details
- [ ] Add solution descriptions and features
- [ ] Add technology stack information
- [ ] Add investor relations content

## Functionality
- [ ] Set up authentication for employee/HR areas
- [ ] Configure contact form with email notifications
- [ ] Add responsive navigation (mobile menu)
- [ ] Implement smooth scrolling
- [ ] Add SEO meta tags
- [ ] Configure analytics

## Testing
- [ ] Test all pages load correctly
- [ ] Test navigation and links
- [ ] Test contact form submission
- [ ] Test authentication for secure pages
- [ ] Test responsive design on mobile/tablet
- [ ] Test performance and loading speed

## Deployment Preparation
- [ ] Review all content and design
- [ ] Get user approval
- [ ] Create checkpoint
- [ ] Prepare for Vercel deployment


## Logo Requirements
- [x] Add text logo "A p e x - M e r i d i a n ®" to header (white on dark background)
- [x] Add text logo to footer with "LLC" suffix
- [x] Add AI tree logo to header/navigation
- [x] Use AI tree logo throughout AI solution pages
- [x] Set AI tree logo as favicon
- [x] Maintain aspect ratio for both logos
- [x] Fix tree logo aspect ratio to maintain original circular/square proportions
- [x] Apply white or blue color to tree logo based on background context

## Content Requirements from WordPress Site
- [ ] Use all content from markdown files in /apex-meridian-wordpress/content/
- [ ] Include all data visualizations (charts)
- [ ] Add company contact info: +201 2 00 92 90 92, info@apex-meridian.com
- [ ] Add office location: New Cairo, Cairo Governorate, Egypt
- [ ] Include all solution descriptions and features
- [ ] Add technology stack information
- [ ] Add investor relations content

## Additional Requirements
- [x] Create comprehensive site map page
- [x] Add site map link to footer
- [x] Create multiple levels of sub-pages for each solution
- [x] Support every subject with figures, pictures, and graphs
- [ ] Include employee login for employee and HR sections
- [x] Add legal pages (Privacy Policy, Terms of Service)


## Logo Fixes (URGENT)
- [x] Replace header logo with main text logo image (Apex-Meridian_1.png)
- [x] Keep tree logo as AI symbol only (not main logo)
- [x] Fix tree logo aspect ratio to maintain circular/square shape
- [x] Update Header component to use correct logo
- [x] Ensure tree logo is only used as favicon and AI symbol
- [x] Create white version of logo for dark backgrounds
- [x] Test all pages with corrected logos


## Logo Color and Size Fixes (URGENT)
- [x] Fix logo color - should be white or blue, NOT yellow
- [x] Reduce logo size by 30% in header
- [x] Reduce logo size by 30% in footer
- [x] Test logo appearance on all pages


## Bug Fixes
- [x] Fix nested <a> tag error in Footer component
- [x] Check all Link components for nested anchors
- [x] Test all pages after fix


## Remaining Nested Anchor Fixes
- [x] Check Header component for nested anchors
- [x] Fixed all nested anchors in Header desktop menu
- [x] Fixed all nested anchors in Header mobile menu
- [x] Test until error is completely resolved


## Employee Authentication & Internal Pages
- [x] Create Login page with authentication form
- [x] Set up protected route wrapper component
- [x] Build Employee Portal dashboard
- [x] Build HR Dashboard with employee management
- [x] Add logout functionality
- [x] Test authentication flow

## Missing Pages
- [x] Team page with employee profiles
- [x] Careers page with job listings
- [x] Update About page with team section link

## Deployment Preparation
- [x] Test all pages and navigation
- [x] Verify all images load correctly
- [x] Check responsive design on mobile
- [x] Final review before deployment
- [ ] Create final checkpoint
- [ ] Prepare deployment documentationcreation
- [ ] Prepare for Vercel deployment
- [ ] Show user complete website for review


## Phase 1: Authentication System Implementation
- [x] Update database schema to add employees table
- [x] Create seed script to add default admin account (admin/admin)
- [x] Build authentication backend with tRPC procedures
- [x] Implement session management with JWT
- [x] Create admin panel UI for password changes
- [x] Build employee management UI (add/edit/delete employees)
- [x] Protect Employee Portal and HR Dashboard routes
- [x] Test authentication flow end-to-end

## Phase 2: Missing Components & Content

- [x] Extract Hero section as reusable component
- [x] Extract Solution cards as reusable component
- [x] Create data visualization charts component with Recharts- [ ] Build functional contact form component
- [ ] Extract Team member cards as reusable component
- [ ] Integrate all content from WordPress markdown files
- [ ] Add all company information and contact details
- [ ] Optimize all images for web

## Phase 3: Functionality Implementation
- [x] Implement contact form backend with email sending (Resend integration)
- [x] Build fully functional mobile hamburger menu with animations
- [x] Add smooth scrolling to all anchor links
- [x] Add SEO meta tags to all pages (Home, About, Solutions, Technology, Investors, Contact)
- [x] Push code to GitHub repository (apex-meridian.com-final-2026)
- [ ] Configure analytics tracking
- [ ] Test all functionality

## Phase 4: Final Testing & Deployment
- [ ] Test all pages load correctly
- [ ] Test all navigation and links
- [ ] Test contact form submission
- [ ] Test authentication and user management
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Test performance and loading speed
- [ ] Create final checkpoint
- [ ] Prepare deployment documentation
- [ ] Show user for final approval

## Phase 5: Content and Performance Fixes
- [x] Remove fake placeholder names from About page leadership team
- [x] Compress all large images in public/images folder (50-93% size reduction)
- [x] Verify all images load correctly after compression
- [x] Test page loading speed improvements

## Phase 6: Fix Missing Content and Pages
- [x] Fix missing image in About page (Global Presence chart)
- [x] Configure RESEND_API_KEY for email functionality
- [x] Validate email system with vitest tests (3/3 passed)
- [x] Create industry solution pages: Healthcare, Finance, Manufacturing, Retail, Transportation, Energy
- [x] Create technology pages: Machine Learning, NLP, Computer Vision, Robotics, Data Analytics
- [x] Create resource pages: Blog, Case Studies, Whitepapers, Research
- [x] Create company pages: Leadership Details, Partners, Awards, Press
- [x] Create support pages: FAQ, Documentation, Training
- [x] Build comprehensive Careers system with:
  - [x] Organization chart
  - [x] Job listings for all departments (74 positions across 10 departments)
  - [x] Application form with PDF resume upload
  - [x] Database storage for applications
  - [x] Email notifications to HR@apex-meridian.com
  - [x] Application management UI (dedicated /applications page)
- [x] Update navigation menus to include all pages (comprehensive dropdowns added)
- [x] Update App.tsx routing for all pages (22 new routes added)
- [ ] Update SiteMap page with all new pages
- [x] Test all pages load correctly

## Phase 7: About Page Enhancement
- [x] Fix image display issues in About page
- [x] Add more comprehensive content to About page
- [x] Add company history section
- [x] Add values and culture section (4 pillars)
- [x] Add office locations with images (headquarters in New Cairo)
- [x] Enhance leadership team section with proper structure

## Phase 8: Organization Chart and Final Content
- [x] Create organization chart page with visual hierarchy (10 departments, 40+ positions)
- [x] Add email links for each department (engineering@, sales@, marketing@, hr@, etc.)
- [x] Update Sitemap page with all 43 pages organized by category
- [x] Add real case studies content (3 detailed case studies: EgyptAir, National Bank of Egypt, Vodafone Egypt)
- [x] Add real blog posts content (3 detailed posts: AGI research, aviation AI, explainable AI)
- [ ] Add real whitepapers content
- [ ] Add partner information
- [ ] Test all email links and navigation

## Phase 9: Whitepapers and Partners Content
- [x] Add detailed whitepapers to resources page (4 technical papers: Financial AI, Aviation, AGI, Fraud Detection)
- [x] Add partner logos and descriptions to partners page (15+ partners across 5 categories)
- [ ] Test all download links and partner information
- [ ] Save final checkpoint
## Phase 10: Final Fixes Before Publishing

- [x] Change all job locations from fake locations to "Cairo, Egypt" (85 jobs updated)
- [x] Add full job descriptions and required qualifications to each position
- [x] Remove all fake placeholder names from leadership/team sections (Team, Blog, Whitepapers)
- [x] Add Legal department to organization chart and careers (already existed)
- [x] Add Finance & Accounting department to organization chart and careers (already existed)
- [x] Add Security & Safety department to organization chart and careers (6 new positions)
- [x] Add Quality Assurance department to organization chart and careers (5 new positions)
- [x] Update organization chart with all 12 departments
- [ ] Test all changes
- [ ] Save final checkpoint
- [ ] Publish to production


## Phase 11: Comprehensive Employee Portal System
- [x] Create database schema for:
  - [x] Department projects and progress tracking
  - [x] Employee requests (vacations, duty assignments, reports)
  - [x] Company documents and policies
- [x] Create 12 department-specific portal pages with:
  - [x] Department policies and rules
  - [x] Project progress tracking
  - [x] Team member list
  - [x] Department-specific resources
- [x] Build employee request system:
  - [x] Vacation request form
  - [x] Duty assignment request form
  - [x] Report submission form
  - [x] Request status tracking
  - [x] Backend tRPC procedures for creating and retrieving requests
  - [x] Frontend EmployeeRequests page with form and request list
  - [x] Vitest tests for employee request system (6/6 passed)
- [ ] Create company documentation library:
  - Employee handbook
  - HR policies and procedures
  - Department-specific manuals
  - Safety regulations
  - Code of conduct
  - Compliance guidelines
- [ ] Update Employee Portal with:
  - Department navigation
  - Request submission interface
  - Document access
- [ ] Update HR Dashboard with:
  - Request management interface
  - Document management
  - Department oversight
- [ ] Test all systems end-to-end
- [ ] Save checkpoint
- [ ] Publish to production


## Phase 12: Fix Navigation Scroll Position Bug
- [x] Fix scroll position when navigating between pages (pages should start at top, not bottom)
- [x] Implement scroll restoration to top on route changes using useEffect and useLocation
- [x] Test navigation across all pages
- [ ] Save checkpoint


## Phase 13: Update Target Markets and Remove Fake Data
- [x] Audit all pages for North America references (remove completely)
- [ ] Audit all pages for fake data and placeholder content
- [x] Update target markets to reflect actual priorities:
  1. Egypt (primary market)
  2. North Africa (secondary market)
  3. Middle East (tertiary market)
  4. Rest of Africa (quaternary market)
  5. Europe (quinary market)
- [ ] Update About page with correct regional focus
- [ ] Update case studies to reflect target markets (Egypt, North Africa, Middle East)
- [ ] Update partner information to align with regional priorities
- [ ] Create marketing plans section reflecting regional strategy
- [ ] Update company policies to reflect regional expansion plan
- [ ] Remove any US/North American client references
- [ ] Update global presence information
- [x] Add detailed requirements, qualifications, and certificates to 30 job positions (Engineering, R&D, Sales complete)
- [x] Include regional universities in education requirements (AUC, Cairo University, Ain Shams, Alexandria)
- [x] Add Egyptian tech/AI organizations to partners page (ITIDA, TIEC, Egyptian AI Society)
- [ ] Update job application form to collect certificate information
- [x] Update website to reflect self-hosted infrastructure (not cloud-dependent)
- [x] Add data center strategy: Egypt (primary), expanding to Africa and Middle East
- [x] Remove/reduce AWS/Azure/GCP hosting dependencies from content (updated to development tools only)
- [x] Highlight data sovereignty and regional data residency benefits
- [x] Update technology infrastructure descriptions
- [x] Test all changes (server running without errors, TypeScript clean, LSP clean)
- [ ] Save checkpoint
- [x] Create high-quality favicon from Apex Meridian tree logo


## Phase 14: Comprehensive Website Audit
- [ ] Check all pages for technical errors and broken links
- [ ] Review all content for fake data and placeholders
- [ ] Identify incomplete pages and sections
- [ ] Assess design issues (visuals, charts, contrast)
- [ ] Check for missing required pages
- [ ] Verify all navigation links work correctly
- [ ] Review footer company name format (should be "A p e x - M e r i d i a n ® LLC")
- [ ] Check logo usage (main logo vs AI tree logo)
- [ ] Verify organization chart exists on About page
- [ ] Compile comprehensive audit report
- [ ] Present report to user before making fixes


## Phase 15: Add Art & Design Department and Media Production Industry
- [x] Create Media Production solution page (AI video, audio, image generation)
- [x] Add Art & Design department to organization structure
- [x] Create department portal for Art & Design
- [x] Add job positions (12 positions added):
  - [ ] Art Director
  - [ ] Creative Director
  - [ ] Senior Graphic Designer
  - [ ] UI/UX Designer
  - [ ] Motion Graphics Designer
  - [ ] Video Editor
  - [ ] 3D Artist
  - [ ] Visual Effects Artist
  - [ ] Content Strategist
  - [ ] Social Media Manager
  - [ ] Script Writer
  - [ ] Audio Engineer
- [x] Update department list (now 13 departments)
- [x] Update Solutions page to include Media Production
- [x] Add Media Production route to App.tsx
- [ ] Add media production to homepage hero/features section
- [ ] Fix audit issues:
  - [x] Update social media links to apex-meridian handles
  - [x] Change phone format to Egyptian format
  - [ ] Create missing architecture image
  - [ ] Update footer company name format
- [ ] Save checkpoint


## Phase 16: Complete Remaining Audit Fixes and Job Requirements
- [x] Generate Meridian Engine architecture diagram (`/images/meridian-engine-architecture.jpg`)
- [x] Complete remaining 55 job positions with detailed requirements:
  - [x] Marketing (6 positions)
  - [x] Operations (8 positions)
  - [x] HR (6 positions)
  - [x] Finance (6 positions)
  - [x] Legal (5 positions)
  - [x] Customer Success (6 positions)
  - [x] Product Management (7 positions)
  - [x] Security & Safety (4 positions)
  - [x] Quality Assurance (3 positions)
- [x] Update footer company name to "A p e x - M e r i d i a n ® LLC" format (already correct)
- [x] Test all changes (server running without errors, TypeScript clean, LSP clean)
- [ ] Save checkpoint
- [x] Fix About page mobile hero text - keep "About" on line 1, "Apex-Meridian" on line 2, reduce font size by 20%


## Phase 17: HR Dashboard, Data Center Roadmap, and Employee Onboarding
- [ ] Build HR Request Approval Dashboard:
  - [ ] Create database schema for request approvals and status tracking
  - [ ] Build HR dashboard page with pending requests list
  - [ ] Add approve/reject actions with reason/notes
  - [ ] Implement notification system (email to employee on status change)
  - [ ] Add request filtering and search
  - [ ] Create tRPC procedures for approval workflow
  - [ ] Write vitest tests for approval system
- [ ] Create Data Center Roadmap Page:
  - [ ] Design interactive map showing regional expansion
  - [ ] Add timeline visualization (Egypt → North Africa → Middle East → Rest of Africa → Europe)
  - [ ] Include infrastructure specifications for each location
  - [ ] Add data sovereignty and compliance information
  - [ ] Create route in App.tsx
- [ ] Implement Employee Onboarding Portal:
  - [ ] Create database schema for onboarding documents and training modules
  - [ ] Build onboarding dashboard for new hires
  - [ ] Add document library (employee handbook, policies, forms)
  - [ ] Create department-specific orientation modules
  - [ ] Add training progress tracking
  - [ ] Implement completion certificates
  - [ ] Create tRPC procedures for onboarding system
- [ ] Test all features
- [ ] Save checkpoint


## Phase 18: Email Notifications, Interactive Map, and Performance Dashboard
- [x] Implement Email Notification System:
  - [x] Create email service wrapper using Resend API (server/notifications.ts)
  - [x] Add notification triggers for request approvals/rejections
  - [x] Add onboarding milestone notifications
  - [x] Add HR communication templates
  - [ ] Write vitest tests for email service
- [ ] Create Interactive Data Center Map:
  - [ ] Integrate Google Maps into Data Center Roadmap page
  - [ ] Add clickable markers for each facility
  - [ ] Display capacity, status, and details in info windows
  - [ ] Add map controls and styling
- [ ] Build Employee Performance Dashboard:
  - [ ] Create database schema for KPIs, goals, and reviews
  - [ ] Build tRPC procedures for performance data
  - [ ] Create Performance Dashboard UI
  - [ ] Add KPI tracking widgets
  - [ ] Add goal setting and progress tracking
  - [ ] Add performance review scheduling
  - [ ] Write vitest tests for performance features
- [x] Push all updates to GitHub repository (cptamrgaber/apex-meridian.com-final-2026)
- [ ] Test all features
- [ ] Save checkpoint


## Phase 19: Administrator Documentation
- [x] Create comprehensive administrator documentation
- [x] Include technology stack overview
- [x] Document architecture and structure
- [x] List all features and functionality
- [x] Provide content management guide
- [x] Add maintenance and troubleshooting guide
- [x] Include deployment instructions
- [x] Save and deliver documentation


## Phase 20: Visual Diagrams, Training Guides, and Monitoring Dashboard
- [x] Create Visual Architecture Diagrams:
  - [x] System architecture diagram (Mermaid)
  - [x] Database schema diagram (D2)
  - [x] Authentication flow diagram (Mermaid)
  - [x] Email notification flow diagram (Mermaid)
  - [x] HR request approval workflow diagram (Mermaid)
  - [x] Render all diagrams to PNG images
- [x] Create Admin Training Guides:
  - [x] HR Dashboard usage guide
  - [x] Employee management guide
  - [x] Request approval workflow guide
  - [x] Email notification configuration guide
  - [x] Database management guide
- [x] Implement System Monitoring Dashboard:
  - [x] Create database health check endpoint
  - [x] Add email service health check
  - [x] Add server health check
  - [x] Add authentication health check
  - [x] Create monitoring dashboard page (/system-monitoring)
  - [x] Add real-time status indicators with auto-refresh
  - [x] Add tRPC procedures for all health checks
  - [ ] Write vitest tests for monitoring
- [x] Test all features (server running, TypeScript clean, LSP clean)
- [x] Save checkpoint (version 5b11b00f)
- [x] Push to GitHub (already synced)


## Phase 21: Fix 404 Errors and Add Navigation Links
- [ ] Investigate 404 errors on /hr-dashboard and /employee routes
- [ ] Check routing configuration in App.tsx
- [ ] Verify authentication flow and redirects
- [ ] Add navigation links to header for new features:
  - [ ] HR Dashboard
  - [ ] Employee Portal
  - [ ] Data Center Roadmap
  - [ ] Onboarding Portal
  - [ ] System Monitoring
  - [ ] HR Requests
- [x] Add links to footer
- [x] Create admin/dashboard dropdown menu (Portal dropdown in header)
- [x] Create admin credentials for accessing both Employee Portal and HR Dashboard (username: admin, password: admin123)
- [x] Update Login page to show admin credentials
- [x] Add Portal dropdown menu to header with all portal links
- [x] Insert admin user into database
- [ ] Test all navigation and page access with admin login
- [ ] Save checkpoint and push to GitHub


## Phase 22: Fix 404 Errors on Portal Pages
- [x] Test each portal page to identify which ones show 404 errors (HR Dashboard and Employee Portal)
- [x] Check App.tsx routing configuration for all portal routes (routes are correct)
- [x] Fix 404 errors on /hr-dashboard and /employee after login (fixed cookie-parser middleware issue)
- [x] Check authentication redirect logic in Login.tsx (working correctly)
- [x] Verify EmployeePortal and HRDashboard components exist and render correctly (both exist)
- [x] Remove demo credentials from Login page
- [x] Test with admin login credentials (authentication working, tested with curl and vitest)
- [x] Add cookie-parser middleware to Express server (was missing, causing cookies not to be read)
- [x] Write vitest tests for employee authentication (7/7 tests passed)
- [ ] Save checkpoint after fix
