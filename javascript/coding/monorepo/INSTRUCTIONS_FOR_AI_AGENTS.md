# React Quiz App - AI Agent Instructions

## Overview

React + TypeScript + Vite interactive learning app with multiple-choice questions, vertical drag navigation, and responsive design.

## Key Features

- **Global scroll** works everywhere (never blocked)
- **Vertical drag** only on `.drag-hint-interactive` elements
- **Auto scroll-to-top** on all state transitions
- **Responsive cards** (desktop only, mobile flat design)
- **Question explanations** for incorrect answers

## Architecture

```
src/
├── App.tsx                 # Router setup
├── main.tsx               # Entry point
├── index.css              # Global variables & base styles
├── types/index.ts         # TypeScript interfaces
└── features/components/
    ├── courses/           # Course selection
    ├── course/            # Main quiz logic
    │   ├── Course.tsx     # State management & transitions
    │   ├── useDragGesture.ts # Drag behavior hook
    │   └── dragConfig.ts  # Drag configuration
    ├── question/          # Question & explanation display
    └── common/            # Shared components (DragHint)
```

## State Flow

1. **Course List** → 2. **Question** → 3. **Answer Selection**
   - **Correct** → Next Question (auto scroll)
   - **Incorrect** → Explanation → Next Question (auto scroll)
   - **Skip** → Requeue Question (auto scroll)

## Critical CSS Rules

### Scroll (NEVER BLOCK)

```css
/* ✅ ALLOW scroll everywhere */
.question-container,
.course-question-box,
.option-btn {
  touch-action: auto; /* Never 'none' */
}

/* ✅ NO height/overflow restrictions */
html,
body {
  min-height: 100%; /* Not height: 100% */
  /* NO overflow-y: auto */
}
```

### Drag (SPECIFIC ELEMENTS ONLY)

```css
/* ✅ CAPTURE drag only here */
.drag-hint-interactive {
  touch-action: none; /* Only for drag hints */
}
```

### Responsive Design

```css
/* Desktop: Card design */
.course-question-box {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
}

/* Mobile: Flat design */
@media (max-width: 768px) {
  .course-question-box {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
  }
}
```

## Auto Scroll Implementation

```typescript
const scrollToTop = useCallback(() => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 10);
}, []);

// Called in ALL state transitions:
// - handleCorrect()
// - handleShowExplanation()
// - handleNextFromExplanation()
// - handleSkipQuestion()
```

## Key Components

### Course.tsx

- **Main state management** (questions, scoring, transitions)
- **Drag integration** via useDragGesture hook
- **Auto scroll** on every state change
- **Question queue** with skip reordering

### useDragGesture.ts

- **Vertical drag detection** with resistance
- **Threshold-based actions** (SWIPE_THRESHOLD: -180px)
- **Opacity fade** during drag
- **Scroll prevention** during active drag only

### DragHint.tsx

- **Interactive drag target** with touch-action: none
- **Keyboard accessibility** (Enter/Space)
- **Visual feedback** with hover states

## CSS Variables System

```css
:root {
  --color-primary: #2563eb;
  --color-success: #10b981;
  --color-incorrect: #6366f1;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --radius-md: 0.75rem;
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --transition-normal: 200ms ease-in-out;
}
```

## TypeScript Interfaces

```typescript
interface QuestionMetadata {
  question: string;
  options: string[];
  answer: string; // 'a'|'b'|'c'|'d'
  explanation: string;
  invalidOptions: Partial<Record<'a' | 'b' | 'c' | 'd', string>>;
}
```

## Prohibited Changes

- **Never block scroll**: No `overflow-y: auto` on main containers
- **Never remove auto-scroll**: Must scroll-to-top on transitions
- **Never change touch-action rules**: Critical for drag/scroll separation
- **Never force card styles on mobile**: Responsive design philosophy

## Common Issues

1. **Scroll blocked**: Check `touch-action: auto` and remove `overflow-y` restrictions
2. **Drag conflicts**: Ensure `touch-action: none` only on `.drag-hint-interactive`
3. **Auto-scroll missing**: Verify `scrollToTop()` called in all state transitions
4. **Mobile card styles**: Should be flat (transparent background, no shadows)

## Development Rules

- Use CSS variables for all colors/spacing
- Keep components focused (single responsibility)
- Maintain TypeScript strict typing
- Test scroll/drag on mobile devices
- Preserve accessibility features

**Version**: 2.0 - Simplified & Clean Codebase
