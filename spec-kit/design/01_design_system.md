# Design Spec — Design System

**Theme:** Dark-first  
**Framework:** Tailwind CSS 4 with shadcn/ui  
**Color format:** OKLCH (Tailwind 4 requirement for `@theme` blocks)

---

## 1. Color Palette

### Brand Colors

| Token | Hex | OKLCH | Usage |
|---|---|---|---|
| `--primary` | `#3b82f6` | `oklch(0.623 0.214 259.8)` | Primary buttons, links, active states |
| `--primary-dark` | `#1e3a8a` | `oklch(0.352 0.156 264.1)` | Hero backgrounds, section fills |
| `--accent` | `#22d3ee` | `oklch(0.827 0.149 201.0)` | Highlights, badges, hover borders |
| `--accent-muted` | `#60a5fa` | `oklch(0.707 0.165 254.6)` | Secondary accents, icon fills |

### Background Colors

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#0a0e1a` | Page background (darkest) |
| `--bg-navy` | `#0f172a` | Card backgrounds, sidebar |
| `--bg-blue-900` | `#1e3a8a` | Section backgrounds |
| `--bg-card` | `rgba(30, 58, 138, 0.5)` | Glassmorphism cards with `backdrop-blur` |

### Text Colors

| Token | Hex | Usage |
|---|---|---|
| `--foreground` | `#ffffff` | Primary text on dark backgrounds |
| `--muted-foreground` | `#9ca3af` | Secondary text, placeholders, metadata |
| `--text-cyan` | `#22d3ee` | Accent text, links, highlights |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--success` | `#10b981` | Success states, "Available" badges |
| `--destructive` | `#ef4444` | Error states, delete actions |
| `--warning` | `#f59e0b` | Warning states, pending badges |
| `--info` | `#3b82f6` | Info states, "New" badges |

### Border Colors

| Token | Hex / Alpha | Usage |
|---|---|---|
| `--border` | `rgba(6, 182, 212, 0.2)` | Default card borders |
| `--border-hover` | `rgba(6, 182, 212, 0.5)` | Hovered card borders |
| `--border-focus` | `#22d3ee` | Focused input borders |

---

## 2. Typography

### Font Family
**Primary:** Inter (loaded via Google Fonts CDN)  
**Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`  
**Arabic:** Noto Sans Arabic (loaded via Google Fonts CDN, activated when `lang="ar"`)

```html
<!-- In client/index.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Class | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 12px | 16px | 400 | Captions, metadata, timestamps |
| `text-sm` | 14px | 20px | 400 | Body text (secondary), labels |
| `text-base` | 16px | 24px | 400 | Body text (primary) |
| `text-lg` | 18px | 28px | 500 | Sub-headings, card titles |
| `text-xl` | 20px | 28px | 600 | Section sub-headings |
| `text-2xl` | 24px | 32px | 700 | Page sub-headings |
| `text-3xl` | 30px | 36px | 700 | Page headings |
| `text-4xl` | 36px | 40px | 800 | Hero headings |
| `text-5xl` | 48px | 52px | 800 | Hero main headline |

---

## 3. Spacing System

Tailwind's default spacing scale is used throughout. Key values:

| Value | px | Common Usage |
|---|---|---|
| `1` | 4px | Icon gaps, tight spacing |
| `2` | 8px | Button padding (vertical) |
| `3` | 12px | Input padding |
| `4` | 16px | Card padding, section gaps |
| `6` | 24px | Component spacing |
| `8` | 32px | Section padding |
| `12` | 48px | Large section gaps |
| `16` | 64px | Page section padding |
| `24` | 96px | Hero padding |

---

## 4. Border Radius

| Class | Value | Usage |
|---|---|---|
| `rounded` | 4px | Small elements (badges, tags) |
| `rounded-md` | 6px | Buttons, inputs |
| `rounded-lg` | 8px | Cards, modals |
| `rounded-xl` | 12px | Large cards, panels |
| `rounded-2xl` | 16px | Feature cards, hero elements |
| `rounded-full` | 9999px | Avatars, pills, toggle buttons |

---

## 5. Shadows

| Class | Usage |
|---|---|
| `shadow-sm` | Subtle depth on cards |
| `shadow-md` | Dropdown menus, tooltips |
| `shadow-lg` | Modals, floating panels |
| `shadow-cyan-500/20` | Glow effect on primary buttons |
| `shadow-blue-500/30` | Glow effect on feature cards |

---

## 6. Component Specifications

### Buttons

**Primary Button**
```
Background: gradient from cyan-500 to blue-600
Text: white, font-semibold
Padding: px-6 py-2.5
Border radius: rounded-lg
Hover: brightness-110, shadow-cyan-500/30
Active: brightness-90
Disabled: opacity-50, cursor-not-allowed
```

**Outline Button**
```
Background: transparent
Border: 1px solid cyan-500/50
Text: cyan-400, font-medium
Padding: px-6 py-2.5
Hover: bg-cyan-500/10, border-cyan-500
```

**Destructive Button**
```
Background: red-600
Text: white
Hover: red-700
```

### Cards

**Standard Card**
```
Background: bg-blue-900/50 backdrop-blur-sm
Border: border border-cyan-500/20
Border radius: rounded-xl
Padding: p-6
Hover: border-cyan-500/50, shadow-lg shadow-cyan-500/10
Transition: all 300ms ease
```

**Feature Card** (solution pages, homepage)
```
Background: bg-gradient-to-br from-blue-900/60 to-navy/80
Border: border border-cyan-500/30
Padding: p-8
Hover: border-cyan-400/60, transform translateY(-4px)
```

### Form Inputs

**Text Input**
```
Background: bg-navy/80
Border: border border-cyan-500/30
Text: text-white placeholder:text-gray-500
Padding: px-4 py-3
Border radius: rounded-lg
Focus: border-cyan-400, ring-2 ring-cyan-400/20, outline-none
```

**Textarea**
Same as text input with `resize-y min-h-[120px]`.

**Select / Dropdown**
Same as text input with a chevron icon on the right.

**Error State**
```
Border: border-red-500
Focus: ring-red-500/20
Error text: text-red-400 text-sm mt-1
```

### Badges / Pills

**Available (green)**
```
bg-green-500/20 text-green-400 border border-green-500/30
px-2.5 py-0.5 rounded-full text-xs font-medium
```

**Pending (yellow)**
```
bg-yellow-500/20 text-yellow-400 border border-yellow-500/30
```

**Admin (red)**
```
bg-red-500/20 text-red-400 border border-red-500/30
```

**Public (cyan)**
```
bg-cyan-500/20 text-cyan-400 border border-cyan-500/30
```

### Navigation (Top Nav — Corporate)

```
Position: fixed top-0, full width, z-50
Background: bg-navy/95 backdrop-blur-md
Border bottom: border-b border-cyan-500/10
Height: h-16
Logo: left-aligned, text-white font-bold
Menu items: text-gray-300 hover:text-white transition
Active item: text-cyan-400
CTA button: Primary button style (Get Started)
Mobile: Hamburger icon, slide-in drawer from right
```

### Navigation (Sidebar — Internal Tools)

```
Width: 240px (desktop), collapsible to 64px
Background: bg-navy
Border right: border-r border-cyan-500/10
Logo: top, full width
Nav items: icon + label, text-gray-400 hover:text-white hover:bg-blue-900/50
Active item: text-cyan-400 bg-blue-900/80 border-r-2 border-cyan-400
Bottom: user avatar, name, logout button
```

---

## 7. Animations and Transitions

All interactive elements use `transition-all duration-300 ease-in-out` by default.

**Hover lift (cards):** `hover:-translate-y-1`  
**Fade in (page load):** `animate-fade-in` (custom keyframe: opacity 0→1, translateY 10px→0, 400ms)  
**Pulse (loading):** `animate-pulse` (Tailwind built-in)  
**Spin (loading spinner):** `animate-spin`  
**Slide in (drawer):** `translate-x-full → translate-x-0`, 300ms ease-out  
**Scale in (modal):** `scale-95 opacity-0 → scale-100 opacity-100`, 200ms ease-out

---

## 8. Responsive Breakpoints

| Breakpoint | Min Width | Layout Changes |
|---|---|---|
| `sm` | 640px | 2-column grids |
| `md` | 768px | Show sidebar, 3-column grids |
| `lg` | 1024px | Full desktop layout |
| `xl` | 1280px | Wider content areas |
| `2xl` | 1536px | Max content width cap |

**Max content width:** `max-w-7xl mx-auto` (1280px) for most pages.  
**Social platform feed:** `max-w-2xl` (672px) for the main feed column.

---

## 9. Dark/Light Theme

The application uses **dark theme by default** and does not currently offer a user-controlled light mode toggle. The `ThemeProvider` is set to `defaultTheme="dark"`.

All CSS variables in `client/src/index.css` are defined under the `.dark` selector. The `--background` variable resolves to `#0a0e1a` in dark mode.

---

*See `design/02_components.md` for the full shadcn/ui component usage guide.*
