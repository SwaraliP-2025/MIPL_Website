# MIPL Website Revamp - Visual Reference Guide

## 🎨 Color Palette

### Primary Colors
```
MIPL Deep Enterprise Blue
HEX: #244884
RGB: 36, 72, 132
HSL: 217°, 57%, 33%
Usage: Main backgrounds, headers, navigation

MIPL Signature Orange
HEX: #E9863C
RGB: 233, 134, 60
HSL: 24°, 82%, 57%
Usage: CTAs, highlights, accents, hover states

Soft Blue Gray
HEX: #96A3BF
RGB: 150, 163, 191
HSL: 220°, 20%, 67%
Usage: Secondary borders, muted text, subtle elements
```

### Background Colors
```
Dark Navy (Primary Background)
HEX: #0f172a
RGB: 15, 23, 42
HSL: 217°, 47%, 11%

Medium Navy (Section Background)
HEX: #1a2f5a
RGB: 26, 47, 90
HSL: 217°, 55%, 23%

Light Gray (Text)
HEX: #f5f7fa
RGB: 245, 247, 250
HSL: 210°, 20%, 98%
```

---

## 📐 Typography

### Font Family
**Inter** (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Heading Sizes
```
H1: 4xl (36px) → 6xl (60px) → 8xl (96px)
   Mobile → Tablet → Desktop
   
H2: 3xl (48px) → 5xl (60px) → 6xl (72px)
   Mobile → Tablet → Desktop
   
H3: 2xl (24px) → 3xl (30px) → 4xl (36px)
   Mobile → Tablet → Desktop
   
H4: xl (20px) → 2xl (24px)
   Mobile → Desktop
```

### Body Text
```
Large: lg (18px)
Regular: base (16px)
Small: sm (14px)
Extra Small: xs (12px)
```

### Line Heights
```
Headings: 1.2 (tight)
Body: 1.6 (relaxed)
Captions: 1.4 (normal)
```

---

## 🎬 Animation Specifications

### Entrance Animations
```
Duration: 0.6s - 0.8s
Easing: ease-out
Delay: 0s - 0.5s (staggered)
Direction: From bottom (y: 20) or sides (x: ±20)
```

### Hover Animations
```
Duration: 0.3s
Easing: ease-in-out
Effects: 
  - Scale: 1 → 1.05
  - Y-axis: 0 → -10px
  - Opacity: 1 → 0.8
```

### Infinite Animations
```
Duration: 6s - 10s
Easing: ease-in-out
Repeat: Infinity
Effects:
  - Float: ±20px vertical
  - Pulse: 1 → 1.2 → 1
  - Glow: opacity 0.1 → 0.15 → 0.1
```

### Scroll Triggers
```
Trigger: whileInView
Margin: -100px (start animation 100px before entering viewport)
Once: true (animate only once)
```

---

## 🎨 Component Color Schemes

### Sector Cards
```
Information Technology
  Primary: #3B82F6 (Blue)
  Gradient: from-blue-500 to-cyan-500
  Border: border-blue-500/30

Artificial Intelligence
  Primary: #A855F7 (Purple)
  Gradient: from-purple-500 to-pink-500
  Border: border-purple-500/30

Smart City & Safe City
  Primary: #10B981 (Green)
  Gradient: from-green-500 to-emerald-500
  Border: border-green-500/30

Oil & Gas
  Primary: #F97316 (Orange)
  Gradient: from-orange-500 to-red-500
  Border: border-orange-500/30

Judiciary
  Primary: #6366F1 (Indigo)
  Gradient: from-indigo-500 to-blue-500
  Border: border-indigo-500/30

Healthcare
  Primary: #EF4444 (Red)
  Gradient: from-red-500 to-pink-500
  Border: border-red-500/30

Cyber Security
  Primary: #64748B (Slate)
  Gradient: from-slate-500 to-gray-500
  Border: border-slate-500/30
```

---

## 📏 Spacing System

### Padding/Margin Scale
```
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
4xl: 80px (5rem)
```

### Container Widths
```
Mobile: 100% - 16px padding (full width with gutters)
Tablet: 768px
Desktop: 1024px
Large Desktop: 1280px
```

### Section Padding
```
Vertical: py-20 (80px) → py-32 (128px)
Horizontal: px-4 (16px) → px-8 (32px)
```

---

## 🖼️ Layout Grids

### Hero Section
```
Full width, centered content
Max width: 5xl (64rem)
Vertical alignment: center
Horizontal alignment: center
```

### Sector Showcase
```
Grid: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
Gap: 24px (1.5rem)
Max width: container
```

### Metrics Grid
```
Grid: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
Gap: 24px (1.5rem)
Card height: auto
```

### Features Grid
```
Grid: 1 col (mobile) → 2 cols (desktop)
Gap: 24px (1.5rem)
Card height: auto
```

---

## 🎯 Button Styles

### Primary Button (CTA)
```
Background: Gradient from-[#E9863C] to-[#f5a85c]
Text: White, bold, 16px
Padding: px-8 py-6
Border radius: lg (0.75rem)
Shadow: shadow-lg shadow-[#E9863C]/40
Hover: 
  - Gradient: from-[#d97a2f] to-[#e89a4f]
  - Shadow: shadow-[#E9863C]/60
  - Scale: 1.05
Transition: all 0.3s
```

### Secondary Button
```
Background: Transparent
Border: 1px solid white/20
Text: White, 16px
Padding: px-8 py-6
Border radius: lg
Hover:
  - Background: white/10
  - Border: white/30
Transition: all 0.3s
```

### Icon Button
```
Size: 40px × 40px
Background: white/10
Border radius: lg
Icon: 20px × 20px
Hover:
  - Background: [#E9863C]/20
  - Color: [#E9863C]
Transition: all 0.3s
```

---

## 🎨 Card Styles

### Standard Card
```
Background: from-white/10 to-white/5
Backdrop: blur-md
Border: 1px solid white/10
Border radius: xl (0.75rem)
Padding: 24px (1.5rem)
Hover:
  - Border: [#E9863C]/50
  - Y-axis: -10px
Transition: all 0.3s
```

### Metric Card
```
Background: from-white/10 to-white/5
Backdrop: blur-md
Border: 1px solid white/10
Border radius: lg
Padding: 24px
Icon: 24px × 24px, gradient background
Number: 24px bold white
Label: 14px gray-400
Trend: 14px green-400
```

### Feature Card
```
Background: from-white/10 to-white/5
Backdrop: blur-md
Border: 1px solid white/10
Border radius: xl
Padding: 32px
Icon: 32px × 32px, gradient background
Title: 20px bold white
Description: 14px gray-300
List items: 12px gray-400
```

---

## 🌐 Responsive Breakpoints

### Mobile First
```
Default: < 768px
- Full width with gutters
- Single column layouts
- Larger touch targets
- Simplified navigation
```

### Tablet
```
md: 768px - 1024px
- 2 column layouts
- Optimized spacing
- Enhanced navigation
- Medium text sizes
```

### Desktop
```
lg: 1024px+
- 3-4 column layouts
- Full feature set
- Hover effects
- Larger text sizes
```

---

## 🎬 Animation Timing

### Fast Animations
```
Duration: 0.2s - 0.3s
Use: Button clicks, hover effects, quick transitions
```

### Standard Animations
```
Duration: 0.6s - 0.8s
Use: Entrance animations, section reveals
```

### Slow Animations
```
Duration: 1.5s - 2s
Use: Background animations, infinite loops
```

### Stagger Delays
```
Between items: 0.1s - 0.2s
Initial delay: 0.3s - 0.5s
```

---

## 🎨 Gradient Specifications

### Hero Background
```
Direction: 135deg (to bottom right)
Colors: #244884 → #1a2f5a → #0f172a
Opacity: 1 → 1 → 1
```

### Button Gradient
```
Direction: to right
Colors: #E9863C → #f5a85c
Opacity: 1 → 1
```

### Text Gradient
```
Direction: to right
Colors: #E9863C → #f5a85c
Opacity: 1 → 1
Background clip: text
```

### Glow Gradient
```
Direction: to bottom right
Colors: #E9863C → transparent
Opacity: 0.1 → 0
Blur: 3xl
```

---

## 📊 Visual Hierarchy

### Primary Elements
- Large headings (6xl - 8xl)
- Orange accent color
- Bold font weight (700-800)
- High contrast

### Secondary Elements
- Medium headings (3xl - 4xl)
- White text
- Semi-bold font weight (600)
- Good contrast

### Tertiary Elements
- Small text (sm - base)
- Gray text (gray-300 - gray-400)
- Regular font weight (400-500)
- Adequate contrast

### Background Elements
- Very subtle colors
- Low opacity (5-10%)
- Blur effects
- Minimal visual weight

---

## 🎯 Focus States

### Keyboard Focus
```
Outline: 2px solid [#E9863C]
Outline offset: 2px
Border radius: 4px
Visible on all interactive elements
```

### Hover States
```
Desktop only
Scale: 1.05
Y-axis: -10px
Shadow: Enhanced
Transition: 0.3s
```

### Active States
```
Scale: 0.95
Opacity: 0.9
Transition: 0.1s
```

---

## 🎨 Dark Mode Considerations

### Current Implementation
- Website uses dark theme by default
- Light text on dark backgrounds
- Orange accents for visibility
- High contrast for accessibility

### Color Adjustments for Light Mode (if needed)
```
Background: #f5f7fa (Light)
Text: #0f172a (Dark)
Borders: #e5e7eb (Light gray)
Accents: #E9863C (Same orange)
```

---

## 📱 Mobile Optimizations

### Touch Targets
- Minimum size: 44px × 44px
- Spacing: 8px between targets
- Padding: 12px - 16px

### Text Sizing
- Headings: Larger on mobile (4xl)
- Body: 16px minimum
- Small text: 14px minimum

### Spacing
- Vertical: 20px - 32px
- Horizontal: 16px gutters
- Gap between items: 16px - 24px

---

## 🎬 Animation Easing Functions

### Entrance Animations
```
ease-out: Starts fast, ends slow
cubic-bezier(0.4, 0, 0.2, 1)
```

### Hover Animations
```
ease-in-out: Smooth both ways
cubic-bezier(0.4, 0, 0.6, 1)
```

### Infinite Animations
```
ease-in-out: Smooth loop
cubic-bezier(0.4, 0, 0.6, 1)
```

### Bounce Effects
```
cubic-bezier(0.68, -0.55, 0.265, 1.55)
For playful, bouncy animations
```

---

## 🎨 Shadow System

### Subtle Shadow
```
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)
Use: Cards, subtle depth
```

### Medium Shadow
```
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
Use: Elevated cards, buttons
```

### Large Shadow
```
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1)
Use: Modals, dropdowns
```

### Glow Shadow
```
box-shadow: 0 0 20px rgba(233, 134, 60, 0.4)
Use: Highlighted elements, CTAs
```

---

## 📐 Border Radius

### Small
```
sm: 0.375rem (6px)
Use: Small buttons, inputs
```

### Medium
```
md: 0.5rem (8px)
Use: Cards, standard elements
```

### Large
```
lg: 0.75rem (12px)
Use: Large cards, sections
```

### Extra Large
```
xl: 1rem (16px)
Use: Hero sections, major containers
```

### Full
```
full: 9999px
Use: Badges, circular elements
```

---

## 🎯 Accessibility Colors

### Text Contrast
```
White on Dark Blue: 12.5:1 (AAA)
White on Dark Navy: 14.2:1 (AAA)
Orange on Dark: 5.8:1 (AA)
Gray on Dark: 4.5:1 (AA)
```

### Color Blindness
- Orange and blue are distinguishable
- Not relying on color alone for information
- Icons and text labels provided

---

## 📊 Visual Consistency

### Consistent Elements
- Button styles across all sections
- Card designs throughout
- Icon sizes and styles
- Spacing and padding
- Animation timings
- Color usage

### Variations
- Sector cards have unique colors
- Metric cards have gradient icons
- Feature cards have different layouts
- But all follow the same design system

---

## 🎉 Summary

This visual reference guide provides:
✅ Complete color specifications
✅ Typography guidelines
✅ Animation timings
✅ Component styles
✅ Responsive breakpoints
✅ Accessibility standards
✅ Spacing system
✅ Shadow system

Use this guide to maintain visual consistency when:
- Adding new components
- Modifying existing sections
- Creating new pages
- Updating branding
- Extending functionality

---

**Last Updated**: May 25, 2026
**Version**: 1.0.0
