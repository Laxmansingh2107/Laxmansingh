# Builds public/assets/Laxman_Singh_Jadon_CV.pdf
#   pip install reportlab && python scripts/build_cv.py
#
# Narrative CV on a strict grid:
#   margin column  -> section labels and dates
#   gutter         -> the timeline line and its nodes
#   content column -> all text, justified
# Fonts (SIL OFL) live in scripts/fonts: Inter for the name and UI text, Source Serif 4 for the story voice.
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, CondPageBreak
from reportlab.platypus.flowables import Flowable
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'assets', 'Laxman_Singh_Jadon_CV.pdf')

# ---------- details used in the header ----------
PHONE = '+91 8383842382'
EMAIL = 'luckysingh0508.lsj@gmail.com'
PLACE = 'Noida, India'
PORTFOLIO = 'https://laxmansingh2107.github.io/Laxmansingh/'
LINKEDIN = 'https://www.linkedin.com/in/laxmansinghj/'
TAGLINE = 'People. Policy. Purpose.'

FONTS = ['Inter-Regular', 'Inter-Medium', 'Inter-SemiBold', 'Inter-Bold', 'Inter-ExtraBold', 'Inter-Italic',
         'SourceSerif-SemiBold', 'SourceSerif-Bold', 'SourceSerif-Italic']
for n in FONTS:
    pdfmetrics.registerFont(TTFont(n, os.path.join(HERE, 'fonts', n + '.ttf')))
pdfmetrics.registerFontFamily('Inter', normal='Inter-Regular', bold='Inter-SemiBold', italic='Inter-Italic',
                              boldItalic='Inter-SemiBold')

# ---------- palette ----------
INK = colors.HexColor('#161410')
TEXT = colors.HexColor('#34312b')
MUTED = colors.HexColor('#80776a')
ACCENT = colors.HexColor('#b07614')
ACCENT_L = colors.HexColor('#f0a830')
SOFT = colors.HexColor('#f8f3ea')
HAIR = colors.HexColor('#e4d9c6')

# ---------- grid ----------
M = 17 * mm
W = A4[0] - 2 * M - 12            # usable width (frame keeps 6pt padding each side)
LABEL = 27 * mm                   # margin column: labels, dates
GUT = 9 * mm                      # timeline gutter
COL = W - LABEL - GUT             # content column


def S(name, **k):
    k.setdefault('fontName', 'Inter-Regular'); k.setdefault('textColor', TEXT)
    return ParagraphStyle(name, **k)


name_s = S('name', fontName='Inter-ExtraBold', fontSize=27, leading=30, textColor=INK)
role_s = S('role', fontName='Inter-Bold', fontSize=9.5, leading=12, textColor=ACCENT)
tag_s = S('tag', fontName='SourceSerif-Italic', fontSize=12, leading=15, textColor=MUTED)
contact_s = S('contact', fontSize=8.3, leading=12, textColor=TEXT)
label_s = S('label', fontName='Inter-Bold', fontSize=7.3, leading=12, textColor=ACCENT)
date_s = S('date', fontName='Inter-SemiBold', fontSize=8, leading=11, textColor=ACCENT)
date2_s = S('date2', fontName='Inter-Medium', fontSize=7.6, leading=11, textColor=MUTED)
intro_s = S('intro', fontName='SourceSerif-Italic', fontSize=10.8, leading=15.5, textColor=INK, alignment=TA_JUSTIFY)
ch_s = S('ch', fontName='SourceSerif-Bold', fontSize=12.2, leading=15, textColor=INK)
meta_s = S('meta', fontName='Inter-Medium', fontSize=7.8, leading=11, textColor=MUTED, spaceAfter=3)
body_s = S('body', fontSize=8.7, leading=12.4, textColor=TEXT, alignment=TA_JUSTIFY)
bridge_s = S('bridge', fontName='SourceSerif-Italic', fontSize=9, leading=12.2, textColor=ACCENT, spaceBefore=3)
stage_s = S('stage', fontName='Inter-SemiBold', fontSize=9, leading=12.5, textColor=INK)
small_s = S('small', fontSize=8.2, leading=11.6, textColor=TEXT, alignment=TA_JUSTIFY)
thr_h = S('thrh', fontName='SourceSerif-Bold', fontSize=10.5, leading=13, textColor=ACCENT, spaceAfter=2)
P = Paragraph


def tbl(data, widths, style=(), pad=0):
    t = Table(data, colWidths=widths)
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('LEFTPADDING', (0, 0), (-1, -1), pad), ('RIGHTPADDING', (0, 0), (-1, -1), pad),
                           ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0)] + list(style)))
    return t


def grid_row(left, right, gutter=None, bottom=0):
    """margin | gutter | content — the single grid every block sits on."""
    return tbl([[left, gutter or '', right]], [LABEL, GUT, COL], [('BOTTOMPADDING', (0, 0), (-1, -1), bottom)])


class Hair(Flowable):
    def __init__(self, color=HAIR, weight=0.6, before=9, after=9):
        super().__init__(); self.c, self.w, self.b, self.a = color, weight, before, after
    def wrap(self, aw, ah): self.aw = aw; return aw, self.b + self.a
    def draw(self):
        self.canv.setStrokeColor(self.c); self.canv.setLineWidth(self.w); self.canv.line(0, self.a, self.aw, self.a)


class Node(Flowable):
    """Timeline node in the gutter; draws the connecting line down to the next node."""
    def __init__(self, kind='major', line=True):
        super().__init__(); self.kind, self.line, self.length = kind, line, 0
    def wrap(self, aw, ah): self.aw = aw; return aw, 12
    def draw(self):
        c = self.canv; x, y = self.aw / 2, 7.5
        if self.line:
            c.setStrokeColor(HAIR); c.setLineWidth(1.4); c.line(x, y, x, 12 - self.length + 7.5)
        if self.kind == 'major':
            c.setFillColor(colors.white); c.setStrokeColor(ACCENT); c.setLineWidth(1.8); c.circle(x, y, 4.6, fill=1, stroke=1)
            c.setFillColor(ACCENT); c.circle(x, y, 2, fill=1, stroke=0)
        else:
            c.setFillColor(colors.white); c.setStrokeColor(ACCENT); c.setLineWidth(1.1); c.circle(x, y, 2.8, fill=1, stroke=1)


class Monogram(Flowable):
    def __init__(self, size): super().__init__(); self.s = size
    def wrap(self, aw, ah): return self.s, self.s
    def draw(self):
        c = self.canv; s = self.s
        c.setFillColor(INK); c.roundRect(0, 0, s, s, 6, fill=1, stroke=0)
        c.setFillColor(ACCENT_L); c.rect(0, 0, s, 3, fill=1, stroke=0)
        c.setFont('SourceSerif-Bold', s * 0.36); c.setFillColor(ACCENT_L); c.drawCentredString(s / 2, s * 0.38, 'LSJ')


class QR(Flowable):
    def __init__(self, url, size, caption):
        super().__init__(); self.url, self.s, self.cap = url, size, caption
    def wrap(self, aw, ah): return self.s, self.s + 11
    def draw(self):
        w = QrCodeWidget(self.url, barLevel='M', barFillColor=INK)
        x0, y0, x1, y1 = w.getBounds(); d = Drawing(self.s, self.s, transform=[self.s / (x1 - x0), 0, 0, self.s / (y1 - y0), 0, 0])
        d.add(w); renderPDF.draw(d, self.canv, 0, 11)
        self.canv.linkURL(self.url, (0, 11, self.s, 11 + self.s), relative=1)
        self.canv.setFont('Inter-SemiBold', 6.6); self.canv.setFillColor(MUTED); self.canv.drawCentredString(self.s / 2, 2, self.cap)


class Chips(Flowable):
    def __init__(self, items, width, font='Inter-Medium', size=7.8):
        super().__init__(); self.items, self.width, self.f, self.fs = items, width, font, size
    def wrap(self, aw, ah):
        self.pos, x, y, h = [], 0, 0, 15
        for t in self.items:
            w = pdfmetrics.stringWidth(t, self.f, self.fs) + 12
            if x + w > self.width: x, y = 0, y + h + 4
            self.pos.append((t, x, y, w)); x += w + 4
        self.h = y + h; return self.width, self.h
    def draw(self):
        c = self.canv
        for t, x, y, w in self.pos:
            yy = self.h - y - 15
            c.setFillColor(SOFT); c.setStrokeColor(HAIR); c.setLineWidth(0.7); c.roundRect(x, yy, w, 15, 7.5, fill=1, stroke=1)
            c.setFillColor(INK); c.setFont(self.f, self.fs); c.drawCentredString(x + w / 2, yy + 4.6, t)


def footer(c, doc):
    c.saveState()
    x0, x1 = M + 6, A4[0] - M - 6
    c.setStrokeColor(HAIR); c.setLineWidth(0.6); c.line(x0, 12 * mm, x1, 12 * mm)
    c.setFont('SourceSerif-Bold', 8); c.setFillColor(ACCENT); c.drawString(x0, 8 * mm, 'LSJ')
    c.setFont('Inter-Regular', 7); c.setFillColor(MUTED)
    c.drawString(x0 + 9 * mm, 8 * mm, f'Laxman Singh Jadon  ·  HR Lead, IG Defence  ·  {TAGLINE}')
    c.drawRightString(x1, 8 * mm, f'Page {doc.page}')
    c.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=14 * mm, bottomMargin=16 * mm,
                        title='Laxman Singh Jadon — CV', author='Laxman Singh Jadon', subject='HR Lead · IG Defence')
story = []

# =========================== HEADER ===========================
MONO = 19 * mm
QS = 17 * mm
qrs = [QR(PORTFOLIO, QS, 'PORTFOLIO')] + ([QR(LINKEDIN, QS, 'LINKEDIN')] if LINKEDIN else [])
qr_block = tbl([qrs], [QS + 4 * mm] * len(qrs), [('ALIGN', (0, 0), (-1, -1), 'RIGHT')])
QW = (QS + 4 * mm) * len(qrs)
name_block = [P('Laxman Singh Jadon', name_s), Spacer(1, 3), P('HR LEAD  ·  IG DEFENCE', role_s), Spacer(1, 3),
              P(TAGLINE, tag_s)]
hdr = tbl([[Monogram(MONO), name_block, qr_block]], [MONO + 6 * mm, W - MONO - 6 * mm - QW, QW],
          [('VALIGN', (0, 0), (-1, -1), 'MIDDLE')])
sep = '<font color="#b07614">   ·   </font>'
contact = P(f'{PHONE}{sep}<link href="mailto:{EMAIL}" color="#b07614"><u>{EMAIL}</u></link>{sep}{PLACE}{sep}'
            f'<link href="{PORTFOLIO}" color="#34312b">Portfolio: laxmansingh2107.github.io/Laxmansingh</link>', contact_s)
story += [hdr, Hair(color=ACCENT, weight=1.2, before=9, after=7), contact]

# =========================== THE STORY + OWN WORDS ===========================
story += [Hair(before=8, after=9), grid_row(P('THE STORY', label_s), P(
    'Every career is a story before it’s a résumé. This one begins with years of serious preparation for the UPSC '
    'civil services and a curiosity about how people, policy and systems work. It moves, chapter by chapter, from HR’s '
    'fundamentals to leading HR at IG Defence, where Project Delivery and a new MRO vertical have since been added. '
    'Each chapter carried something into the next, and that thread is what the timeline below follows.', intro_s))]

quote = tbl([[[P('“Policies work when people trust them. Systems work when people own them.”',
                 S('q', fontName='SourceSerif-Italic', fontSize=12.5, leading=17, textColor=colors.white)),
               Spacer(1, 4), P('WHAT I WORK BY', S('qa', fontName='Inter-Bold', fontSize=7, leading=9, textColor=ACCENT_L))]]],
            [COL], [('BACKGROUND', (0, 0), (-1, -1), INK), ('LEFTPADDING', (0, 0), (-1, -1), 14),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 14), ('TOPPADDING', (0, 0), (-1, -1), 8),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 9), ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT_L)])
story += [Spacer(1, 8), grid_row('', quote)]

# =========================== THE JOURNEY (connected timeline) ===========================
CHAPTERS = [
    ('2014 – 2018', 'Foundations — The Civil Services Years', 'BA · MA Rural Development · Serious UPSC aspirant',
     'The plan was never HR at first. It was the UPSC civil services, pursued as a serious aspirant. A BA in Economics, '
     'Sociology and English Literature and an MA in Rural Development were chosen with that goal in mind, and the '
     'preparation meant long hours with polity, governance, economics and public administration: how laws are written, '
     'how institutions run, and how policy lands on people. The exam path gave way to HR; the preparation stayed.',
     'Carried forward: the discipline of structured effort, and seeing policy through people.'),
    ('Dec 2019 – Jan 2024', 'First Steps — Building Discipline in HR', 'HR Officer · Tricornio Technologies',
     'HR learned from the ground up: employee records, payroll and statutory documentation, the unglamorous groundwork '
     'everything else is built on. Four years of getting the fundamentals right, with zero compliance deviations, earned '
     'recognition as Best Employee of the Year, and something more lasting: a reputation for reliability.',
     'Carried forward: reliability, the base everything else stands on.'),
    ('Jul 2024 – Jul 2025', 'Scaling Up — From HR to Multi-State Operations',
     'HR Manager &amp; Project Coordinator · Kasper Infrastructure',
     'The scale changed overnight: HR for 600+ employees across multi-state infrastructure projects, with compliance '
     'governance raised from 30% to 93%+ ahead of deadline. Coordinating HR and operations for the Mahakumbh 2025 Tent '
     'City Project (200 luxury tents, dozens of stakeholders) put HR and live project delivery side by side for the first time.',
     'Carried forward: scale, and a first taste of HR and delivery working as one.'),
    ('Jul 2025 – Oct 2025', 'Full Ownership — Running a Plant, End to End', 'Plant Manager · Kasper Engineering',
     'Full charge of a 60-person plant: HR, administration, security, vendors, housekeeping and discipline under one roof. '
     'A short, intense lesson in what it takes to run a complete operation, and the step that took the skill set beyond HR.',
     'Carried forward: end-to-end ownership of an entire operation.'),
]
STAGES = [
    ('Jan 2026', 'HR Associate-II — clearing the backlog',
     'Took charge of compliance and, with the team, closed every outstanding PF, ESIC and NOC matter; then factory HR operations.'),
    ('Apr 2026', 'HR Associate-III — the factory’s people and premises',
     'First promotion: HR operations, recruitment, factory administration, security and movement, facilities, cafeteria '
     'and pantry, and every visit from high-profile delegations to routine ones.'),
    ('Jun 2026', 'HR Lead — end to end, factory and corporate',
     'Corporate side added: end-to-end HR and operations, a 12-member team reporting directly (each with their own teams), '
     'single point of contact for service-provider vendors, and close support to audit and legal teams.'),
    ('Aug 2026', 'Project Delivery, now with MRO — building what comes next',
     'Demos, TEC, trials, on-site delivery, ATP and client training with Business Development. Now expanded to MRO '
     '(Maintenance, Repair &amp; Operations): setting up a vertical planned to become a separate, recurring revenue stream.'),
]


def timeline_row(date, content, kind, line, bottom):
    node = Node(kind, line)
    r = grid_row(P(date, date_s if kind == 'major' else date2_s), content, gutter=node, bottom=bottom)
    node.length = r.wrap(W, 3000)[1]
    return r


story += [Hair(before=10, after=8), grid_row(P('THE JOURNEY', label_s), '', bottom=2)]
for d, t, m, b, br in CHAPTERS:
    story.append(KeepTogether(timeline_row(d.replace(' – ', ' –<br/>'), [P(t, ch_s), P(m, meta_s), P(b, body_s), P(br, bridge_s)],
                                           'major', True, 9)))
ig_head = timeline_row('Jan 2026 –<br/>Present', [P('A Fast Rise — Where Every Thread Meets', ch_s),
                                                 P('IG Strategic Systems Pvt Ltd (IG Defence, formerly IG Drones) · Noida', meta_s),
                                                 P('Every earlier chapter feeds this one: three step-ups in eight months, each earned on the job.', body_s)],
                       'major', True, 8)
for i, (d, t, b) in enumerate(STAGES):
    last = i == len(STAGES) - 1
    r = timeline_row(d, [P(t, stage_s), P(b, body_s)], 'minor', not last, 4 if last else 8)
    story.append(KeepTogether([ig_head, r]) if i == 0 else r)

# =========================== TURNING POINT ===========================
panel = tbl([[[P('Stepping in where the organisation needed it', ch_s), Spacer(1, 4),
               P('On the way to HR Lead, an important production task came up that wasn’t part of the role. Stepping in on '
                 'it, as part of the team that set up the Production &amp; Manufacturing department, led to a different model: '
                 'a blue-collar workforce, many with little formal technical education, trained for assembly, and engineers '
                 'focused on testing and quality control instead of basic assembly.',
                 body_s), Spacer(1, 4),
               P('Within weeks the training became a repeatable system: production costs fell sharply with no loss in quality, '
                 'and that workforce now builds advanced drones. It is also what led to Project Delivery and the MRO vertical.',
                 body_s)]]],
            [COL], [('BACKGROUND', (0, 0), (-1, -1), SOFT), ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT),
                    ('LEFTPADDING', (0, 0), (-1, -1), 13), ('RIGHTPADDING', (0, 0), (-1, -1), 13),
                    ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 9)])
story.append(KeepTogether([Hair(before=10, after=9), grid_row(P('TURNING<br/>POINT', label_s), panel)]))

CW2 = (COL - 4 * mm) / 2


# =========================== EDUCATION ===========================
def card(children, width, accent=ACCENT):
    return tbl([[children]], [width], [('BACKGROUND', (0, 0), (-1, -1), SOFT), ('LINEABOVE', (0, 0), (-1, 0), 2, accent),
                                    ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
                                    ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)])


yr_s = S('yr', fontName='Inter-ExtraBold', fontSize=14, leading=16, textColor=ACCENT)
deg_s = S('deg', fontName='Inter-SemiBold', fontSize=8.2, leading=10.8, textColor=INK, spaceBefore=3)
inst_s = S('inst', fontName='Inter-Regular', fontSize=7.9, leading=11, textColor=MUTED, spaceBefore=1)
EDU = [('2026', 'MBA, HR &amp; Operations Management', 'Lovely Professional University'),
       ('2018', 'MA, Rural Development', 'IGNOU'),
       ('2016', 'BA, Economics, Sociology &amp; English Literature', 'JU'),
       ('2014', 'Diploma in Computer Application', 'MMYVV, Madhya Pradesh')]
YW = 13 * mm
def edu_card(y, d, i):
    inner = tbl([[P(y, yr_s), [P(d, S('deg2', parent=deg_s, spaceBefore=0)), P(i, inst_s)]]], [YW, CW2 - 20 - YW],
                [('VALIGN', (0, 0), (-1, -1), 'MIDDLE')])
    return card(inner, CW2)
edu_cards = tbl([[edu_card(*e) for e in EDU[k:k + 2]] for k in (0, 2)], [CW2 + 4 * mm, CW2],
                [('RIGHTPADDING', (0, 0), (0, -1), 4 * mm), ('BOTTOMPADDING', (0, 0), (-1, 0), 2 * mm)])
story.append(KeepTogether([Hair(before=10, after=8), grid_row(P('EDUCATION', label_s), edu_cards)]))

# =========================== CERTIFICATIONS ===========================
iss_s = S('iss', fontName='Inter-Bold', fontSize=7.2, leading=10, textColor=ACCENT)
cname_s = S('cname', fontName='Inter-SemiBold', fontSize=8.4, leading=10.5, textColor=INK)
cfrom_s = S('cfrom', fontName='Inter-Regular', fontSize=7.6, leading=10, textColor=MUTED)
CERTS = [('Lean Six Sigma White Belt', 'CSSC'), ('Emergency Preparedness', 'Knights of Safety Academy'),
         ('AI in HR', 'Keka Academy'), ('POSH Certification', 'Keka Academy'),
         ('Crafting Payroll in India', 'Keka Academy'), ('Compensation &amp; Benefits', 'Keka Academy'),
         ('Employee Engagement', 'Keka Academy'), ('People Analytics', 'Keka Academy')]

def cert_card(name, issuer):
    c = tbl([[[P(name, cname_s), P(issuer, cfrom_s)]]], [CW2],
            [('BACKGROUND', (0, 0), (-1, -1), SOFT), ('LINEBEFORE', (0, 0), (0, -1), 2, ACCENT),
             ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
             ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5)])
    return c

certs = tbl([[cert_card(*CERTS[k]), cert_card(*CERTS[k + 1])] for k in range(0, 8, 2)], [CW2 + 4 * mm, CW2],
            [('RIGHTPADDING', (0, 0), (0, -1), 4 * mm), ('BOTTOMPADDING', (0, 0), (-1, 2), 2 * mm)])
story.append(KeepTogether([Hair(before=10, after=8), grid_row(P('CERTIFICATIONS', label_s), certs)]))

# =========================== LANGUAGES & BEYOND WORK ===========================
dot = '<font color="#b07614">  ·  </font>'
pers_s = S('pers', fontName='Inter-Medium', fontSize=8.4, leading=13, textColor=INK)
lang_beyond = tbl([[P('LANGUAGES', iss_s), P(dot.join(['English', 'Hindi']), pers_s)],
                   [P('BEYOND WORK', iss_s), P(dot.join(['Chess &amp; puzzles', 'Cinema &amp; documentaries', 'Badminton',
                                                         'Cricket', 'Coding &amp; AI']), pers_s)]],
                  [24 * mm, COL - 24 * mm], [('TOPPADDING', (0, 0), (0, -1), 2.5)])
story.append(KeepTogether([Hair(before=10, after=8), grid_row(P('PERSONAL', label_s), lang_beyond)]))

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(os.path.normpath(OUT))

# Page previews shown in the site's CV section (needs poppler's pdftoppm).
import shutil, subprocess
if shutil.which('pdftoppm'):
    subprocess.run(['pdftoppm', '-r', '110', '-jpeg', '-jpegopt', 'quality=82', OUT,
                    os.path.join(HERE, '..', 'public', 'assets', 'cv-page')], check=True)
