# Builds public/assets/Laxman_Singh_Jadon_CV.pdf
#   pip install reportlab && python scripts/build_cv.py
# Layout: dark identity sidebar (photo, contact, numbers, strengths) + main column.
# Fonts (Fraunces + Inter, SIL OFL) match the portfolio site and live in scripts/fonts.
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
                                Image, KeepTogether, FrameBreak, NextPageTemplate, PageBreak)
from reportlab.platypus.flowables import Flowable

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'assets', 'Laxman_Singh_Jadon_CV.pdf')
for n in ['Fraunces-Bold', 'Fraunces-SemiBold', 'Fraunces-Italic', 'Inter-Regular', 'Inter-Medium',
          'Inter-SemiBold', 'Inter-Bold', 'Inter-Italic']:
    pdfmetrics.registerFont(TTFont(n, os.path.join(HERE, 'fonts', n + '.ttf')))
pdfmetrics.registerFontFamily('Inter', normal='Inter-Regular', bold='Inter-SemiBold', italic='Inter-Italic', boldItalic='Inter-SemiBold')

# ---------- palette ----------
INK = colors.HexColor('#1c1914')        # sidebar
INK2 = colors.HexColor('#2a251d')       # sidebar cards
AMBER = colors.HexColor('#f0a830')      # accent on dark
AMBER_D = colors.HexColor('#a8700f')    # accent on white
TEXT = colors.HexColor('#2b2823')
MUTED = colors.HexColor('#7c7366')
SOFT = colors.HexColor('#f8f2e7')
LINE = colors.HexColor('#e6d8bf')
ON_DARK = colors.HexColor('#ece6dc')
ON_DARK_M = colors.HexColor('#a89f90')

PW, PH = A4
SIDE = 64 * mm
PAD = 8 * mm
MAIN_X = SIDE + 11 * mm
MAIN_W = PW - MAIN_X - 13 * mm


def st(name, **k):
    k.setdefault('fontName', 'Inter-Regular'); k.setdefault('textColor', TEXT)
    return ParagraphStyle(name, **k)


# sidebar styles
s_label = st('sl', fontName='Inter-Bold', fontSize=7.2, leading=9, textColor=AMBER, spaceBefore=11, spaceAfter=5)
s_side = st('ss', fontSize=8.2, leading=11.6, textColor=ON_DARK)
s_side_m = st('ssm', fontSize=7.5, leading=10.2, textColor=ON_DARK_M)
s_side_b = st('ssb', fontName='Inter-SemiBold', fontSize=8.2, leading=11, textColor=colors.white)
s_num = st('sn', fontName='Fraunces-Bold', fontSize=19, leading=20, textColor=AMBER)
s_numl = st('snl', fontSize=7.2, leading=9, textColor=ON_DARK_M)
s_quote = st('sq', fontName='Fraunces-Italic', fontSize=11, leading=14.5, textColor=colors.white)
# main styles
s_name = st('nm', fontName='Fraunces-Bold', fontSize=30, leading=33, textColor=colors.HexColor('#171512'))
s_role = st('rl', fontName='Inter-Bold', fontSize=9, leading=12, textColor=AMBER_D, spaceBefore=3)
s_tag = st('tg', fontName='Fraunces-Italic', fontSize=12, leading=15, textColor=MUTED, spaceBefore=4)
s_h = st('h', fontName='Inter-Bold', fontSize=8, leading=10, textColor=AMBER_D, spaceBefore=11, spaceAfter=2)
s_h2 = st('h2', fontName='Fraunces-SemiBold', fontSize=15, leading=18, textColor=colors.HexColor('#171512'), spaceAfter=2)
s_meta = st('mt', fontSize=8, leading=10.5, textColor=MUTED, spaceAfter=6)
s_body = st('b', fontSize=8.9, leading=13, textColor=TEXT)
s_lead = st('ld', fontSize=9.6, leading=14.2, textColor=TEXT)
s_stage_t = st('stt', fontName='Inter-Bold', fontSize=9.6, leading=12, textColor=colors.HexColor('#171512'))
s_stage_s = st('sts', fontName='Fraunces-Italic', fontSize=9.6, leading=12, textColor=AMBER_D)
s_stage_d = st('std', fontName='Inter-SemiBold', fontSize=7.4, leading=9, textColor=MUTED)
s_bul = st('bu', fontSize=8.6, leading=12.2, textColor=TEXT, leftIndent=9, bulletIndent=0, spaceAfter=1.5)
s_role_h = st('rh', fontName='Inter-Bold', fontSize=9.4, leading=12, textColor=colors.HexColor('#171512'))
s_role_m = st('rm', fontName='Inter-Medium', fontSize=7.8, leading=10, textColor=AMBER_D, spaceAfter=3)
s_panel_h = st('ph', fontName='Fraunces-SemiBold', fontSize=13, leading=16, textColor=colors.HexColor('#171512'), spaceAfter=4)
s_note = st('nt', fontName='Inter-Italic', fontSize=8.4, leading=12, textColor=MUTED)

P = Paragraph


def bullets(items, style=s_bul):
    return [P(i, style, bulletText='–') for i in items]


class Rule(Flowable):
    def __init__(self, w, color=LINE, thick=0.7, space=4):
        super().__init__(); self.w, self.color, self.thick, self.space = w, color, thick, space
    def wrap(self, aw, ah): return self.w, self.space * 2
    def draw(self):
        self.canv.setStrokeColor(self.color); self.canv.setLineWidth(self.thick); self.canv.line(0, self.space, self.w, self.space)


class StageNode(Flowable):
    """Numbered node on the growth ladder with a line down to the next stage."""
    def __init__(self, num, last=False): super().__init__(); self.num, self.last, self.length = num, last, 0
    def wrap(self, aw, ah): self.aw = aw; return aw, 18
    def draw(self):
        c = self.canv; x, y = self.aw / 2, 9
        if not self.last:
            c.setStrokeColor(LINE); c.setLineWidth(1.2); c.line(x, y - 9, x, 18 - self.length)
        c.setFillColor(INK); c.circle(x, y, 9, fill=1, stroke=0)
        c.setFillColor(AMBER); c.setFont('Inter-Bold', 7.5); c.drawCentredString(x, y - 2.6, self.num)


class Chips(Flowable):
    """Wrapped tag chips for the sidebar."""
    def __init__(self, items, width): super().__init__(); self.items, self.width = items, width
    def _layout(self):
        rows, x, y, h = [], 0, 0, 13.5
        for t in self.items:
            w = pdfmetrics.stringWidth(t, 'Inter-Medium', 7.2) + 11
            if x + w > self.width: x, y = 0, y + h + 3.5
            rows.append((t, x, y, w)); x += w + 4
        return rows, y + h
    def wrap(self, aw, ah): self.rows, self.h = self._layout(); return self.width, self.h
    def draw(self):
        c = self.canv
        for t, x, y, w in self.rows:
            yy = self.h - y - 13.5
            c.setFillColor(INK2); c.setStrokeColor(colors.HexColor('#4a4032')); c.setLineWidth(0.6)
            c.roundRect(x, yy, w, 13.5, 6.75, fill=1, stroke=1)
            c.setFillColor(ON_DARK); c.setFont('Inter-Medium', 7.2); c.drawCentredString(x + w / 2, yy + 4.3, t)


def decorate(c, doc):
    c.saveState()
    c.setFillColor(INK); c.rect(0, 0, SIDE, PH, fill=1, stroke=0)
    c.setFillColor(AMBER); c.rect(0, PH - 3, PW, 3, fill=1, stroke=0)
    # LSJ monogram watermark in the sidebar foot
    c.setFillColor(colors.HexColor('#26211a')); c.setFont('Fraunces-Bold', 64); c.drawString(PAD - 2, 14 * mm, 'LSJ')
    c.setFont('Inter-Medium', 7); c.setFillColor(MUTED)
    c.drawRightString(PW - 13 * mm, 9 * mm, f'Laxman Singh Jadon  ·  Curriculum Vitae  ·  {doc.page} / 2')
    c.restoreState()


doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=0, rightMargin=0, topMargin=0, bottomMargin=0,
                      title='Laxman Singh Jadon — CV', author='Laxman Singh Jadon',
                      subject='HR Lead · IG Strategic Systems Pvt Ltd (IG Defence)')
side_frame = lambda: Frame(PAD, 30 * mm, SIDE - 2 * PAD, PH - 30 * mm - 12 * mm, 0, 0, 0, 0, id='side')
main_frame = lambda: Frame(MAIN_X, 15 * mm, MAIN_W, PH - 15 * mm - 13 * mm, 0, 0, 0, 0, id='main')
doc.addPageTemplates([PageTemplate('pg', frames=[side_frame(), main_frame()], onPage=decorate)])
SW = SIDE - 2 * PAD

# =====================================================================
# PAGE 1 · SIDEBAR
# =====================================================================
story = []
photo = Image(os.path.join(HERE, 'cv-photo-round.png'), width=34 * mm, height=34 * mm)
ring = Table([[photo]], colWidths=[SW], rowHeights=[37 * mm])
ring.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                          ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0)]))
story += [ring, Spacer(1, 2)]

story += [P('CONTACT', s_label),
          P('+91 8383842382', s_side), P('luckysingh0508.lsj@gmail.com', s_side),
          P('Greater Noida, India – 201318', s_side),
          P('laxmansingh2107.github.io/Laxmansingh', st('url', fontSize=6.9, leading=10, textColor=ON_DARK_M))]

story.append(P('AT A GLANCE', s_label))
nums = [('600+', 'employees managed across multi-state sites'), ('12', 'direct reports, each leading their own teams'),
        ('3', 'step-ups in 8 months at IG Defence'), ('93%+', 'compliance achieved ahead of deadline')]
cells = [[[P(n, s_num), P(l, s_numl)] for n, l in nums[i:i + 2]] for i in (0, 2)]
g = Table(cells, colWidths=[SW / 2] * 2)
g.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0),
                       ('RIGHTPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 8), ('TOPPADDING', (0, 0), (-1, -1), 0)]))
story.append(g)

story += [P('CORE STRENGTHS', s_label), Chips([
    'HR Operations', 'Statutory Compliance', 'PF · ESIC · NOCs', 'Recruitment', 'Factory Administration',
    'Security & Movement', 'Facility Management', 'Cafeteria & Pantry', 'Visits & Protocol', 'Vendor Management',
    'Audit & Legal Support', 'Policy & SOPs', 'Project Delivery', 'MRO Setup', 'Team Leadership'], SW)]

story += [P('EDUCATION', s_label)]
for t, w in [('MBA, HR & Operations Management', 'Lovely Professional University · 2026'),
             ('MA, Rural Development', 'IGNOU · 2018'),
             ('BA, Economics, Sociology & English Literature', 'JU · 2016'),
             ('Diploma in Computer Application', 'MMYVV, M.P. · 2014')]:
    story += [P(t.replace('&', '&amp;'), s_side_b), P(w, s_side_m), Spacer(1, 4)]

story.append(FrameBreak())

# =====================================================================
# PAGE 1 · MAIN
# =====================================================================
story += [P('Laxman Singh Jadon', s_name),
          P('HR LEAD  ·  IG STRATEGIC SYSTEMS PVT LTD (IG DEFENCE)', s_role),
          P('People. Systems. Purpose.', s_tag), Spacer(1, 6), Rule(MAIN_W, AMBER_D, 1, 3)]

story += [P('PROFILE', s_h), P(
    'An HR leader who grew up in operations. Six years from statutory records and payroll to leading HR at a defence '
    'technology company, now also carrying Project Delivery and a new MRO vertical. Trained first for the UPSC civil '
    'services, so people, policy and compliance are read as one system. Known for taking on what the organisation needs, '
    'even when it isn’t in the job description, and for working through teams rather than around them. '
    'More often than not, the one supporting someone else.', s_lead)]

story += [P('CURRENT ROLE', s_h), P('IG Defence — a year of growth', s_h2),
          P('IG Strategic Systems Pvt Ltd (formerly IG Drones)  ·  Jan 2026 – Present', s_meta)]

STAGES = [
    ('01', 'Jan 2026', 'HR Associate-II', 'Clearing the backlog', [
        'Took charge of compliance soon after joining and, with the team, closed every outstanding PF, ESIC and NOC matter',
        'Moved on to HR operations for the factory']),
    ('02', 'Apr 2026  ·  first promotion', 'HR Associate-III', 'Running the factory’s people and premises', [
        'All HR operations and recruitment',
        'Factory administration, security and movement protocols, and facility management',
        'Cafeteria, meals, snacks and pantry planning',
        'Arrangements for every visit, from high-profile delegations to routine ones']),
    ('03', 'Jun 2026', 'HR Lead', 'End to end, factory and corporate', [
        'Corporate side added: now responsible for end-to-end HR and operations management',
        'Leads a 12-member team reporting directly, each with their own execution teams',
        'Single point of contact for a wide network of service-provider vendors',
        'Works closely with the audit and legal teams']),
    ('04', 'Aug 2026  ·  additional charge', '+ Project Delivery, now with MRO', 'Building what comes next', [
        'Given the Project Delivery portfolio after stepping in on production (see Beyond the Brief)',
        'Works with Business Development on demos, TEC, trials, on-site delivery, ATP and client training',
        'Portfolio expanded to MRO (Maintenance, Repair &amp; Operations): now setting up an MRO vertical within PD, '
        'planned to grow into a separate, recurring source of revenue']),
]
NW = 9 * mm
for i, (num, when, title, sub, items) in enumerate(STAGES):
    node = StageNode(num, last=i == len(STAGES) - 1)
    right = [P(f'{title}  <font name="Fraunces-Italic" color="#a8700f" size="9.6">— {sub}</font>', s_stage_t),
             P(when.upper(), s_stage_d), Spacer(1, 3)] + bullets(items)
    row = Table([[node, right]], colWidths=[NW, MAIN_W - NW])
    row.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0),
                             ('RIGHTPADDING', (0, 0), (-1, -1), 0), ('LEFTPADDING', (1, 0), (1, 0), 6),
                             ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 9)]))
    node.length = row.wrap(MAIN_W, 2000)[1]
    story.append(row)

story.append(PageBreak())

# =====================================================================
# PAGE 2 · SIDEBAR
# =====================================================================
story += [P('CERTIFICATIONS', st('sl0', parent=s_label, textColor=AMBER, fontName='Inter-Bold', spaceBefore=2))]
for t, w in [('Lean Six Sigma White Belt', 'CSSC'), ('AI in HR', 'Keka Academy'), ('POSH Certification', 'Keka Academy'),
             ('Crafting Payroll in India', 'Keka Academy'), ('Compensation & Benefits', 'Keka Academy'),
             ('Employee Engagement', 'Keka Academy'), ('People Analytics', 'Keka Academy'),
             ('Emergency Preparedness', 'Knights of Safety Academy')]:
    story += [P(t.replace('&', '&amp;'), s_side_b), P(w, s_side_m), Spacer(1, 3)]
story += [P('LANGUAGES', s_label), P('English  ·  Hindi', s_side),
          P('BEYOND WORK', s_label), Chips(['Chess & puzzles', 'Cinema', 'Documentaries', 'Badminton', 'Cricket',
                                            'Coding', 'AI exploration'], SW),
          P('HOW I WORK', s_label),
          P('“Nothing here was done alone. Most of the time, I’m the one supporting someone else.”', s_quote)]
story.append(FrameBreak())

# =====================================================================
# PAGE 2 · MAIN
# =====================================================================
panel = Table([[[P('BEYOND THE BRIEF', st('h0', parent=s_h, textColor=AMBER_D, fontName='Inter-Bold', spaceBefore=0)),
                 P('Stepping in where the organisation needed it', s_panel_h),
                 P('On the way to HR Lead, an important production task came up that wasn’t part of the role. '
                   'Stepping in on it, and then contributing to the setup of the <b>Production &amp; Manufacturing department</b>, '
                   'led to a different model: rather than hiring highly paid engineers for basic assembly, a blue-collar '
                   'workforce, many with little formal technical education, was trained for assembly, while engineers '
                   'focused on testing and quality control.', s_body), Spacer(1, 4),
                 P('After a few weeks of adjustment, the training became a repeatable system. Production costs fell sharply '
                   'with no loss in quality, and that workforce now builds advanced drones. This is what led to the Project '
                   'Delivery portfolio and the MRO vertical now being built.', s_body),
                 Spacer(1, 5),
                 P('Part of a team effort throughout: always with support, and often supporting others.', s_note)]]],
              colWidths=[MAIN_W])
panel.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), SOFT), ('LINEBEFORE', (0, 0), (0, -1), 3, AMBER_D),
                           ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 12),
                           ('TOPPADDING', (0, 0), (-1, -1), 10), ('BOTTOMPADDING', (0, 0), (-1, -1), 11)]))
story.append(panel)

story += [P('EARLIER CAREER', s_h), P('Where the groundwork was laid', s_h2), Spacer(1, 4)]
EARLIER = [
    ('Plant Manager', 'Kasper Engineering  ·  Jul 2025 – Oct 2025', [
        'Full charge of a 60-person plant: HR, administration, security, vendors, housekeeping and discipline',
        'The step that took the skill set beyond HR into running a complete operation']),
    ('HR Manager &amp; Project Coordinator', 'Kasper Infrastructure  ·  Jul 2024 – Jul 2025', [
        'HR for 600+ employees across multi-state infrastructure projects',
        'Raised compliance governance from 30% to 93%+ ahead of deadline, with audit-ready records',
        'Coordinated HR and operations for the Mahakumbh 2025 Tent City Project: 200 luxury tents, dozens of stakeholders']),
    ('HR Officer', 'Tricornio Technologies  ·  Dec 2019 – Jan 2024', [
        'Employee records, payroll and statutory documentation',
        'Four years with zero compliance deviations; Best Employee of the Year']),
]
for t, m, items in EARLIER:
    story.append(KeepTogether([P(t, s_role_h), P(m, s_role_m)] + bullets(items) + [Spacer(1, 5)]))

story += [P('FOUNDATIONS', s_h), P('The civil services years', s_h2),
          P('2014 – 2018  ·  BA · MA Rural Development · Serious UPSC aspirant', s_meta),
          P('The plan was never HR at first. It was the UPSC civil services, pursued as a serious aspirant through long '
            'hours of polity, governance, economics and public administration. The exam path gave way to HR, but the '
            'preparation stayed: a discipline for structured effort, a habit of seeing people, policy and systems as one, '
            'and a public-service instinct to see the person behind every process.', s_body)]

story += [P('WHAT CONNECTS IT ALL', s_h), Spacer(1, 3)]
threads = [('People first', 'Grievances heard and policies written with the person in view, not just the process.'),
           ('Discipline', '100% statutory documentation accuracy and audit-ready records, every role.'),
           ('Scale', 'From one site to 600+ people to a combined HR, delivery and MRO portfolio.'),
           ('Curiosity', 'HRMS rollouts, Lean Six Sigma thinking and automation wherever HR can run smarter.')]
tc = [[[P(h, st('t' + h, fontName='Fraunces-SemiBold', fontSize=10.5, leading=13, textColor=AMBER_D)),
        P(b, st('tb' + h, fontSize=8.2, leading=11.5))] for h, b in threads[i:i + 2]] for i in (0, 2)]
tt = Table(tc, colWidths=[MAIN_W / 2] * 2)
tt.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0),
                        ('RIGHTPADDING', (0, 0), (-1, -1), 12), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                        ('LINEABOVE', (0, 0), (-1, -1), 0.7, LINE), ('TOPPADDING', (0, 0), (-1, -1), 6)]))
story.append(tt)

doc.build(story)
print(os.path.normpath(OUT))
