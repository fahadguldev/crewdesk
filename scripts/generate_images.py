import os
from PIL import Image, ImageDraw, ImageFont

def get_font(name, size):
    try:
        if name == 'bold':
            return ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', size)
        elif name == 'semibold':
            return ImageFont.truetype('C:/Windows/Fonts/seguisb.ttf', size)
        else:
            return ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', size)
    except Exception:
        try:
            if name in ('bold', 'semibold'):
                return ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', size)
            return ImageFont.truetype('C:/Windows/Fonts/arial.ttf', size)
        except Exception:
            return ImageFont.load_default()

def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)

def generate_og_image():
    w, h = 1200, 630
    img = Image.new('RGB', (w, h), color=(11, 16, 32)) # #0B1020
    draw = ImageDraw.Draw(img)

    # Ambient glow in background
    for r in range(250, 0, -5):
        alpha = int((250 - r) / 250 * 25)
        color = (16, 185, 129, alpha) # emerald
        # draw subtle concentric circles top right
        draw.ellipse([800 - r, 100 - r, 800 + r, 100 + r], outline=(16, 50, 45), width=2)

    # Subtle grid lines
    for x in range(0, w, 60):
        draw.line([(x, 0), (x, h)], fill=(18, 26, 48), width=1)
    for y in range(0, h, 60):
        draw.line([(0, y), (w, y)], fill=(18, 26, 48), width=1)

    # Brand badge / Pill
    draw_rounded_rect(draw, (80, 70, 310, 110), radius=20, fill=(16, 185, 129, 30), outline=(16, 185, 129), width=1)
    f_pill = get_font('bold', 18)
    draw.text((105, 80), "AGENCY OPERATIONS PLATFORM", fill=(52, 211, 153), font=f_pill)

    # Brand Title
    f_brand = get_font('bold', 52)
    draw.text((80, 140), "Hub دفتر", fill=(255, 255, 255), font=f_brand)

    # Main Headline
    f_title = get_font('bold', 42)
    draw.text((80, 215), "The Agency Operations Platform", fill=(243, 244, 246), font=f_title)

    # Subtitle
    f_sub = get_font('normal', 24)
    draw.text((80, 275), "Attendance · Passwords · Time Tracking · Real Project Profit", fill=(156, 163, 175), font=f_sub)

    # 3 Pillars Chips
    chips = ["✓ 8 Core Modules Working Today", "✓ AES-256 Client Password Vault", "✓ Flat Pricing in PKR"]
    f_chip = get_font('normal', 18)
    cx = 80
    for chip in chips:
        draw_rounded_rect(draw, (cx, 330, cx + 280, 370), radius=8, fill=(24, 32, 58), outline=(45, 55, 80), width=1)
        draw.text((cx + 16, 340), chip, fill=(209, 213, 219), font=f_chip)
        cx += 295

    # Dashboard Preview Card (Right / Bottom)
    dw_x, dw_y, dw_w, dw_h = 80, 410, 1040, 160
    draw_rounded_rect(draw, (dw_x, dw_y, dw_x + dw_w, dw_y + dw_h), radius=12, fill=(17, 24, 39), outline=(55, 65, 81), width=1)
    
    # Top bar of dashboard preview
    draw.line([(dw_x, dw_y + 36), (dw_x + dw_w, dw_y + 36)], fill=(31, 41, 55), width=1)
    draw.ellipse([dw_x + 14, dw_y + 12, dw_x + 24, dw_y + 22], fill=(239, 68, 68))
    draw.ellipse([dw_x + 30, dw_y + 12, dw_x + 40, dw_y + 22], fill=(245, 158, 11))
    draw.ellipse([dw_x + 46, dw_y + 12, dw_x + 56, dw_y + 22], fill=(16, 185, 129))
    draw.text((dw_x + 70, dw_y + 8), "demo.daftarhub.app / Business Analysis — Real Profit per Project", fill=(107, 114, 128), font=get_font('normal', 14))

    # Stats Inside Dashboard Card
    stats = [
        ("Monthly Agency Profit", "PKR 1,480,000", "+24% vs last month", (16, 185, 129)),
        ("Attendance Today", "14 / 15 Present", "1 Approved Leave", (59, 130, 246)),
        ("Active Client Projects", "12 Active Sprints", "All Milestones On Track", (245, 158, 11)),
        ("Encrypted Password Vault", "48 Client Credentials", "AES-256 Secured", (168, 85, 247))
    ]
    
    sx = dw_x + 20
    for title, val, sub, color in stats:
        sw = 235
        draw_rounded_rect(draw, (sx, dw_y + 50, sx + sw, dw_y + 145), radius=8, fill=(24, 32, 58), outline=(37, 47, 73), width=1)
        draw.text((sx + 14, dw_y + 60), title, fill=(156, 163, 175), font=get_font('normal', 13))
        draw.text((sx + 14, dw_y + 82), val, fill=(255, 255, 255), font=get_font('bold', 18))
        draw.text((sx + 14, dw_y + 115), sub, fill=color, font=get_font('normal', 12))
        sx += sw + 20

    # Save to public/og-image.png
    out_path = os.path.join('public', 'og-image.png')
    img.save(out_path, format='PNG', optimize=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Generated {out_path}: {w}x{h}, {size_kb:.1f} KB")

def generate_hero_dashboard():
    w, h = 1600, 1000
    img = Image.new('RGB', (w, h), color=(11, 16, 32)) # #0B1020
    draw = ImageDraw.Draw(img)

    # Ambient background glow
    for x in range(0, w, 80):
        draw.line([(x, 0), (x, h)], fill=(16, 23, 42), width=1)
    for y in range(0, h, 80):
        draw.line([(0, y), (w, y)], fill=(16, 23, 42), width=1)

    # Main Browser Frame
    bx, by, bw, bh = 80, 50, 1440, 880
    draw_rounded_rect(draw, (bx, by, bx + bw, by + bh), radius=16, fill=(17, 24, 39), outline=(55, 65, 81), width=2)

    # Window controls (red, yellow, green)
    draw.ellipse([bx + 20, by + 18, bx + 34, by + 32], fill=(239, 68, 68))
    draw.ellipse([bx + 42, by + 18, bx + 56, by + 32], fill=(245, 158, 11))
    draw.ellipse([bx + 64, by + 18, bx + 78, by + 32], fill=(16, 185, 129))

    # URL bar in browser frame
    draw_rounded_rect(draw, (bx + 110, by + 12, bx + 700, by + 38), radius=6, fill=(31, 41, 55), outline=(55, 65, 81), width=1)
    draw.text((bx + 125, by + 16), "🔒 https://demo.daftarhub.app/business-analyst", fill=(156, 163, 175), font=get_font('normal', 14))

    # App Header inside Frame
    draw.line([(bx, by + 50), (bx + bw, by + 50)], fill=(31, 41, 55), width=1)
    draw.text((bx + 30, by + 68), "Business Analysis & Project Margins", fill=(255, 255, 255), font=get_font('bold', 24))
    draw.text((bx + 30, by + 102), "Real net revenue and dev cost margin calculated for every active agency project", fill=(156, 163, 175), font=get_font('normal', 15))

    # Top KPI Cards inside App
    kpis = [
        ("Total Billed Revenue", "PKR 2,940,000", "+18.2%", (16, 185, 129)),
        ("Developer Cost (Labor)", "PKR 1,460,000", "50.3% cost ratio", (156, 163, 175)),
        ("Net Agency Margin", "PKR 1,480,000", "50.3% Net Profit", (16, 185, 129)),
        ("Active Projects", "12 Projects", "8 Fixed · 4 Retainer", (59, 130, 246))
    ]
    kx = bx + 30
    for title, val, note, col in kpis:
        kw = 320
        draw_rounded_rect(draw, (kx, by + 135, kx + kw, by + 235), radius=10, fill=(24, 32, 58), outline=(45, 55, 80), width=1)
        draw.text((kx + 18, by + 148), title, fill=(156, 163, 175), font=get_font('normal', 14))
        draw.text((kx + 18, by + 172), val, fill=(255, 255, 255), font=get_font('bold', 22))
        draw.text((kx + 18, by + 206), note, fill=col, font=get_font('semibold', 13))
        kx += kw + 25

    # Main Project Table inside Business Analysis
    tx = bx + 30
    ty = by + 260
    tw = 1375
    th = 320
    draw_rounded_rect(draw, (tx, ty, tx + tw, ty + th), radius=10, fill=(24, 32, 58), outline=(45, 55, 80), width=1)
    
    # Table Header
    draw.text((tx + 20, ty + 15), "Project Name", fill=(156, 163, 175), font=get_font('bold', 14))
    draw.text((tx + 360, ty + 15), "Category", fill=(156, 163, 175), font=get_font('bold', 14))
    draw.text((tx + 560, ty + 15), "Billed Revenue", fill=(156, 163, 175), font=get_font('bold', 14))
    draw.text((tx + 780, ty + 15), "Dev Cost", fill=(156, 163, 175), font=get_font('bold', 14))
    draw.text((tx + 980, ty + 15), "Net Profit", fill=(156, 163, 175), font=get_font('bold', 14))
    draw.text((tx + 1180, ty + 15), "Margin %", fill=(156, 163, 175), font=get_font('bold', 14))
    draw.line([(tx, ty + 42), (tx + tw, ty + 42)], fill=(37, 47, 73), width=1)

    projects = [
        ("Fintech Mobile App (v2.4)", "Mobile / React Native", "PKR 850,000", "PKR 420,000", "PKR 430,000", "50.6%", (16, 185, 129)),
        ("E-Commerce Web Portal", "Full-Stack Web", "PKR 620,000", "PKR 310,000", "PKR 310,000", "50.0%", (16, 185, 129)),
        ("SaaS Analytics Dashboard", "Frontend / Next.js", "PKR 490,000", "PKR 260,000", "PKR 230,000", "46.9%", (59, 130, 246)),
        ("Healthcare Appointment API", "Backend / Python", "PKR 540,000", "PKR 280,000", "PKR 260,000", "48.1%", (16, 185, 129)),
        ("Brand Design & Webflow Site", "Design / Webflow", "PKR 440,000", "PKR 190,000", "PKR 250,000", "56.8%", (16, 185, 129)),
    ]

    row_y = ty + 55
    for name, cat, rev, cost, prof, margin, mcol in projects:
        draw.text((tx + 20, row_y), name, fill=(255, 255, 255), font=get_font('bold', 15))
        draw.text((tx + 360, row_y), cat, fill=(156, 163, 175), font=get_font('normal', 14))
        draw.text((tx + 560, row_y), rev, fill=(209, 213, 219), font=get_font('semibold', 14))
        draw.text((tx + 780, row_y), cost, fill=(156, 163, 175), font=get_font('normal', 14))
        draw.text((tx + 980, row_y), prof, fill=(255, 255, 255), font=get_font('bold', 15))
        # Margin Badge
        draw_rounded_rect(draw, (tx + 1175, row_y - 3, tx + 1260, row_y + 22), radius=6, fill=(16, 185, 129, 40), outline=(16, 185, 129), width=1)
        draw.text((tx + 1195, row_y), margin, fill=(52, 211, 153), font=get_font('bold', 14))
        row_y += 48
        draw.line([(tx, row_y - 12), (tx + tw, row_y - 12)], fill=(31, 41, 55), width=1)

    # -------------------------------------------------------------
    # FLOATING CARD 1: Attendance Check-In Screen (overlapping bottom-left)
    # -------------------------------------------------------------
    fc1_x, fc1_y, fc1_w, fc1_h = 100, 610, 600, 290
    # Shadow
    for s in range(12, 0, -2):
        draw_rounded_rect(draw, (fc1_x - s, fc1_y - s, fc1_x + fc1_w + s, fc1_y + fc1_h + s), radius=16, fill=None, outline=(5, 8, 16), width=2)
    draw_rounded_rect(draw, (fc1_x, fc1_y, fc1_x + fc1_w, fc1_y + fc1_h), radius=14, fill=(19, 27, 46), outline=(16, 185, 129), width=2)
    
    # Header of Floating Card 1
    draw.text((fc1_x + 20, fc1_y + 16), "Attendance & Daily Punch In", fill=(255, 255, 255), font=get_font('bold', 18))
    draw_rounded_rect(draw, (fc1_x + fc1_w - 120, fc1_y + 15, fc1_x + fc1_w - 20, fc1_y + 38), radius=6, fill=(16, 185, 129, 30), outline=(16, 185, 129), width=1)
    draw.text((fc1_x + fc1_w - 105, fc1_y + 18), "LIVE SYNC", fill=(52, 211, 153), font=get_font('bold', 11))

    # Content of Card 1
    draw.line([(fc1_x, fc1_y + 48), (fc1_x + fc1_w, fc1_y + 48)], fill=(37, 47, 73), width=1)
    
    # 1-Click Check in Button
    draw_rounded_rect(draw, (fc1_x + 20, fc1_y + 65, fc1_x + 220, fc1_y + 115), radius=8, fill=(16, 185, 129), outline=None)
    draw.text((fc1_x + 40, fc1_y + 78), "✓ PUNCHED IN: 09:14 AM", fill=(11, 16, 32), font=get_font('bold', 13))

    draw.text((fc1_x + 240, fc1_y + 70), "Team Roster Today", fill=(156, 163, 175), font=get_font('normal', 13))
    draw.text((fc1_x + 240, fc1_y + 90), "14 Present · 1 Approved Leave · 0 Late", fill=(255, 255, 255), font=get_font('bold', 14))

    # Mini Attendance List
    att_rows = [
        ("Hamza Tariq", "Lead Full-Stack Dev", "09:02 AM", "On Time", (16, 185, 129)),
        ("Ayesha Khan", "UI/UX Designer", "09:12 AM", "On Time", (16, 185, 129)),
        ("Bilal Ahmed", "QA Engineer", "—", "Casual Leave", (245, 158, 11)),
    ]
    ay = fc1_y + 140
    for name, role, ptime, status, scol in att_rows:
        draw.text((fc1_x + 20, ay), name, fill=(255, 255, 255), font=get_font('bold', 14))
        draw.text((fc1_x + 160, ay), role, fill=(156, 163, 175), font=get_font('normal', 13))
        draw.text((fc1_x + 350, ay), ptime, fill=(209, 213, 219), font=get_font('normal', 13))
        draw.text((fc1_x + 450, ay), status, fill=scol, font=get_font('semibold', 13))
        ay += 40
        draw.line([(fc1_x + 20, ay - 10), (fc1_x + fc1_w - 20, ay - 10)], fill=(28, 38, 62), width=1)

    # -------------------------------------------------------------
    # FLOATING CARD 2: Password Vault (overlapping bottom-right)
    # -------------------------------------------------------------
    fc2_x, fc2_y, fc2_w, fc2_h = 740, 610, 750, 290
    # Shadow
    for s in range(12, 0, -2):
        draw_rounded_rect(draw, (fc2_x - s, fc2_y - s, fc2_x + fc2_w + s, fc2_y + fc2_h + s), radius=16, fill=None, outline=(5, 8, 16), width=2)
    draw_rounded_rect(draw, (fc2_x, fc2_y, fc2_x + fc2_w, fc2_y + fc2_h), radius=14, fill=(19, 27, 46), outline=(245, 158, 11), width=2)

    # Header of Floating Card 2
    draw.text((fc2_x + 20, fc2_y + 16), "Client Password Vault (AES-256 Encrypted)", fill=(255, 255, 255), font=get_font('bold', 18))
    draw_rounded_rect(draw, (fc2_x + fc2_w - 145, fc2_y + 15, fc2_x + fc2_w - 20, fc2_y + 38), radius=6, fill=(245, 158, 11, 30), outline=(245, 158, 11), width=1)
    draw.text((fc2_x + fc2_w - 132, fc2_y + 18), "AUDIT LOG ACTIVE", fill=(251, 191, 36), font=get_font('bold', 11))

    draw.line([(fc2_x, fc2_y + 48), (fc2_x + fc2_w, fc2_y + 48)], fill=(37, 47, 73), width=1)

    # Vault credentials list
    creds = [
        ("Fintech App — Stripe Production Key", "sk_live_94f8••••••••••••••••", "Admin Only", "Revealed 10:22 AM (Logged)"),
        ("E-Commerce — AWS Root Console", "ops@agency.com / ••••••••••••", "Role: Tech Lead", "Copied yesterday (Logged)"),
        ("Healthcare App — Database Master", "postgres://db_master••••••••", "Admin Only", "Never revealed"),
    ]
    cy = fc2_y + 65
    for title, val, access, log_info in creds:
        draw.text((fc2_x + 20, cy), title, fill=(255, 255, 255), font=get_font('bold', 14))
        draw.text((fc2_x + 360, cy), val, fill=(16, 185, 129), font=get_font('semibold', 13))
        draw_rounded_rect(draw, (fc2_x + 580, cy - 2, fc2_x + fc2_w - 25, cy + 22), radius=4, fill=(31, 41, 55), outline=None)
        draw.text((fc2_x + 590, cy + 1), "Copy Credential", fill=(209, 213, 219), font=get_font('normal', 11))
        
        draw.text((fc2_x + 20, cy + 22), f"Permission: {access} · Audit: {log_info}", fill=(156, 163, 175), font=get_font('normal', 12))
        cy += 65
        draw.line([(fc2_x + 20, cy - 10), (fc2_x + fc2_w - 20, cy - 10)], fill=(28, 38, 62), width=1)

    # Save to public/images/hero-dashboard.webp and hero-dashboard.png
    webp_path = os.path.join('public', 'images', 'hero-dashboard.webp')
    png_path = os.path.join('public', 'images', 'hero-dashboard.png')
    
    img.save(webp_path, format='WEBP', quality=85)
    img.save(png_path, format='PNG', optimize=True)

    webp_kb = os.path.getsize(webp_path) / 1024
    png_kb = os.path.getsize(png_path) / 1024
    print(f"Generated {webp_path}: {w}x{h}, {webp_kb:.1f} KB (Target <150 KB: {'PASS' if webp_kb < 150 else 'FAIL'})")
    print(f"Generated {png_path}: {w}x{h}, {png_kb:.1f} KB")

if __name__ == '__main__':
    generate_og_image()
    generate_hero_dashboard()
