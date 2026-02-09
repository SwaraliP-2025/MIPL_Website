# 📝 Content Editing Guide - MIPL Website

## 🗂️ Quick Reference - Where to Edit Each Page

| Page | File Location | What You Can Change |
|------|--------------|---------------------|
| **Home Page** | `src/pages/Index.jsx` + `src/components/home/*.jsx` | Hero text, services, stats, CTA |
| **About Page** | `src/pages/About.jsx` | Company info, mission, vision, team, timeline |
| **Services Page** | `src/pages/Services.jsx` | Service descriptions, features |
| **Projects Page** | `src/pages/Projects.jsx` | Case studies, project details |
| **Careers Page** | `src/pages/Careers.jsx` | Job listings, benefits |
| **Contact Page** | `src/pages/Contact.jsx` | Contact info, form fields |
| **Navigation** | `src/components/layout/Navbar.jsx` | Menu items, logo |
| **Footer** | `src/components/layout/Footer.jsx` | Footer links, contact info |

---

## 🏠 HOME PAGE

### Main File: `src/pages/Index.jsx`
This file imports all home page sections. You don't need to edit this file.

### Hero Section: `src/components/home/HeroSection.jsx`

**What to change:**
```javascript
// Line ~30: Badge text
<span className="text-sm font-medium text-primary">
  Award-Winning Security & IT Consultancy from India  ← CHANGE THIS
</span>

// Line ~40: Main headline
<h1>
  A New Era of Security  ← CHANGE THIS
</h1>

// Line ~50: Description
<p>
  MIPL is a security & IT consulting company from India...  ← CHANGE THIS
</p>

// Line ~65: Button text
<Link to="/contact">
  Book Appointment  ← CHANGE THIS
</Link>

// Line ~75: Second button
<Link to="/services">
  View Services  ← CHANGE THIS
</Link>
```

---

### Stats Section: `src/components/home/StatsSection.jsx`

**What to change:**
```javascript
// Line ~55: Stats data
const stats = [
  { value: 20, suffix: "+", label: "Years Experience" },      ← CHANGE THESE
  { value: 500, suffix: "+", label: "Security Audits" },      ← CHANGE THESE
  { value: 15, suffix: "+", label: "Smart City Projects" },   ← CHANGE THESE
  { value: 100, suffix: "%", label: "Client Satisfaction" },  ← CHANGE THESE
];

// Line ~70: Section title
<h2>
  Our Impact in Numbers  ← CHANGE THIS
</h2>

// Line ~75: Description
<p>
  Delivering excellence across industries with proven results  ← CHANGE THIS
</p>
```

---

### Services Grid: `src/components/home/ServicesGrid.jsx`

**What to change:**
```javascript
// Line ~15: Services array
const services = [
  {
    icon: Shield,
    title: "Security Consultancy",  ← CHANGE THIS
    description: "Design and manage enterprise-class...",  ← CHANGE THIS
  },
  {
    icon: Shield,
    title: "Security Audits (TRAVA)",  ← CHANGE THIS
    description: "Risk analysis and security audits...",  ← CHANGE THIS
  },
  // ... add or remove services here
];

// Line ~80: Section heading
<h2>
  Our Services  ← CHANGE THIS
</h2>

// Line ~85: Description
<p>
  Successful security projects demand experience...  ← CHANGE THIS
</p>
```

---

### TRAVA Section: `src/components/home/TravaSection.jsx`

**What to change:**
```javascript
// Line ~10: Features
const features = [
  {
    icon: AlertTriangle,
    title: "Threat Detection",  ← CHANGE THIS
    description: "Real-time identification...",  ← CHANGE THIS
  },
  // ... more features
];

// Line ~50: Badge text
<span>Proprietary Technology</span>  ← CHANGE THIS

// Line ~55: Heading
<h2>
  Introducing <span>TRAVA</span>  ← CHANGE THIS
</h2>

// Line ~65: Description
<p>
  Our proprietary Risk Analysis Tool...  ← CHANGE THIS
</p>
```

---

### CTA Section: `src/components/home/CTASection.jsx`

**What to change:**
```javascript
// Line ~25: Heading
<h2>
  Ready to Secure Your Future?  ← CHANGE THIS
</h2>

// Line ~30: Description
<p>
  Partner with MIPL for comprehensive security solutions...  ← CHANGE THIS
</p>

// Line ~40: Button text
<Link to="/contact">
  Start Your Journey  ← CHANGE THIS
</Link>
```

---

## 👥 ABOUT PAGE

### File: `src/pages/About.jsx`

**What to change:**

```javascript
// Line ~50: Hero section
<h1>
  About Maha Infotech Pvt. Ltd.  ← CHANGE THIS
</h1>

<p>
  MIPL is an award-winning security & IT consultancy...  ← CHANGE THIS
</p>

// Line ~70: Stats
const stats = [
  { icon: Users, value: "20+", label: "Years of Experience" },  ← CHANGE THESE
  { icon: Globe, value: "3", label: "Office Locations" },       ← CHANGE THESE
  { icon: Award, value: "Award", label: "Winning Consultancy" }, ← CHANGE THESE
];

// Line ~100: Mission
<h2>Our Mission</h2>
<p>
  To empower organizations with cutting-edge security...  ← CHANGE THIS
</p>

// Line ~115: Vision
<h2>Our Vision</h2>
<p>
  To be the global leader in integrated security...  ← CHANGE THIS
</p>

// Line ~130: Values
const values = [
  {
    icon: Shield,
    title: "Integrity",  ← CHANGE THIS
    description: "We uphold the highest ethical standards...",  ← CHANGE THIS
  },
  // ... more values
];

// Line ~180: Leadership
<h3>Prasad Patil</h3>  ← CHANGE NAME
<p>Director, MIPL</p>   ← CHANGE TITLE
<p>
  One of India's leading security consultants...  ← CHANGE BIO
</p>

// Line ~200: Timeline/Milestones
const milestones = [
  { year: "2004", title: "Company Founded", description: "..." },  ← CHANGE THESE
  { year: "2010", title: "Government Projects", description: "..." },
  // ... more milestones
];
```

---

## 🛡️ SERVICES PAGE

### File: `src/pages/Services.jsx`

**What to change:**

```javascript
// Line ~20: Services array
const services = [
  {
    id: "cctv",
    icon: Camera,
    title: "CCTV",  ← CHANGE THIS
    shortDesc: "Video management covering capture...",  ← CHANGE THIS
    description: "Video management covering capture...",  ← CHANGE THIS
    features: [
      "IP Camera Network Design & Deployment",  ← CHANGE THESE
      "Video Management Systems (VMS)",         ← CHANGE THESE
      // ... more features
    ],
  },
  // ... more services
];

// Line ~150: Hero section
<h1>Services</h1>  ← CHANGE THIS
<p>
  MIPL brings integrated, one-stop expertise...  ← CHANGE THIS
</p>
```

---

## 🏗️ PROJECTS PAGE

### File: `src/pages/Projects.jsx`

**What to change:**

```javascript
// Line ~10: Categories
const categories = [
  { id: "all", label: "All Projects", icon: null },  ← CHANGE THESE
  { id: "government", label: "Government", icon: Landmark },
  // ... more categories
];

// Line ~20: Projects array
const projects = [
  {
    id: 1,
    title: "High Court Security & Surveillance Program",  ← CHANGE THIS
    category: "government",  ← CHANGE THIS
    client: "Supreme Court of India",  ← CHANGE THIS
    challenge: "Supreme Court-mandated security...",  ← CHANGE THIS
    solution: "Design, implementation, and integration...",  ← CHANGE THIS
    result: "Centralized, secure, and scalable...",  ← CHANGE THIS
    image: "https://images.unsplash.com/...",  ← CHANGE IMAGE URL
  },
  // ... more projects
];

// Line ~150: Hero section
<h1>Case Studies & Projects</h1>  ← CHANGE THIS
<p>
  Explore our portfolio of successful implementations...  ← CHANGE THIS
</p>
```

---

## 💼 CAREERS PAGE

### File: `src/pages/Careers.jsx`

**What to change:**

```javascript
// Line ~20: Benefits
const benefits = [
  {
    icon: Users,
    title: "Collaborative Culture",  ← CHANGE THIS
    description: "Work with industry experts...",  ← CHANGE THIS
  },
  // ... more benefits
];

// Line ~40: Jobs array
const jobs = [
  {
    id: 1,
    title: "Finance / Accounts Executive",  ← CHANGE THIS
    department: "Finance",  ← CHANGE THIS
    location: "Chhatrapati Sambhajinagar (Aurangabad), Maharashtra",  ← CHANGE THIS
    type: "Full-time",  ← CHANGE THIS
    experience: "4-6 years",  ← CHANGE THIS
    description: "Handle financial operations...",  ← CHANGE THIS
    requirements: [
      "Any graduate (B.B.A / B.M.S / B.Sc etc.)",  ← CHANGE THESE
      "4-6 years of experience in finance/accounts",
      // ... more requirements
    ],
  },
  // ... more jobs
];

// Line ~200: Hero section
<h1>Career Opportunities</h1>  ← CHANGE THIS
<p>
  Join Maha Infotech Pvt. Ltd. and be part of a team...  ← CHANGE THIS
</p>
```

---

## 📧 CONTACT PAGE

### File: `src/pages/Contact.jsx`

**What to change:**

```javascript
// Line ~15: Contact info
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@consultmipl.com",  ← CHANGE THIS
    href: "mailto:info@consultmipl.com",  ← CHANGE THIS
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98213 01414",  ← CHANGE THIS
    href: "tel:+919821301414",  ← CHANGE THIS
  },
  {
    icon: MapPin,
    label: "Locations",
    value: "Thane – Aurangabad – Navi Mumbai",  ← CHANGE THIS
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Monday – Friday: 10am – 6pm",  ← CHANGE THIS
  },
];

// Line ~100: Hero section
<h1>Contact Us</h1>  ← CHANGE THIS
<p>
  Ready to secure your organization?...  ← CHANGE THIS
</p>
```

---

## 🧭 NAVIGATION (Header)

### File: `src/components/layout/Navbar.jsx`

**What to change:**

```javascript
// Line ~10: Navigation links
const navLinks = [
  { name: "Home", href: "/" },      ← CHANGE NAME
  { name: "About", href: "/about" }, ← CHANGE NAME
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

// Line ~50: Logo
<img 
  src="/logo.png"  ← CHANGE LOGO PATH
  alt="MIPL Logo"  ← CHANGE ALT TEXT
/>

// Line ~80: CTA button
<Link to="/contact">
  Book a Consultation  ← CHANGE BUTTON TEXT
</Link>
```

---

## 🦶 FOOTER

### File: `src/components/layout/Footer.jsx`

**What to change:**

```javascript
// Line ~10: Quick links
const quickLinks = [
  { name: "About Us", href: "/about" },    ← CHANGE THESE
  { name: "Our Team", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

// Line ~20: Services
const services = [
  { name: "Security Consultancy", href: "/services" },  ← CHANGE THESE
  { name: "Security Audits (TRAVA)", href: "/services" },
  { name: "eGovernance", href: "/services" },
  { name: "Smart City & Safe City", href: "/services" },
];

// Line ~60: Company description
<p>
  A New Era of Security. Security & IT consultancy from India.  ← CHANGE THIS
</p>

// Line ~90: Contact info
<Mail className="w-3 h-3 text-primary" />
<span>info@consultmipl.com</span>  ← CHANGE EMAIL

<Phone className="w-3 h-3 text-primary" />
<span>+91 98213 01414</span>  ← CHANGE PHONE

<MapPin className="w-3 h-3 text-primary" />
<span>Thane – Aurangabad – Navi Mumbai</span>  ← CHANGE LOCATIONS

// Line ~120: Copyright
<p>© 2024 Maha Infotech Pvt. Ltd. All rights reserved.</p>  ← CHANGE THIS
```

---

## 🎨 GLOBAL SETTINGS

### Company Name & Branding

**File: `index.html`**
```html
<!-- Line ~7: Page title -->
<title>Maha Infotech Pvt. Ltd. - A New Era of Security</title>  ← CHANGE THIS

<!-- Line ~10: Meta description -->
<meta name="description" content="..." />  ← CHANGE THIS
```

### Logo

**File: `public/logo.png`**
- Replace this file with your new logo
- Keep the same filename or update references in:
  - `src/components/layout/Navbar.jsx`
  - `src/components/layout/Footer.jsx`

### Favicon

**File: `public/favicon.png`**
- Replace this file with your new favicon
- Update reference in `index.html` if needed

---

## 📝 Quick Edit Checklist

When updating content, follow this order:

1. ✅ **Home Page** - Update hero, services, stats
2. ✅ **About Page** - Update company info, team, timeline
3. ✅ **Services Page** - Update service descriptions
4. ✅ **Projects Page** - Update case studies
5. ✅ **Careers Page** - Update job listings
6. ✅ **Contact Page** - Update contact information
7. ✅ **Navigation** - Update menu items
8. ✅ **Footer** - Update links and contact info
9. ✅ **Logo & Favicon** - Replace image files
10. ✅ **Page Title** - Update in `index.html`

---

## 💡 Tips for Editing

### 1. **Finding Text**
Use Ctrl+F (Windows) or Cmd+F (Mac) to search for text in files

### 2. **Saving Changes**
- Save file: Ctrl+S (Windows) or Cmd+S (Mac)
- Changes appear automatically in browser (hot reload)

### 3. **Adding New Items**
Copy an existing item and modify it:
```javascript
// Copy this block
{
  title: "Existing Item",
  description: "Description here",
},
// Paste and modify
{
  title: "New Item",
  description: "New description",
},
```

### 4. **Removing Items**
Delete the entire block including the comma

### 5. **Changing Images**
Replace image URLs:
```javascript
image: "https://images.unsplash.com/photo-..."  ← CHANGE URL
```

---

## 🚨 Important Notes

⚠️ **Don't change:**
- Import statements at the top of files
- Component names
- File structure
- className attributes (these are for styling)

✅ **Do change:**
- Text content inside `<h1>`, `<p>`, `<span>` tags
- Array data (services, projects, jobs, etc.)
- Contact information
- Links and URLs

---

## 🆘 Need Help?

If you break something:
1. Press Ctrl+Z to undo
2. Save the file
3. Refresh the browser

The website will automatically reload with your changes!

---

**Happy Editing! 🎉**
