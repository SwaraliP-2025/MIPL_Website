# Testing Guide - Phase 1 Features

## Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Feature Testing Checklist

### 1. Homepage - Client Logos Section

**Location:** Scroll down from hero section

**Test Cases:**
- [ ] Section title "Trusted by Leading Organizations" is visible
- [ ] All 10 client logos display correctly
- [ ] Logos have white background cards
- [ ] Hover effect scales logos smoothly
- [ ] Grid is responsive (2 cols mobile, 3 tablet, 5 desktop)
- [ ] Client names appear below logos
- [ ] "Serving 50+ clients" text appears at bottom
- [ ] Animations trigger on scroll into view

**Expected Clients:**
1. HPCL
2. JNPT
3. Aurangabad Smart City
4. IOCL
5. BNP Paribas
6. Nayara Energy
7. MRPL
8. Gujarat Police
9. Surat Diamond Bourse
10. Maharashtra Govt

### 2. Homepage - Hero Section

**Location:** Top of homepage

**Test Cases:**
- [ ] Badge shows "Award-Winning Security & IT Consultancy from India"
- [ ] Main headline: "Securing India's Critical Infrastructure Since 2000"
- [ ] Sub-headline mentions "end-to-end capabilities"
- [ ] "Book Appointment" button (blue, primary)
- [ ] "View Services" button (outline)
- [ ] Both buttons link correctly
- [ ] Floating Lock and Network icons visible on desktop
- [ ] Scroll indicator animates at bottom
- [ ] Background network animation is smooth
- [ ] Responsive on mobile (buttons stack vertically)

### 3. Homepage - Testimonials Section

**Location:** After Client Logos section

**Test Cases:**
- [ ] Section title "What Our Clients Say" is visible
- [ ] 3 testimonial cards display
- [ ] Quote icons appear on each card
- [ ] Testimonials are from HPCL, ASCDCL, JNPT
- [ ] Author name, role, and company visible
- [ ] Cards have glass effect
- [ ] Hover effect adds shadow
- [ ] Grid is responsive (1 col mobile, 3 cols desktop)
- [ ] "Join 50+ organizations" text at bottom
- [ ] Staggered animation on scroll

### 4. Homepage - Statistics Section

**Location:** After Hero Section

**Test Cases:**
- [ ] Section title "Our Impact in Numbers" is visible
- [ ] 4 statistics display
- [ ] "25+ Years Experience" (not 20+)
- [ ] "50+ Major Projects"
- [ ] "500+ Security Audits"
- [ ] "100% Client Satisfaction"
- [ ] Numbers animate/count up on scroll
- [ ] Gradient text effect on numbers
- [ ] Grid is responsive (2 cols mobile, 4 cols desktop)
- [ ] Background animation is subtle

### 5. Breadcrumbs Navigation

**Test Cases:**
- [ ] NOT visible on homepage (/)
- [ ] Visible on /about page
- [ ] Visible on /services page
- [ ] Visible on /projects page
- [ ] Visible on /achievements page
- [ ] Visible on /publications page
- [ ] Visible on /social-activities page
- [ ] Visible on /careers page
- [ ] Visible on /contact page
- [ ] Shows "Home" with house icon
- [ ] Shows current page name
- [ ] Chevron separators between items
- [ ] Home link works
- [ ] Current page is not a link
- [ ] Proper styling (muted text, hover effects)

**Breadcrumb Name Mapping:**
- /about → "About Us"
- /services → "Services"
- /projects → "Projects"
- /achievements → "Achievements"
- /publications → "Publications"
- /social-activities → "Social Activities"
- /careers → "Careers"
- /contact → "Contact Us"
- /coffee-table-book → "Coffee Table Book"
- /ctb-feedback → "CTB Feedback"

### 6. Homepage Section Order

**Test Cases:**
- [ ] 1. Hero Section (top)
- [ ] 2. Stats Section
- [ ] 3. Services Grid
- [ ] 4. Client Logos
- [ ] 5. Testimonials
- [ ] 6. Trava Section
- [ ] 7. CTA Section
- [ ] 8. Footer (bottom)

## 📱 Responsive Testing

### Mobile (375px - 767px)
- [ ] Hero text is readable
- [ ] Buttons stack vertically
- [ ] Client logos: 2 columns
- [ ] Testimonials: 1 column
- [ ] Statistics: 2 columns
- [ ] Breadcrumbs: Home icon only (text hidden)
- [ ] Navigation menu works
- [ ] All sections fit screen width

### Tablet (768px - 1023px)
- [ ] Hero layout balanced
- [ ] Client logos: 3 columns
- [ ] Testimonials: 2-3 columns
- [ ] Statistics: 2-4 columns
- [ ] Breadcrumbs: Full text visible
- [ ] Touch targets are adequate

### Desktop (1024px+)
- [ ] Hero with floating icons
- [ ] Client logos: 5 columns
- [ ] Testimonials: 3 columns
- [ ] Statistics: 4 columns
- [ ] Breadcrumbs: Full layout
- [ ] Hover effects work
- [ ] Animations smooth

## 🎨 Visual Testing

### Light Mode
- [ ] All sections have proper contrast
- [ ] Client logos visible on white cards
- [ ] Text is readable
- [ ] Buttons have proper colors
- [ ] Breadcrumbs styled correctly

### Dark Mode
- [ ] Toggle dark mode from navbar
- [ ] All sections adapt to dark theme
- [ ] Client logos still visible (white cards)
- [ ] Glass effects work
- [ ] Text remains readable
- [ ] Animations still smooth

## ⚡ Performance Testing

### Load Time
- [ ] Homepage loads in < 3 seconds
- [ ] Images load progressively
- [ ] No layout shift (CLS)
- [ ] Smooth scrolling

### Animations
- [ ] No janky animations
- [ ] Smooth 60fps animations
- [ ] Animations trigger once on scroll
- [ ] No animation delays or stutters

### Build
- [ ] `npm run build` completes successfully
- [ ] No errors in console
- [ ] Bundle size reasonable (< 1MB)
- [ ] All assets included

## 🔍 Browser Testing

### Chrome/Edge
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### Safari (Desktop)
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### Mobile Safari (iOS)
- [ ] Touch interactions work
- [ ] Animations smooth
- [ ] Responsive layout correct

### Chrome Mobile (Android)
- [ ] Touch interactions work
- [ ] Animations smooth
- [ ] Responsive layout correct

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus states visible
- [ ] Skip to content link works
- [ ] Breadcrumb navigation works with keyboard

### Screen Reader
- [ ] ARIA labels present
- [ ] Breadcrumb navigation announced correctly
- [ ] Images have alt text
- [ ] Buttons have descriptive text

### Color Contrast
- [ ] Text meets WCAG AA standards
- [ ] Buttons have sufficient contrast
- [ ] Links are distinguishable

## 🐛 Common Issues to Check

### Client Logos
- [ ] No broken image icons
- [ ] All logos load
- [ ] Fallback text appears if image fails
- [ ] No 404 errors in console

### Breadcrumbs
- [ ] Not showing on homepage
- [ ] Showing on all other pages
- [ ] Correct page names
- [ ] Links work properly

### Animations
- [ ] Not causing performance issues
- [ ] Triggering at right time
- [ ] Not repeating unnecessarily
- [ ] Smooth on all devices

### Layout
- [ ] No horizontal scroll
- [ ] Sections properly spaced
- [ ] Content not cut off
- [ ] Footer at bottom

## ✅ Sign-Off Checklist

Before deploying to production:

- [ ] All features tested on desktop
- [ ] All features tested on mobile
- [ ] All features tested on tablet
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Light mode works
- [ ] Dark mode works
- [ ] No console errors
- [ ] No broken images
- [ ] All links work
- [ ] Forms still functional
- [ ] Build successful
- [ ] Performance acceptable
- [ ] Accessibility checked

## 📊 Testing Results Template

```
Date: _______________
Tester: _______________
Browser: _______________
Device: _______________

Homepage Features:
- Client Logos: ☐ Pass ☐ Fail
- Hero Section: ☐ Pass ☐ Fail
- Testimonials: ☐ Pass ☐ Fail
- Statistics: ☐ Pass ☐ Fail

Breadcrumbs:
- Hidden on homepage: ☐ Pass ☐ Fail
- Visible on inner pages: ☐ Pass ☐ Fail
- Navigation works: ☐ Pass ☐ Fail

Responsive:
- Mobile: ☐ Pass ☐ Fail
- Tablet: ☐ Pass ☐ Fail
- Desktop: ☐ Pass ☐ Fail

Dark Mode:
- Toggle works: ☐ Pass ☐ Fail
- All sections adapt: ☐ Pass ☐ Fail

Overall: ☐ Ready for Production ☐ Needs Fixes

Notes:
_________________________________
_________________________________
_________________________________
```

## 🚀 Quick Test Commands

```bash
# Run development server
npm run dev

# Open in browser
# Navigate to http://localhost:5173

# Test build
npm run build
npm run preview

# Check for errors
# Open browser console (F12)
# Look for red errors
```

---

**Testing Priority:**
1. Homepage features (Client Logos, Testimonials, Stats)
2. Breadcrumbs on all pages
3. Responsive design
4. Dark mode
5. Browser compatibility

**Estimated Testing Time:** 30-45 minutes for complete testing
