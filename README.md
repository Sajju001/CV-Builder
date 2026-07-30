# Professional Resume / CV Builder (ATS Corporate Edition)

A modern, professional, ATS-friendly **Resume and CV Builder website** constructed with pure HTML5, CSS3, and vanilla JavaScript.

## Features

- **Live A4 Preview & Real-time Updates**: As you type in any form field, the live preview document updates instantaneously.
- **ATS-Friendly Black & White Design**: Minimalist corporate typography, high-contrast layouts, structured section borders, and clear white space engineered for Applicant Tracking Systems.
- **Dynamic Field Collections**:
  - Basic Information & Contact Info
  - Profile Photo Upload & Toggle
  - Personal Profile Details (Father's Name, CNIC, DOB, Domicile, Marital Status, Religion, Caste)
  - Career Objective
  - Dynamic Education Table (`+ Add / Remove Row`)
  - Dynamic Work Experience List (`+ Add / Remove Block`)
  - Technical Skills & Competencies
  - Dynamic Languages (`+ Add / Remove Language`)
  - Hobbies & Interests
- **A4 High-Quality PDF Export**: Client-side PDF generation powered by `html2pdf.js` / `jsPDF`, preserving exact margins, typography, and profile picture without cutoffs.
- **Native Print Support**: Customized CSS `@media print` rules for physical printing or saving as PDF via browser print dialog.
- **Local Storage Auto-Save**: Keeps your data saved locally in your browser.
- **Sample Data & Reset**: Quick 1-click sample data loading to test immediately.
- **100% Client-Side / Pure Static**: No server, backend, Node.js, Express, or build tool required.

## Project Structure

```text
Resume-CV-Builder/
│
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # Complete CSS styling & A4 print rules
├── js/
│   └── script.js       # Pure Vanilla JS engine & PDF exporter
├── assets/
│   ├── images/         # Static images / default avatars
│   ├── icons/          # Custom SVG / icon assets
│   └── fonts/          # Local font files
└── README.md           # Documentation
```

## How to Run

1. **Local File System**: Simply double-click `index.html` to open it in any modern browser (Chrome, Firefox, Edge, Safari).
2. **Static Web Hosting**: Upload the project folder directly to GitHub Pages, Netlify, Vercel Static, or any static HTTP server. No build command required.
