# Builds public/assets/Laxman_Singh_Jadon_CV.pdf. Edit the text below, then run:
#   pip install reportlab && python scripts/build_cv.py
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm

OUT = 'public/assets/Laxman_Singh_Jadon_CV.pdf'
ACC, INK, BODY = colors.HexColor('#6b4f2a'), colors.HexColor('#171717'), colors.HexColor('#333333')
doc = SimpleDocTemplate(OUT, pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=16*mm, bottomMargin=16*mm,
                        title='Laxman Singh Jadon — CV', author='Laxman Singh Jadon')
ss = getSampleStyleSheet()
def S(name, **k): ss.add(ParagraphStyle(name=name, **k)); return ss[name]
NAME = S('NameX', fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=INK)
ROLE = S('Role', fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=ACC, spaceBefore=2)
TAG = S('Tag', fontName='Helvetica-Oblique', fontSize=9.5, leading=12, textColor=colors.HexColor('#7a6a55'), spaceAfter=4)
CONTACT = S('Contact', fontName='Helvetica', fontSize=8.5, leading=11, textColor=colors.HexColor('#444444'))
INTRO = S('Intro', fontName='Helvetica', fontSize=10, leading=14.5, textColor=BODY, spaceBefore=8, spaceAfter=4)
HEAD = S('Head', fontName='Helvetica-Bold', fontSize=11.5, leading=14, textColor=ACC, spaceBefore=10, spaceAfter=5)
ROLEH = S('RoleH', fontName='Helvetica-Bold', fontSize=10.3, leading=13, textColor=INK, spaceBefore=5)
SUB = S('Sub', fontName='Helvetica-Oblique', fontSize=9, leading=12, textColor=ACC, spaceAfter=2)
B = S('BodyX', fontName='Helvetica', fontSize=9.3, leading=13.2, textColor=BODY, spaceAfter=5)
BUL = S('Bul', parent=B, leftIndent=10, bulletIndent=0, spaceAfter=2)
SMALL = S('SmallHead', fontName='Helvetica-Bold', fontSize=9.8, leading=12.5, textColor=INK, spaceBefore=4, spaceAfter=2)

story = [
    Paragraph('Laxman Singh Jadon', NAME),
    Paragraph('HR Lead · IG Strategic Systems Pvt Ltd (IG Defence)', ROLE),
    Paragraph('People, policy, and purpose', TAG),
    Paragraph('+91 83838 42382  ·  luckysingh0508.lsj@gmail.com  ·  Greater Noida, India', CONTACT),
    Spacer(1, 6), HRFlowable(width='100%', thickness=0.6, color=ACC),
    Paragraph('Six years of HR, built from the ground up: statutory records and payroll first, then 600+ people across multi-state projects, then a whole plant, and now HR Lead at a defence technology company, with Project Delivery added to the role. The thread running through all of it started earlier, in years of serious preparation for the UPSC civil services, with a curiosity about how people, policy and systems work.', INTRO),
    Paragraph('THE JOURNEY', HEAD),
]
JOURNEY = [
    ('2014 – 2018', 'Foundations — The Civil Services Years', None, [
        'The plan was never HR at first. It was the UPSC civil services, pursued as a serious aspirant. A BA in Economics, Sociology and English Literature and an MA in Rural Development were chosen with that goal in mind, and the preparation that followed meant long hours with polity, governance, economics and public administration: how laws are written, how institutions run, and how policy lands on real people.',
        'The exam path eventually gave way to a career in HR, but the preparation never went to waste. It left a discipline for long, structured effort, a habit of reading people, policy and systems as one fabric, and a public-service instinct to see the person behind every process.']),
    ('Dec 2019 – Jan 2024', 'HR Officer, Tricornio Technologies', 'First Steps — Building Discipline in HR', [
        'Learned HR from the ground up: employee records, payroll and statutory documentation, the groundwork everything else depends on. Four years with zero compliance deviations, recognised as Best Employee of the Year, and a reputation for reliability that carried forward.']),
    ('Jul 2024 – Jul 2025', 'HR Manager &amp; Project Coordinator, Kasper Infrastructure', 'Scaling Up — From One Site to Multi-State Operations', [
        'HR leadership for 600+ employees across multi-state infrastructure projects. Raised compliance governance from 30% to 93%+ ahead of deadline. Coordinated HR and operations for the Mahakumbh 2025 Tent City Project (200 luxury tents, dozens of stakeholders), the first time HR and live project delivery sat side by side.']),
    ('Jul 2025 – Oct 2025', 'Plant Manager, Kasper Engineering', 'Full Ownership — Running a Plant End to End', [
        'Sole charge of a 60-person plant: HR, admin, security, vendors, housekeeping and discipline under one roof. A compressed lesson in running a complete operation, and the step that took the skill set beyond HR.']),
    ('Jan 2026 – Aug 2026', 'IG Strategic Systems Pvt Ltd (IG Defence, formerly IG Drones)', 'A Fast Rise — Three Roles in Six Months', [
        'Joined as HR Associate-II in January, promoted to HR Associate-III in April and to HR Lead in June.']),
    ('Aug 2026 – Present', 'HR Lead, IG Defence (with additional charge of Project Delivery Department)', 'Where HR Meets Project Delivery', [
        'As HR Lead, took on the Project Delivery Department as an additional charge. Every earlier chapter feeds this role: Tricornio’s compliance rigour, Kasper’s multi-state scale, the plant’s end-to-end ownership, and the Mahakumbh taste of delivery.']),
]
for when, title, sub, paras in JOURNEY:
    block = [Paragraph(f'<font color="#6b4f2a">{when}</font>  ·  {title}', ROLEH)]
    if sub: block.append(Paragraph(sub, SUB))
    block += [Paragraph(p, B) for p in paras]
    story.append(KeepTogether(block))

def bullets(items): return [Paragraph(i, BUL, bulletText='•') for i in items]
story += [KeepTogether([Paragraph('WHAT THE ROLE COVERS TODAY', HEAD), Paragraph('HR &amp; Administration', SMALL)] + bullets([
    'End-to-end hiring across niche technical, white-collar and blue-collar roles',
    'HR and organisational policy, SOP design and security protocol enforcement',
    'Oversight of IT, Admin, Talent Acquisition, HR Operations, Policy &amp; Governance, Payroll &amp; Compliance, Housekeeping, Kitchen &amp; Cafeteria, Security &amp; Movement Control, Facility Management, Asset Management and external vendors'])),
  KeepTogether([Paragraph('Project Delivery', SMALL)] + bullets([
    'Working with Business Development on demos, TEC, trials and product showcases',
    'Leading on-site delivery, testing and ATP for defence products',
    'Post-delivery client training, and hands-on technical, mechanical or software support where a project needs it']))]

story += [KeepTogether([Paragraph('A TURNING POINT — BUILDING PRODUCTION FROM SCRATCH', HEAD),
    Paragraph("Set up IG Defence's Production &amp; Manufacturing department from the ground up. Instead of hiring highly paid engineers for basic assembly, the model was redesigned: a blue-collar workforce, many with little formal technical education, was trained for assembly, and engineers were focused on testing and quality control, where zero-fault precision matters most.", B),
    Paragraph('The first weeks took real adjustment. Within weeks the workforce had adapted, and the training became a repeatable programme. Production costs fell sharply with no loss in quality, and a workforce once seen as unsuited to precision work now builds advanced drones. It showed that the right training can turn an overlooked workforce into a real competitive advantage.', B)])]

story.append(Paragraph('THREADS THAT CONNECT', HEAD))
for h, t in [
    ('People First', 'A sociology and rural-development background shapes how grievances are heard and policies are written: the person in view, not just the process.'),
    ('Discipline &amp; Compliance', 'The rigour of UPSC preparation became a working habit: 100% statutory documentation accuracy, audit-ready records, and compliance raised from 30% to 93%+ ahead of deadline.'),
    ('Operations at Scale', 'From a 60-person plant to 600+ employees across states to a combined HR-and-delivery function, each chapter added scale.'),
    ('Curiosity &amp; Continuous Improvement', 'Chess, coding and AI in HR feed the same instinct behind HRMS implementations, Lean Six Sigma thinking and automation wherever HR can run smarter.')]:
    story.append(Paragraph(f'<b>{h}</b> — {t}', B))

DETAILS = [
    ('EDUCATION', ['<b>MBA, HR &amp; Operations Management</b> — Lovely Professional University · 2026',
                   '<b>MA, Rural Development</b> — IGNOU · 2018',
                   '<b>BA, Economics, Sociology &amp; English Literature</b> — JU · 2016',
                   '<b>Diploma in Computer Application</b> — MMYVV, M.P. · 2014']),
    ('CERTIFICATIONS', ['Lean Six Sigma White Belt — CSSC', 'Emergency Preparedness — Knights of Safety Academy',
                        'Keka Academy: AI in HR · POSH · Crafting Payroll in India · Compensation &amp; Benefits · Employee Engagement · People Analytics']),
    ('LANGUAGES', ['English · Hindi']),
    ('BEYOND WORK', ['Chess &amp; puzzles · Cinema &amp; documentaries · Badminton &amp; cricket · Coding &amp; AI exploration']),
]
for h, items in DETAILS:
    story.append(KeepTogether([Paragraph(h, HEAD)] + bullets(items)))

doc.build(story)
print(OUT)
