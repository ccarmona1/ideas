# React Quiz App - AI Agent Instructions

## Overview

React + TypeScript + Vite interactive learning app with multiple-choice questions, vertical### Two-Phase Drag System

1. **Touch Detection**: Touch/click starts tracking but doesn't prevent scroll
2. **Movement Threshold**: 25px movement required to enter "real drag" mode
3. **Execution Threshold**: 300px upward movement required to execute action
4. **Click vs Drag**: Smart detection prevents click events during drag operations navigation, and responsive design.

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

- **Two-phase drag detection**: 25px threshold to start, 300px threshold to execute
- **Vertical drag with high resistance** for downward movement (0.1x)
- **Opacity fade** during drag (starts at -100px, full fade at -200px)
- **Scroll prevention** during active drag only
- **Mobile optimization**: Reduced thresholds (-220px execution threshold)

### DragHint.tsx

- **Interactive drag target** with touch-action: none
- **Click vs Drag separation** prevents accidental triggers
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

## Enhanced Drag Configuration

### Two-Phase Drag System

1. **Immediate Response**: Touch/click immediately starts drag state
2. **Visual Threshold**: 25px movement required for visual feedback
3. **Execution Threshold**: 300px upward movement required to execute action

### Drag Configuration Values

```typescript
const DRAG_CONFIG = {
  SWIPE_THRESHOLD: -300, // Execution threshold (desktop)
  DRAG_START_THRESHOLD: 25, // Minimum movement to start drag (increased)
  DOWNWARD_RESISTANCE: 0.1, // High resistance for downward movement
  OPACITY_FADE_START: -100, // Start fading opacity
  OPACITY_FADE_END: -200, // Full opacity fade
};
```

### Mobile Optimizations

- **Reduced execution threshold**: -220px (vs -300px on desktop)
- **Same start threshold**: 25px (consistent across devices)
- **Enhanced touch handling**: Prevents accidental triggers

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
5. **Drag not working**: Verify `useDragGesture({ canDrag: canDrag })` uses dynamic state, not `canDrag: true`
6. **Drag too sensitive**: Check DRAG_START_THRESHOLD (25px) and SWIPE_THRESHOLD (-300px) values
7. **Accidental triggers**: Ensure visual feedback only starts after 25px movement
8. **Second click required**: Check that drag state activates immediately on first touch
9. **Click vs Drag conflicts**: Ensure click events are cancelled when drag is detected

## Critical Drag System Requirements

### State Management

```typescript
// ✅ CORRECT - Use dynamic canDrag state
const [canDrag, setCanDrag] = useState(false);

const { dragHandlers } = useDragGesture({
  canDrag: canDrag, // ❌ NOT canDrag: true
  onSwipeUp: executeAction,
});

// ✅ CORRECT - Set canDrag based on question state
const handleDragStart = useCallback((selectedOption, isCorrect) => {
  const shouldAllowDrag =
    (selectedOption !== undefined && !isCorrect) ||
    selectedOption === undefined;
  setCanDrag(shouldAllowDrag);
}, []);
```

### Flow Requirements

1. **Question loads** → `canDrag = false` (initial state)
2. **User selects wrong answer** → `handleDragStart()` → `canDrag = true`
3. **User skips question** → `handleDragStart()` → `canDrag = true`
4. **User selects correct answer** → `handleDragStart()` → `canDrag = false`
5. **Explanation shows** → `canDrag = true` (to allow continuing)
6. **Mode changes** → Only explanation/completed modes override canDrag

**Version**: 3.3 - Fixed Click vs Drag Conflicts & Improved Threshold Detection
