#!/usr/bin/env python3
"""
Generate a strict 3-Page Executive PDF for Daftar Hub (دفتر Hub | Agency OS)
Target Audience: Busy Agency Owners & Founders

Page Structure:
  Page 1: Feature Comparison (Head-to-head vs ClickUp Pro & Other Tools)
  Page 2: The Operational Core: 7 Modules & 4 Role Dashboards
  Page 3: Pricing Comparison (10-Person Team comparison vs ClickUp, HubSpot, Salesforce, Stack)
          Shows Cost Saved per Month in % and Time Saved. Zero contact info.

Branding:
  - Name: Daftar Hub
  - "دفتر" rendered in authentic Noto Nastaliq Urdu calligraphy
  - "Hub" rendered in bold Latin type
  - Zero contact info (no email, whatsapp, phone)
"""

import os
import sys
from pypdf import PdfReader
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
)
from reportlab.pdfgen import canvas

def ensure_daftar_hub_logo(path="daftar_hub_logo.png"):
    """Render high-resolution logo with Nastaliq font for دفتر and Latin for Hub."""
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return path
    try:
        import gi
        gi.require_version('Pango', '1.0')
        gi.require_version('PangoCairo', '1.0')
        from gi.repository import Pango, PangoCairo
        import cairo

        scale = 3.0
        width_pt, height_pt = 270, 50
        width_px, height_px = int(width_pt * scale), int(height_pt * scale)

        surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width_px, height_px)
        ctx = cairo.Context(surface)
        ctx.scale(scale, scale)

        l_hub = PangoCairo.create_layout(ctx)
        l_hub.set_markup('<span font_family="DejaVu Sans, Arial, Helvetica" font_weight="bold" font_size="22000" foreground="#059669">Hub</span>', -1)

        l_urdu = PangoCairo.create_layout(ctx)
        l_urdu.set_markup('<span font_family="Noto Nastaliq Urdu" font_weight="bold" font_size="24000" foreground="#0f172a">دفتر</span>', -1)

        l_sub = PangoCairo.create_layout(ctx)
        l_sub.set_markup('<span font_family="DejaVu Sans, Arial, Helvetica" font_weight="bold" font_size="14000" foreground="#64748b">| DAFTAR OS</span>', -1)

        baseline_hub = l_hub.get_baseline() / Pango.SCALE
        baseline_urdu = l_urdu.get_baseline() / Pango.SCALE

        base_y = 36
        y_hub = base_y - baseline_hub
        y_urdu = base_y - baseline_urdu

        # 1. Hub on left
        ctx.move_to(0, y_hub)
        PangoCairo.show_layout(ctx, l_hub)

        ink_h, log_h = l_hub.get_extents()
        w_h = log_h.width / Pango.SCALE

        # 2. دفتر on right
        ctx.move_to(w_h + 8, y_urdu)
        PangoCairo.show_layout(ctx, l_urdu)

        ink_u, log_u = l_urdu.get_extents()
        w_u = log_u.width / Pango.SCALE

        # 3. | DAFTAR OS
        ctx.move_to(w_h + 8 + w_u + 10, y_hub + 4)
        PangoCairo.show_layout(ctx, l_sub)

        surface.write_to_png(path)
    except Exception as e:
        print(f"Notice: Pango rendering exception: {e}")
    return path


class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas for dynamic running header and page numbering."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#475569"))

        # Running Top Header (Pages 2 & 3)
        if self._pageNumber > 1:
            self.drawString(36, 762, "HUB DAFTAR (DAFTAR OS) — EXECUTIVE BRIEF")
            self.setFont("Helvetica", 7.5)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawRightString(576, 762, "CONFIDENTIAL & PROPRIETARY")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(36, 756, 576, 756)

        # Running Bottom Footer (All Pages - zero contact info)
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(36, 32, 576, 32)

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(36, 22, "Hub دفتر (Daftar OS) • Built exclusively for modern digital daftars")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 22, page_str)
        self.restoreState()


def build_pdf(filename="Daftar_Hub_Agency_Executive_Brief.pdf"):
    # Target 3 pages exactly: 8.5 x 11 inches, margins 36pt (0.5 in)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    # Ensure high-res Nastaliq logo exists
    logo_path = ensure_daftar_hub_logo("daftar_hub_logo.png")

    styles = getSampleStyleSheet()

    # Brand Palette
    PRIMARY = colors.HexColor("#0f172a")       # Slate 900
    ACCENT = colors.HexColor("#059669")        # Emerald 600
    ACCENT_LIGHT = colors.HexColor("#ecfdf5")  # Emerald 50
    TEXT_DARK = colors.HexColor("#1e293b")     # Slate 800
    TEXT_MUTED = colors.HexColor("#475569")    # Slate 600
    BORDER_LIGHT = colors.HexColor("#e2e8f0")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
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
        fontSize=10.5,
        leading=13.5,
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
    cell_head_center = ParagraphStyle(
        'CellHeadCenter',
        parent=cell_head,
        alignment=1
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
    cell_center = ParagraphStyle(
        'CellCenter',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.3,
        leading=9.5,
        textColor=TEXT_DARK,
        alignment=1
    )
    cell_center_bold = ParagraphStyle(
        'CellCenterBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.3,
        leading=9.5,
        textColor=TEXT_DARK,
        alignment=1
    )
    cell_center_green = ParagraphStyle(
        'CellCenterGreen',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.3,
        leading=9.5,
        textColor=colors.HexColor("#065f46"),
        alignment=1
    )

    story = []

    # =========================================================================
    # PAGE 1: FEATURE COMPARISON (TOP PRIORITY)
    # =========================================================================

    # Clean Executive Header with Nastaliq Logo
    logo_img = Image(logo_path, width=195, height=36)
    sub_title_para = Paragraph(
        "<font size='8' color='#64748b'>All-in-One Operations & Project Profit Platform for Modern Daftars</font>",
        p_style
    )
    left_header = [logo_img, Spacer(1, 1), sub_title_para]

    right_header = Paragraph(
        "<font size='8' color='#059669'><b>EXECUTIVE BRIEF</b></font><br/>"
        "<font size='7.5' color='#334155'>• Zero DIY Setup<br/>• Flat Predictable Rates<br/>• Dedicated Database</font>",
        p_style
    )

    header_table = Table([[left_header, right_header]], colWidths=[380, 160])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (1,0), (1,0), ACCENT_LIGHT),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#a7f3d0")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # Core Value Banner
    banner_data = [[
        Paragraph(
            "<b>Why Daftars Switch from Generic PM Tools:</b> Generic tools (ClickUp, Asana, Jira) are blank slates requiring 40+ hours of custom setup and external subscriptions for attendance, client passwords, and project profit margins. <b>Daftar Hub</b> delivers an opinionated, ready-to-run daftar operating system on Day 1.",
            ParagraphStyle('BannerText', parent=p_style, fontSize=8.2, leading=11.2, textColor=colors.HexColor("#065f46"))
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
    story.append(Spacer(1, 8))

    # Feature Comparison Section
    story.append(Paragraph("<b>Head-to-Head Feature Comparison: Built-in vs Setup Required</b>", h2_style))
    story.append(Paragraph("Hub دفتر features are 100% pre-built for daftars. ClickUp and competitors require paid add-ons, complex formula rollups, or manual Zapier integrations.", subtitle_style))
    story.append(Spacer(1, 6))

    comp_headers = [
        Paragraph("<b>Operational Feature</b>", cell_head),
        Paragraph("<b>Hub دفتر (Daftar OS)</b>", cell_head),
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
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(comp_table)
    story.append(Spacer(1, 10))

    # Architectural Summary Box
    arch_data = [
        [
            Paragraph("<b>Pre-Configured (0h Setup)</b><br/>Attendance, leave schedules, developer rates, and workload work on Day 1 without building custom formulas.", p_style),
            Paragraph("<b>Native Connection</b><br/>Approved leave reduces sprint capacity; tracked hours update live project margins. Zero manual sync.", p_style),
            Paragraph("<b>Enterprise Security</b><br/>Your daftar receives a dedicated database instance. Client passwords and staff salary rates stay 100% confidential.", p_style)
        ]
    ]
    arch_table = Table(arch_data, colWidths=[175, 185, 180])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(arch_table)

    # PAGE BREAK TO PAGE 2
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: THE OPERATIONAL CORE (7 MODULES & 4 DASHBOARDS)
    # =========================================================================
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>The Operational Core: 7 Modules & 4 Role Dashboards</b>", title_style))
    story.append(Paragraph("A single unified system replacing 5 disconnected software subscriptions with zero information leakage.", subtitle_style))
    story.append(Spacer(1, 8))

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
            Paragraph("A high-level command view of daftar momentum. See live task completion rates, active projects, employee presence, and department milestones in one consolidated view.", cell_body)
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
        ('TOPPADDING', (0,0), (-1,-1), 3.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.8),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#f0fdf4")),
    ]))
    story.append(modules_table)
    story.append(Spacer(1, 9))

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
        ('TOPPADDING', (0,0), (-1,-1), 3.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.8),
    ]))
    story.append(dashboards_table)
    story.append(Spacer(1, 8))

    # Isolation note
    iso_data = [[
        Paragraph(
            "<b>Why Role Isolation Matters:</b> Developers never see sensitive financial margins or confidential developer hourly billing rates. HR manages attendance and leaves without accessing production client server credentials. Project Managers assign sprint tasks with full visibility into who is on approved leave. Complete operational control with zero leaks.",
            ParagraphStyle('IsoText', parent=p_style, fontSize=7.6, leading=10.5, textColor=colors.HexColor("#334155"))
        )
    ]]
    iso_table = Table(iso_data, colWidths=[540])
    iso_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(iso_table)

    # PAGE BREAK TO PAGE 3
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: PRICING COMPARISON (10 PEOPLE / MONTH FOCUSED TABLE)
    # =========================================================================
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Pricing Comparison: 10-Person Daftar Team</b>", title_style))
    story.append(Paragraph("Monthly cost and hours saved compared to ClickUp, HubSpot, Salesforce, and multi-tool stacks (PKR 280/USD).", subtitle_style))
    story.append(Spacer(1, 8))

    # Clean 5-Column Comparison Table for 10 People
    # Widths: [165, 95, 95, 105, 80] = 540 pt
    pricing_headers = [
        Paragraph("<b>Platform / Tool Stack</b>", cell_head),
        Paragraph("<b>Their Price / Mo</b><br/><font size='6.5' color='#cbd5e1'>10 Team Members</font>", cell_head_center),
        Paragraph("<b>Daftar Hub Price</b><br/><font size='6.5' color='#cbd5e1'>10 Team Members</font>", cell_head_center),
        Paragraph("<b>Cost Saved / Mo (%)</b><br/><font size='6.5' color='#cbd5e1'>Direct Cash Retained</font>", cell_head_center),
        Paragraph("<b>Time Saved / Mo</b><br/><font size='6.5' color='#cbd5e1'>Admin Hours</font>", cell_head_center)
    ]

    pricing_rows = [
        pricing_headers,
        [
            Paragraph("<b>ClickUp Unlimited</b><br/><font color='#64748b' size='6.5'>$10/user/mo billed monthly</font>", cell_body),
            Paragraph("PKR 28,000 / mo<br/><font color='#64748b' size='6.5'>$100 USD / mo</font>", cell_center),
            Paragraph("<b>PKR 12,000 / mo</b><br/><font color='#059669' size='6.5'>Flat Rate</font>", cell_center_green),
            Paragraph("<font color='#047857'><b>Save PKR 16,000 (57%)</b></font><br/><font color='#64748b' size='6.5'>PKR 192,000 / year</font>", cell_center),
            Paragraph("<b>+18 hrs / mo</b><br/><font color='#64748b' size='6.5'>Attendance + leaves</font>", cell_center_bold)
        ],
        [
            Paragraph("<b>ClickUp Business</b><br/><font color='#64748b' size='6.5'>$19/user/mo billed monthly</font>", cell_body),
            Paragraph("PKR 53,200 / mo<br/><font color='#64748b' size='6.5'>$190 USD / mo</font>", cell_center),
            Paragraph("<b>PKR 12,000 / mo</b><br/><font color='#059669' size='6.5'>Flat Rate</font>", cell_center_green),
            Paragraph("<font color='#047857'><b>Save PKR 41,200 (77%)</b></font><br/><font color='#64748b' size='6.5'>PKR 494,400 / year</font>", cell_center),
            Paragraph("<b>+18 hrs / mo</b><br/><font color='#64748b' size='6.5'>Vault + workloads</font>", cell_center_bold)
        ],
        [
            Paragraph("<b>HubSpot Starter Suite</b><br/><font color='#64748b' size='6.5'>$20/seat/mo list price</font>", cell_body),
            Paragraph("PKR 56,000 / mo<br/><font color='#64748b' size='6.5'>$200 USD / mo</font>", cell_center),
            Paragraph("<b>PKR 12,000 / mo</b><br/><font color='#059669' size='6.5'>Flat Rate</font>", cell_center_green),
            Paragraph("<font color='#047857'><b>Save PKR 44,000 (79%)</b></font><br/><font color='#64748b' size='6.5'>PKR 528,000 / year</font>", cell_center),
            Paragraph("<b>+20 hrs / mo</b><br/><font color='#64748b' size='6.5'>Zero CRM bloat</font>", cell_center_bold)
        ],
        [
            Paragraph("<b>Salesforce Starter Suite</b><br/><font color='#64748b' size='6.5'>$25/seat/mo list price</font>", cell_body),
            Paragraph("PKR 70,000 / mo<br/><font color='#64748b' size='6.5'>$250 USD / mo</font>", cell_center),
            Paragraph("<b>PKR 12,000 / mo</b><br/><font color='#059669' size='6.5'>Flat Rate</font>", cell_center_green),
            Paragraph("<font color='#047857'><b>Save PKR 58,000 (83%)</b></font><br/><font color='#64748b' size='6.5'>PKR 696,000 / year</font>", cell_center),
            Paragraph("<b>+20 hrs / mo</b><br/><font color='#64748b' size='6.5'>Internal ops ready</font>", cell_center_bold)
        ],
        [
            Paragraph("<b>Typical Fragmented Stack</b><br/><font color='#64748b' size='6.5'>ClickUp + 1Password + Attendance App</font>", cell_body),
            Paragraph("PKR 64,400 / mo<br/><font color='#64748b' size='6.5'>$230 USD / mo</font>", cell_center),
            Paragraph("<b>PKR 12,000 / mo</b><br/><font color='#059669' size='6.5'>Flat Rate</font>", cell_center_green),
            Paragraph("<font color='#047857'><b>Save PKR 52,400 (81%)</b></font><br/><font color='#64748b' size='6.5'>PKR 628,800 / year</font>", cell_center),
            Paragraph("<b>+25 hrs / mo</b><br/><font color='#64748b' size='6.5'>No tool hopping</font>", cell_center_bold)
        ]
    ]

    pricing_table = Table(pricing_rows, colWidths=[165, 95, 95, 105, 80])
    pricing_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#f8fafc")),
        ('BACKGROUND', (0,2), (-1,2), colors.white),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#f8fafc")),
        ('BACKGROUND', (0,4), (-1,4), colors.white),
        ('BACKGROUND', (0,5), (-1,5), colors.HexColor("#f0fdf4")),
        ('BACKGROUND', (2,1), (2,-1), colors.HexColor("#ecfdf5")),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(pricing_table)
    story.append(Spacer(1, 9))

    # 3 Strategic ROI Cards
    roi_data = [
        [
            Paragraph("<b>Save 57% to 83% Cash</b><br/><font size='7' color='#475569'>Save PKR 16,000 to PKR 58,000 every single month for a team of 10. Direct cash retained on your daftar's balance sheet.</font>", p_style),
            Paragraph("<b>Save 18 to 25 Hours / Mo</b><br/><font size='7' color='#475569'>Eliminates manual timesheets, WhatsApp leave tracking, and Excel profit calculations. PMs and founders regain billable focus.</font>", p_style),
            Paragraph("<b>Zero Per-Seat Growth Tax</b><br/><font size='7' color='#475569'>Predictable flat rate of PKR 12,000/mo. Onboard developers, interns, and designers without unexpected billing spikes.</font>", p_style)
        ]
    ]
    roi_table = Table(roi_data, colWidths=[180, 180, 180])
    roi_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(roi_table)
    story.append(Spacer(1, 8))

    # Pricing Plans Summary Cards
    plans_data = [
        [
            Paragraph("<b>Starter Plan (Main Offer)</b><br/><b>PKR 12,000 / mo</b> (up to 10 seats)<br/>All 7 modules, password vault, dedicated DB, zero setup fee.", p_style),
            Paragraph("<b>Growth Plan</b><br/><b>PKR 30,000 / mo</b> (up to 25 seats)<br/>Multi-department workloads, priority support channel.", p_style),
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
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(plans_table)
    story.append(Spacer(1, 8))

    # Launch Offer Callout Box (3 Modules Free in Month 1)
    offer_data = [[
        Paragraph(
            "<b>LAUNCH PILOT SPECIAL:</b> "
            "Get <b>3 Modules 100% FREE in your first month</b> to test live with your daftar team (includes setup & walkthrough). "
            "First 3 Founding Daftars get <b>50% off (PKR 6,000/mo)</b> when unlocking all 7 modules.",
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

    # Next Steps Banner (NO CONTACT INFO)
    cta_data = [[
        Paragraph(
            "<b>Next Step: Schedule a 30-Minute Live Walkthrough</b><br/>"
            "<font size='8' color='#64748b'>Inspect live matching screens for a 10-person daftar team with all 7 modules pre-configured. Zero obligation, no credit card required.</font>",
            p_style
        )
    ]]
    cta_table = Table(cta_data, colWidths=[540])
    cta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(cta_table)

    # Build Document with NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF built successfully: {os.path.abspath(filename)}")

    # Verify Page Count
    reader = PdfReader(filename)
    num_pages = len(reader.pages)
    print(f"Total Pages: {num_pages}")
    if num_pages == 3:
        print("PERFECT: Document is exactly 3 pages!")
    elif num_pages < 3:
        print(f"WARNING: Document has only {num_pages} pages (target is 3).")
    else:
        print(f"ERROR: Document has {num_pages} pages (exceeded 3 pages).")

if __name__ == '__main__':
    output_pdf = sys.argv[1] if len(sys.argv) > 1 else "Daftar_Hub_Agency_Executive_Brief.pdf"
    build_pdf(output_pdf)
