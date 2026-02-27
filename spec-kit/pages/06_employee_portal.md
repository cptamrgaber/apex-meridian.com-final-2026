# Pages Spec — Employee Portal (Zone 2)

The Employee Portal is a protected internal system accessible only to authenticated employees and administrators.

---

## 1. Login Page (`/login`)

**Component:** `pages/Login.tsx`  
**Access:** Public (redirects to `/employee` after success)

### Form Fields
- Email address (required)
- Password (required, masked)
- "Remember me" checkbox (extends JWT expiry to 30 days)
- "Forgot password?" link (shows support contact)

### Behaviour
On submit, the form calls `trpc.auth.login.useMutation()`. On success, the JWT is stored in an HTTP-only cookie and the user is redirected to `/employee`. On failure, an error toast is shown: "Invalid email or password."

---

## 2. Employee Portal Dashboard (`/employee`)

**Component:** `pages/EmployeePortal.tsx`  
**Access:** Employee (redirects to `/login` if unauthenticated)

### Layout
Uses `DashboardLayout` with a left sidebar containing:
- Company logo
- Navigation links: Dashboard, My Requests, Department Portal, Team Directory, Organisation Chart, Onboarding, Documents

### Dashboard Content
**Welcome Banner:** "Welcome back, [Employee Name]" with the current date.

**Quick Action Cards (2×2 grid):**
- Submit Request → `/employee-requests`
- View Department → `/departments/[dept]`
- Organisation Chart → `/organization-chart`
- Team Directory → `/team`

**Recent Announcements:** Last 3 company announcements with date and category badge.

**My Pending Requests:** Table of the employee's open requests (vacation, duty, report) with status badges.

**Upcoming Events:** Calendar widget showing next 3 company events.

---

## 3. HR Dashboard (`/hr-dashboard`)

**Component:** `pages/HRDashboard.tsx`  
**Access:** Admin only

### Sections

**Employee Management Table**
Full-width table with columns: Name, Department, Position, Email, Status (Active/Inactive), Actions.

Actions per row:
- Edit (opens modal with all employee fields)
- Change Password (opens modal with new password field)
- Deactivate/Activate (toggles status)

**Add Employee Button**
Opens a modal form with fields:
- Full Name, Email, Password (auto-generated or manual)
- Department (dropdown of 13 departments)
- Position/Title
- Phone Number
- Hire Date

**Statistics Row**
Four metric cards: Total Employees, Active, By Department (pie chart), Recent Hires (last 30 days).

**Search and Filter**
Search by name or email; filter by department and status.

---

## 4. HR Requests Dashboard (`/hr-requests`)

**Component:** `pages/HRRequests.tsx`  
**Access:** Admin only

### Layout
Two-panel layout: left panel is a filterable list of all requests; right panel shows the selected request's details.

### Request List
Each item shows: employee name, request type badge (Vacation / Duty / Report), submission date, status badge (Pending / Approved / Rejected).

### Filter Controls
Filter by: Request Type, Status, Department, Date Range.

### Request Detail Panel
Shows full request information:
- Employee name, department, position
- Request type and submission date
- Description / dates / file attachment
- Approve button (green) and Reject button (red)
- Notes field for HR comments
- Action history log

On approval/rejection, the employee receives an email notification via Resend API.

---

## 5. Applications Dashboard (`/applications`)

**Component:** `pages/Applications.tsx`  
**Access:** Admin only

### Layout
Table view of all job applications with the following columns:
- Applicant Name
- Position Applied For
- Department
- Submission Date
- Status (New / Reviewing / Interviewed / Hired / Rejected)
- Actions

### Actions
- **View** — Opens a side panel with full application details including resume download link
- **Update Status** — Dropdown to change status
- **Add Notes** — Text field for internal HR notes
- **Email Applicant** — Opens email compose modal

### Filter and Search
Filter by position, department, status, and date range. Search by applicant name or email.

---

## 6. Department Portal (`/departments/:dept`)

**Component:** `pages/DepartmentPortal.tsx`  
**Access:** Employee  
**Dynamic Route:** The `:dept` parameter maps to one of 13 department slugs.

### Supported Department Slugs

| Slug | Department Name |
|---|---|
| `engineering` | Engineering |
| `research-development` | Research & Development |
| `sales` | Sales & Business Development |
| `marketing` | Marketing & Communications |
| `operations` | Operations & Project Management |
| `hr` | Human Resources |
| `finance` | Finance & Accounting |
| `legal` | Legal & Compliance |
| `customer-success` | Customer Success & Support |
| `product` | Product Management |
| `security` | Security & Safety |
| `qa` | Quality Assurance |
| `art-design` | Art & Design |

### Portal Sections

**Department Header**
Department name, icon, contact email (e.g., `engineering@apex-meridian.com`), and member count.

**Active Projects**
A Kanban-style or table view of current projects with:
- Project name and description
- Status badge (Planning / In Progress / Completed / On Hold)
- Progress bar (0–100%)
- Start date and target end date
- Team member avatars

**Department Policies**
Accordion list of department-specific policies and procedures. Clicking expands the full text.

**Team Members**
Grid of department members with photo, name, title, and email.

**Department Resources**
List of downloadable documents specific to this department (policies, templates, guides).

**Quick Links**
- Submit Request → `/employee-requests`
- View Full Team → `/team`
- Organisation Chart → `/organization-chart`

---

## 7. Employee Requests (`/employee-requests`)

**Component:** `pages/EmployeeRequests.tsx`  
**Access:** Employee

### Request Types

**Vacation Request**
Fields: Start Date (date picker), End Date (date picker), Reason (textarea), Emergency Contact (optional).

**Duty Assignment**
Fields: Assignment Title, Description, Start Date, End Date, Location, Supervisor Name.

**Report Submission**
Fields: Report Title, Report Type (dropdown), Description, File Upload (PDF/DOCX, max 10MB).

### My Requests Table
Columns: Request Type, Title, Submitted Date, Status, Actions (View Details, Cancel if Pending).

---

## 8. Organisation Chart (`/organization-chart`)

**Component:** `pages/OrganizationChart.tsx`  
**Access:** Public

### Layout
A visual tree diagram rendered with CSS/SVG showing the company hierarchy:
- CEO at the top
- 13 department heads reporting to CEO
- Each department box is clickable and links to `/departments/:dept` (for employees) or shows a tooltip (for public)
- Each box shows: Department name, Head name, Team size, Contact email

### Export
"Export as PDF" button generates a PDF version of the chart.

---

## 9. Team Page (`/team`)

**Component:** `pages/Team.tsx`  
**Access:** Public

### Layout
Responsive grid (2 on mobile, 3 on tablet, 4 on desktop) of employee cards.

### Employee Card
- Professional photo (or avatar initials if no photo)
- Full name
- Job title
- Department badge
- Email (mailto link)
- LinkedIn icon (if profile available)

### Filter and Search
- Search by name or title
- Filter by department (dropdown)
- Sort by: Name (A–Z), Department, Date Joined

---

*Next: See `pages/07_careers.md` for the careers and recruitment system specification.*
