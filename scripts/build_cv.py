# Builds public/assets/Laxman_Singh_Jadon_CV.pdf
#   pip install reportlab && python scripts/build_cv.py
#
# Narrative "journey" CV on a strict two-line grid:
#   - everything starts either at the page margin (labels, dates) or at one content column (all text)
#   - one vertical rhythm: 4pt base unit, sections separated by a hairline + 16pt
# Fonts: Fraunces + Inter (SIL OFL), the same as the portfolio site, in scripts/fonts.
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, CondPageBreak
from reportlab.platypus.flowables import Flowable

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'assets', 'Laxman_Singh_Jadon_CV.pdf')
for n in ['Fraunces-Bold', 'Fraunces-SemiBold', 'Fraunces-Italic', 'Inter-Regular', 'Inter-Medium',
          'Inter-SemiBold', 'Inter-Bold', 'Inter-Italic']:
    pdfmetrics.registerFont(TTFont(n, os.path.join(HERE, 'fonts', n + '.ttf')))
pdfmetrics.registerFontFamily('Inter', normal='Inter-Regular', bold='Inter-SemiBold', italic='Inter-Italic',
                              boldItalic='Inter-SemiBold')

# ---------- palette ----------
HEAD_C = colors.HexColor('#16140f')
TEXT = colors.HexColor('#33302a')
MUTED = colors.HexColor('#80776a')
ACCENT = colors.HexColor('#a8700f')
SOFT = colors.HexColor('#f8f3ea')
HAIR = colors.HexColor('#e5dccd')

# ---------- grid ----------
M = 18 * mm                       # page margin (left/right)
W = A4[0] - 2 * M - 12          # text width (frame has 6pt inner padding each side)
LABEL = 31 * mm                   # label / date column
GUT = 6 * mm
COL = W - LABEL - GUT             # content column


def S(name, **k):
    k.setdefault('fontName', 'Inter-Regular'); k.setdefault('textColor', TEXT)
    return ParagraphStyle(name, **k)


name_s = S('name', fontName='Fraunces-Bold', fontSize=30, leading=32, textColor=HEAD_C)
role_s = S('role', fontName='Inter-SemiBold', fontSize=9.5, leading=12, textColor=ACCENT)
tag_s = S('tag', fontName='Fraunces-Italic', fontSize=11.5, leading=14, textColor=MUTED)
contact_s = S('contact', fontSize=7.9, leading=12, textColor=TEXT)
label_s = S('label', fontName='Inter-Bold', fontSize=7.4, leading=12, textColor=ACCENT)       # section labels (margin)
date_s = S('date', fontName='Inter-SemiBold', fontSize=8, leading=12, textColor=ACCENT)        # dates (margin)
intro_s = S('intro', fontName='Fraunces-Italic', fontSize=10.6, leading=15, textColor=HEAD_C)
ch_s = S('ch', fontName='Fraunces-SemiBold', fontSize=11.5, leading=14, textColor=HEAD_C)     # chapter title
meta_s = S('meta', fontName='Inter-Medium', fontSize=7.8, leading=12, textColor=MUTED)       # role / org line
body_s = S('body', fontSize=8.8, leading=12.6, textColor=TEXT)
stage_s = S('stage', fontName='Inter-SemiBold', fontSize=9, leading=13, textColor=HEAD_C)
small_s = S('small', fontSize=8.3, leading=12, textColor=TEXT)
smallb_s = S('smallb', fontName='Inter-Medium', fontSize=8.3, leading=12, textColor=HEAD_C)
thr_h = S('thrh', fontName='Fraunces-SemiBold', fontSize=10, leading=13, textColor=ACCENT)
P = Paragraph
esc = lambda t: t.replace('&', '&amp;')


def row(left, right, top=0, bottom=0, left_w=LABEL):
    """One line of the grid: something at the margin, something in the content column."""
    t = Table([[left, right]], colWidths=[left_w, W - left_w])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('LEFTPADDING', (1, 0), (1, 0), GUT if left_w == LABEL else 0),
                           ('TOPPADDING', (0, 0), (-1, -1), top), ('BOTTOMPADDING', (0, 0), (-1, -1), bottom)]))
    return t


class Hair(Flowable):
    def __init__(self, color=HAIR, weight=0.6, before=8, after=8):
        super().__init__(); self.c, self.w, self.b, self.a = color, weight, before, after
    def wrap(self, aw, ah): self.aw = aw; return aw, self.b + self.a
    def draw(self):
        self.canv.setStrokeColor(self.c); self.canv.setLineWidth(self.w); self.canv.line(0, self.a, self.aw, self.a)


def section(label, flowables, first=False):
    """Hairline, then the label at the margin beside the first block of the section."""
    out = [] if first else [Hair(before=10, after=10)]
    head, rest = flowables[0], flowables[1:]
    out.append(row(P(label, label_s), head))
    out += [row('', f) for f in rest]
    return out


def footer(c, doc):
    c.saveState()
    c.setStrokeColor(HAIR); c.setLineWidth(0.6); c.line(M + 6, 12 * mm, A4[0] - M - 6, 12 * mm)
    c.setFont('Fraunces-SemiBold', 8); c.setFillColor(ACCENT); c.drawString(M + 6, 8 * mm, 'LSJ')
    c.setFont('Inter-Regular', 7); c.setFillColor(MUTED)
    c.drawString(M + 6 + 9 * mm, 8 * mm, 'Laxman Singh Jadon  ·  People. Systems. Purpose.')
    c.drawRightString(A4[0] - M - 6, 8 * mm, f'{doc.page} / 2')
    c.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=16 * mm, bottomMargin=17 * mm,
                        title='Laxman Singh Jadon — CV', author='Laxman Singh Jadon',
                        subject='HR Lead · IG Strategic Systems Pvt Ltd (IG Defence)')
story = []

# =========================== HEADER ===========================
PH_W, PH_H = 25 * mm, 33.3 * mm
photo = Image(os.path.join(HERE, 'cv-photo.png'), width=PH_W, height=PH_H)
name_block = [P('Laxman Singh Jadon', name_s), Spacer(1, 5),
              P('HR LEAD  ·  IG STRATEGIC SYSTEMS PVT LTD (IG DEFENCE)', role_s), Spacer(1, 3),
              P('A journey through people, policy, and purpose', tag_s)]
hdr = Table([[name_block, photo]], colWidths=[W - PH_W, PH_W], rowHeights=[PH_H])
hdr.setStyle(TableStyle([('VALIGN', (0, 0), (0, 0), 'BOTTOM'), ('VALIGN', (1, 0), (1, 0), 'TOP'),
                         ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                         ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0)]))
story += [hdr, Hair(color=ACCENT, weight=1.1, before=10, after=8)]

contacts = ['+91 8383842382', 'luckysingh0508.lsj@gmail.com', 'Greater Noida, India – 201318',
            'laxmansingh2107.github.io/Laxmansingh']
story += [P('<font color="#a8700f">  ·  </font>'.join(contacts), contact_s)]

# =========================== INTRO ===========================
story += section('THE STORY', [P(
    'Every career is a story before it’s a résumé. This one begins with years of serious preparation for the UPSC '
    'civil services and a curiosity about how people, policy and systems work. It moves, chapter by chapter, from HR’s '
    'fundamentals to leading HR at a defence technology company, where Project Delivery and a new MRO vertical have '
    'since been added. None of it was done alone; most of the time, it meant supporting someone else.', intro_s)])

# =========================== JOURNEY ===========================
def chapter(when, title, meta, body):
    return row(P(when, date_s), [P(title, ch_s), P(meta, meta_s), Spacer(1, 2), P(body, body_s)], bottom=9)

story += [Hair(before=10, after=10), row(P('THE JOURNEY', label_s), P('', body_s), bottom=2)]
story += [
    chapter('2014 – 2018', 'Foundations — The Civil Services Years',
            'BA · MA Rural Development · Serious UPSC aspirant',
            'The plan was never HR at first. It was the UPSC civil services, pursued as a serious aspirant. A BA in '
            'Economics, Sociology and English Literature and an MA in Rural Development were chosen with that goal in '
            'mind, and the preparation meant long hours with polity, governance, economics and public administration. '
            'The exam path gave way to HR, but the preparation stayed: a discipline for structured effort, a habit of '
            'seeing people, policy and systems as one, and an instinct to see the person behind every process.'),
    chapter('Dec 2019 –<br/>Jan 2024', 'First Steps — Building Discipline in HR', 'HR Officer · Tricornio Technologies',
            'Learning HR from the ground up: employee records, payroll and statutory documentation, the unglamorous '
            'groundwork everything else is built on. Four years with zero compliance deviations earned recognition as '
            'Best Employee of the Year, and something more lasting: a reputation for reliability.'),
    chapter('Jul 2024 –<br/>Jul 2025', 'Scaling Up — From HR to Multi-State Operations',
            'HR Manager &amp; Project Coordinator · Kasper Infrastructure',
            'HR across 600+ employees on multi-state infrastructure projects, with compliance governance raised from '
            '30% to 93%+ ahead of deadline. Coordinating HR and operations for the Mahakumbh 2025 Tent City Project '
            '(200 luxury tents, dozens of stakeholders) was the first time HR and project delivery sat side by side.'),
    chapter('Jul 2025 –<br/>Oct 2025', 'Full Ownership — Running a Plant, End to End', 'Plant Manager · Kasper Engineering',
            'Full charge of a 60-person plant: HR, administration, security, vendors, housekeeping and discipline under '
            'one roof. A compressed lesson in running a complete operation, and the step beyond HR alone.'),
]

# IG Defence: one chapter, four stages, each stage's date on the margin
ig_head = row(P('Jan 2026 –<br/>Present', date_s),
              [P('A Fast Rise — Trust Earned in Months', ch_s),
               P('IG Strategic Systems Pvt Ltd (IG Defence, formerly IG Drones) · Greater Noida', meta_s)], bottom=5)
STAGES = [
    ('Jan 2026', 'HR Associate-II — clearing the backlog',
     'Took charge of compliance soon after joining and, with the team, closed every outstanding PF, ESIC and NOC '
     'matter, then moved into HR operations for the factory.'),
    ('Apr 2026', 'HR Associate-III — the factory’s people and premises',
     'First promotion: all HR operations and recruitment, factory administration, security and movement protocols, '
     'facility management, cafeteria, meals and pantry planning, and arrangements for every visit, from high-profile '
     'delegations to routine ones.'),
    ('Jun 2026', 'HR Lead — end to end, factory and corporate',
     'The corporate side was added, making the role end-to-end HR and operations management: a 12-member team reporting '
     'directly, each with their own execution teams; the single point of contact for a wide network of service-provider '
     'vendors; and close support to the audit and legal teams.'),
    ('Aug 2026', 'Project Delivery, now with MRO — building what comes next',
     'Additional charge of Project Delivery: working with Business Development on demos, TEC, trials, on-site delivery, '
     'ATP and client training. The portfolio has since expanded to MRO (Maintenance, Repair &amp; Operations), with a new '
     'MRO vertical being set up within PD, planned to grow into a separate, recurring source of revenue.'),
]
for i, (when, title, body) in enumerate(STAGES):
    r = row(P(when, S('d2', parent=date_s, fontName='Inter-Medium', textColor=MUTED)),
            [P(title, stage_s), P(body, body_s)], bottom=9 if i == len(STAGES) - 1 else 6)
    story.append(KeepTogether([ig_head, r]) if i == 0 else r)

# =========================== TURNING POINT ===========================
panel = Table([[[P('Stepping in where the organisation needed it', ch_s), Spacer(1, 4),
                 P('On the way to HR Lead, an important production task came up that wasn’t part of the role. Stepping in '
                   'on it, and then contributing to the setup of the Production &amp; Manufacturing department, led to a '
                   'different model: instead of hiring highly paid engineers for basic assembly, a blue-collar workforce, '
                   'many with little formal technical education, was trained for assembly, while engineers focused on '
                   'testing and quality control.', body_s), Spacer(1, 4),
                 P('After a few weeks of adjustment, the training became a repeatable system. Production costs fell sharply '
                   'with no loss in quality, and that workforce now builds advanced drones. It is also what led to the '
                   'Project Delivery portfolio, and the MRO vertical now being built.', body_s), Spacer(1, 4),
                 P('A team effort throughout: always with support, and often supporting others.',
                   S('note', fontName='Inter-Italic', fontSize=8.2, leading=12, textColor=MUTED))]]],
              colWidths=[COL])
panel.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), SOFT), ('LINEBEFORE', (0, 0), (0, -1), 2.5, ACCENT),
                           ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 12),
                           ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 10)]))
story.append(KeepTogether(section('TURNING POINT', [panel])))

# =========================== THREADS ===========================
threads = [('People first', 'A sociology and rural-development background shows in how grievances are heard and '
                            'policies are written: the person in view, not just the process.'),
           ('Discipline &amp; compliance', 'UPSC-trained rigour: 100% statutory documentation accuracy, audit-ready '
                                           'records, and compliance raised from 30% to 93%+ ahead of deadline.'),
           ('Operations at scale', 'From a 60-person plant to 600+ employees to a combined HR, delivery and MRO '
                                   'portfolio, each chapter added scale.'),
           ('Curiosity', 'Chess, coding and AI in HR feed the same instinct behind HRMS rollouts, Lean Six Sigma '
                         'thinking and automation.')]
half = (COL - 8 * mm) / 2
grid = Table([[[P(h, thr_h), P(b, small_s)] for h, b in threads[i:i + 2]] for i in (0, 2)],
             colWidths=[half + 8 * mm, half])
grid.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0),
                          ('RIGHTPADDING', (0, 0), (0, -1), 8 * mm), ('RIGHTPADDING', (1, 0), (1, -1), 0),
                          ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, 0), 9),
                          ('BOTTOMPADDING', (0, 1), (-1, 1), 0)]))
story.append(KeepTogether(section('WHAT CONNECTS IT', [grid])))

# =========================== DETAILS ===========================
muted_s = S('mut', parent=small_s, textColor=MUTED)

def grid_rows(rows, widths):
    t = Table(rows, colWidths=widths)
    t.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('RIGHTPADDING', (0, 0), (0, -1), 5 * mm),
                           ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
                           ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    return t

edu = grid_rows([[P(a, smallb_s), P(b, muted_s)] for a, b in [
    ('MBA, HR &amp; Operations Management', 'Lovely Professional University · 2026'),
    ('MA, Rural Development', 'IGNOU · 2018'),
    ('BA, Economics, Sociology &amp; English Literature', 'JU · 2016'),
    ('Diploma in Computer Application', 'MMYVV, M.P. · 2014')]], [half + 8 * mm, half])
cert = grid_rows([[P(a, smallb_s), P(b, muted_s)] for a, b in [
    ('Lean Six Sigma White Belt', 'CSSC'),
    ('Emergency Preparedness', 'Knights of Safety Academy'),
    ('AI in HR  ·  POSH  ·  Crafting Payroll in India  ·  Compensation &amp; Benefits  ·  Employee Engagement  ·  '
     'People Analytics', 'Keka Academy')]], [half + 8 * mm, half])

def detail(label, flow, last=False):
    return row(P(label, label_s), flow, bottom=0 if last else 8)

story += [CondPageBreak(45 * mm), Hair(before=10, after=10),
          detail('EDUCATION', edu), detail('CERTIFICATIONS', cert),
          detail('LANGUAGES', P('English  ·  Hindi', small_s)),
          detail('BEYOND WORK', P('Chess &amp; puzzles  ·  Cinema &amp; documentaries  ·  Badminton &amp; cricket  ·  '
                                  'Coding &amp; AI exploration', small_s), last=True)]

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(os.path.normpath(OUT))
