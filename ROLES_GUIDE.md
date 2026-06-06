# Olubadan Palace Platform - Roles & Routing Guide

Welcome to the official administration and routing guide for the Olubadan Palace Platform. This document outlines the distinct roles established on the website, their respective portals, and how the platform controls content visibility.

---

## 1. Role Definitions & Permissions

The platform supports three primary user roles, each with designated access, screens, and administrative privileges:

### 👑 A. Super Admin (Palace Administrator)
* **Scope**: Oversees and controls everything on the platform.
* **Access URL**: [/admin](file:///c:/Users/sysadmin/umar%20personal%20project/olubadan/src/app/admin)
* **Capabilities**:
  - Approve, reject, or request changes on pending representative profile submissions.
  - Write, publish, draft, or archive official palace news updates.
  - Oversee active media gallery uploads and live stream settings (Radio URL, YouTube Live video URLs).
  - **Dynamic Visibility Controls**: Check or uncheck filters to instantly control what end users can see (e.g. toggle whether the public can see contact emails, phone numbers, family titles, or traditional responsibilities of chieftaincy lines).

### 🏛️ B. Title Holders (Ancestral Line Representatives)
* **Scope**: Traditional chiefs (Otun, Balogun, Mogajis, and Baales) representing compounding structures.
* **Registration Form**: [/portal/register](file:///c:/Users/sysadmin/umar%20personal%20project/olubadan/src/app/portal/register)
* **Private Portal Dashboard**: [/portal/dashboard](file:///c:/Users/sysadmin/umar%20personal%20project/olubadan/src/app/portal/dashboard)
* **Capabilities**:
  - Fill out and submit detailed dossiers, including full traditional titles, compound histories, validated achievements, certificates, and responsibilities.
  - View current approval status ("Pending Review", "Approved", "Request Changes", "Rejected") along with live feedback and notes written by the Admin.
  - View full, private profiles side-by-side with a preview of the public, simplified profile cards.
  - Access other web page details (palace announcements, active stream status widgets, stats).

### 👥 C. End Users (Public Visitors)
* **Scope**: Citizens and researchers browsing the historical and cultural repository of Ibadanland.
* **Access URL**: Main site paths (e.g., `/`, `/news`, ancestral lines like `/otun-line`, `/balogun-line`, etc.).
* **Access Limits**:
  - Can only view approved and published chieftaincy profiles.
  - **"Just Few Details" View**: End users are only shown a simplified summary (Title, Name, Position, Image, and a short Biography). Detailed private fields (emails, phones, certificates, achievements, and responsibilities) are securely hidden to protect representative privacy unless toggled by the Admin.
  - Access the top 6 news grid on the main page, stream scheduled live radio feeds, and review historical galleries.

---

## 2. Directory & Route Mapping

The following outline represents the routing matrix implemented on the Olubadan Palace website:

| Path | Description | Access Role |
| :--- | :--- | :--- |
| `/` | Homepage (cinematic Hero, cultural highlights, top 6 news) | Public End Users |
| `/portal/register` | Title Holder representative application form | Chieftaincy Applicants |
| `/portal/dashboard` | Title Holder profile, status, comparison and stats panel | Registered Title Holders |
| `/admin` | Central Palace management, visibility panel, news editor | Super Admin |
| `/otun-line` | Directory of approved Otun line civil chieftaincy profiles | Public End Users |
| `/balogun-line` | Directory of approved Balogun line warrior chieftaincy profiles | Public End Users |
| `/mogaji-line` | Directory of compound compound head representatives | Public End Users |
| `/baale-line` | Directory of suburban community heads | Public End Users |

---

## 3. Security & Content Control Flow

The administrative oversight workflow operates through a structured lifecycle:

```
[Title Holder Registers] ──> [Pending Review Queue] ──> [Admin Reviews & Toggles Visibility]
                                                               │
                                         ┌─────────────────────┴─────────────────────┐
                                         ▼                                           ▼
                                 [Request Changes]                              [Published]
                       (Dashboard shows admin notes for edit)           (Simplified card appears in line page)
```

1. **lineage submissions**: A title holder fills the form at `/portal/register` which posts to `/api/profiles` (and saves to state/database).
2. **palace review queue**: The submission lands in the admin dashboard approval queue at `/admin`.
3. **visibility settings**: The admin reviews the documents, sets the status, and writes comments. The admin also adjusts global visibility filters (e.g. deciding whether compound achievements or phone numbers should be shown to the public).
4. **dossier synchronization**: The title holder views the decision and remarks instantly on their private screen at `/portal/dashboard`. Once marked as `Published`, the representative's card is automatically generated on the public chieftaincy page showing limited details as controlled by the admin.
