import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
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
            self.drawString(36, 758, "CREWDESK — Agency Operations Platform (Agency OS)")
            self.drawRightString(576, 758, "Product & Cost Comparison Brief")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(36, 752, 576, 752)
            
        # Bottom Footer on All Pages
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 34, 576, 34)
        self.drawString(36, 22, "Crewdesk • Agency Operations Platform • Zero Setup Fee • All 7 Modules Included")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 22, page_str)
        self.restoreState()

def build_pdf(filename):
    # Printable area: 8.5 x 11 inches = 612 x 792 pt
    # Margins: 36 pt (0.5 in) left/right, 36 pt top/bottom
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Color Palette
    PRIMARY = colors.HexColor("#0f172a")     # Slate 900
    ACCENT = colors.HexColor("#059669")      # Emerald 600
    ACCENT_LIGHT = colors.HexColor("#ecfdf5")# Emerald 50
    TEXT_DARK = colors.HexColor("#0f172a")
    TEXT_MUTED = colors.HexColor("#475569")  # Slate 600
    BORDER_LIGHT = colors.HexColor("#e2e8f0")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=PRIMARY
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=TEXT_MUTED
    )
    h2_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=PRIMARY,
        spaceAfter=4
    )
    p_style = ParagraphStyle(
        'BodyTextCompact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=TEXT_DARK
    )
    cell_head = ParagraphStyle(
        'CellHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=10,
        textColor=colors.white
    )
    cell_head_dark = ParagraphStyle(
        'CellHeadDark',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=10,
        textColor=PRIMARY
    )
    cell_body = ParagraphStyle(
        'CellBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.3,
        leading=9.5,
        textColor=TEXT_DARK
    )
    cell_body_bold = ParagraphStyle(
        'CellBodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.3,
        leading=9.5,
        textColor=TEXT_DARK
    )

    story = []

    # =========================================================================
    # PAGE 1: BRIEF OVERVIEW OF THE 7 MODULES & 4 DASHBOARDS
    # =========================================================================

    # Clean Header
    header_data = [
        [
            Paragraph("<b>CREWDESK</b> <font color='#059669'>| AGENCY OS</font><br/><font size='8.5' color='#64748b'>All-in-One Operations & Project Profit Platform for Digital Agencies</font>", title_style),
            Paragraph("<font size='8' color='#059669'><b>OPERATIONS SUITE</b></font><br/><font size='7.5' color='#334155'>• 7 Core Modules Included<br/>• 4 Dedicated Role Views<br/>• Zero Setup Fee</font>", p_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[380, 160])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (1,0), (1,0), ACCENT_LIGHT),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#a7f3d0")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # Core Value Banner
    banner_data = [[
        Paragraph(
            "<b>Run your agency from one connected platform instead of 5 disconnected tools.</b> "
            "Attendance, leaves, client passwords, developer workload, and real profit-per-project are unified on Day 1 without manual spreadsheets.",
            ParagraphStyle('BannerText', parent=p_style, fontSize=8.5, leading=11.5, textColor=colors.HexColor("#065f46"))
        )
    ]]
    banner_table = Table(banner_data, colWidths=[540])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#86efac")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 10))

    # SECTION 1: THE 7 CORE MODULES
    story.append(Paragraph("<b>1. The 7 Operational Modules (What They Do)</b>", h2_style))
    modules_data = [
        [
            Paragraph("<b>Module Name</b>", cell_head_dark),
            Paragraph("<b>Target Role</b>", cell_head_dark),
            Paragraph("<b>Core Capability & Purpose</b>", cell_head_dark)
        ],
        [
            Paragraph("<b>1. Business Analysis</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>Owner / Admin</b></font>", cell_body),
            Paragraph("Calculates live net profit and margins per project by multiplying logged hours by confidential developer hourly rates. Visualizes top revenue projects and category margins without Excel.", cell_body)
        ],
        [
            Paragraph("<b>2. Overview Module</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>Owner</b></font>", cell_body),
            Paragraph("A high-level command view of agency momentum. See live task completion rates, active projects, employee presence, and department milestones in one consolidated view.", cell_body)
        ],
        [
            Paragraph("<b>3. Attendance & Leave</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>HR + Owner</b></font>", cell_body),
            Paragraph("1-click daily check-in/out from mobile or desktop. Automatically flags late arrivals (with reason log), early exits, and overtime. 60-second leave requests with an immutable audit trail.", cell_body)
        ],
        [
            Paragraph("<b>4. Projects Module</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>PM + Admin</b></font>", cell_body),
            Paragraph("Organizes client projects category-wise (Mobile, Web, AI, Retainers). Tracks sprint deadlines, task deliverables, milestones, and progress without clutter.", cell_body)
        ],
        [
            Paragraph("<b>5. Password Manager</b>", cell_body_bold),
            Paragraph("<font color='#d97706'><b>Admin Only</b></font>", cell_body),
            Paragraph("Stores client production servers and API keys in an AES-256 encrypted vault instead of Google Sheets. Granular per-team permissions with copy/reveal logs and 1-click exit revocation.", cell_body)
        ],
        [
            Paragraph("<b>6. Time Tracking</b>", cell_body_bold),
            Paragraph("<font color='#0f172a'><b>Admin + PM</b></font>", cell_body),
            Paragraph("Developers track billable time via an active timer or manual task entry. Shows who worked the most on each deliverable without weekly timesheet friction.", cell_body)
        ],
        [
            Paragraph("<b>7. Workload & Capacity</b>", cell_body_bold),
            Paragraph("<font color='#059669'><b>Admin + PM</b></font>", cell_body),
            Paragraph("Inspects real developer capacity before delegating tasks. Approved leaves automatically deduct available project hours, preventing team burnout and blown deadlines.", cell_body)
        ]
    ]
    modules_table = Table(modules_data, colWidths=[110, 85, 345])
    modules_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#f0fdf4")),
    ]))
    story.append(modules_table)
    story.append(Spacer(1, 10))

    # SECTION 2: THE 4 ROLE DASHBOARDS
    story.append(Paragraph("<b>2. The 4 Dedicated Role Dashboards (Zero Information Leakage)</b>", h2_style))
    dashboards_data = [
        [
            Paragraph("<b>Dashboard View</b>", cell_head_dark),
            Paragraph("<b>Target User</b>", cell_head_dark),
            Paragraph("<b>Permissions & What They See</b>", cell_head_dark)
        ],
        [
            Paragraph("<b>1. Admin Dashboard</b>", cell_body_bold),
            Paragraph("Owner / Director", cell_body),
            Paragraph("Full executive command: project profit margins, developer cost rates, live business dashboard, password vault, workload distribution, and company-wide notifications.", cell_body)
        ],
        [
            Paragraph("<b>2. HR Dashboard</b>", cell_body_bold),
            Paragraph("HR Manager", cell_body),
            Paragraph("People operations center: onboard new hires, manage employee profiles, organize team structures, approve leaves/WFH, and track daily attendance and working hours.", cell_body)
        ],
        [
            Paragraph("<b>3. PM Dashboard</b>", cell_body_bold),
            Paragraph("Project Manager", cell_body),
            Paragraph("Project execution: view active projects, create and complete tasks, monitor real-time developer workload, and assign tasks directly to less workloaded team members.", cell_body)
        ],
        [
            Paragraph("<b>4. Employee Dashboard</b>", cell_body_bold),
            Paragraph("Developer / Designer", cell_body),
            Paragraph("Focused personal workspace: view assigned tasks and sprint milestones, 1-click punch in/out, submit 1-minute leave requests, and track time spent per task.", cell_body)
        ]
    ]
    dashboards_table = Table(dashboards_data, colWidths=[110, 85, 345])
    dashboards_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(dashboards_table)

    # PAGE BREAK TO PAGE 2
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: FEATURE COMPARISON (CREWDESK VS CLICKUP PRO & OTHERS)
    # =========================================================================
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Feature Comparison: Crewdesk vs ClickUp Pro & Other PM Tools</b>", title_style))
    story.append(Paragraph("Other tools are generic toolkits requiring 40+ hours of DIY setup and external paid subscriptions. Crewdesk is built for agency operations out of the box.", subtitle_style))
    story.append(Spacer(1, 10))

    comp_headers = [
        Paragraph("<b>Operational Feature</b>", cell_head),
        Paragraph("<b>Crewdesk (Agency OS)</b>", cell_head),
        Paragraph("<b>ClickUp Pro / Unlimited</b>", cell_head),
        Paragraph("<b>Other PM Tools (Asana/Jira)</b>", cell_head)
    ]
    
    comp_rows = [
        comp_headers,
        [
            Paragraph("<b>Attendance & Overtime Punch Log</b><br/><font color='#64748b' size='6.8'>Daily 1-click check-in, late arrival flags, audit log</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in & Ready</b></font><br/><font color='#059669' size='6.5'>Ready on Day 1</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Requires 3rd-party app</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Requires 3rd-party app</font>", cell_body),
        ],
        [
            Paragraph("<b>Leave & Workload Auto-Deduction</b><br/><font color='#64748b' size='6.8'>Approved leave automatically reduces project hours</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in & Connected</b></font><br/><font color='#059669' size='6.5'>One unified record</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Forms + Zapier webhooks</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Calendar days only</font>", cell_body),
        ],
        [
            Paragraph("<b>Live Profit Margin per Project</b><br/><font color='#64748b' size='6.8'>Developer rate &times; logged hours = real margin live</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in (Owner Only)</b></font><br/><font color='#059669' size='6.5'>Confidential & automatic</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Rollup formulas & manual sync</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Deals only, not dev cost</font>", cell_body),
        ],
        [
            Paragraph("<b>Encrypted Password Manager</b><br/><font color='#64748b' size='6.8'>AES-256 vault with reveal logs & exit auto-revoke</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in</b></font><br/><font color='#059669' size='6.5'>Zero plain-text leaks</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Requires 1Password ($5-8/seat)</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>✖ Not Supported</b></font><br/><font color='#64748b' size='6.5'>Plain text in Slack/Sheets</font>", cell_body),
        ],
        [
            Paragraph("<b>Developer Capacity & Workload</b><br/><font color='#64748b' size='6.8'>See max tasks allocated vs available bandwidth</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Built-in</b></font><br/><font color='#059669' size='6.5'>Connected to leave schedule</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Locked on Business Tier</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Manual point estimates</font>", cell_body),
        ],
        [
            Paragraph("<b>Pre-Configured Role Dashboards</b><br/><font color='#64748b' size='6.8'>Distinct screens for Admin, HR, PM, and Developers</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ 4 Pre-built Dashboards</b></font><br/><font color='#059669' size='6.5'>Zero permissions confusion</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Must configure spaces/folders</font>", cell_body),
            Paragraph("<font color='#d97706'><b>▲ Setup Required</b></font><br/><font color='#64748b' size='6.5'>Complex permission trees</font>", cell_body),
        ],
        [
            Paragraph("<b>Dedicated Isolated Database</b><br/><font color='#64748b' size='6.8'>Dedicated database instance per customer</font>", cell_body),
            Paragraph("<font color='#059669'><b>✔ Dedicated Database</b></font><br/><font color='#059669' size='6.5'>Isolated Supabase project</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>▲ Shared Multi-Tenant</b></font><br/><font color='#64748b' size='6.5'>Shared public cloud tables</font>", cell_body),
            Paragraph("<font color='#e11d48'><b>▲ Shared Multi-Tenant</b></font><br/><font color='#64748b' size='6.5'>Shared public cloud tables</font>", cell_body),
        ],
        [
            Paragraph("<b>Setup Time & Implementation Effort</b><br/><font color='#64748b' size='6.8'>Time required before your team can run on it</font>", cell_body),
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
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(comp_table)
    story.append(Spacer(1, 14))

    # Architectural Summary Box
    arch_data = [
        [
            Paragraph("<b>Already Set Up (0h)</b><br/>Attendance, leave schedules, developer rates, and workload work on Day 1 without building custom forms or rollups.", p_style),
            Paragraph("<b>Already Connected</b><br/>Leave reduces project capacity; time tracked updates live project margins. One record, nothing copied between tools.", p_style),
            Paragraph("<b>Dedicated Security</b><br/>Your agency gets its own dedicated database instance. Client passwords and salary costs are completely isolated.", p_style)
        ]
    ]
    arch_table = Table(arch_data, colWidths=[175, 185, 180])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(arch_table)

    # PAGE BREAK TO PAGE 3
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: PRICING COMPARISON TABLE & PLANS
    # =========================================================================
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Pricing Comparison: Flat Rates vs Per-Seat Tools</b>", title_style))
    story.append(Paragraph("Published list prices checked October 2026 (PKR 280/USD). Predictable flat tiers with zero per-seat penalty.", subtitle_style))
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
            Paragraph("<b>--- TEAM OF 10 PEOPLE --- (Starter Plan: PKR 12,000 / mo | ~$43 USD)</b>", cell_body_bold),
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
            Paragraph("<b>--- TEAM OF 25 PEOPLE --- (Growth Plan: PKR 30,000 / mo | ~$107 USD)</b>", cell_body_bold),
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
            Paragraph("<b>--- TEAM OF 50 PEOPLE --- (Scale Plan: PKR 50,000 / mo | ~$179 USD)</b>", cell_body_bold),
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

    # Pricing Plans Summary
    plans_data = [
        [
            Paragraph("<b>Starter Plan (Main Offer)</b><br/><b>PKR 12,000 / mo</b> (up to 10 seats)<br/>All 7 modules, password vault, dedicated DB, zero setup fee.", p_style),
            Paragraph("<b>Growth Plan</b><br/><b>PKR 30,000 / mo</b> (up to 25 seats)<br/>Multi-department workloads, priority WhatsApp channel.", p_style),
            Paragraph("<b>Scale Plan</b><br/><b>PKR 50,000 / mo</b> (up to 50 seats)<br/>Custom backup scripts, priority custom integrations.", p_style)
        ]
    ]
    plans_table = Table(plans_data, colWidths=[180, 180, 180])
    plans_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('BACKGROUND', (0,0), (0,0), ACCENT_LIGHT),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#34d399")),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(plans_table)
    story.append(Spacer(1, 8))

    # Launch Offer Callout Box
    offer_data = [[
        Paragraph(
            "<b>🎁 LAUNCH PILOT OFFER:</b> "
            "<b>Month 1 is 100% FREE</b> (setup, roster migration & team walkthrough). "
            "Up to <b>3 custom modules built free</b> for your workflow. "
            "First 3 Founding Agencies get <b>50% off (PKR 6,000/mo)</b> for 3 paying months.",
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

    # Next Steps CTA Bar
    cta_data = [[
        Paragraph(
            "<b>Book a Free 30-Minute Walkthrough:</b><br/>"
            "<font size='8' color='#64748b'>We'll show you the exact matching screens for your team size. Zero commitment, no credit card required.</font>",
            p_style
        ),
        Paragraph(
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
