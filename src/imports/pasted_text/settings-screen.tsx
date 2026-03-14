Redesign the entire "ตั้งค่า" (Settings) screen for Cashflow Copilot AI into a clean, premium fintech-style mobile page.

Main goals:
- Make the Settings screen feel more polished, structured, and useful
- Fix all broken navigation that currently leads to the same 404 page
- Each settings item must open its own proper page or modal
- Keep a dark fintech aesthetic with neon pink/purple highlights
- Mobile-first design
- Clean spacing, rounded cards, and premium UI balance

==================================================
MAIN SETTINGS PAGE
==================================================

Page title:
ตั้งค่า

Subtitle:
จัดการข้อมูลบริษัทและการตั้งค่าแอป

Top section:
Show a company summary card with:
- Company name: บริษัท ABC จำกัด
- Business type: ร้านค้าปลีก
- Current balance: ฿720,000
- Currency: THB (บาท)

Design:
- large premium glowing card
- company icon on the left
- company name and business type clearly shown
- financial summary displayed below
- dark gradient background with soft neon border glow

Below the company card, show these settings menu cards:

1. บัญชี
Description:
ข้อมูลบริษัทและการตั้งค่าทั่วไป

2. จัดการซัพพลาย
Description:
เพิ่มหรือลบวัตถุดิบ

3. นำเข้าข้อมูล
Description:
อัปโหลด Statement, Invoice, Bills และข้อมูลยอดขาย

4. คู่มือการใช้งาน
Description:
วิธีใช้งานแอปและคำถามที่พบบ่อย

Each card should:
- have its own icon
- have a right arrow chevron
- navigate to the correct screen
- not lead to a 404 page
- use clean spacing and balanced card layout

Bottom section:
Show app branding:
Cashflow Copilot AI
Version 1.0.0
Logout button in subtle danger style

==================================================
PAGE 1 — ACCOUNT / COMPANY INFO
==================================================

Route:
/settings/account

Title:
บัญชี

Subtitle:
จัดการข้อมูลบริษัทและการตั้งค่าทั่วไป

Create sections with cards:

Section 1: ข้อมูลบริษัท
Fields:
- ชื่อบริษัท
- ประเภทธุรกิจ
- อีเมล
- เบอร์โทร
- สกุลเงิน

Section 2: ความปลอดภัย
Options:
- เปลี่ยนรหัสผ่าน
- ออกจากระบบ
- ลบบัญชี

Design:
- clean stacked cards
- editable fields
- save button at bottom
- dark theme with neon pink primary button

==================================================
PAGE 2 — INVENTORY MANAGEMENT
==================================================

Route:
/settings/inventory

Title:
จัดการซัพพลาย

Subtitle:
เพิ่ม แก้ไข หรือลบวัตถุดิบของธุรกิจ

Features:
- searchable supply list
- add new item button
- edit existing item
- delete item

Each item card should show:
- ชื่อวัตถุดิบ
- หมวดหมู่
- ต้นทุนต่อหน่วย
- supplier

Add item modal fields:
- ชื่อวัตถุดิบ
- หมวดหมู่
- ต้นทุนต่อหน่วย
- หน่วย
- supplier

Design:
- modern list cards
- soft glow accents
- good empty state if no items exist

==================================================
PAGE 3 — DATA IMPORT
==================================================

Route:
/settings/import

Title:
นำเข้าข้อมูล

Subtitle:
อัปโหลดข้อมูลการเงินเพื่อให้ระบบวิเคราะห์แม่นยำขึ้น

Create 3 upload sections:

1. Bank Statement
Description:
ใช้คำนวณยอดเงินจริงปัจจุบันจากบัญชีธนาคาร

2. Invoice / Bills
Description:
ใช้คาดการณ์เงินเข้าออกจากบิลนำเข้าและส่งออก

3. Sales Data
Description:
ใช้วิเคราะห์แนวโน้มยอดขายและคำนวณ cash flow

For each section:
- show upload area
- drag and drop or browse file
- support PDF / Excel / CSV
- show uploaded file state
- show upload success state

Design:
- premium upload cards
- clear labels
- mobile-friendly layout

==================================================
PAGE 4 — USER GUIDE / ONBOARDING MODAL
==================================================

Instead of opening a blank page or broken route,
when user taps "คู่มือการใช้งาน",
open a full-screen modal onboarding tutorial.

Style inspiration:
similar to a clean mobile onboarding / app guide carousel

Theme:
- dark fintech theme
- pink / purple gradient accent
- soft glowing illustrations or icons
- rounded modal container
- progress dots
- skip / next / done buttons

Slides should be:

Slide 1
Title:
คู่มือการใช้งาน Cashflow Copilot AI

Subtitle:
ผู้ช่วย AI สำหรับบริหารเงินสดธุรกิจอย่างชาญฉลาด

Description:
ยินดีต้อนรับสู่ Cashflow Copilot AI ระบบที่ช่วยให้คุณเข้าใจสถานะการเงินของธุรกิจได้ง่ายขึ้น

Slide 2
Title:
หน้า วิเคราะห์

Description:
ดู AI Risk Score สุขภาพทางการเงิน ค่าใช้จ่ายผิดปกติ และข้อมูลเชิงลึกของธุรกิจ

Suggested icon:
analytics / chart icon

Slide 3
Title:
หน้า ซัพพลาย

Description:
จัดการวัตถุดิบ ต้นทุน และข้อมูลสินค้าที่มีผลต่อกำไรและเงินจม

Suggested icon:
box / inventory icon

Slide 4
Title:
หน้า เงินสด

Description:
ติดตาม Cash Runway เงินสดจริงปัจจุบัน วันที่เงินสดจะหมด และตรวจสอบความถูกต้องกับ statement

Suggested icon:
wallet / cash icon

Slide 5
Title:
หน้า ทดลอง

Description:
จำลองสถานการณ์เมื่อยอดขายหรือค่าใช้จ่ายเปลี่ยน เพื่อดูว่า cash flow และ runway จะเปลี่ยนอย่างไร

Suggested icon:
pulse / simulation icon

Slide 6
Title:
หน้า ตั้งค่า

Description:
จัดการข้อมูลบริษัท อัปโหลด statement และตั้งค่าระบบทั้งหมดในที่เดียว

Suggested icon:
settings icon

Buttons:
- ข้าม
- ถัดไป
- เริ่มใช้งาน

Bottom progress:
1 / 6, 2 / 6, etc.

==================================================
ROUTING FIX
==================================================

Fix all settings navigation.
Currently all buttons incorrectly lead to the same 404 error page.

Each settings item must open the correct destination:

- บัญชี → /settings/account
- จัดการซัพพลาย → /settings/inventory
- นำเข้าข้อมูล → /settings/import
- คู่มือการใช้งาน → open onboarding modal, not a 404 page

Also add a proper custom error page or error boundary
so users never see the default “Unexpected Application Error! 404 Not Found” developer screen.

==================================================
VISUAL DESIGN RULES
==================================================

- dark mode UI
- premium fintech look
- neon pink / purple glow accents
- rounded 2xl cards
- soft shadows and subtle borders
- balanced vertical rhythm
- no visual clutter
- icons should feel modern and consistent
- typography should be clean and readable
- mobile-first layout with strong hierarchy

The final Settings experience should feel polished, trustworthy, and production-ready like a real fintech app.