// ATS-safe resume — plain text, no columns, no images
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 48, bottom: 48, left: 62, right: 62 },
  info: { Title: 'Amirul Hakimi — Resume (ATS)', Author: 'Amirul Hakimi' },
})

const OUT = path.join(__dirname, 'public', 'AmirulHakimiCV-ATS.pdf')
doc.pipe(fs.createWriteStream(OUT))

const PW   = 595.28
const L    = 62
const W    = PW - L - 62
const BLK  = '#111111'
const DARK = '#333333'
const GRAY = '#555555'
const MUTE = '#888888'
const RULE = '#cccccc'
const TEAL = '#0e6b60'

function hLine(y) {
  doc.moveTo(L, y).lineTo(L + W, y).strokeColor(RULE).lineWidth(0.5).stroke()
}

function section(title) {
  doc.moveDown(0.7)
  const y = doc.y
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TEAL)
    .text(title.toUpperCase(), L + 4, y, { characterSpacing: 1 })
  hLine(doc.y + 3)
  doc.moveDown(0.5)
}

function job(titleCo, period, bullets = []) {
  doc.fontSize(9).font('Helvetica-Bold').fillColor(BLK)
    .text(titleCo, L, doc.y, { width: W, lineGap: 1 })
  const periodY = doc.y + 1
  doc.fontSize(8).font('Helvetica-Oblique').fillColor(MUTE)
    .text(period, L, periodY, { lineBreak: false })
  doc.y = periodY + doc.currentLineHeight(true) + 3
  bullets.forEach(b => {
    doc.fontSize(8.5).font('Helvetica').fillColor(GRAY)
    doc.text(`•  ${b}`, L + 10, doc.y, { width: W - 10, lineGap: 1.3 })
  })
  doc.moveDown(0.6)
}

function edu(degree, school, period, details = []) {
  const y = doc.y
  doc.fontSize(9).font('Helvetica-Bold').fillColor(BLK)
  const pW = doc.widthOfString(period)
  doc.text(degree, L, y, { width: W - pW - 6, lineBreak: false })
  doc.text(period, L + W - pW, y, { lineBreak: false })
  doc.y = y + doc.currentLineHeight(true) + 2
  doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(DARK).text(school, L)
  details.forEach(d => {
    doc.fontSize(8.5).font('Helvetica').fillColor(GRAY)
    doc.text(`•  ${d}`, L + 10, doc.y, { width: W - 10, lineGap: 1.3 })
  })
  doc.moveDown(0.6)
}

function boldBullet(bold, rest) {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(BLK)
  doc.text(`•  ${bold}. `, L + 10, doc.y, { continued: true, width: W - 10, lineGap: 1.3 })
  doc.font('Helvetica').fillColor(GRAY).text(rest, { lineGap: 1.3 })
  doc.moveDown(0.3)
}

function skillRow(label, val) {
  const y = doc.y
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(BLK)
  doc.text(label, L, y, { continued: true, width: 100 })
  doc.font('Helvetica').fillColor(GRAY).text(val, { width: W - 100 })
}

// ── HEADER ────────────────────────────────────────────────────────────────────
doc.fontSize(24).font('Helvetica-Bold').fillColor(BLK)
  .text('AMIRUL HAKIMI', 0, doc.y, { width: PW, align: 'center' })

doc.fontSize(10.5).font('Helvetica').fillColor(DARK)
  .text('FULL-STACK DEVELOPER', 0, doc.y + 3, { width: PW, align: 'center', characterSpacing: 0.6 })

doc.moveDown(0.45)
hLine(doc.y)
doc.moveDown(0.4)

doc.fontSize(8.5).font('Helvetica').fillColor(MUTE)
  .text('+60134280702  |  amirulxhakimi@gmail.com  |  linkedin.com/in/amrlhakimii  |  github.com/amrlhakimii',
    0, doc.y, { width: PW, align: 'center' })

doc.moveDown(0.9)
doc.fontSize(8.5).font('Helvetica').fillColor(GRAY)
  .text('Final-year Computer Science student (CGPA 3.76) with 7+ years of freelance experience across full-stack development, graphic design, and photography. Interned as Associate Project Coordinator / Associate Software Engineer at The Access Group APAC, where I built AI-powered internal automation tools for the Professional Services and SHR teams, and was absorbed into a permanent Software Engineer role with the Workforce AI team.',
    L, doc.y, { width: W, lineGap: 2, align: 'justify' })

// ── AREA OF EXPERTISE ─────────────────────────────────────────────────────────
section('Area of Expertise')
const cW = W / 3
const rows = [
  ['React / React Native',     'Node.js / .NET',              'Microsoft Azure / DevOps'],
  ['TypeScript / JavaScript',  'MySQL / Firebase / Supabase', 'Prompt Engineering / LLMs'],
  ['Python / Java / C++',      'Adobe Suite / Figma',         'Photography / Videography'],
  ['Docker / Rancher',         'Azure Container Apps',        'Azure Blob Storage'],
]
rows.forEach(row => {
  const y = doc.y
  row.forEach((item, i) => {
    doc.fontSize(8.5).font('Helvetica').fillColor(GRAY)
      .text(item, L + i * cW, y, { width: cW - 4, lineBreak: false })
  })
  doc.y = y + doc.currentLineHeight(true) + 5
})

// ── KEY ACHIEVEMENTS ──────────────────────────────────────────────────────────
section('Key Achievements')
boldBullet('Absorbed to Permanent Software Engineer', 'Promoted from intern to a permanent Software Engineer position with the Workforce AI team at The Access Group, working with the Romania team.')
boldBullet('Flightpath Automation Tool', 'Built an internal app at The Access Group APAC that auto-generates structured client welcome emails by joining two FocalPoint data sources — eliminating a manual copy-paste process for the Professional Services team.')
boldBullet('PO Ticketing System & SHR Timesheet Log', 'Built an office-wide ticketing system for the PO Team and a global timesheet logging tool rolled out across APAC, EMEA, and the Americas for the SHR team.')
boldBullet('First Class Diploma, 3.76 Degree CGPA', "Graduated First Class Honours (CGPA 3.54) in Diploma of Computer Science and currently maintaining a CGPA of 3.76 in the Bachelor's degree.")
boldBullet('7+ Years Freelancing', 'Running Blugrafix (graphic design & jersey printing) since 2019, shooting as a freelance photographer since 2018, and delivering full-stack client builds since 2025 — end to end.')

// ── PROFESSIONAL EXPERIENCE ───────────────────────────────────────────────────
section('Professional Experience')

job('Software Engineer,  Workforce AI, The Access Group', '26 Jul 2026 – Present', [
  'Absorbed into a permanent Software Engineer position with the Workforce AI team following completion of internship.',
  'Working with the Romania team on Workforce AI product engineering.',
])
job('Associate Project Coordinator / Associate Software Engineer Intern,  The Access Group APAC', 'Mar 2026 – 26 Jul 2026', [
  'Coordinated meetings and communications between consultants and clients across multiple regions, supporting a UK-based delivery team.',
  'Managed daily workflows using Salesforce and Access FocalPoint.',
  'Built the Flightpath Welcome Email Tool — joins Sales Handover and SOW Booking data by Project Code and auto-generates structured email drafts; built with EVO Builder, React, .NET, and Microsoft Azure.',
  'Built a Flightpath API webhook connector using n8n and EVO workflow automation at an internal Connector-thon hackathon.',
  'Built the PO Ticketing System, letting anyone in the office raise requests for the PO Team to track and action.',
  'Built the SHR Timesheet Log, rolled out globally for the SHR team across APAC, EMEA, and the Americas — delivered end-to-end in 3 weeks.',
  'Coordinated with stakeholders across regions and joined meetings with Access APAC\'s top leadership.',
  'Mastered Azure CI/CD end-to-end — pipelines, resource groups, container apps, Rancher, Docker, and blob storage.',
])
job('Freelance Full-Stack Developer,  Independent', '2025 – Present', [
  'Delivered end-to-end client projects from PRD to UI design, full-stack build, and deployment.',
  'Built PapVision — a cytopathology learning platform for a UiTM lecturer — using React, TypeScript, and Firebase.',
  'Shipped production apps on Netlify and Azure with CI/CD pipelines.',
])
job('Video Editor Intern,  Rev Media Group & Media Prima (OhBulan!)', 'Sep 2023 – Feb 2024', [
  'Directed and edited OBTV — a 5-minute TV show on TV9, aired Thursday to Saturday.',
  'Produced Lit Tak?, a show featuring influencers, artists, and KOLs.',
  'Official VOCKET photographer at Hausboom Music 2023, TapauFest 2023, and Aina Abdul\'s press conference.',
])
job('Graphic Designer,  FexieWear', 'Jun 2023 – Oct 2023', [
  'Produced apparel designs and marketing materials for the brand.',
])
job('Founder & Freelance Designer,  Blugrafix', '2019 – Present', [
  'Founded and operate a graphic design and jersey sublimation printing business.',
  'Manage full workflow from client brief to final print-ready artwork.',
])
job('Freelance Photographer & Videographer,  Independent', '2018 – Present', [
  'Cover weddings, corporate events, school events, and product launches.',
])
job('Designer (Volunteer),  Youths.My', 'Sep 2020 – Jan 2025', [
  'Contributed graphic design work for social media campaigns over four years.',
])

// ── PROJECTS ──────────────────────────────────────────────────────────────────
section('Projects')

job('Hootang  —  hootang.amrlhakimi.my', '2026', [
  'Expense and IOU tracker PWA — splits restaurant bills with tax, tracks shared subscriptions and borrowed money, and calculates fair amounts.',
  'Stack: React, TypeScript, TailwindCSS, Firebase, GSAP, Cloudflare Workers, PWA.',
  'Features: Google Sign-In, cross-device Firestore sync, scheduled push notifications, WhatsApp share, GSAP animations.',
])

job('NakKahwin  —  nakkahwin.amrlhakimi.my', '2026', [
  'Wedding planning web app for Malaysian Muslim couples — covers nikah forms, hantaran, vendors, guests, and budget in one place.',
  'Stack: React 19, TypeScript, Vite, TailwindCSS, React Router, LocalStorage.',
])

job('VoltaList  —  voltalist.amrlhakimi.my', '2026', [
  'Futsal session sign-up app replacing messy WhatsApp text lists — captains create sessions, players register slots with quota enforcement.',
  'Stack: React 19, TypeScript, TailwindCSS v4, Firebase, React Router v7.',
])

job('Timetable4me  —  tt4me.waizhzq.my', '2026', [
  'Academic schedule and study productivity app — weekly timetable, task tracker with priority scoring, Pomodoro/Free focus timer, PDF export.',
  'Stack: React 19, TypeScript, Firebase, Anime.js, jsPDF, Netlify.',
])

job('QR Attendance System  —  Final Year Project', '2025 – 2026', [
  'Mobile + web platform for UiTM students to record attendance via QR code scanning.',
  'Stack: React Native (iOS), React web dashboard, MySQL, Firebase.',
])

// ── ADDITIONAL INFORMATION ────────────────────────────────────────────────────
section('Additional Information')
boldBullet('Languages', 'Malay (Native), English (Fluent), Bahasa Indonesia (Proficient), Mandarin (Basic).')
boldBullet('Technical Skills', 'React, React Native, TypeScript, Node.js, .NET, Python, MySQL, Firebase, Supabase, Microsoft Azure, Azure DevOps, Azure Container Apps, Azure Blob Storage, Docker, Rancher, TailwindCSS, Figma, Adobe Photoshop, Illustrator, Premiere Pro, Lightroom, Git, Salesforce, EVO Builder, EVO Workflow Automation, n8n.')
boldBullet('Activities', 'President of Photography Club, SMK Jitra (2020–2021). Volunteer Designer, Youths.My (2020–2025).')

// ── EDUCATION ─────────────────────────────────────────────────────────────────
section('Education')
edu('Bachelor of Computer Science (Honours) — CS230', 'UiTM Kampus Tapah, Perak', '2024 – Present', [
  'CGPA: 3.76 · Semester 7',
  'FYP: QR-based attendance system — React Native (iOS) + React web dashboard, MySQL, Firebase.',
])
edu('Diploma in Computer Science — CS110, First Class Honours', 'UiTM Kampus Sungai Petani', '2021 – 2024', [
  'CGPA: 3.54 · Coursework: Web Development, Mobile App Dev, Data Structures, Software Engineering, Database Management.',
])
edu('Sijil Pelajaran Malaysia (SPM)', 'Sekolah Menengah Kebangsaan Jitra', '2016 – 2021', [
  '6As SPM · 8As PT3',
])

doc.end()
doc.on('end', () => console.log('✓  ATS resume →', OUT))
