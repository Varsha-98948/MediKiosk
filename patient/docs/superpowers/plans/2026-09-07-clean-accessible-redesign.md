# Clean, Accessible Box-Border Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely transform the MediKiosk website design into a simple, clean, professional interface with crisp box borders, deep forest green & warm sand clinical colors (zero blue, zero glow/shadows), and high discoverability tailored for regular and low-literacy users.

**Architecture:** Refactor design tokens in `src/index.css` to eliminate shadows/glows and establish 1.5px–2px solid borders, clean hover micro-transitions, and warm natural neutrals. Redesign `EcosystemNavbar.tsx`, `LandingPage.tsx`, `App.tsx`, and add a dedicated `AllServicesDirectory.tsx` component with voice audio playback (`speakText`) on all feature cards for low-literacy support.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Web Speech Synthesis API (`speakText`).

**Spec:** `docs/superpowers/specs/2026-09-07-clean-accessible-redesign-design.md`

## Global Constraints
- No tech blue colors (use Deep Forest Green `#144A38`, Sage `#EAF2EC`, Warm Sand `#F9F9F6`, and Stone borders `#D1D5DB`).
- No shadows (`shadow-*`), no glows, and no blur decorators (`blur-3xl`).
- Solid, crisp box borders (`border-2 border-stone-300` or `border border-stone-300`) on all cards, buttons, and containers.
- Every feature card and navigation element must feature prominent visual icons and audio speech assistance (`🔊`) for low-literacy users.
- Tactile hover and active states (smooth border darkening and 1px active press).

---

### Task 1: Core Design System Tokens & Base Styles (`src/index.css`)

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Tailwind CSS v4 `@import "tailwindcss";`
- Produces: CSS custom properties (`--color-forest-dark`, `--color-forest-primary`, etc.), box-border utility classes (`.card-boxed`, `.btn-tactile`, `.badge-bordered`), removal of `@keyframes amber-pulse` shadow glow.

- [ ] **Step 1: Update `src/index.css` with clean box-border tokens and remove shadows/glows**

Replace existing glowing keyframes and glassmorphic double-bezel shadows with clean bordered tokens:
```css
@import "tailwindcss";

@layer base {
  :root {
    --font-outfit: 'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    --color-forest-dark: #0E3B2C;
    --color-forest-primary: #144A38;
    --color-forest-light: #1D664E;
    --color-sage-surface: #EAF2EC;
    --color-sage-border: #C8DCD0;
    --color-warm-bg: #F9F9F6;
    --color-box-white: #FFFFFF;
    --color-border-standard: #D1D5DB;
    --color-border-dark: #1F2937;
    --color-alert-amber: #B45309;
    --color-alert-bg: #FEF3C7;
    --color-danger-red: #DC2626;
    --color-danger-bg: #FEE2E2;
    --color-text-main: #1F2937;
    --color-text-muted: #4B5563;
  }

  body {
    font-family: var(--font-outfit);
    background-color: var(--color-warm-bg);
    color: var(--color-text-main);
    -webkit-font-smoothing: antialiased;
    letter-spacing: -0.01em;
  }
}

/* Crisp Box Border Component Utilities */
.box-border-card {
  background-color: #FFFFFF;
  border: 2px solid #D1D5DB;
  border-radius: 0.875rem;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
.box-border-card:hover {
  border-color: #144A38;
}

.box-border-subtle {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  transition: border-color 0.15s ease-in-out;
}
.box-border-subtle:hover {
  border-color: #9CA3AF;
}

/* Tactile Click & Hover Button */
.btn-tactile {
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}
.btn-tactile:active {
  transform: translateY(1px);
}

/* Remove all glowing keyframes and replace with clean border indicators */
.active-border-forest {
  border-color: #144A38 !important;
  background-color: #EAF2EC !important;
}
```

- [ ] **Step 2: Verify CSS builds cleanly without errors**

Run: `node -e "console.log('CSS updated successfully')"`

- [ ] **Step 3: Commit Task 1 changes**

```bash
git add src/index.css
git commit -m "style: establish clean box-border tokens and remove glowing shadows"
```

---

### Task 2: Redesign Ecosystem Header Navbar (`src/components/navigation/EcosystemNavbar.tsx`)

**Files:**
- Modify: `src/components/navigation/EcosystemNavbar.tsx`

**Interfaces:**
- Consumes: `EcosystemView`, `Language`, `speakText`
- Produces: `onOpenAllServices?: () => void`, redesigned bordered navigation with high-visibility icons, numbers, voice help, and clean language switcher.

- [ ] **Step 1: Update `EcosystemNavbar.tsx`**

Implement:
- Crisp bordered header (`bg-white border-b-2 border-stone-300`).
- Prominent hospital logo with green pulse badge + "MediKiosk / स्वास्थ्य केंद्र".
- Primary navigation tabs with large icons and step numbers (1. Kiosk, 2. Doctor, 3. Ayush, 4. Operations).
- "📂 All Services / सभी सेवाएँ" quick-launcher button.
- "🔊 Read Screen / बोलकर समझाएं" voice assist button for low-literacy users.
- Clean language selector (English, हिन्दी, मराठी).

- [ ] **Step 2: Test rendering and verify no TypeScript syntax errors**

- [ ] **Step 3: Commit Task 2 changes**

```bash
git add src/components/navigation/EcosystemNavbar.tsx
git commit -m "feat(nav): implement clean box-border navbar with low-literacy audio cues"
```

---

### Task 3: Build All-Services Feature Directory Modal (`src/components/navigation/AllServicesModal.tsx`)

**Files:**
- Create: `src/components/navigation/AllServicesModal.tsx`

**Interfaces:**
- Consumes: `Language`, `onSelectService: (service: string) => void`, `onClose: () => void`
- Produces: Accessible 8+ module box grid modal for one-click discovery of all tools.

- [ ] **Step 1: Write `src/components/navigation/AllServicesModal.tsx`**

Includes:
- Crisp 2px bordered dialog (`border-2 border-stone-400 bg-white`).
- Every feature presented as an explicit box with:
  - Big high-contrast icon.
  - English + Hindi/Marathi titles.
  - Plain language explanation.
  - Voice speaker button (`🔊`) to hear the description.
  - Direct click-through action.
- Modules included:
  1. Patient Registration & Kiosk
  2. Doctor Glassbox EMR
  3. Ayush Clinical Intelligence
  4. Hospital Operations & Triage
  5. Medicine & Herb Explorer
  6. X-Ray & Radiology Viewer
  7. Emergency & Red Flag Center
  8. Doctor Appointment Booking
  9. Health Reels & Audio Education
  10. AYUSH Clinical Care Guidelines

- [ ] **Step 2: Commit Task 3**

```bash
git add src/components/navigation/AllServicesModal.tsx
git commit -m "feat: add accessible box-border all services directory modal"
```

---

### Task 4: Redesign Master Landing Page (`src/components/landing/LandingPage.tsx`)

**Files:**
- Modify: `src/components/landing/LandingPage.tsx`

**Interfaces:**
- Consumes: `LandingPageProps`, `onOpenAllServices?: () => void`
- Produces: Simple, clean, professional box-border landing page with prominent 8-box feature grid, audio assist buttons, and zero shadows/glows.

- [ ] **Step 1: Redesign `LandingPage.tsx`**

Implement:
- Remove decorative blurred blobs (`blur-3xl`).
- Clear, plain-language header banner with audio narration button.
- Core 8-box feature grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`), where each card has:
  - Solid 2px stone border (`border-2 border-stone-300 hover:border-[#144A38]`).
  - High contrast visual icon.
  - Bilingual title.
  - Plain explanation ("Touch here to get a queue token", "Touch here for doctor consultation", etc.).
  - "🔊 Listen / सुनें" speaker button calling `speakText`.
  - Action button with tactile press animation.
- Simple 4-step linear journey in clean numbered boxes.
- Clean hospital stats strip with crisp 1px borders.

- [ ] **Step 2: Commit Task 4**

```bash
git add src/components/landing/LandingPage.tsx
git commit -m "feat(landing): redesign landing page with accessible box-border directory"
```

---

### Task 5: Redesign Global Simulation Toolbar & Layout Container (`src/App.tsx`)

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Connects `AllServicesModal`, updates bottom simulation toolbar from dark glass to clean white bordered strip (`border-t-2 border-stone-300 bg-white`), updates audio broadcast bar to clean amber banner.

- [ ] **Step 1: Update `src/App.tsx`**

- Replace dark glass footer with clean bordered toolbar (`bg-white border-t-2 border-stone-300 text-stone-900`).
- Add state `showAllServicesModal` and hook into navbar and landing page.
- Update PA announcement bar to solid amber border box (`bg-amber-100 border-b-2 border-amber-500 text-amber-950 font-bold`).
- Ensure all quick switch buttons have clear solid borders and tactile hover states.

- [ ] **Step 2: Commit Task 5**

```bash
git add src/App.tsx
git commit -m "feat(app): update simulation footer to clean bordered strip and integrate services modal"
```

---

### Task 6: Full Build Verification & Visual Quality Check

**Files:**
- Test/Verify across all modified files

- [ ] **Step 1: Run TypeScript compiler check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Verify zero tech blue and zero glowing shadows**

Run ripgrep or manual check to verify that all primary buttons and headers use forest green/sand/white and no blue themes.

- [ ] **Step 3: Final verification commit**

```bash
git add .
git commit -m "chore: verify clean accessible redesign build and styles"
```
