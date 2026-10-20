# Builds public/assets/Laxman_Singh_Jadon_CV.pdf in the narrative "journey" layout.
#   pip install reportlab && python scripts/build_cv.py
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_RIGHT, TA_CENTER
from reportlab.platypus.flowables import Flowable


class Dot(Flowable):
    """Timeline node: a filled circle with a connecting line running down the row."""
    def __init__(self, last=False): super().__init__(); self.last = last; self.length = 0
    def wrap(self, aw, ah): self.aw = aw; return aw, 10
    def draw(self):
        c = self.canv; x = self.aw / 2
        if not self.last:
            c.setStrokeColor(LINE); c.setLineWidth(1); c.line(x, 4, x, 10 - self.length)
        c.setFillColor(colors.white); c.setStrokeColor(ACC); c.setLineWidth(1.6); c.circle(x, 5, 3.4, fill=1, stroke=1)
        c.setFillColor(ACC); c.circle(x, 5, 1.6, fill=1, stroke=0)

OUT = 'public/assets/Laxman_Singh_Jadon_CV.pdf'
ACC = colors.HexColor('#b07a1f'); INK = colors.HexColor('#1b1b1b'); BODY = colors.HexColor('#3a3a3a')
SOFT = colors.HexColor('#f6efe3'); LINE = colors.HexColor('#e2d3b8'); MUTED = colors.HexColor('#7a6a55')
doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=16*mm, rightMargin=16*mm, topMargin=14*mm, bottomMargin=14*mm,
                        title='Laxman Singh Jadon — CV', author='Laxman Singh Jadon')
W = doc.width
def S(**k): return ParagraphStyle(name=str(len(k))+str(id(k)), **k)
NAME = S(fontName='Helvetica-Bold', fontSize=23, leading=27, textColor=INK)
ROLE = S(fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=ACC, spaceBefore=2)
TAG = S(fontName='Helvetica-Oblique', fontSize=9.5, leading=12.5, textColor=MUTED, spaceBefore=2)
CON = S(fontName='Helvetica', fontSize=8.8, leading=13, textColor=BODY, alignment=TAR if (TAR:=TA_RIGHT) else 0)
INTRO = S(fontName='Helvetica-Oblique', fontSize=9.8, leading=14.2, textColor=BODY)
HEAD = S(fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=ACC, spaceBefore=10, spaceAfter=6)
DATE = S(fontName='Helvetica-Bold', fontSize=8.8, leading=11.5, textColor=ACC, alignment=TA_RIGHT)
DOT = S(fontName='Helvetica-Bold', fontSize=10, leading=11.5, textColor=ACC, alignment=TA_CENTER)
CH = S(fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=INK)
CHS = S(fontName='Helvetica-Oblique', fontSize=8.6, leading=11.5, textColor=MUTED, spaceAfter=2)
B = S(fontName='Helvetica', fontSize=9, leading=12.8, textColor=BODY)
TH = S(fontName='Helvetica-Bold', fontSize=9.6, leading=12.5, textColor=INK, spaceAfter=3)
SH = S(fontName='Helvetica-Bold', fontSize=8.6, leading=11, textColor=ACC, spaceBefore=4, spaceAfter=3)
SM = S(fontName='Helvetica', fontSize=8.4, leading=11.6, textColor=BODY)
SMB = S(fontName='Helvetica-Bold', fontSize=8.4, leading=11, textColor=INK)
QUOTE = S(fontName='Helvetica-Oblique', fontSize=9, leading=12.8, textColor=BODY)
P = Paragraph

# ---------- header: photo | name + tagline | contact ----------
photo = Image('public/assets/cv-photo.jpg', width=24*mm, height=30*mm)
left = [P('Laxman Singh Jadon', NAME), P('HR Lead · IG Strategic Systems Pvt Ltd (IG Defence)', ROLE),
        P('A journey through people, policy, and purpose', TAG)]
right = [P('+91 8383842382', CON), P('luckysingh0508.lsj@gmail.com', CON), P('Greater Noida, India – 201318', CON)]
hdr = Table([[photo, left, right]], colWidths=[28*mm, W - 28*mm - 58*mm, 58*mm])
hdr.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('LEFTPADDING', (0, 0), (-1, -1), 0),
                         ('RIGHTPADDING', (0, 0), (-1, -1), 0), ('LINEBELOW', (0, 0), (-1, 0), 1.2, ACC),
                         ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))
story = [hdr, Spacer(1, 8)]

intro = Table([[P("Every career is a story before it’s a résumé. This one begins in years of serious preparation for the UPSC civil services, with a curiosity about how people, policy and systems work, and moves chapter by chapter from learning HR’s fundamentals to leading HR at a defence technology company, with Project Delivery added to the role. The pages that follow trace how one led to the next.", INTRO)]], colWidths=[W])
intro.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), SOFT), ('LINEBEFORE', (0, 0), (0, -1), 3, ACC),
                           ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
                           ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))
story += [intro, P('THE JOURNEY', HEAD)]

# ---------- timeline: date | ● | chapter ----------
JOURNEY = [
    ('2014 – 2018', 'Foundations — The Civil Services Years', 'BA · MA Rural Development · Serious UPSC aspirant',
     'The plan was never HR at first. It was the UPSC civil services, pursued as a serious aspirant. A BA in Economics, Sociology and English Literature and an MA in Rural Development were chosen with that goal in mind, and the preparation meant long hours with polity, governance, economics and public administration: how laws are written, how institutions run, and how policy lands on real people. The exam path eventually gave way to HR, but the preparation never went to waste. It left a discipline for long, structured effort and a public-service instinct to see the person behind every process.'),
    ('Dec 2019<br/>– Jan 2024', 'First Steps — Building Discipline in HR', 'HR Officer · Tricornio Technologies',
     'Learning HR from the ground up: employee records, payroll and statutory documentation, the unglamorous groundwork everything else is built on. Four years of getting the fundamentals right with zero compliance deviations earned recognition as Best Employee of the Year, and something more lasting: a reputation for reliability.'),
    ('Jul 2024<br/>– Jul 2025', 'Scaling Up — From HR to Multi-State Operations', 'HR Manager & Project Coordinator · Kasper Infrastructure',
     'The scale changed overnight, from a single site to HR leadership across 600+ employees on multi-state infrastructure projects, with compliance governance raised from 30% to 93%+ ahead of deadline. Coordinating HR and operations for the Mahakumbh 2025 Tent City Project (200 luxury tents, dozens of stakeholders) was the first time HR and project delivery sat side by side, a pairing that would return later by design.'),
    ('Jul 2025<br/>– Oct 2025', 'Full Ownership — Running a Plant, End to End', 'Plant Manager · Kasper Engineering',
     'Sole charge of a 60-person plant: HR, admin, security, vendors, housekeeping and discipline under one roof. A compressed lesson in running a complete operation, and the step that took the skill set beyond HR.'),
    ('Jan 2026<br/>– Aug 2026', 'A Fast Rise — Trust Earned in Months', 'IG Strategic Systems Pvt Ltd (IG Defence, formerly IG Drones)',
     'Joined as HR Associate-II in January 2026, promoted to HR Associate-III in April and to HR Lead in June. Years of groundwork, compressed into months of recognition.'),
    ('Aug 2026 – Present', 'Today — Where HR Meets Project Delivery', 'HR Lead · IG Defence (additional charge: Project Delivery Department)',
     'As HR Lead, took on the Project Delivery Department as an additional charge. This is where the threads meet: the compliance rigour from Tricornio, the multi-state scale from Kasper Infrastructure, the end-to-end ownership from the plant, and that early taste of delivery at Mahakumbh, all converging into one role.'),
]
DW, DOTW = 31*mm, 8*mm
for i, (d, t, sub, body) in enumerate(JOURNEY):
    dot = Dot(i == len(JOURNEY) - 1)
    row = Table([[P(d, DATE), dot, [P(t, CH), P(sub, CHS), P(body, B)]]], colWidths=[DW, DOTW, W - DW - DOTW])
    st = [('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
          ('TOPPADDING', (0, 0), (-1, -1), 1), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]
    row.setStyle(TableStyle(st + [('RIGHTPADDING', (0, 0), (0, 0), 4)]))
    dot.length = row.wrap(W, 2000)[1] + 2  # line reaches the next row's dot
    story.append(row)

# ---------- threads: 2 x 2 grid ----------
THREADS = [
    ('People First', 'A sociology and rural-development background shows up daily in how grievances are heard and policies are written, with the person, not just the process, in view.'),
    ('Discipline & Compliance', 'Years of UPSC preparation left a habit of rigour: 100% statutory documentation accuracy, audit-ready records, and compliance governance raised from 30% to 93%+ ahead of deadline at Kasper Infrastructure.'),
    ('Operations at Scale', 'From a 60-person plant to 600+ employees across multi-state projects to a combined HR-and-delivery function, each chapter added a layer of scale the last one didn’t have.'),
    ('Curiosity & Continuous Improvement', 'Chess, coding and an interest in AI in HR aren’t side notes. They are the same instinct behind HRMS implementations, Lean Six Sigma thinking and automation wherever HR can run smarter.'),
]
cell = lambda h, b: [P(h.replace('&', '&amp;'), TH), P(b, SM)]
grid = Table([[cell(*THREADS[0]), cell(*THREADS[1])], [cell(*THREADS[2]), cell(*THREADS[3])]], colWidths=[W/2 - 2*mm]*2, spaceBefore=0)
grid.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BACKGROUND', (0, 0), (-1, -1), SOFT),
                          ('LINEBELOW', (0, 0), (-1, 0), 4, colors.white), ('LINEAFTER', (0, 0), (0, -1), 4, colors.white),
                          ('LINEABOVE', (0, 0), (-1, 0), 2, ACC), ('LEFTPADDING', (0, 0), (-1, -1), 9),
                          ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))
story.append(KeepTogether([P('THREADS THAT CONNECT', HEAD), grid]))

# ---------- where I am now ----------
story.append(KeepTogether([P('WHERE I AM NOW', HEAD), P(
    'Today, as HR Lead at IG Strategic Systems Pvt Ltd (IG Defence), with additional charge of the Project Delivery Department, the two sides of this journey run in parallel. '
    '<b>On the HR side:</b> end-to-end hiring across niche technical, white-collar and blue-collar roles; HR and organisational policy development; general administration, SOP design and security protocol enforcement; and direct oversight of IT, Admin, Talent Acquisition, HR Operations, Policy &amp; Governance, Payroll &amp; Compliance, Housekeeping, Kitchen &amp; Cafeteria, Security &amp; Movement Control, Facility Management, Asset Management and external vendor teams. '
    '<b>On the Project Delivery side:</b> coordinating with Business Development on demos, TEC, trials and product showcases; leading on-site delivery, testing and ATP; post-delivery client training; and stepping in wherever technical, mechanical or software support is needed to get a project across the line.', B),
    Spacer(1, 5), P('An MBA in HR &amp; Operations from LPU, completed in 2026, formalised what six years had taught through practice, and points toward where people strategy and operational delivery can go next.', QUOTE)]))

# ---------- turning point ----------
tp = Table([[[P('A TURNING POINT — BUILDING FROM SCRATCH', S(fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=ACC, spaceAfter=5)),
    P("One piece of this journey stands apart: setting up IG Defence’s Production &amp; Manufacturing department from the ground up. The obvious path would have been hiring highly paid engineers for basic assembly. Instead, the model was rethought: a large blue-collar workforce, many with little formal technical education, was trained for assembly, while engineers were reserved for testing and quality control, where zero-fault precision matters most.", B), Spacer(1, 4),
    P('The first weeks meant real adjustment, but within weeks the workforce had adapted, and the training became a repeatable system. Production costs fell sharply without compromising quality, and a workforce once considered unsuited to precision work began building highly technical drones: proof that the right training can turn an overlooked workforce into a genuine competitive advantage.', B)]]], colWidths=[W])
tp.setStyle(TableStyle([('BOX', (0, 0), (-1, -1), 0.8, LINE), ('LINEBEFORE', (0, 0), (0, -1), 3, ACC),
                        ('LEFTPADDING', (0, 0), (-1, -1), 11), ('RIGHTPADDING', (0, 0), (-1, -1), 11),
                        ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 10)]))
story += [Spacer(1, 10), KeepTogether(tp)]

# ---------- details: 3 columns ----------
edu = [P('EDUCATION', SH)]
for t, w in [('MBA, HR &amp; Operations Management', 'LPU · 2026'), ('MA, Rural Development', 'IGNOU · 2018'),
             ('BA, Economics, Sociology, English Lit.', 'JU · 2016'), ('Diploma in Computer Application', 'MMYVV, M.P. · 2014')]:
    edu += [P(t, SMB), P(w, S(fontName='Helvetica', fontSize=8.2, leading=11, textColor=MUTED, spaceAfter=4))]
certs = [P('CERTIFICATIONS', SH)] + [P(c, SM) for c in [
    'Lean Six Sigma White Belt · CSSC', 'AI in HR · Keka Academy', 'POSH Certification · Keka Academy',
    'Crafting Payroll in India · Keka Academy', 'Compensation &amp; Benefits · Keka Academy',
    'Employee Engagement · Keka Academy', 'People Analytics · Keka Academy', 'Emergency Preparedness · Knights of Safety Academy']]
misc = [P('LANGUAGES', SH), P('English · Hindi', SM), Spacer(1, 6), P('BEYOND WORK', SH)] + \
       [P(x, SM) for x in ['Chess &amp; puzzles', 'Cinema &amp; documentaries', 'Badminton &amp; cricket', 'Coding &amp; AI exploration']]
det = Table([[edu, certs, misc]], colWidths=[W*0.36, W*0.38, W*0.26])
det.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LINEABOVE', (0, 0), (-1, 0), 1.2, ACC),
                         ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 10), ('TOPPADDING', (0, 0), (-1, -1), 4)]))
story.append(KeepTogether([P('THE DETAILS', HEAD), det]))

doc.build(story)
print(OUT)
