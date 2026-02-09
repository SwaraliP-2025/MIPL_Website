# 🚀 Quick Edit Reference - MIPL Website

## 📂 File Structure (Where Everything Is)

```
MIPL Website
│
├── 📄 index.html                          ← Page title, meta tags
│
├── 📁 public/
│   ├── logo.png                           ← Company logo
│   └── favicon.png                        ← Browser tab icon
│
└── 📁 src/
    │
    ├── 📁 pages/                          ← MAIN PAGES (Edit these!)
    │   ├── Index.jsx                      ← Home page (imports sections)
    │   ├── About.jsx                      ← About page ⭐
    │   ├── Services.jsx                   ← Services page ⭐
    │   ├── Projects.jsx                   ← Projects page ⭐
    │   ├── Careers.jsx                    ← Careers page ⭐
    │   └── Contact.jsx                    ← Contact page ⭐
    │
    ├── 📁 components/
    │   │
    │   ├── 📁 home/                       ← HOME PAGE SECTIONS
    │   │   ├── HeroSection.jsx            ← Hero banner ⭐
    │   │   ├── StatsSection.jsx           ← Statistics ⭐
    │   │   ├── ServicesGrid.jsx           ← Services grid ⭐
    │   │   ├── TravaSection.jsx           ← TRAVA section ⭐
    │   │   └── CTASection.jsx             ← Call-to-action ⭐
    │   │
    │   └── 📁 layout/                     ← HEADER & FOOTER
    │       ├── Navbar.jsx                 ← Navigation menu ⭐
    │       └── Footer.jsx                 ← Footer ⭐
    │
    └── 📁 lib/
        └── animations.js                  ← Animation settings
```

⭐ = Files you'll edit most often

---

## 🎯 What to Edit Where

### 🏠 HOME PAGE

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Main headline | `src/components/home/HeroSection.jsx` | ~40 |
| Hero description | `src/components/home/HeroSection.jsx` | ~50 |
| Button text | `src/components/home/HeroSection.jsx` | ~65 |
| Statistics numbers | `src/components/home/StatsSection.jsx` | ~55 |
| Services list | `src/components/home/ServicesGrid.jsx` | ~15 |
| TRAVA content | `src/components/home/TravaSection.jsx` | ~50 |
| CTA text | `src/components/home/CTASection.jsx` | ~25 |

---

### 👥 ABOUT PAGE

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Company description | `src/pages/About.jsx` | ~55 |
| Mission statement | `src/pages/About.jsx` | ~100 |
| Vision statement | `src/pages/About.jsx` | ~115 |
| Core values | `src/pages/About.jsx` | ~130 |
| Team members | `src/pages/About.jsx` | ~180 |
| Company timeline | `src/pages/About.jsx` | ~200 |

---

### 🛡️ SERVICES PAGE

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Service list | `src/pages/Services.jsx` | ~20 |
| Service titles | `src/pages/Services.jsx` | ~25 |
| Service descriptions | `src/pages/Services.jsx` | ~30 |
| Service features | `src/pages/Services.jsx` | ~40 |

---

### 🏗️ PROJECTS PAGE

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Project categories | `src/pages/Projects.jsx` | ~10 |
| Project list | `src/pages/Projects.jsx` | ~20 |
| Project details | `src/pages/Projects.jsx` | ~30 |
| Client names | `src/pages/Projects.jsx` | ~35 |

---

### 💼 CAREERS PAGE

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Benefits list | `src/pages/Careers.jsx` | ~20 |
| Job listings | `src/pages/Careers.jsx` | ~40 |
| Job requirements | `src/pages/Careers.jsx` | ~60 |

---

### 📧 CONTACT PAGE

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Email address | `src/pages/Contact.jsx` | ~20 |
| Phone number | `src/pages/Contact.jsx` | ~25 |
| Office locations | `src/pages/Contact.jsx` | ~30 |
| Working hours | `src/pages/Contact.jsx` | ~35 |

---

### 🧭 NAVIGATION

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Menu items | `src/components/layout/Navbar.jsx` | ~10 |
| Logo | `src/components/layout/Navbar.jsx` | ~50 |
| CTA button | `src/components/layout/Navbar.jsx` | ~80 |

---

### 🦶 FOOTER

| What to Change | File | Line # (approx) |
|----------------|------|-----------------|
| Quick links | `src/components/layout/Footer.jsx` | ~10 |
| Services links | `src/components/layout/Footer.jsx` | ~20 |
| Contact info | `src/components/layout/Footer.jsx` | ~90 |
| Copyright text | `src/components/layout/Footer.jsx` | ~120 |

---

## 🔍 How to Find Content

### Method 1: Search by Text
1. Open VS Code
2. Press `Ctrl+Shift+F` (Windows) or `Cmd+Shift+F` (Mac)
3. Type the text you want to change
4. Click on the result to open the file

### Method 2: Browse Files
1. Open the file from the list above
2. Use `Ctrl+F` to search within the file
3. Edit the text
4. Save with `Ctrl+S`

---

## ✏️ Common Edits

### Change Company Name
**Files to update:**
- `index.html` (line ~7)
- `src/components/layout/Footer.jsx` (line ~60, ~120)
- `src/pages/About.jsx` (line ~50)

### Change Contact Information
**File:** `src/pages/Contact.jsx` (lines ~15-40)
**Also update:** `src/components/layout/Footer.jsx` (lines ~90-110)

### Add New Service
**File:** `src/components/home/ServicesGrid.jsx`
```javascript
// Add this block to the services array (line ~15)
{
  icon: Shield,                    // Choose icon
  title: "Your New Service",       // Service name
  description: "Description here", // Service description
  gradient: "from-blue-500/20 to-cyan-500/20",
  iconColor: "text-blue-400",
},
```

### Add New Job Listing
**File:** `src/pages/Careers.jsx`
```javascript
// Add this block to the jobs array (line ~40)
{
  id: 5,                           // Increment ID
  title: "Job Title",              // Job title
  department: "Department",        // Department name
  location: "Location",            // Office location
  type: "Full-time",               // Job type
  experience: "X-Y years",         // Experience required
  description: "Job description",  // Job description
  requirements: [
    "Requirement 1",               // List requirements
    "Requirement 2",
  ],
},
```

### Add New Project
**File:** `src/pages/Projects.jsx`
```javascript
// Add this block to the projects array (line ~20)
{
  id: 7,                           // Increment ID
  title: "Project Name",           // Project title
  category: "government",          // Category
  client: "Client Name",           // Client name
  challenge: "Challenge...",       // Challenge description
  solution: "Solution...",         // Solution description
  result: "Result...",             // Result description
  image: "https://...",            // Image URL
},
```

---

## 🎨 Styling (Don't Change These)

**Leave these alone:**
- `className="..."` - These are for styling
- `import` statements - These load components
- Component names like `<motion.div>` - These are for animations
- Anything with `{` and `}` - These are JavaScript variables

**Only change:**
- Text inside `>` and `<` tags
- Values in arrays like `[...]`
- Strings in quotes like `"text here"`

---

## 💾 Saving & Testing

1. **Edit** the file
2. **Save** with `Ctrl+S` (Windows) or `Cmd+S` (Mac)
3. **Check** browser - changes appear automatically!
4. **Undo** if needed with `Ctrl+Z`

---

## 🆘 Emergency Undo

If something breaks:
1. Press `Ctrl+Z` multiple times
2. Save the file
3. Refresh browser

Or restore from backup:
```bash
git checkout src/pages/About.jsx
```

---

## 📞 Quick Contact Info Update

**Update these 3 files:**

1. **Contact Page:** `src/pages/Contact.jsx` (lines 15-40)
2. **Footer:** `src/components/layout/Footer.jsx` (lines 90-110)
3. **Page Title:** `index.html` (line 7)

---

## ✅ Checklist Before Publishing

- [ ] Updated company name everywhere
- [ ] Updated contact information (email, phone, address)
- [ ] Updated services list
- [ ] Updated team members
- [ ] Updated job listings
- [ ] Updated project case studies
- [ ] Replaced logo (`public/logo.png`)
- [ ] Replaced favicon (`public/favicon.png`)
- [ ] Updated page title (`index.html`)
- [ ] Tested all pages in browser

---

**You're ready to edit! 🎉**

Start with small changes and save frequently!
