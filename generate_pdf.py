import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas
import pypdf

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Running Top Header on Pages 2 and 3
        if self._pageNumber > 1:
            self.drawString(36, 758, "CREWDESK — The Complete Agency Operations Platform (Agency OS)")
            self.drawRightString(576, 758, "Executive Brief for Agency Leadership")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(36, 752, 576, 752)
            
        # Bottom Footer on All Pages
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 36, 576, 36)
        self.drawString(36, 24, "Confidential • Prepared for Agency Leadership • Battle-tested Daily • © 2026 Crewdesk")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 24, page_str)
        self.restoreState()

def build_pdf(filename):
    # Printable area: 8.5 x 11 inches = 612 x 792 pt
    # Margins: 36 pt (0.5 in) left/right, 38 pt top/bottom
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=38,
        bottomMargin=38
    )

    styles = getSampleStyleSheet()

    # Color Palette
    PRIMARY = colors.HexColor("#0f172a")     # Slate 900
    SECONDARY = colors.HexColor("#1e293b")   # Slate 800
    ACCENT = colors.HexColor("#059669")      # Emerald 600
    ACCENT_LIGHT = colors.HexColor("#ecfdf5")# Emerald 50
    TEXT_DARK = colors.HexColor("#0f172a")
    TEXT_MUTED = colors.HexColor("#475569")  # Slate 600
    BORDER_LIGHT = colors.HexColor("#e2e8f0")
    AMBER = colors.HexColor("#d97706")
    ROSE = colors.HexColor("#e11d48")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=TEXT_MUTED
    )
    h2_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=PRIMARY,
        spaceAfter=4
    )
    p_style = ParagraphStyle(
        'BodyTextCompact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=TEXT_DARK
    )
    p_muted = ParagraphStyle(
        'BodyMuted',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.5,
        textColor=TEXT_MUTED
    )
    cell_head = ParagraphStyle(
        'CellHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
    )
    cell_head_dark = ParagraphStyle(
        'CellHeadDark',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=PRIMARY
    )
    cell_body = ParagraphStyle(
        'CellBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=TEXT_DARK
    )
    cell_body_bold = ParagraphStyle(
        'CellBodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=TEXT_DARK
    )

    story = []

    # =========================================================================
    # PAGE 1: THE EXECUTIVE PITCH & THE 7 CORE MODULES
    # =========================================================================

    # Header Box
    header_data = [
        [
            Paragraph("<b>CREWDESK</b> <font color='#059669'>| AGENCY OS</font><br/><font size='9' color='#64748b'>The Connected Operations & Profit Platform for Digital Agencies</font>", title_style),
            Paragraph("<font size='8' color='#059669'><b>LAUNCH PILOT OFFER</b></font><br/><font size='7.5' color='#334155'>• 1st Month 100% Free<br/>• Up to 3 Custom Modules Built Free<br/>• Zero Setup Fee (normally PKR 20k)</font>", p_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[360, 180])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (1,0), (1,0), ACCENT_LIGHT),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#a7f3d0")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # One-Line Pitch Box
    pitch_data = [[
        Paragraph(
            "<b>The Core Proposition:</b> Run your whole agency from <b>one connected system</b>, not five fragmented tools and a spreadsheet. "
            "Attendance, leaves, client passwords, team workload, and real profit-per-project — already connected and ready to use from Day 1. "
            "<i>Used daily by our own agency team.</i>",
            ParagraphStyle('PitchText', parent=p_style, fontSize=9, leading=12.5, textColor=colors.HexColor("#065f46"))
        )
    ]]
    pitch_table = Table(pitch_data, colWidths=[540])
    pitch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#86efac")),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(pitch_table)
    story.append(Spacer(1, 8))

    # Sound Familiar? (The 5 Agency Headaches)
    story.append(Paragraph("<b>Sound Familiar? The 5 Daily Operations Leaks That Cost 18+ Hours Every Month:</b>", h2_style))
    pains_data = [
        [
            Paragraph("<b>1. Attendance Disputes:</b> Checking biometrics, WhatsApp, and office boys. Disputes eat 2 days of month-end payroll.", p_style),
            Paragraph("<b>2. WhatsApp Leaves:</b> Leave requests buried in group chats. You promise client deadlines while developers are secretly off.", p_style)
        ],
        [
            Paragraph("<b>3. Blind Deadlines:</b> Generic tools count calendar days, not real working capacity. Overtime burns your team to save face.", p_style),
            Paragraph("<b>4. Password Chaos:</b> Client production credentials stored in shared Google Sheets and chats. Severe security and offboarding leak.", p_style)
        ],
        [
            Paragraph("<b>5. Unknown Project Profit:</b> Invoicing $5,000 while seniors log 160h. You have no idea if completed projects made or lost money.", p_style),
            Paragraph("<b>6. High Per-Seat Bills:</b> Paying $300–$900/mo in US dollars for ClickUp and add-ons that require ongoing manual upkeep.", p_style)
        ]
    ]
    pains_table = Table(pains_data, colWidths=[265, 265])
    pains_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(pains_table)
    story.append(Spacer(1, 10))

    # The 7 Operational Modules
    story.append(Paragraph("<b>The 7 Core Operational Modules — Everything Included in One System:</b>", h2_style))
    modules_data = [
        [
            Paragraph("<b>Module & Focus</b>", cell_head_dark),
            Paragraph("<b>Target Role</b>", cell_head_dark),
            Paragraph("<b>What It Does For Your Agency</b>", cell_head_dark)
        ],
        [
            Paragraph("<b>1. Business Analysis</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>Owner / Admin</b></font>", cell_body),
            Paragraph("Live net profit & margin per project. Multiplies logged hours by confidential developer cost. Visualizes top client projects and revenue health without Excel.", cell_body)
        ],
        [
            Paragraph("<b>2. Agency Overview</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>Owner</b></font>", cell_body),
            Paragraph("Birds-eye command view of your entire agency momentum. Track active projects, milestone completions, department progress, and company health in one screen.", cell_body)
        ],
        [
            Paragraph("<b>3. Attendance & Leave</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>HR + Owner</b></font>", cell_body),
            Paragraph("1-click daily check-in from phone or desktop. Automatically flags late arrivals (with reason log) and overtime. 60-second leave requests with immutable audit trail.", cell_body)
        ],
        [
            Paragraph("<b>4. Projects Module</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>PM + Admin</b></font>", cell_body),
            Paragraph("Organizes client projects category-wise (Mobile, Web, AI, Retainers). Track milestone deadlines, deliverables, sprints, and subtasks cleanly in real time.", cell_body)
        ],
        [
            Paragraph("<b>5. Password Manager</b>", cell_body_bold),
            Paragraph("<font color='#d97706'><b>Admin Only</b></font>", cell_body),
            Paragraph("Built-in AES-256 encrypted vault for client servers and keys. Granular team permissions with copy/reveal logs. 1-click access termination upon employee departure.", cell_body)
        ],
        [
            Paragraph("<b>6. Time Tracking</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>Admin + PM</b></font>", cell_body),
            Paragraph("Task-based active timer or manual hour logs. See who worked the most on each client deliverable. Eliminates painful weekly timesheet reconciliation.", cell_body)
        ],
        [
            Paragraph("<b>7. Workload & Capacity</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>Admin + PM</b></font>", cell_body),
            Paragraph("Inspects real developer capacity before delegating. Approved leaves automatically deduct project hours. Instantly see who has max allocation and who has bandwidth.", cell_body)
        ]
    ]
    modules_table = Table(modules_data, colWidths=[110, 85, 345])
    modules_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#f0fdf4")),
    ]))
    story.append(modules_table)
    story.append(Spacer(1, 8))

    # The 4 Role Dashboards Box
    roles_data = [[
        Paragraph(
            "<b>4 Dedicated Role Dashboards (Zero Info Leakage):</b><br/>"
            "• <b>Admin:</b> Full command, overall progress, profit margins, workload, password vault.<br/>"
            "• <b>HR:</b> Employee onboarding, profiles, teams, daily attendance, working hours & leave approvals.<br/>"
            "• <b>Project Manager:</b> Project milestones, task assignments, sprint tracking, capacity balancing.<br/>"
            "• <b>Employee / Dev:</b> Assigned tasks, 1-click attendance punch-in, fast leave requests, time tracking.",
            p_style
        )
    ]]
    roles_table = Table(roles_data, colWidths=[540])
    roles_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#94a3b8")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(roles_table)

    # PAGE BREAK TO PAGE 2
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: HEAD-TO-HEAD FEATURE COMPARISON (BUILT-IN VS DIY SETUP)
    # =========================================================================
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Head-to-Head Comparison: Why ClickUp & Generic PM Tools Fall Short</b>", title_style))
    story.append(Paragraph("Generic tools are empty toolkits that require 40+ hours of custom setup and external paid apps. Crewdesk starts where that work ends.", subtitle_style))
    story.append(Spacer(1, 10))

    comp_headers = [
        Paragraph("<b>Capability / Requirement</b>", cell_head),
        Paragraph("<b>Crewdesk (Agency OS)</b>", cell_head),
        Paragraph("<b>ClickUp Pro / Unlimited</b>", cell_head),
        Paragraph("<b>Asana / Jira / Trello</b>", cell_head)
    ]
    
    comp_rows = [
        comp_headers,
        [
            Paragraph("<b>Daily Attendance & Overtime Punch Log</b><br/><font color='#64748b' size='7'>Desktop/mobile check-in, late arrival flags, audit log</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in & Ready</b></font><br/><font color='#059669' size='6.5'>Day 1 out of the box</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Requires 3rd-party tool</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Separate app required</font>", cell_body),
        ],
        [
            Paragraph("<b>Leave & Workload Auto-Deduction</b><br/><font color='#64748b' size='7'>Approved leaves automatically reduce project hours</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in & Connected</b></font><br/><font color='#059669' size='6.5'>One unified record</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Forms + Zapier webhooks</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Calendar days only</font>", cell_body),
        ],
        [
            Paragraph("<b>Real Profit Margin per Project</b><br/><font color='#64748b' size='7'>Developer rate &times; logged hours = true margin live</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in (Owner Only)</b></font><br/><font color='#059669' size='6.5'>Confidential & automatic</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Rollup formulas & manual sync</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Deals only, not dev cost</font>", cell_body),
        ],
        [
            Paragraph("<b>Encrypted Client Password Vault</b><br/><font color='#64748b' size='7'>AES-256 vault with reveal logs & exit auto-revoke</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in</b></font><br/><font color='#059669' size='6.5'>Zero sheets or chat leaks</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Requires 1Password ($5-8/seat)</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Plaintext in Slack/Sheets</font>", cell_body),
        ],
        [
            Paragraph("<b>Developer Capacity & Workload</b><br/><font color='#64748b' size='7'>See max tasks allocated vs available bandwidth</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in</b></font><br/><font color='#059669' size='6.5'>Connected to leave schedule</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Locked on Business Plan</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Manual point estimates</font>", cell_body),
        ],
        [
            Paragraph("<b>Role-Based Dashboards (Admin, HR, PM, Dev)</b><br/><font color='#64748b' size='7'>Pre-configured views with zero salary leakage</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ 4 Pre-built Dashboards</b></font><br/><font color='#059669' size='6.5'>Zero permissions confusion</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Must configure spaces/folders</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Complex permission trees</font>", cell_body),
        ],
        [
            Paragraph("<b>Agency Data Isolation & Security</b><br/><font color='#64748b' size='7'>Separate database and infrastructure per agency</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Dedicated Database</b></font><br/><font color='#059669' size='6.5'>Isolated Supabase project</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>▲ Shared Multi-Tenant</b></font><br/><font color='#64748b' size='6.5'>Shared public cloud tables</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>▲ Shared Multi-Tenant</b></font><br/><font color='#64748b' size='6.5'>Shared public cloud tables</font>", cell_body),
        ],
        [
            Paragraph("<b>Setup Time & Implementation Effort</b><br/><font color='#64748b' size='7'>Hours required before your team can run on it</font>", cell_body),
            Paragraph("<font color='#059669'><b>0 Hours (Done For You)</b></font><br/><font color='#059669' size='6.5'>Ready in 3 days with onboarding</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>40+ Hours DIY</b></font><br/><font color='#64748b' size='6.5'>Weeks of configuration</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>30+ Hours DIY</b></font><br/><font color='#64748b' size='6.5'>Perpetual maintenance</font>", cell_body),
        ]
    ]

    comp_table = Table(comp_rows, colWidths=[165, 125, 125, 125])
    comp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('BACKGROUND', (1,1), (1,-1), colors.HexColor("#f0fdf4")),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(comp_table)
    story.append(Spacer(1, 12))

    # The 3 Architectural Advantages
    story.append(Paragraph("<b>The 3 Architectural Pillars That Protect Agency Founders:</b>", h2_style))
    adv_data = [
        [
            Paragraph("<b>1. Already Set Up</b><br/>Attendance, leave policies, developer rates, and workload work on Day 1. Nobody builds forms, relational rollups, or fragile Zapier triggers.", p_style),
            Paragraph("<b>2. Already Connected</b><br/>When leave is approved, project capacity drops. When time is tracked, live project margin updates. One single record; zero copying between tools.", p_style),
            Paragraph("<b>3. Yours To Shape</b><br/>Carries your agency's logo and brand. Includes up to 3 custom modules built free in month 1 to adapt to your unique workflow.", p_style)
        ]
    ]
    adv_table = Table(adv_data, colWidths=[175, 185, 180])
    adv_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(adv_table)

    # PAGE BREAK TO PAGE 3
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: PRICING COMPARISON MATRIX, SAVINGS & HOW TO GET STARTED
    # =========================================================================
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Pricing Comparison Matrix: Transparent Flat Rates vs Per-Seat SaaS</b>", title_style))
    story.append(Paragraph("Published list prices checked October 2026 (PKR 280/USD). Zero setup fees, zero feature tiers.", subtitle_style))
    story.append(Spacer(1, 8))

    pricing_headers = [
        Paragraph("<b>Platform & Plan</b>", cell_head),
        Paragraph("<b>Their Price / Mo</b>", cell_head),
        Paragraph("<b>Crewdesk Price</b>", cell_head),
        Paragraph("<b>You Save / Mo</b>", cell_head),
        Paragraph("<b>You Save / Year</b>", cell_head),
        Paragraph("<b>Hours Saved</b>", cell_head)
    ]

    pricing_rows = [
        pricing_headers,
        # Section A: Team of 10
        [
            Paragraph("<b>--- TEAM OF 10 PEOPLE --- (Starter Plan)</b>", cell_body_bold),
            Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body)
        ],
        [
            Paragraph("ClickUp Unlimited (Billed Annually at $7/user)", cell_body),
            Paragraph("PKR 19,600", cell_body),
            Paragraph("<b>PKR 12,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 7,600 (39%)</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 91,200</b></font>", cell_body),
            Paragraph("<b>+18h / mo</b>", cell_body_bold)
        ],
        [
            Paragraph("ClickUp Unlimited (Billed Monthly at $10/user)", cell_body),
            Paragraph("PKR 28,000", cell_body),
            Paragraph("<b>PKR 12,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 16,000 (57%)</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 192,000</b></font>", cell_body),
            Paragraph("<b>+18h / mo</b>", cell_body_bold)
        ],
        [
            Paragraph("ClickUp Business (Billed Annually at $12/user)", cell_body),
            Paragraph("PKR 33,600", cell_body),
            Paragraph("<b>PKR 12,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 21,600 (64%)</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 259,200</b></font>", cell_body),
            Paragraph("<b>+18h / mo</b>", cell_body_bold)
        ],
        [
            Paragraph("ClickUp Business (Billed Monthly at $19/user)", cell_body),
            Paragraph("PKR 53,200", cell_body),
            Paragraph("<b>PKR 12,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 41,200 (77%)</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 494,400</b></font>", cell_body),
            Paragraph("<b>+18h / mo</b>", cell_body_bold)
        ],
        [
            Paragraph("HubSpot Starter Suite ($20/user/month)", cell_body),
            Paragraph("PKR 56,000", cell_body),
            Paragraph("<b>PKR 12,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 44,000 (79%)</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 528,000</b></font>", cell_body),
            Paragraph("<b>+18h / mo</b>", cell_body_bold)
        ],
        [
            Paragraph("Salesforce Starter Suite ($25/user/month)", cell_body),
            Paragraph("PKR 70,000", cell_body),
            Paragraph("<b>PKR 12,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 58,000 (83%)</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 696,000</b></font>", cell_body),
            Paragraph("<b>+18h / mo</b>", cell_body_bold)
        ],
        # Section B: Team of 25
        [
            Paragraph("<b>--- TEAM OF 25 PEOPLE --- (Growth Plan: PKR 30,000/mo)</b>", cell_body_bold),
            Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body)
        ],
        [
            Paragraph("ClickUp Unlimited (Monthly) | Business (Monthly)", cell_body),
            Paragraph("PKR 70k | 133k", cell_body),
            Paragraph("<b>PKR 30,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 40k–103k</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 480k–1.23M</b></font>", cell_body),
            Paragraph("<b>+30h / mo</b>", cell_body_bold)
        ],
        # Section C: Team of 50
        [
            Paragraph("<b>--- TEAM OF 50 PEOPLE --- (Scale Plan: PKR 50,000/mo)</b>", cell_body_bold),
            Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body), Paragraph("", cell_body)
        ],
        [
            Paragraph("ClickUp Business (Monthly) | Salesforce Starter", cell_body),
            Paragraph("PKR 266k | 350k", cell_body),
            Paragraph("<b>PKR 50,000</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>PKR 216k–300k</b></font>", cell_body),
            Paragraph("<font color='#059669'><b>PKR 2.59M–3.60M</b></font>", cell_body),
            Paragraph("<b>+50h / mo</b>", cell_body_bold)
        ]
    ]

    pricing_table = Table(pricing_rows, colWidths=[180, 75, 75, 80, 75, 55])
    pricing_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('SPAN', (0,1), (-1,1)),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#f1f5f9")),
        ('SPAN', (0,8), (-1,8)),
        ('BACKGROUND', (0,8), (-1,8), colors.HexColor("#f1f5f9")),
        ('SPAN', (0,10), (-1,10)),
        ('BACKGROUND', (0,10), (-1,10), colors.HexColor("#f1f5f9")),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 2.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.8),
    ]))
    story.append(pricing_table)
    story.append(Spacer(1, 8))

    # Launch Offer Callout Box
    offer_data = [[
        Paragraph(
            "<b>🎁 EXCLUSIVE FOUNDING AGENCY LAUNCH OFFER (FIRST 3 AGENCIES ONLY):</b><br/>"
            "• <b>Month 1 is 100% FREE:</b> Dedicated setup, employee roster migration, and team onboarding.<br/>"
            "• <b>Up to 3 Custom Modules Built Free:</b> We write custom fields, approvals, or integrations for your workflow.<br/>"
            "• <b>Founding Agencies Price Lock:</b> <b>50% off (PKR 6,000/mo)</b> for your first 3 paying months after the free month.<br/>"
            "• <b>Zero Setup Fee:</b> Normally PKR 20,000 — completely waived during launch.",
            p_style
        )
    ]]
    offer_table = Table(offer_data, colWidths=[540])
    offer_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#ecfdf5")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#34d399")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(offer_table)
    story.append(Spacer(1, 8))

    # Next Steps & Walkthrough CTA
    story.append(Paragraph("<b>How You Get Started in 3 Zero-Friction Steps:</b>", h2_style))
    steps_data = [
        [
            Paragraph("<b>Step 1: Free Walkthrough (30m)</b><br/>We inspect how you handle attendance, projects, and costs today. We show the exact matching screens with zero hard sales.", p_style),
            Paragraph("<b>Step 2: Instance Setup (3 Days)</b><br/>Your isolated Supabase DB, logo, employee hierarchy, and holiday calendar are fully loaded by our engineers.", p_style),
            Paragraph("<b>Step 3: Team Onboarding (60m)</b><br/>One interactive session. Your developers check in, log tasks, and see their views. You start your free month.", p_style)
        ]
    ]
    steps_table = Table(steps_data, colWidths=[175, 185, 180])
    steps_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(steps_table)
    story.append(Spacer(1, 8))

    # Final CTA Bar
    cta_data = [[
        Paragraph(
            "<b>Ready to see it running with your own team?</b><br/>"
            "<font size='8' color='#64748b'>Bring your team size and your biggest operational headache. We'll show you how it works in 30 minutes.</font>",
            p_style
        ),
        Paragraph(
            "<b>Book Walkthrough:</b><br/>"
            "WhatsApp: <b>Direct Message</b><br/>"
            "Email: <b>founder@crewdesk.io</b>",
            ParagraphStyle('CtaContact', parent=p_style, fontSize=8, leading=10, textColor=PRIMARY)
        )
    ]]
    cta_table = Table(cta_data, colWidths=[380, 160])
    cta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(cta_table)

    # Build Document with NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF built successfully: {filename}")

if __name__ == '__main__':
    output_pdf = "/home/rf-gul/.gemini/antigravity/scratch/crewdesk-landing/Crewdesk_Agency_Executive_Brief.pdf"
    build_pdf(output_pdf)
    
    # Check page count
    reader = pypdf.PdfReader(output_pdf)
    print(f"Total Pages: {len(reader.pages)}")
    if len(reader.pages) == 3:
        print("PERFECT: Document is exactly 3 pages!")
    else:
        print(f"WARNING: Page count is {len(reader.pages)}, expected 3")
