Design Review Results: Flight Prediction Engine - All Pages
Review Date: February 2, 2026
Routes Reviewed: All pages (Home, Features, Collaborators, History, History by Lote)
Focus Areas: Visual Design (typography, spacing, fonts), Micro-interactions/Motion, Consistency

Summary
The Flight Prediction Engine demonstrates a solid foundation with consistent use of design tokens and a cohesive color palette. However, there are significant opportunities to enhance the typography hierarchy, standardize spacing patterns, enrich micro-interactions, and improve cross-page consistency. The application currently uses only one font family (Lato) despite having Merriweather and Roboto Mono defined in the theme. Typography scale lacks clear hierarchy, spacing patterns are inconsistent with mixed utilities, and micro-interactions are underutilized in many components.

Typography & Font Recommendations
Recommended Font Strategy
Based on your design system and brand aesthetic, I recommend implementing a three-tier font hierarchy:

Primary Font (Body & UI): Keep Lato for interface elements, labels, and body text

Why: Clean, professional, excellent readability for data-heavy interfaces
Usage: Buttons, forms, navigation, data cards, small text
Display Font (Headlines): Use Merriweather (already defined!) for large headings

Why: Creates strong visual hierarchy, adds sophistication and authority
Usage: H1, H2, page titles like "Elevating Flight Intelligence", section headers
Implementation: The font is already loaded in your layout.tsx as geistSans but Merriweather is defined in CSS
Monospace Font (Data/Code): Use Roboto Mono for technical data points

Why: Perfect for displaying flight codes, timestamps, IDs, probabilities
Usage: Airport codes (ORD, MEX), flight IDs (#86efbe61f), delay percentages (65%)
Implementation Example
/_ Add to globals.css _/
@layer utilities {
@utility heading-display {
font-family: var(--font-serif);
font-weight: 700;
letter-spacing: -0.02em;
}

@utility text-mono-data {
font-family: var(--font-mono);
font-variant-numeric: tabular-nums;
letter-spacing: -0.01em;
}
}
Usage:

<h1 className="heading-display text-5xl">History Predictions</h1>
<span className="text-mono-data">ORD → MEX</span>
Issues
#	Issue	Criticality	Category	Location
1	No font hierarchy - only Lato used despite Merriweather & Roboto Mono being defined	🟠 High	Visual Design	frontend/app/globals.css:43-49, frontend/app/layout.tsx:14-22
2	Inconsistent font size scale - mixing px values (8px, 10px, 18px) with no clear system	🟡 Medium	Visual Design	Across all pages - typography inspection shows 8px, 10px, 12px, 14px, 16px, 18px
3	Mixed spacing utilities - both space-y and gap used interchangeably without pattern	🟡 Medium	Visual Design	frontend/src/modules/shared/components/section-header.tsx:13-38
4	Inconsistent border radius values (40px, 3xl, md, full) across card components	🟡 Medium	Consistency	frontend/src/modules/collaborators/components/collaborator-card.tsx:28, others vary
5	Letter spacing lacks standardization - varies from -0.45px to 1px to normal	⚪ Low	Visual Design	Typography analysis shows inconsistent tracking across headings
6	Line height ratios inconsistent - some 1.1, some 1.25, some using pixel values	⚪ Low	Visual Design	frontend/src/modules/shared/components/section-header.tsx:76 uses leading-[1.1]
7	Airport codes and technical data not using monospace font for better readability	🟡 Medium	Visual Design	frontend/app/history/page.tsx - cards show ORD, MEX, etc. in regular Lato
8	Section header component uses hardcoded size variants instead of typography utilities	🟡 Medium	Consistency	frontend/src/modules/shared/components/section-header.tsx:13-38
9	Missing hover state transitions on collaborator card images	🟡 Medium	Micro-interactions	frontend/src/modules/collaborators/components/collaborator-card.tsx:34-42
10	No focus-visible indicators on card-level interactive elements	🟠 High	Micro-interactions	frontend/src/modules/collaborators/components/collaborator-card.tsx:28
11	Button transitions use transition-all which can cause performance issues	🟡 Medium	Micro-interactions	frontend/components/ui/button.tsx:8
12	Loading states lack skeleton screens or progressive loading animations	🟡 Medium	Micro-interactions	frontend/app/history/byLote/page.tsx shows basic spinner
13	Header animation uses experimental animation-timeline which has limited browser support	⚪ Low	Micro-interactions	frontend/src/modules/shared/components/header-page.tsx:10-13
14	Inconsistent animation durations (500ms, 700ms, 1000ms) without a defined scale	⚪ Low	Consistency	frontend/src/modules/features/components/features-hero.tsx:15-36
15	Card hover effects inconsistent - some have scale, some have border changes only	🟡 Medium	Consistency	Compare collaborator cards vs history cards
16	Missing micro-interactions on form inputs (no floating labels, no input feedback)	🟡 Medium	Micro-interactions	Homepage prediction sidebar forms
17	Scrollbar styling only defined for custom-scrollbar class, not applied globally	⚪ Low	Consistency	frontend/app/globals.css:196-210
18	Inconsistent padding scale - using p-8, px-4, py-1.5, px-6 without clear system	🟡 Medium	Visual Design	Various components use different padding values
19	Badge component uppercase tracking (1px) doesn't match other small text tracking	⚪ Low	Visual Design	frontend/src/modules/features/components/features-hero.tsx:18
20	Footer uses extremely small text (10px) with bold weight, reducing readability	🟡 Medium	Visual Design	frontend/src/modules/shared/components/footer-page.tsx:19-26
21	Hero section gradients use vw units causing inconsistent sizing across viewports	⚪ Low	Visual Design	frontend/src/modules/features/components/features-hero.tsx:9-10
22	No stagger animation timing for list items in prediction cards	⚪ Low	Micro-interactions	History pages load all cards simultaneously
23	SectionHeader component size variants hardcode multiple properties instead of using design tokens	🟡 Medium	Consistency	frontend/src/modules/shared/components/section-header.tsx:13-38
24	Card borders use border-border but some use border-primary/30 inconsistently	⚪ Low	Consistency	frontend/src/modules/collaborators/components/collaborator-card.tsx:28
25	Collaborator card decorative backgrounds have inconsistent opacity (5%, 10%, 20%)	⚪ Low	Visual Design	frontend/src/modules/collaborators/components/collaborator-card.tsx:29-33
Criticality Legend
🔴 Critical: Breaks functionality or violates accessibility standards
🟠 High: Significantly impacts user experience or design quality
🟡 Medium: Noticeable issue that should be addressed
⚪ Low: Nice-to-have improvement
Detailed Recommendations
1. Typography System Overhaul
Current State: Single font family (Lato) used for everything, no hierarchy

Recommended Changes:

Headlines (H1-H2): Switch to Merriweather for visual impact

<h1 className="font-serif text-5xl font-bold tracking-tight">
  History Predictions
</h1>
Technical Data: Use Roboto Mono for codes, IDs, numbers

<span className="font-mono text-sm tracking-tight">ORD → MEX</span>
<span className="font-mono font-semibold tabular-nums">65%</span>
Body & UI: Keep Lato for everything else (current usage)

Typography Scale (create utilities):

@layer utilities {
/_ Display headings _/
@utility text-display-2xl { font-size: 4.5rem; line-height: 1; }
@utility text-display-xl { font-size: 3.75rem; line-height: 1; }
@utility text-display-lg { font-size: 3rem; line-height: 1.1; }
@utility text-display-md { font-size: 2.25rem; line-height: 1.2; }

/_ Body text _/
@utility text-body-lg { font-size: 1.125rem; line-height: 1.75; }
@utility text-body-md { font-size: 1rem; line-height: 1.5; }
@utility text-body-sm { font-size: 0.875rem; line-height: 1.5; }

/_ Labels & captions _/
@utility text-label-lg { font-size: 0.875rem; font-weight: 600; line-height: 1.25; }
@utility text-label-md { font-size: 0.75rem; font-weight: 600; line-height: 1.25; }
@utility text-label-sm { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
} 2. Spacing System Standardization
Current Issue: Mixed use of space-y, gap, and arbitrary padding values

Recommended System:

// Card spacing standard
const cardSpacingPatterns = {
compact: "p-4 space-y-3", // Small cards
default: "p-6 space-y-4", // Most cards
comfortable: "p-8 space-y-6" // Large feature cards
};

// Section spacing standard
const sectionSpacing = {
tight: "space-y-8",
default: "space-y-12",
loose: "space-y-16 md:space-y-24"
};
Apply consistently:

All data cards: p-6 space-y-4
Collaborator cards: p-6 space-y-5 (currently p-8 space-y-6)
Page sections: space-y-12 between major sections 3. Border Radius Standardization
Create semantic radius scale:

/_ In globals.css - already partially there _/
--radius-xs: 0.375rem; /_ 6px - badges, tags _/
--radius-sm: 0.5rem; /_ 8px - buttons, inputs _/
--radius-md: 0.75rem; /_ 12px - cards _/
--radius-lg: 1rem; /_ 16px - prominent cards _/
--radius-xl: 1.5rem; /_ 24px - hero cards _/
--radius-2xl: 2rem; /_ 32px - feature showcases _/
Apply pattern:

Buttons: rounded-sm (8px)
Input fields: rounded-sm (8px)
Standard cards: rounded-lg (16px)
Collaborator cards: rounded-xl (24px)
Avatar images: rounded-2xl (32px) 4. Micro-interaction Enhancements
A. Card Hover States (unified pattern):

// Apply to ALL cards
className="group transition-all duration-300 ease-out
hover:shadow-lg hover:-translate-y-1 hover:border-primary/40"
B. Button Transitions (performance optimized):

// Replace transition-all with specific properties
className="transition-[background-color,border-color,transform] duration-200"
C. Loading States (add progressive animation):

// For history cards loading

<div className="grid gap-4 animate-in fade-in duration-300 slide-in-from-bottom-2"
     style={{ animationDelay: `${index * 50}ms` }}>
  {/* Card content */}
</div>
D. Focus States (accessibility enhancement):

// Add to all interactive cards
className="focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2"
E. Input Micro-interactions:

<input className="transition-all duration-200
  focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,168,232,0.1)]
  invalid:border-destructive invalid:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]" /> 5. Animation Timing Standards
Define scale:

const animationDurations = {
instant: 100, // Micro-feedback
fast: 200, // Buttons, links
normal: 300, // Cards, modals
slow: 500, // Page transitions
slower: 700 // Hero animations
};
Replace current ad-hoc durations:

Change duration-500 → duration-300 for card hovers
Change duration-700 → duration-300 for fade-ins
Keep duration-500 only for page-level transitions 6. Consistency Quick Wins
A. Standardize all section headers:

// Update SectionHeader to use typography utilities instead of size variants
<SectionHeader
title="Our"
accentText="Collaborators"
className="text-display-md" // Use utility instead of size prop
/>
B. Unified card component: Create a base <Card> wrapper that all cards extend:

<Card variant="default" hover="lift">
  {/* Card content */}
</Card>
C. Global scrollbar styling:

/_ Apply to all scrollable containers _/

- {
  scrollbar-width: thin;
  scrollbar-color: var(--primary) transparent;
  }

\*::-webkit-scrollbar {
width: 6px;
height: 6px;
}

\*::-webkit-scrollbar-thumb {
background: var(--primary);
border-radius: 9999px;
}
Visual Examples for Key Improvements
Before/After: Typography Hierarchy
Before (Current):

<h1 className="text-3xl font-bold">History Predictions</h1>
<span>ORD</span> → <span>MEX</span>
After (Recommended):

<h1 className="font-serif text-display-md">History Predictions</h1>
<span className="font-mono text-lg font-semibold">ORD</span> 
<span className="text-muted-foreground">→</span> 
<span className="font-mono text-lg font-semibold">MEX</span>
Before/After: Card Interactions
Before (Collaborator Card):

<div className="group ... transition-all duration-500 hover:border-primary/30">
  <Image className="rounded-3xl" ... />
</div>
After (Enhanced):

<div className="group ... transition-[transform,border-color,box-shadow] duration-300
     hover:border-primary/40 hover:shadow-lg hover:-translate-y-1
     focus-within:ring-2 focus-within:ring-primary/50">
  <Image className="rounded-2xl transition-transform duration-300 
                   group-hover:scale-105" ... />
</div>
Priority Implementation Order
Phase 1 - High Impact, Low Effort (Week 1)
Add Merriweather to large headings (H1, H2)
Add Roboto Mono to all technical data (airport codes, IDs, percentages)
Standardize button transition properties
Add focus-visible states to all interactive cards
Unify card border-radius to defined scale
Phase 2 - Medium Impact, Medium Effort (Week 2)
Create typography utility classes and refactor components
Standardize spacing scale across all cards
Enhance hover states on all interactive elements
Add staggered loading animations to list pages
Create unified Card base component
Phase 3 - Refinement (Week 3)
Implement progressive loading states with skeletons
Add input micro-interactions (floating labels, validation feedback)
Apply global scrollbar styling
Standardize animation durations across all components
Refactor SectionHeader to use typography utilities
Font Loading Optimization
Since you're already loading Geist Sans and Geist Mono in layout.tsx, consider:

// Add Merriweather for display headings
import { Geist, Geist_Mono, Merriweather } from "next/font/google";

const merriweather = Merriweather({
weight: ['700', '900'],
subsets: ['latin'],
variable: '--font-serif',
});

// Update body className

<body className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ...`}>
Next Steps
Immediate: Implement Phase 1 changes (typography hierarchy, focus states, border-radius)
Week 2: Create typography utility system and refactor 2-3 pages
Week 3: Roll out unified card component and animation standards
Ongoing: Update design system documentation with new standards
Design System Documentation Recommendations
Create a living style guide documenting:

Typography scale with examples
Spacing system with use cases
Animation timing standards
Component interaction patterns
Accessibility patterns (focus, hover, active states)
This will ensure consistency as the application grows and new team members onboard.
