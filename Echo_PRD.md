# Echo — Product Requirements Document (PRD)

**Product:** Echo  
**Product Type:** Feedback & Suggestions Platform  
**Document Version:** 1.0  
**Status:** MVP / Course Project  
**Primary Goal:** Build a small, production-ready Next.js application while solving a real feedback-management problem.

---

## 1. Product Overview

### 1.1 What is Echo?

**Echo is a lightweight feedback platform that helps businesses collect, organize, and respond to feedback from their customers.**

Instead of receiving scattered suggestions through email, social media, chat, or support messages, a business can create a centralized public feedback board where customers submit ideas, report problems, and follow the progress of their feedback.

From the business side, Echo provides a private dashboard for reviewing submissions, managing their status, categorizing feedback, and communicating progress.

### 1.2 One-Sentence Description

> **Echo gives businesses one place to collect customer feedback and gives customers visibility into what happens to their feedback.**

---

# 2. The Business Problem

Businesses receive valuable customer feedback from many disconnected channels:

- Emails
- Support conversations
- Social media
- Direct messages
- Informal conversations
- App reviews
- Feature requests

This creates several problems:

### For businesses

1. Feedback becomes difficult to organize.
2. Repeated requests are difficult to identify.
3. Important problems can get buried.
4. Customers do not know whether their feedback was seen.
5. Product teams lack a simple overview of common requests.
6. Feedback management becomes dependent on spreadsheets or internal tools.

### For customers

1. There is often no obvious place to submit feedback.
2. Customers may not know whether a request was received.
3. They may repeatedly report the same issue.
4. They rarely get visibility into whether a suggestion is being considered or implemented.

Echo addresses this gap by creating a **simple feedback loop between businesses and their customers**.

---

# 3. Business Perspective

## 3.1 Target Business Customer

Echo is primarily designed for small and medium-sized businesses that have a digital product or service and want a simple way to collect customer feedback.

Examples:

- SaaS startups
- Web applications
- Mobile applications
- Online services
- Agencies
- Independent software products
- Small product teams

Echo is **not** initially designed to replace a full customer-support platform, CRM, or enterprise product-management suite.

---

## 3.2 Business Value Proposition

A business uses Echo to:

- Centralize customer feedback.
- Reduce scattered feedback channels.
- Identify recurring requests.
- Track the state of customer suggestions.
- Communicate progress publicly.
- Make customers feel heard.
- Create a transparent feedback loop.

### Core value proposition

> **Collect feedback once, organize it clearly, and show customers what happens next.**

---

## 3.3 Business Owner Journey

### Step 1 — Create an account

The business owner creates an Echo account and signs in.

### Step 2 — Create a feedback board

The owner creates a board for their product.

Example:

> **Acme App — Product Feedback**

### Step 3 — Share the board

Echo provides a public URL that the business can share with customers.

Example:

> `echo.app/acme`

### Step 4 — Receive feedback

Customers submit suggestions, feature requests, or problem reports.

### Step 5 — Review feedback

The business owner opens the private dashboard and reviews incoming submissions.

### Step 6 — Organize feedback

The owner can:

- Categorize feedback.
- Change its status.
- Add an internal note or response.
- Mark important items.
- Remove inappropriate submissions.

### Step 7 — Communicate progress

Customers can return to the public board and see the current status of their feedback.

---

# 4. Customer Perspective

## 4.1 Who is the Customer?

There are two distinct users in Echo:

### Business User

The person or team responsible for managing customer feedback.

### End Customer

A customer of the business who wants to submit feedback or follow an existing request.

---

# 5. End Customer Experience

The end customer should be able to use Echo with minimal friction.

## 5.1 Discover

The customer receives a feedback-board link from a business.

Example:

> "Have an idea or found a problem? Tell us on our Echo board."

---

## 5.2 Browse

The customer can view existing feedback.

Each feedback item can show:

- Title
- Description
- Category
- Status
- Submission date

This helps customers determine whether their idea has already been submitted.

---

## 5.3 Submit

The customer can submit new feedback.

### Minimum submission fields

- Title
- Description
- Category
- Optional email

The form should be intentionally simple.

---

## 5.4 Follow Progress

After submission, the customer can see the current status of the feedback.

### MVP statuses

| Status | Meaning |
|---|---|
| Open | Feedback has been submitted and is awaiting review |
| In Progress | The business is actively working on it |
| Resolved | The issue/request has been addressed |

---

## 5.5 Customer Outcome

The customer should leave with three clear answers:

1. **Was my feedback submitted?**
2. **Has the business seen it?**
3. **What is happening with it?**

That transparency is the core customer value of Echo.

---

# 6. Product Scope

## 6.1 MVP

The MVP focuses on one complete feedback lifecycle.

### Authentication

- Business owner registration
- Business owner login
- Logout
- Protected dashboard

### Public Experience

- Public feedback board
- Feedback list
- Feedback details
- Feedback submission
- Feedback status visibility

### Business Dashboard

- Dashboard overview
- View submitted feedback
- View individual feedback
- Change feedback status
- Categorize feedback
- Respond to feedback
- Delete/moderate feedback

### Data Management

Core entities:

- User
- Board
- Feedback
- Category

---

# 7. Core User Stories

## Business Owner

### Account

> As a business owner, I want to create an account so that I can manage my feedback board.

> As a business owner, I want to log in so that only I can access my private dashboard.

### Board

> As a business owner, I want to create a feedback board so that customers have one place to submit feedback.

> As a business owner, I want to customize the board name and description so that customers understand what they are submitting feedback about.

### Feedback Management

> As a business owner, I want to see all submitted feedback so that I can review customer requests.

> As a business owner, I want to categorize feedback so that similar requests can be grouped.

> As a business owner, I want to change feedback status so that customers know what is happening.

> As a business owner, I want to respond to feedback so that I can communicate with customers.

---

## End Customer

### Discovery

> As a customer, I want to browse existing feedback so that I can see whether someone has already submitted my idea.

### Submission

> As a customer, I want to submit feedback easily so that I can tell the business about an idea or problem.

### Transparency

> As a customer, I want to see the status of feedback so that I know whether the business is doing something about it.

---

# 8. Core Product Workflow

```text
                 BUSINESS
                    │
                    ▼
             Create Echo Board
                    │
                    ▼
          Share Public Board URL
                    │
                    ▼
              ┌───────────┐
              │ CUSTOMER  │
              └─────┬─────┘
                    │
          Browse / Submit Feedback
                    │
                    ▼
             Feedback Created
                    │
                    ▼
              ┌───────────┐
              │  BUSINESS │
              │ DASHBOARD │
              └─────┬─────┘
                    │
          Review / Categorize
                    │
                    ▼
             Update Status
                    │
                    ▼
             Customer sees
             updated status
```

---

# 9. Product Surfaces

Echo has two primary product surfaces.

## 9.1 Public Surface

Used by customers.

Responsibilities:

- Display business feedback board.
- Display feedback.
- Allow feedback submission.
- Show feedback status.

Example:

`echo.app/[board]`

---

## 9.2 Private Dashboard

Used by business owners.

Responsibilities:

- Authentication.
- Board management.
- Feedback management.
- Categories.
- Responses.
- Basic analytics.

Example:

`echo.app/dashboard`

---

# 10. Authorization Model

Echo must enforce authorization on the server.

### Public users

Can:

- View public boards.
- View public feedback.
- Submit feedback.

Cannot:

- Access business dashboards.
- Modify feedback status.
- Modify board settings.
- Access private business data.

### Business owners

Can:

- Manage their own boards.
- View their feedback.
- Modify their feedback.
- Manage categories.
- Respond to feedback.

Cannot:

- Modify another business's board or feedback.

> **Important:** Hiding dashboard links is not authorization. Every protected operation must enforce ownership on the server.

---

# 11. MVP Data Model

## User

- `id`
- `name`
- `email`
- `password/auth provider`
- `createdAt`

## Board

- `id`
- `ownerId`
- `name`
- `slug`
- `description`
- `createdAt`
- `updatedAt`

## Feedback

- `id`
- `boardId`
- `title`
- `description`
- `categoryId`
- `status`
- `customerEmail`
- `response`
- `createdAt`
- `updatedAt`

## Category

- `id`
- `boardId`
- `name`
- `createdAt`

---

# 12. Non-Goals for the MVP

These features should **not** be part of the initial implementation:

- ❌ Subscriptions
- ❌ Payment processing
- ❌ Complex team management
- ❌ Real-time updates
- ❌ Mobile application
- ❌ Native notifications
- ❌ Advanced analytics
- ❌ AI classification
- ❌ AI-generated responses
- ❌ Complex voting systems
- ❌ Enterprise multi-tenancy features

They can become future roadmap items if the core product is stable.

---

# 13. Future Roadmap

After the MVP, Echo could evolve into a more capable feedback platform.

### Phase 2

- Feedback voting
- Duplicate detection
- Advanced filtering
- Search
- Email notifications
- Custom board branding
- Public roadmap

### Phase 3

- AI feedback categorization
- AI duplicate detection
- Sentiment analysis
- Automatic feedback summaries
- Feedback analytics
- Customer segmentation

### Phase 4

- Multiple team members
- Role-based permissions
- Integrations
- Slack/Discord notifications
- API
- Webhooks
- Custom domains
- Paid plans

---

# 14. Success Criteria

The MVP is successful when a complete feedback loop works:

### Business

1. A business owner can create an account.
2. The owner can create a feedback board.
3. The owner can share the board.
4. The owner can review submitted feedback.
5. The owner can update feedback status.
6. The owner can respond to feedback.

### Customer

1. A customer can open the public board without an account.
2. The customer can browse feedback.
3. The customer can submit feedback.
4. The customer can see the resulting status.

### Technical

1. Authentication works securely.
2. Server-side authorization prevents cross-user access.
3. Data validation exists at the server boundary.
4. Database access is separated from business logic.
5. Production environment variables are handled correctly.
6. Errors and loading states are handled.
7. The application is deployed.

---

# 15. Product Principle

Echo should optimize for **closing the feedback loop**, not collecting the maximum amount of data.

The product should answer:

> **Customer:** "Did they hear me?"

> **Business:** "What should we do with this feedback?"

> **Echo:** "Here is the feedback, its current state, and the communication around it."

---

# 16. Final Product Definition

**Echo is a lightweight feedback-management SaaS that connects businesses with their customers through a transparent feedback board. Businesses use Echo to collect, organize, and manage customer suggestions and issues, while customers use it to submit feedback and follow its progress.**

The MVP intentionally focuses on this single workflow so that the project remains small enough for an 11-day Next.js production course while still demonstrating real-world application architecture.
