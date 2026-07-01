// Design resume — sidebar layout with photo, color accents, visual hierarchy
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: { Title: 'Amirul Hakimi — Resume', Author: 'Amirul Hakimi' },
})

const OUT = path.join(__dirname, 'public', 'AmirulHakimiCV.pdf')
doc.pipe(fs.createWriteStream(OUT))

// ── dimensions
const PW    = 595.28
const PH    = 841.89
const SB_W  = 186          // sidebar width
const MX    = SB_W + 20    // main column x
const MW    = PW - MX - 28 // main column width ≈ 361
const M_TOP = 32
const M_BOT = 32

// ── palette
const SB_BG     = '#1a3540'   // dark blue-slate sidebar
const SB_ACCENT = '#5bbfb2'   // mint teal
const SB_TEXT   = '#eef4f3'
const SB_MUTED  = '#8ab4ae'
const SB_RULE   = '#2e5060'

const BLK  = '#111111'
const DARK = '#2d2d2d'
const GRAY = '#505050'
const MUTE = '#888888'
const TEAL = '#176b5e'
const RULE = '#e0e0e0'

// ── sidebar y cursor (absolute)
let sy = 0
// ── main y cursor (absolute, per page)
let my = M_TOP

// ════════════════════════════════════════════════════════════════════════════
// helpers — sidebar
// ════════════════════════════════════════════════════════════════════════════
function drawSidebarBg() {
  doc.rect(0, 0, SB_W, PH).fill(SB_BG)
}

doc.on('pageAdded', () => {
  drawSidebarBg()
  my = M_TOP
})

function sbSection(title) {
  sy += 12
  doc.fontSize(7).font('Helvetica-Bold').fillColor(SB_ACCENT)
    .text(title.toUpperCase(), 16, sy, { width: SB_W - 32, characterSpacing: 1.4, lineBreak: false })
  sy += doc.currentLineHeight(true) + 4
  doc.moveTo(16, sy).lineTo(SB_W - 16, sy).strokeColor(SB_RULE).lineWidth(0.5).stroke()
  sy += 8
}

function sbItem(label, value) {
  // label in mint, value in white
  if (value) {
    doc.fontSize(7).font('Helvetica-Bold').fillColor(SB_ACCENT)
      .text(label, 18, sy, { width: SB_W - 36, lineBreak: false })
    sy += doc.currentLineHeight(true) + 1
    doc.fontSize(7.5).font('Helvetica').fillColor(SB_TEXT)
      .text(value, 18, sy, { width: SB_W - 36, lineGap: 1 })
    sy = doc.y + 5
  } else {
    doc.fontSize(7.5).font('Helvetica').fillColor(SB_TEXT)
      .text(label, 18, sy, { width: SB_W - 36, lineGap: 1 })
    sy = doc.y + 4
  }
}

function sbSkill(skill) {
  // Small dot + skill name
  doc.circle(21, sy + 4.5, 2).fill(SB_ACCENT)
  doc.fontSize(7.5).font('Helvetica').fillColor(SB_TEXT)
    .text(skill, 28, sy, { width: SB_W - 44, lineGap: 1, lineBreak: false })
  sy += doc.currentLineHeight(true) + 4
}

function sbLang(lang, level) {
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor(SB_TEXT)
    .text(lang, 18, sy, { continued: true, width: SB_W - 36 })
  doc.font('Helvetica').fillColor(SB_MUTED)
    .text(`  ${level}`, { width: SB_W - 36 })
  sy = doc.y + 4
}

// ════════════════════════════════════════════════════════════════════════════
// helpers — main column
// ════════════════════════════════════════════════════════════════════════════
function needPage(est = 60) {
  if (my + est > PH - M_BOT) {
    doc.addPage({ margins: { top: 0, bottom: 0, left: 0, right: 0 } })
    // pageAdded handler resets my
  }
}

function mainSection(title) {
  needPage(50)
  my += 10
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(TEAL)
    .text(title.toUpperCase(), MX, my, { characterSpacing: 0.9, lineBreak: false })
  my += doc.currentLineHeight(true) + 3
  doc.moveTo(MX, my).lineTo(MX + MW, my).strokeColor(RULE).lineWidth(0.5).stroke()
  my += 7
}

function mainJob(titleCo, period, bullets = []) {
  needPage(46 + bullets.length * 14)
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(BLK)
    .text(titleCo, MX, my, { width: MW, lineGap: 1 })
  my = doc.y + 1
  doc.fontSize(7.5).font('Helvetica-Oblique').fillColor(MUTE)
    .text(period, MX, my, { lineBreak: false })
  my += doc.currentLineHeight(true) + 3
  bullets.forEach(b => {
    doc.fontSize(8).font('Helvetica').fillColor(GRAY)
    doc.text(`•  ${b}`, MX + 9, my, { width: MW - 9, lineGap: 1.3 })
    my = doc.y
  })
  my += 7
}

function mainEdu(degree, school, period, details = []) {
  needPage(40 + details.length * 14)
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(BLK)
  const pW = doc.widthOfString(period)
  doc.text(degree, MX, my, { width: MW - pW - 6, lineBreak: false })
  doc.text(period, MX + MW - pW, my, { lineBreak: false })
  my += doc.currentLineHeight(true) + 2
  doc.fontSize(8).font('Helvetica-Oblique').fillColor(DARK)
    .text(school, MX, my, { lineBreak: false })
  my += doc.currentLineHeight(true) + 3
  details.forEach(d => {
    doc.fontSize(8).font('Helvetica').fillColor(GRAY)
    doc.text(`•  ${d}`, MX + 9, my, { width: MW - 9, lineGap: 1.3 })
    my = doc.y
  })
  my += 7
}

function mainBoldBullet(bold, rest) {
  needPage(28)
  doc.fontSize(8).font('Helvetica-Bold').fillColor(BLK)
  doc.text(`•  ${bold}. `, MX + 9, my, { continued: true, width: MW - 9, lineGap: 1.3 })
  doc.font('Helvetica').fillColor(GRAY).text(rest, { lineGap: 1.3 })
  my = doc.y + 4
}

function mainProject(name, year, desc, url) {
  needPage(36)
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(BLK)
  const yrW = doc.widthOfString(year)
  doc.text(name, MX, my, { width: MW - yrW - 6, lineBreak: false })
  doc.fontSize(8).font('Helvetica').fillColor(MUTE)
  doc.text(year, MX + MW - yrW, my, { lineBreak: false })
  my += doc.currentLineHeight(true) + 2
  doc.fontSize(8).font('Helvetica').fillColor(GRAY)
  doc.text(desc, MX + 9, my, { width: MW - 9, lineGap: 1.2 })
  my = doc.y
  doc.fillColor(TEAL).text(url, MX + 9, my, { width: MW - 9 })
  my = doc.y + 6
}

// ════════════════════════════════════════════════════════════════════════════
// BUILD PAGE 1
// ════════════════════════════════════════════════════════════════════════════
drawSidebarBg()

// ── PROFILE PHOTO ─────────────────────────────────────────────────────────────
sy = 28
const PR    = 52
const PCX   = SB_W / 2
const PCY   = sy + PR

const avatarPath = path.join(__dirname, 'public', 'avatar.jpg')
if (fs.existsSync(avatarPath)) {
  doc.save()
  doc.circle(PCX, PCY, PR).clip()
  doc.image(avatarPath, PCX - PR, PCY - PR, { width: PR * 2, height: PR * 2, cover: [PR * 2, PR * 2] })
  doc.restore()
}
// Photo ring
doc.circle(PCX, PCY, PR).lineWidth(2).strokeColor(SB_ACCENT).stroke()

sy = PCY + PR + 13

// ── NAME + TITLE ──────────────────────────────────────────────────────────────
doc.fontSize(12).font('Helvetica-Bold').fillColor(SB_TEXT)
  .text('AMIRUL HAKIMI', 0, sy, { width: SB_W, align: 'center' })
sy = doc.y + 2

doc.fontSize(7.5).font('Helvetica').fillColor(SB_ACCENT)
  .text('Full-Stack Developer', 0, sy, { width: SB_W, align: 'center', characterSpacing: 0.5 })
sy = doc.y + 3

doc.moveTo(20, sy).lineTo(SB_W - 20, sy).strokeColor(SB_RULE).lineWidth(0.5).stroke()

// ── SIDEBAR: CONTACT ──────────────────────────────────────────────────────────
sbSection('Contact')
sbItem('Phone', '+60134280702')
sbItem('Email', 'amirulxhakimi@gmail.com')
sbItem('LinkedIn', 'linkedin.com/in/amrlhakimii')
sbItem('GitHub', 'github.com/amrlhakimii')

// ── SIDEBAR: TECHNICAL SKILLS ─────────────────────────────────────────────────
sbSection('Technical Skills')
;[
  'React / React Native',
  'TypeScript / JavaScript',
  'Node.js / .NET',
  'Python / Java / C++',
  'MySQL / Firebase / Supabase',
  'Microsoft Azure / DevOps',
  'Docker / Rancher / Container Apps',
  'TailwindCSS / Vite',
  'REST APIs / CI/CD',
  'Prompt Eng. / LLM Integration',
  'Adobe Suite / Figma',
  'Git / Salesforce',
].forEach(s => sbSkill(s))

// ── SIDEBAR: LANGUAGES ────────────────────────────────────────────────────────
sbSection('Languages')
sbLang('Malay', '(Native)')
sbLang('English', '(Fluent)')
sbLang('Bahasa Indonesia', '(Proficient)')
sbLang('Mandarin', '(Basic)')

// ── SIDEBAR: ACTIVITIES ───────────────────────────────────────────────────────
sbSection('Activities')
sbItem('President — Photography Club', 'SMK Jitra, 2020–2021')
sbItem('Volunteer Designer', 'Youths.My, 2020–2025')

// ════════════════════════════════════════════════════════════════════════════
// MAIN COLUMN — page 1
// ════════════════════════════════════════════════════════════════════════════

// ── Name header
doc.fontSize(20).font('Helvetica-Bold').fillColor(BLK)
  .text('Amirul Hakimi', MX, my, { lineBreak: false })
my += doc.currentLineHeight(true) + 2

doc.fontSize(9.5).font('Helvetica').fillColor(TEAL)
  .text('Full-Stack Developer  ·  AI Engineering  ·  Malaysia', MX, my, { lineBreak: false })
my += doc.currentLineHeight(true) + 5

doc.moveTo(MX, my).lineTo(MX + MW, my).strokeColor(RULE).lineWidth(0.5).stroke()
my += 9

// ── Summary
doc.fontSize(8).font('Helvetica').fillColor(GRAY)
  .text(
    'Final-year Computer Science student (CGPA 3.76) with 7+ years of freelance experience across full-stack development, graphic design, and photography. Interned as Associate Project Coordinator / Associate Software Engineer at The Access Group APAC, where I built AI-powered internal automation tools for the Professional Services and SHR teams, and was absorbed into a permanent Software Engineer role with the Workforce AI team.',
    MX, my, { width: MW, lineGap: 2, align: 'justify' }
  )
my = doc.y + 4

// ── Professional Experience
mainSection('Professional Experience')

mainJob('Software Engineer,  Workforce AI, The Access Group', '26 Jul 2026 – Present', [
  'Absorbed into a permanent Software Engineer position with the Workforce AI team following completion of internship.',
  'Working with the Romania team on Workforce AI product engineering.',
])

mainJob('Associate Project Coordinator / Associate Software Engineer Intern,  The Access Group APAC', 'Mar 2026 – 26 Jul 2026', [
  'Coordinated meetings and communications between consultants and clients across multiple regions, supporting a UK-based delivery team.',
  'Managed daily workflows using Salesforce and Access FocalPoint.',
  'Built the Flightpath Welcome Email Tool — auto-generates structured welcome email drafts by joining FocalPoint data sources; built with EVO Builder, React, .NET, and Azure.',
  'Built a Flightpath API webhook connector using n8n and EVO workflow automation at an internal Connector-thon hackathon.',
  'Built the PO Ticketing System, letting anyone in the office raise requests for the PO Team to track and action.',
  'Built the SHR Timesheet Log, rolled out globally for the SHR team across APAC, EMEA, and the Americas — delivered end-to-end in 3 weeks.',
  'Coordinated with stakeholders across regions and joined meetings with Access APAC\'s top leadership.',
  'Mastered Azure CI/CD end-to-end — pipelines, resource groups, container apps, Rancher, Docker, and blob storage.',
])

mainJob('Freelance Full-Stack Developer,  Independent', '2025 – Present', [
  'Delivered end-to-end client projects from PRD to UI design, full-stack build, and deployment.',
  'Built PapVision — a cytopathology learning platform — using React, TypeScript, and Firebase.',
  'Shipped production apps on Netlify and Azure with CI/CD pipelines.',
])

mainJob('Video Editor Intern,  Rev Media Group & Media Prima (OhBulan!)', 'Sep 2023 – Feb 2024', [
  'Directed and edited OBTV — a 5-minute TV show on TV9, aired Thursday to Saturday.',
  'Produced Lit Tak?, a show featuring influencers, artists, and KOLs.',
  'Official VOCKET photographer at Hausboom Music 2023, TapauFest 2023, and Aina Abdul\'s press conference.',
])

mainJob('Graphic Designer,  FexieWear', 'Jun 2023 – Oct 2023', [
  'Produced apparel designs and marketing materials for the brand.',
])

mainJob('Founder & Freelance Designer,  Blugrafix', '2019 – Present', [
  'Founded and operate a graphic design and jersey sublimation printing business since 2019.',
  'Manage full workflow from client brief to final print-ready artwork.',
])

mainJob('Freelance Photographer & Videographer,  Independent', '2018 – Present', [
  'Cover weddings, corporate events, school events, and product launches.',
])

// ── Key Achievements
mainSection('Key Achievements')

mainBoldBullet('Absorbed to Permanent Software Engineer',
  'Promoted from intern to a permanent Software Engineer position with the Workforce AI team at The Access Group, working with the Romania team.')
mainBoldBullet('Flightpath Automation Tool',
  'Built an internal app at The Access Group APAC that auto-generates structured client welcome emails — eliminating a manual copy-paste process for the Professional Services team.')
mainBoldBullet('PO Ticketing System & SHR Timesheet Log',
  'Built an office-wide ticketing system for the PO Team and a global timesheet logging tool rolled out across APAC, EMEA, and the Americas for the SHR team.')
mainBoldBullet('First Class Diploma, 3.76 Degree CGPA',
  "Graduated First Class Honours (CGPA 3.54) in Diploma; currently maintaining CGPA 3.76 in the Bachelor's degree.")
mainBoldBullet('7+ Years Freelancing',
  'Running Blugrafix since 2019, freelance photography since 2018, and full-stack client work since 2025 — managing scope, design, and deployment end to end.')

// ── Education
mainSection('Education')

mainEdu('Bachelor of Computer Science (Honours) — CS230', 'UiTM Kampus Tapah, Perak', '2024 – Present', [
  'CGPA: 3.76 · Semester 7',
  'FYP: QR-based attendance system — React Native (iOS) + React web dashboard, MySQL, Firebase.',
])
mainEdu('Diploma in Computer Science — CS110, First Class Honours', 'UiTM Kampus Sungai Petani', '2021 – 2024', [
  'CGPA: 3.54 · Web Development, Mobile App Dev, Data Structures, Software Engineering, Database Management.',
])
mainEdu('Sijil Pelajaran Malaysia (SPM)', 'Sekolah Menengah Kebangsaan Jitra', '2016 – 2021', [
  '6As SPM · 8As PT3',
])

// ── Selected Projects
mainSection('Selected Projects')

mainProject('Hootang', '2026',
  'Expense & IOU tracker PWA — React, TypeScript, Firebase, GSAP, Cloudflare Workers, push notifications.',
  'hootang.amrlhakimi.my')
mainProject('NakKahwin', '2026',
  'Malaysian Muslim wedding planning app — React 19, TypeScript, TailwindCSS.',
  'nakkahwin.amrlhakimi.my')
mainProject('VoltaList', '2026',
  'Futsal session sign-up app replacing WhatsApp lists — React, TypeScript, Firebase.',
  'voltalist.amrlhakimi.my')
mainProject('Timetable4me', '2026',
  'Academic schedule & study productivity app — React, TypeScript, Firebase, Anime.js, jsPDF.',
  'tt4me.waizhzq.my')

doc.end()
doc.on('end', () => console.log('✓  Design resume →', OUT))
