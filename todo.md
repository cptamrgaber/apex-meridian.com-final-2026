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
