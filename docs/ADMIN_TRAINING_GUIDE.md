# Apex Meridian Administrator Training Guide

**Document Version:** 1.0  
**Last Updated:** January 2026  
**Prepared By:** Amro Gaber  
**For:** Apex Meridian System Administrators

---

## Table of Contents

1. [Introduction](#introduction)
2. [HR Dashboard Usage](#hr-dashboard-usage)
3. [Employee Management](#employee-management)
4. [Request Approval Workflow](#request-approval-workflow)
5. [Email Notification Configuration](#email-notification-configuration)
6. [Database Management](#database-management)
7. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## 1. Introduction

This training guide provides step-by-step instructions for administrators managing the Apex Meridian website and employee portal system. The guide covers all administrative functions including HR management, employee requests, email notifications, and database operations.

### Prerequisites

Before using the admin functions, ensure you have:

- Admin role assigned in the database (`role = 'admin'` in users table)
- Valid login credentials
- Access to the HR Dashboard (`/hr-dashboard`)
- Understanding of company policies and approval procedures

### Admin Access Levels

The system supports two user roles:

1. **Admin** - Full access to HR Dashboard, employee management, request approvals, and system settings
2. **User** - Standard employee access to employee portal, request submission, and personal profile

---

## 2. HR Dashboard Usage

### Accessing the HR Dashboard

1. Navigate to the website homepage
2. Click "Login" in the top navigation
3. Complete OAuth authentication
4. Once logged in, navigate to `/hr-dashboard`
5. The dashboard displays if you have admin role

### Dashboard Overview

The HR Dashboard provides four main sections:

#### A. Employee Management Tab

**Purpose:** View, search, and manage all employees

**Features:**
- Search employees by name, ID, or department
- Filter by department (13 departments available)
- View employee details (ID, name, department, position, salary, hire date)
- Edit employee information
- Delete employee records

**Step-by-Step: Adding a New Employee**

1. Click "Add Employee" button in top-right
2. Fill in required fields:
   - Employee ID (unique identifier)
   - Full Name
   - Email Address
   - Department (select from dropdown)
   - Position/Title
   - Salary (numeric value)
   - Hire Date (date picker)
3. Click "Create Employee"
4. System validates data and creates record
5. Success message appears
6. New employee appears in list

**Step-by-Step: Editing Employee Information**

1. Locate employee in list (use search if needed)
2. Click "Edit" button next to employee name
3. Modal dialog opens with current information
4. Modify fields as needed
5. Click "Save Changes"
6. System updates database
7. Changes reflect immediately in list

**Step-by-Step: Deleting an Employee**

1. Locate employee in list
2. Click "Delete" button (red icon)
3. Confirmation dialog appears
4. Click "Confirm Delete"
5. System removes employee record
6. Associated requests remain for audit purposes

#### B. Job Applications Tab

**Purpose:** Review and manage job applications

**Features:**
- View all submitted applications
- Filter by position, department, or status
- Review applicant details and resume
- Update application status
- Download resumes

**Step-by-Step: Reviewing Applications**

1. Click "Job Applications" tab
2. Browse list of applications
3. Click "View Details" for specific application
4. Review:
   - Applicant name and contact info
   - Applied position and department
   - Resume/CV (click to download)
   - Application date
   - Current status
5. Update status dropdown:
   - Pending (default)
   - Under Review
   - Interview Scheduled
   - Accepted
   - Rejected
6. Add internal notes if needed
7. Click "Save"

#### C. Employee Requests Tab

**Purpose:** Approve or reject employee vacation, duty assignment, and report requests

**Features:**
- View all pending requests
- Filter by type, status, or date range
- Review request details
- Approve or reject with notes
- Automatic email notifications

**Detailed workflow covered in Section 4**

---

## 3. Employee Management

### Understanding Employee Records

Each employee record contains:

- **Employee ID**: Unique identifier (format: EMP-XXXX)
- **User ID**: Links to authentication system
- **Personal Info**: Name, email, phone
- **Employment Info**: Department, position, salary, hire date
- **Status**: Active, on leave, terminated

### Department Structure

Apex Meridian has 13 departments:

1. Engineering
2. Research & Development
3. Sales
4. Marketing
5. Operations
6. Human Resources
7. Finance
8. Legal & Compliance
9. Customer Success
10. Product Management
11. Security & Safety
12. Quality Assurance
13. Art & Design

### Best Practices

**Data Entry:**
- Always verify employee ID is unique before creating
- Use consistent email format (@apex-meridian.com for internal)
- Ensure hire date is not in future
- Validate salary is reasonable for position

**Data Security:**
- Never share employee salary information
- Restrict access to HR Dashboard to authorized personnel only
- Log all modifications for audit trail
- Regularly backup employee data

**Compliance:**
- Maintain accurate hire dates for labor law compliance
- Update employee status promptly when changes occur
- Keep contact information current for emergency purposes

---

## 4. Request Approval Workflow

### Overview

Employees can submit three types of requests:

1. **Vacation Request** - Time off requests
2. **Duty Assignment** - Task/project assignment requests
3. **Report Submission** - Work reports and documentation

### Request Lifecycle

```
Employee Submits → Pending → Under Review → Approved/Rejected → Completed
```

### Accessing Employee Requests

1. From HR Dashboard, click "Employee Requests" button
2. Or navigate directly to `/hr-requests`
3. View list of all requests with status indicators

### Request List Interface

**Columns Displayed:**
- Employee Name
- Request Type (Vacation/Duty/Report)
- Description/Title
- Date Range (start - end)
- Status (pending, approved, rejected)
- Submission Date
- Actions (Approve/Reject buttons)

**Filtering Options:**
- Status: All, Pending, Approved, Rejected
- Type: All, Vacation, Duty Assignment, Report
- Date Range: Custom date picker
- Search: By employee name or description

### Step-by-Step: Approving a Request

1. **Locate Request**
   - Use filters to find pending requests
   - Click on request row to expand details

2. **Review Details**
   - Read request description carefully
   - Check date range for conflicts
   - Verify employee eligibility (vacation balance, workload)
   - Review any attached documents

3. **Make Decision**
   - Click "Approve" button (green)
   - Modal dialog opens

4. **Add HR Notes** (Optional but recommended)
   - Enter approval notes
   - Example: "Approved. Ensure handover completed before leave."
   - Notes visible to employee

5. **Confirm Approval**
   - Click "Confirm Approval"
   - System updates request status to "approved"
   - Records your name and timestamp
   - Sends email notification to employee

6. **Verify**
   - Success message appears
   - Request moves to "Approved" filter
   - Email sent confirmation shown

### Step-by-Step: Rejecting a Request

1. **Locate Request**
   - Same as approval process

2. **Review Details**
   - Identify reason for rejection
   - Check company policy compliance

3. **Click Reject**
   - Click "Reject" button (red)
   - Modal dialog opens

4. **Provide Reason** (Required)
   - Enter clear rejection reason
   - Example: "Insufficient vacation balance. Current balance: 5 days."
   - Be professional and constructive

5. **Confirm Rejection**
   - Click "Confirm Rejection"
   - System updates status to "rejected"
   - Records reviewer and timestamp
   - Sends email notification with reason

6. **Follow-up**
   - Consider scheduling meeting if sensitive
   - Update employee vacation balance if applicable

### Email Notifications

**Automatic emails sent:**

- **On Approval:**
  - To: Employee
  - Subject: "Your [Type] Request Has Been Approved"
  - Content: Approval confirmation, date range, HR notes

- **On Rejection:**
  - To: Employee
  - Subject: "Your [Type] Request Status Update"
  - Content: Rejection notice, reason, next steps

- **On New Request:**
  - To: HR team
  - Subject: "New Employee Request Submitted"
  - Content: Request summary, employee name, requires action

### Best Practices for Request Management

**Response Time:**
- Respond to requests within 24-48 hours
- Prioritize urgent vacation requests
- Set up email alerts for new requests

**Decision Making:**
- Consult vacation balance before approving time off
- Check team calendar for conflicts
- Consider business needs and deadlines
- Be consistent with policy application

**Communication:**
- Always provide clear rejection reasons
- Use professional language in notes
- Follow up personally for sensitive rejections
- Document verbal agreements in HR notes

**Record Keeping:**
- All approvals/rejections are logged with timestamp
- Reviewer name recorded automatically
- HR notes preserved for audit trail
- Cannot delete requests (only change status)

---

## 5. Email Notification Configuration

### System Overview

The email notification system uses **Resend API** to send automated emails for:

- Request approvals/rejections
- New employee onboarding
- HR communications
- System alerts

### Email Templates

The system includes pre-built HTML email templates:

1. **Request Approval Template**
   - Professional design with Apex Meridian branding
   - Includes request details and approval notes
   - Call-to-action button to view dashboard

2. **Request Rejection Template**
   - Empathetic tone with clear rejection reason
   - Guidance on next steps
   - Contact information for questions

3. **Onboarding Template**
   - Welcome message for new employees
   - Company overview and resources
   - Links to employee portal and training materials

4. **HR Alert Template**
   - Urgent notifications for HR team
   - Request summaries requiring action
   - Direct links to HR dashboard

### Configuration

**Environment Variables:**

The system requires the following environment variable:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

This is automatically configured in the Manus platform. No manual setup required.

**Sender Information:**

- **From Name:** Apex Meridian HR
- **From Email:** hr@apex-meridian.com
- **Reply-To:** hr@apex-meridian.com

### Monitoring Email Delivery

**Success Indicators:**
- Green checkmark in request list after approval/rejection
- "Email sent successfully" message in UI
- Employee confirms receipt

**Failure Indicators:**
- Red error icon in request list
- "Failed to send email" error message
- Check logs for details

**Troubleshooting Failed Emails:**

1. **Check Employee Email**
   - Verify email address is valid in employee record
   - Update if incorrect

2. **Check Resend API Status**
   - Visit Resend dashboard
   - Check API key validity
   - Review sending limits

3. **Review Error Logs**
   - Check server logs for detailed error messages
   - Common issues: Invalid recipient, rate limits, API key expired

4. **Manual Notification**
   - If email fails, notify employee manually
   - Document manual notification in HR notes

### Best Practices

- Monitor email delivery success rate weekly
- Keep employee email addresses current
- Test email templates after any changes
- Maintain professional tone in all communications
- Include clear call-to-action in emails

---

## 6. Database Management

### Database Access

**Via Management UI:**
1. Open Manus Management UI (right panel)
2. Click "Database" tab
3. View tables and data
4. Use CRUD interface for manual operations

**Via SQL:**
1. Get connection details from Settings → Database
2. Use MySQL client or tool of choice
3. Enable SSL for security

### Key Tables

#### users
- Stores authentication and user profile data
- Fields: id, openId, name, email, role, createdAt
- Role: 'admin' or 'user'

#### employees
- Stores employee employment information
- Fields: id, userId, employeeId, department, position, salary, hireDate
- Links to users table via userId

#### employeeRequests
- Stores all employee requests
- Fields: id, employeeId, type, description, status, startDate, endDate, reviewedBy, reviewedByName, reviewedAt, hrNotes
- Status: 'pending', 'approved', 'rejected'

#### departments
- Stores department information
- Fields: id, name, description, headEmployeeId, budget

#### projects
- Stores department projects
- Fields: id, departmentId, name, description, status, startDate, endDate, progress

#### documents
- Stores company documents
- Fields: id, title, category, fileUrl, uploadedBy, uploadedAt

#### jobApplications
- Stores job applications
- Fields: id, fullName, email, phone, position, department, resumeUrl, status, appliedAt

### Common Database Operations

**Promoting User to Admin:**

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'user@apex-meridian.com';
```

**Finding Pending Requests:**

```sql
SELECT 
  er.id,
  e.name AS employee_name,
  er.type,
  er.description,
  er.startDate,
  er.endDate,
  er.status
FROM employeeRequests er
JOIN employees emp ON er.employeeId = emp.id
JOIN users e ON emp.userId = e.id
WHERE er.status = 'pending'
ORDER BY er.createdAt DESC;
```

**Checking Employee Vacation Balance:**

```sql
SELECT 
  e.name,
  COUNT(CASE WHEN er.type = 'vacation' AND er.status = 'approved' THEN 1 END) AS approved_vacations,
  SUM(CASE WHEN er.type = 'vacation' AND er.status = 'approved' 
      THEN DATEDIFF(er.endDate, er.startDate) + 1 ELSE 0 END) AS total_vacation_days
FROM users e
JOIN employees emp ON e.id = emp.userId
LEFT JOIN employeeRequests er ON emp.id = er.employeeId
WHERE e.email = 'employee@apex-meridian.com'
GROUP BY e.id, e.name;
```

**Backup Database:**

```bash
# From command line
mysqldump -h <host> -u <user> -p <database_name> > backup_$(date +%Y%m%d).sql
```

### Database Maintenance

**Regular Tasks:**

1. **Weekly:**
   - Review database size and growth
   - Check for orphaned records
   - Verify backup completion

2. **Monthly:**
   - Archive old requests (>1 year)
   - Clean up test data
   - Optimize tables for performance

3. **Quarterly:**
   - Full database backup
   - Security audit
   - Review access logs

**Performance Optimization:**

- Index frequently queried fields (email, employeeId, status)
- Archive historical data to separate tables
- Monitor slow queries and optimize
- Use connection pooling

---

## 7. Troubleshooting Common Issues

### Issue: Cannot Access HR Dashboard

**Symptoms:**
- "Access Denied" or "Unauthorized" message
- Redirected to homepage

**Solutions:**

1. **Check User Role**
   ```sql
   SELECT email, role FROM users WHERE email = 'your@email.com';
   ```
   - If role is 'user', update to 'admin'

2. **Clear Browser Cache**
   - Logout completely
   - Clear cookies and cache
   - Login again

3. **Verify Session**
   - Check if session cookie is set
   - Try incognito/private browsing mode

### Issue: Email Notifications Not Sending

**Symptoms:**
- "Failed to send email" error
- Employees not receiving notifications

**Solutions:**

1. **Check Resend API Key**
   - Verify RESEND_API_KEY environment variable is set
   - Test API key in Resend dashboard

2. **Verify Employee Email**
   - Check email address format is valid
   - Update incorrect email addresses

3. **Check Rate Limits**
   - Resend has sending limits
   - Review usage in Resend dashboard
   - Upgrade plan if needed

4. **Review Server Logs**
   ```bash
   # Check logs for email errors
   grep "email" /var/log/app.log | tail -50
   ```

### Issue: Request Status Not Updating

**Symptoms:**
- Click approve/reject but status stays "pending"
- No error message shown

**Solutions:**

1. **Check Database Connection**
   - Verify database is accessible
   - Test connection from Management UI

2. **Review Browser Console**
   - Open Developer Tools (F12)
   - Check Console tab for JavaScript errors
   - Look for failed API calls in Network tab

3. **Verify tRPC Endpoint**
   - Navigate to `/api/trpc` to check server is running
   - Review server logs for errors

4. **Clear tRPC Cache**
   - Refresh page (Ctrl+F5)
   - Logout and login again

### Issue: Employee Data Not Displaying

**Symptoms:**
- Empty employee list
- Search returns no results

**Solutions:**

1. **Check Database Records**
   ```sql
   SELECT COUNT(*) FROM employees;
   ```
   - If 0, no employees exist (add test data)

2. **Verify Table Relationships**
   ```sql
   SELECT e.*, u.name, u.email 
   FROM employees e 
   LEFT JOIN users u ON e.userId = u.id;
   ```
   - Check for broken foreign key relationships

3. **Review Filter Settings**
   - Clear all filters
   - Reset search query
   - Try different department filter

### Issue: Slow Dashboard Performance

**Symptoms:**
- Long loading times
- Laggy interface
- Timeout errors

**Solutions:**

1. **Optimize Database Queries**
   - Add indexes to frequently queried columns
   - Limit result set size (pagination)

2. **Check Server Resources**
   - Monitor CPU and memory usage
   - Restart server if needed

3. **Clear Browser Cache**
   - Remove old cached data
   - Disable browser extensions

4. **Reduce Data Volume**
   - Archive old records
   - Implement pagination for large lists

### Getting Help

**Internal Support:**
- Contact IT Department: it@apex-meridian.com
- HR System Admin: hr-admin@apex-meridian.com

**External Support:**
- Manus Platform: https://help.manus.im
- Resend Support: support@resend.com

**Documentation:**
- Admin Documentation: `/ADMIN_DOCUMENTATION.md`
- API Reference: See Admin Documentation Section 10
- Training Videos: Coming soon

---

## Appendix A: Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search employees | Ctrl+K |
| Refresh dashboard | F5 |
| Open new employee form | Ctrl+N |
| Focus search box | / |
| Navigate tabs | Ctrl+Tab |

## Appendix B: Common SQL Queries

See Section 6 for detailed database queries.

## Appendix C: Email Template Customization

To customize email templates, edit:
- `/server/notifications.ts`
- Modify HTML content in template functions
- Test thoroughly before deploying

---

**End of Admin Training Guide**

For questions or feedback, contact: amro.gaber@apex-meridian.com
