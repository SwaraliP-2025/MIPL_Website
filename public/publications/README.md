# Publications PDF Files

Place your case study PDF files in this folder.

## Current Publications:

1. **IVSS for District & Subordinate Courts of Madhya Pradesh**
   - Filename: `ivss-mp-courts.pdf`
   - Place your PDF here with this exact name

2. **ISMS for Mangalore Refineries & Petrochemicals Ltd.**
   - Filename: `isms-mrpl.pdf`
   - Place your PDF here with this exact name

## How to Add New Publications:

1. **Add your PDF file** to this folder (`public/publications/`)
2. **Update the publications array** in `src/pages/Publications.jsx`
3. Add a new entry like this:

```javascript
{
  type: "Case Study",
  title: "Your Publication Title",
  description: "Brief description of the publication",
  year: "2024",
  category: "Government Projects",
  pdfPath: "/publications/your-pdf-filename.pdf"
}
```

## Features:

- **Download PDF**: Downloads the PDF file directly
- **View Online**: Opens PDF in a new browser tab with standard PDF viewer
  - Users can zoom, search, print
  - Built-in download option in browser
  - Page navigation
  - Full-screen mode

## Supported PDF Viewers:

The PDFs will open in the browser's native PDF viewer which includes:
- Chrome PDF Viewer
- Firefox PDF Viewer
- Edge PDF Viewer
- Safari PDF Viewer

All modern browsers have built-in PDF viewers with download, print, and zoom capabilities.
