# MIPL Premium Design System Reference

## Color Palette

### Primary Colors
```
Orange (Accent)
  - 400: #fb923c (hover)
  - 500: #f97316 (primary)
  - 600: #ea580c (dark)
  - Gradient: from-orange-500 to-orange-600

Blue (Secondary)
  - 400: #60a5fa (light)
  - 500: #3b82f6 (primary)
  - 600: #2563eb (dark)
  - Gradient: from-blue-500 to-blue-600
```

### Neutral Colors
```
Slate (Dark)
  - 900: #0f172a (darkest)
  - 950: #030712 (ultra dark)
  - 800: #1e293b
  - 700: #334155

Gray (Light)
  - 50: #f9fafb (lightest)
  - 100: #f3f4f6
  - 300: #d1d5db
  - 400: #9ca3af
  - 600: #4b5563
```

### Semantic Colors
```
Success: from-green-500 to-green-600
Warning: from-yellow-500 to-yellow-600
Error: from-red-500 to-red-600
Info: from-blue-500 to-blue-600
```

---

## Typography System

### Font Family
```
Primary: Inter (sans-serif)
Fallback: system-ui, -apple-system, sans-serif
```

### Heading Styles

#### H1 (Hero)
```
Size: 5xl (mobile) → 7xl (desktop)
Weight: 700 (bold)
Line Height: 1.2 (tight)
Letter Spacing: normal
Color: text-white or text-slate-900
```

#### H2 (Section)
```
Size: 4xl (mobile) → 5xl (desktop)
Weight: 700 (bold)
Line Height: 1.2 (tight)
Letter Spacing: normal
Color: text-white or text-slate-900
```

#### H3 (Subsection)
```
Size: 3xl (mobile) → 4xl (desktop)
Weight: 700 (bold)
Line Height: 1.3
Letter Spacing: normal
Color: text-white or text-slate-900
```

#### H4 (Card Title)
```
Size: xl
Weight: 700 (bold)
Line Height: 1.4
Letter Spacing: normal
Color: text-slate-900
```

### Body Text

#### Large Body
```
Size: lg (mobile) → xl (desktop)
Weight: 400 (normal)
Line Height: 1.6 (relaxed)
Letter Spacing: normal
Color: text-gray-300 or text-gray-600
```

#### Normal Body
```
Size: base
Weight: 400 (normal)
Line Height: 1.6 (relaxed)
Letter Spacing: normal
Color: text-gray-600
```

#### Small Text
```
Size: sm
Weight: 400 (normal)
Line Height: 1.5
Letter Spacing: normal
Color: text-gray-500
```

#### Extra Small (Labels)
```
Size: xs
Weight: 600 (semibold)
Line Height: 1.5
Letter Spacing: 0.05em (widest)
Text Transform: uppercase
Color: text-orange-600
```

---

## Component Styles

### Buttons

#### Primary Button
```
Background: from-orange-500 to-orange-600
Hover: from-orange-600 to-orange-700
Text: text-white font-semibold
Padding: px-8 py-4
Border Radius: rounded-lg
Shadow: shadow-lg shadow-orange-500/30
Hover Shadow: shadow-orange-500/50
Transition: duration-300
```

#### Secondary Button
```
Background: transparent
Border: border border-white/20
Hover: border-white/40 bg-white/5
Text: text-white font-semibold
Padding: px-8 py-4
Border Radius: rounded-lg
Transition: duration-300
```

#### Icon Button
```
Size: w-10 h-10 (sm) → w-12 h-12 (lg)
Background: bg-white/10
Hover: bg-orange-500/20 text-orange-400
Border Radius: rounded-lg
Transition: duration-300
```

### Cards

#### Capability Card
```
Background: bg-white
Border: border border-gray-200
Hover: border-orange-200 shadow-xl
Padding: p-8
Border Radius: rounded-xl
Transition: duration-300
```

#### Case Study Card
```
Background: bg-white
Border: border border-gray-200
Hover: border-orange-200 shadow-xl
Padding: p-6
Border Radius: rounded-xl
Transition: duration-300
```

#### Dark Card (Footer)
```
Background: bg-white/10 or bg-white/5
Border: border border-white/20
Hover: border-white/40
Padding: p-4 to p-8
Border Radius: rounded-lg to rounded-xl
Transition: duration-300
```

### Forms

#### Input Field
```
Background: bg-white/5
Border: border border-white/20
Focus: border-orange-500 outline-none
Text: text-white
Padding: px-4 py-3
Border Radius: rounded-lg
Transition: duration-300
```

#### Label
```
Size: text-sm
Weight: 600 (semibold)
Color: text-gray-200
Margin Bottom: mb-2
```

---

## Spacing System

### Padding
```
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
2xl: 4rem (64px)
```

### Margins
```
Same as padding scale
```

### Gaps (Grid/Flex)
```
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
```

### Section Padding
```
Mobile: py-12 (48px)
Tablet: py-16 (64px)
Desktop: py-24 (96px)
```

### Container Padding
```
Mobile: px-4 (16px)
Tablet: px-6 (24px)
Desktop: px-8 (32px)
```

---

## Animation System

### Durations
```
Fast: 0.15s (micro-interactions)
Normal: 0.3s (standard transitions)
Slow: 0.6s (entrance animations)
Very Slow: 0.8s (major transitions)
Loop: 2-8s (continuous animations)
```

### Easing Functions
```
ease-out: Smooth entrance (0.6-0.8s)
ease-in-out: Smooth loops (2-8s)
ease-in: Smooth exit (0.3s)
cubic-bezier(0.68, -0.55, 0.265, 1.55): Bounce
```

### Common Animations

#### Fade In
```
initial: { opacity: 0 }
animate: { opacity: 1 }
transition: { duration: 0.6, ease: "easeOut" }
```

#### Slide Up
```
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: "easeOut" }
```

#### Scale In
```
initial: { opacity: 0, scale: 0.9 }
animate: { opacity: 1, scale: 1 }
transition: { duration: 0.5, ease: "easeOut" }
```

#### Hover Scale
```
whileHover: { scale: 1.05 }
whileTap: { scale: 0.95 }
transition: { type: "spring", stiffness: 400, damping: 10 }
```

#### Infinite Float
```
animate: { y: [0, -20, 0] }
transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
```

---

## Responsive Breakpoints

### Tailwind Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Usage Examples

#### Text Sizing
```
text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
```

#### Grid Columns
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

#### Padding
```
px-4 lg:px-8 py-12 lg:py-24
```

#### Display
```
hidden lg:flex
```

---

## Shadows & Depth

### Box Shadows
```
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

Colored Shadow:
shadow-lg shadow-orange-500/30
shadow-orange-500/50 (on hover)
```

### Glow Effects
```
Subtle: box-shadow: 0 0 20px rgba(249, 115, 22, 0.15)
Medium: box-shadow: 0 0 40px rgba(249, 115, 22, 0.3)
Strong: box-shadow: 0 0 60px rgba(249, 115, 22, 0.5)
```

---

## Borders & Outlines

### Border Styles
```
Thin: border (1px)
Medium: border-2 (2px)
Thick: border-4 (4px)

Colors:
border-gray-200 (light)
border-white/20 (dark with opacity)
border-orange-200 (accent light)
border-orange-500 (accent)
```

### Border Radius
```
sm: rounded-sm (2px)
md: rounded (4px)
lg: rounded-lg (8px)
xl: rounded-xl (12px)
full: rounded-full (9999px)
```

---

## Opacity & Transparency

### Background Opacity
```
bg-white/5 (5% opacity)
bg-white/10 (10% opacity)
bg-white/20 (20% opacity)
bg-orange-500/20 (20% opacity)
```

### Text Opacity
```
text-white/50 (50% opacity)
text-gray-400 (inherent opacity)
text-gray-500 (inherent opacity)
```

### Border Opacity
```
border-white/10 (10% opacity)
border-white/20 (20% opacity)
border-white/40 (40% opacity)
```

---

## Gradients

### Linear Gradients
```
from-orange-500 to-orange-600
from-blue-500 to-blue-600
from-slate-900 to-slate-950
from-white to-gray-50
```

### Gradient Directions
```
to-r (right)
to-b (bottom)
to-br (bottom-right)
to-t (top)
to-l (left)
```

### Text Gradients
```
bg-gradient-to-r from-orange-400 to-orange-500
bg-clip-text text-transparent
```

---

## Accessibility

### Focus States
```
outline: 2px solid hsl(var(--primary))
outline-offset: 2px
border-radius: 4px
```

### High Contrast Mode
```
@media (prefers-contrast: high) {
  border-color: currentColor !important;
  text-decoration: underline;
}
```

### Reduced Motion
```
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

### Color Contrast
```
WCAG AA (4.5:1 minimum for text)
WCAG AAA (7:1 minimum for text)

Examples:
- White on Orange: 4.6:1 ✓
- White on Blue: 5.2:1 ✓
- Gray-300 on Slate-900: 8.1:1 ✓
```

---

## Icon System

### Icon Sizes
```
xs: w-3 h-3 (12px)
sm: w-4 h-4 (16px)
md: w-5 h-5 (20px)
lg: w-6 h-6 (24px)
xl: w-8 h-8 (32px)
2xl: w-10 h-10 (40px)
```

### Icon Colors
```
text-orange-500 (accent)
text-blue-500 (primary)
text-white (light)
text-gray-400 (muted)
```

### Icon Animations
```
Hover Scale: scale-110
Hover Rotate: rotate-5 or rotate-180
Transition: duration-300
```

---

## Layout Patterns

### Hero Section
```
min-h-screen
bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900
pt-20 (top padding for navbar)
flex items-center
```

### Content Section
```
py-24 (vertical padding)
bg-gradient-to-b from-white to-gray-50
container mx-auto px-4 lg:px-8
```

### Grid Layout
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

### Flex Layout
```
flex flex-col lg:flex-row items-center gap-12
```

---

## Best Practices

### 1. Color Usage
- Use orange for CTAs and hover states
- Use blue for secondary elements
- Use white/gray for text and backgrounds
- Maintain sufficient contrast (WCAG AA minimum)

### 2. Typography
- Use Inter font family
- Maintain consistent heading hierarchy
- Use appropriate font weights (400, 600, 700)
- Ensure readable line heights (1.4-1.6)

### 3. Spacing
- Use consistent spacing scale
- Maintain visual rhythm
- Use whitespace strategically
- Align elements to grid

### 4. Animations
- Keep animations smooth (60fps)
- Use appropriate durations (0.3-0.8s)
- Avoid excessive animations
- Respect prefers-reduced-motion

### 5. Responsiveness
- Design mobile-first
- Test on actual devices
- Use appropriate breakpoints
- Ensure touch-friendly targets (44px minimum)

---

## Component Checklist

### Before Shipping
- [ ] Colors match design system
- [ ] Typography follows hierarchy
- [ ] Spacing is consistent
- [ ] Animations are smooth
- [ ] Responsive on all breakpoints
- [ ] Accessibility standards met
- [ ] No console errors
- [ ] Performance optimized

---

**Last Updated**: May 26, 2026
**Version**: 1.0
**Status**: Production Ready
