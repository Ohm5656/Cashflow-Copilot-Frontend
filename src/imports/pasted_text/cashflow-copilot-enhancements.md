Improve the financial dashboard and supply tracking system for the Cashflow Copilot AI application.

Fix three main areas:

1. Profit Chart Visualization
2. Supply Detail Navigation
3. Authentication System with AI Onboarding Questions

Use a modern fintech dashboard design with dark mode, neon accents, and mobile-first layout.

--------------------------------------------------

PART 1 — FIX PROFIT CHART

Current issue:
The profit chart lines overlap and are visually confusing.

Improve the chart so that profit and loss lines are clearly separated and easy to read.

Requirements:

Use two lines:

Profit Line
Color: neon green
Stroke width: 3
Glow effect: subtle green glow

Loss Line
Color: neon red
Stroke width: 3
Glow effect: subtle red glow

Chart style:
Smooth curved lines
Clear spacing between lines
Better Y-axis scaling

Axis labels:
Y-axis: Profit / Loss (บาท)
X-axis: Year or Month

Legend:

● กำไร (green)
● ขาดทุน (red)

Tooltip example:

Year: 2023
Profit: ฿230,000
Loss: ฿120,000

Ensure the lines never visually overlap due to scaling errors.

Add slight shadow glow for both lines.

--------------------------------------------------

PART 2 — SUPPLY ITEM DETAIL PAGE

Currently supply items cannot be opened.

Fix navigation so each supply item is clickable.

When user taps a supply item card, navigate to:

/supply/[id]

Create a supply detail page.

Page title example:

วัตถุดิบ A

Display:

Current price
฿120

Price change
+8%

Price history chart

Show a mini price trend graph.

Additional insights:

Average price
Highest price
Lowest price

Usage impact:

Show how this material affects profit margin.

Example:

Cost impact on product margin: -4%

Also show:

Supplier
Last updated date

Design:

Clean card layout
Financial insight style
Dark theme

--------------------------------------------------

PART 3 — LOGIN SYSTEM

Create a modern authentication system.

Pages:

/login
/signup

Login page:

Fields:
Email
Password

Buttons:

Login
Forgot password

Link to signup.

Design:

Dark fintech style
Centered card
Gradient login button

--------------------------------------------------

PART 4 — SIGNUP WITH AI ONBOARDING

Signup should include onboarding questions.

Purpose:
Collect initial business data so the AI can analyze finances.

Step 1:
Company name

Step 2:
Business type

Options:
Retail
Restaurant
Manufacturing
E-commerce
Other

Step 3:
Monthly revenue range

Example:

0-100k
100k-500k
500k-1M
1M+

Step 4:
Main cost type

Options:

Raw materials
Inventory
Labor
Operations

Step 5:
Do you track inventory?

Yes / No

Step 6:
Upload first financial data (optional)

Bank statement
Sales data

After onboarding:

Generate initial AI insights such as:

Estimated burn rate
Financial health score
Initial risk score

--------------------------------------------------

PART 5 — UI STYLE

Use consistent design system:

Dark background
Neon pink accent
Green for profit
Red for loss

Rounded cards
Soft glow borders
Modern fintech typography

Make charts responsive and readable on mobile.

--------------------------------------------------

PART 6 — ROUTES

Ensure all navigation works properly.

Routes:

/login
/signup
/dashboard
/supply
/supply/[id]
/analysis
/settings

Avoid any 404 errors.