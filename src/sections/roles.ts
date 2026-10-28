import { C } from "../content";
import { buildShowcaseSection, type ShowcaseItem } from "./showcase";

/* ------------------------------------------------------------------ */
/* Role Icons (SVG)                                                   */
/* ------------------------------------------------------------------ */

const icon = (paths: string): string =>
  `<svg class="role-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" focusable="false">${paths}</svg>`;

const roleIcons: Record<string, string> = {
  admin: icon(`<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>`),
  hr: icon(
    `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  ),
  pm: icon(
    `<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>`,
  ),
  employee: icon(
    `<rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/>`,
  ),
};

const roles: ShowcaseItem[] = [
  {
    id: "admin",
    name: "Agency Owner / Admin",
    tagline: "Full executive command center with live business analysis and encrypted vault.",
    url: "https://demo.daftarhub.app/?role=admin",
    image: "/images/admin.png",
    iconSvg: roleIcons.admin,
    urlPath: "?role=admin",
    statusBadge: "ADMIN SCREEN",
    buttonText: "Agency Owner",
  },
  {
    id: "hr",
    name: "HR Manager",
    tagline: "People operations without spreadsheets or chaotic WhatsApp threads.",
    url: "https://demo.daftarhub.app/?role=hr",
    image: "/images/hr.png",
    iconSvg: roleIcons.hr,
    urlPath: "?role=hr",
    statusBadge: "HR SCREEN",
    buttonText: "HR Manager",
  },
  {
    id: "pm",
    name: "Project Manager",
    tagline: "Delivery clarity — see active projects, tasks, and real capacity.",
    url: "https://demo.daftarhub.app/?role=pm",
    image: "/images/pm.png",
    iconSvg: roleIcons.pm,
    urlPath: "?role=pm",
    statusBadge: "PM SCREEN",
    buttonText: "Project Manager",
  },
  {
    id: "employee",
    name: "Employee & Developer",
    tagline: "Clean, distraction-free workspace. Everything personal, nothing extra.",
    url: "https://demo.daftarhub.app/?role=employee",
    image: "/images/employee.png",
    iconSvg: roleIcons.employee,
    urlPath: "?role=employee",
    statusBadge: "EMPLOYEE SCREEN",
    buttonText: "Employee",
  },
];

export function buildRoles(): HTMLElement {
  const cfg = C.roles as unknown as Record<string, any>;
  return buildShowcaseSection({
    sectionId: "roles",
    eyebrow: cfg?.eyebrow ?? "Role-Based Access by Design",
    title: cfg?.title ?? "4 Dedicated Role Dashboards",
    subtitle:
      cfg?.sub ??
      cfg?.subtitle ??
      "Each person gets exactly the screen they need — fewer buttons, less training, and no salary or rate exposure to the wrong role.",
    items: roles,
    eventName: "roles:set",
    datasetAttr: "activeRole",
    layoutExtraClass: "roles-layout",
  });
}
