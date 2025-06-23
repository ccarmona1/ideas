# React Quiz App - AI Agent Instructions

## Overview

React + TypeScript + Vite interactive learning app with multiple-choice questions, simplified drag system, and responsive design.

## Key Features

- **Global scroll** works everywhere (never blocked)
- **Simple drag system** on `SimpleDragHint` components
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
    │   └── Course.tsx     # State management & transitions
    ├── question/          # Question & explanation display
    └── common/            # Shared components (SimpleDragHint)
```

## State Flow

1. **Course List** → 2. **Question** → 3. **Answer Selection**
   - **Correct** → Next Question (auto scroll)
   - **Incorrect** → Explanation → Next Question (auto scroll)
   - **Skip** → Requeue Question (auto scroll)

## SimpleDragHint System

### Simple and Direct Implementation

The new `SimpleDragHint` component is a self-contained drag/click handler that:

1. **Detects drag vs click** internally
2. **Handles all pointer/touch events** within the component
3. **Provides visual feedback** during drag
4. **Drags parent container** for card-swipe effect
5. **Executes actions** on drag completion or click

### Key Features

- **15px threshold**: Movement must exceed this to be considered a drag
- **80px action threshold**: Upward drag must exceed this to execute action
- **Downward resistance**: 0.4x resistance for downward movement
- **Click fallback**: If no drag occurs, treats as click
- **Visual feedback**: Opacity fade and transform during drag
- **Parent synchronization**: Drags entire card/container in sync
- **Touch action**: `none` only on the specific element
- **Spring animation**: Smooth bounce-back when drag ends

### Usage

```typescript
<SimpleDragHint
  text="Arrastra o haz click aquí para continuar"
  onAction={() => executeAction()}
  canDrag={true}
  onDragStart={() => handleContainerDragStart()}
  onDragMove={(deltaY, opacity) => handleContainerDragMove(deltaY, opacity)}
  onDragEnd={() => handleContainerDragEnd()}
/>
```

### Configuration

```typescript
const DRAG_THRESHOLD = 15; // Minimum movement to start drag
const ACTION_THRESHOLD = 80; // Minimum upward movement to execute
const DOWNWARD_RESISTANCE = 0.4; // Resistance for downward movement
```

## Critical CSS Rules

### Scroll (NEVER BLOCK)

```css
/* ✅ ALLOW scroll everywhere */
.question-container,
.course-question-box,
.option-btn {
  touch-action: auto; /* Never 'none' except on drag elements */
}
```

### Drag (SPECIFIC ELEMENTS ONLY)

```css
/* ✅ CAPTURE drag only on SimpleDragHint */
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
- **Simplified logic** without complex drag hooks
- **Auto scroll** on every state change
- **Question queue** with skip reordering

### SimpleDragHint.tsx

- **Self-contained** drag and click handling
- **Pointer capture** for reliable drag tracking
- **Visual feedback** with transform and opacity
- **Keyboard accessibility** (Enter/Space)
- **Touch-optimized** for mobile devices

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

interface SimpleDragHintProps {
  text: string;
  onAction: () => void;
  canDrag?: boolean;
}
```

## Prohibited Changes

- **Never block scroll**: No `overflow-y: auto` on main containers
- **Never remove auto-scroll**: Must scroll-to-top on transitions
- **Never change touch-action rules**: Critical for drag/scroll separation
- **Never force card styles on mobile**: Responsive design philosophy

## Common Issues & Solutions

1. **Scroll blocked**: Check `touch-action: auto` and remove `overflow-y` restrictions
2. **Drag not working**: Verify `canDrag` is `true` and `onAction` is provided
3. **Auto-scroll missing**: Verify `scrollToTop()` called in all state transitions
4. **Mobile card styles**: Should be flat (transparent background, no shadows)
5. **Click not working**: Check that `onAction` function is properly defined
6. **Drag too sensitive**: Adjust `DRAG_THRESHOLD` and `ACTION_THRESHOLD` values

## System Requirements

### State Management

```typescript
// ✅ CORRECT - Use canDrag state for enabling/disabling
const [canDrag, setCanDrag] = useState(false);

// ✅ CORRECT - Set canDrag based on question state
const handleDragStart = useCallback((selectedOption, isCorrect) => {
  const shouldAllowDrag =
    (selectedOption !== undefined && !isCorrect) ||
    selectedOption === undefined;
  setCanDrag(shouldAllowDrag);
}, []);
```

### Parent Container Synchronization

The drag system now provides a seamless "card swipe" experience:

1. **Unified movement**: Both `SimpleDragHint` and parent container move together
2. **Synchronized opacity**: Opacity changes apply to both elements
3. **Consistent easing**: Both use the same spring-back animation
4. **Drag state sharing**: Container receives drag state via callbacks

```typescript
// In parent component (Course.tsx)
const [containerDragY, setContainerDragY] = useState(0);
const [containerOpacity, setContainerOpacity] = useState(1);
const [isContainerDragging, setIsContainerDragging] = useState(false);

const handleContainerDragStart = () => setIsContainerDragging(true);
const handleContainerDragMove = (deltaY: number, opacity: number) => {
  setContainerDragY(deltaY);
  setContainerOpacity(opacity);
};
const handleContainerDragEnd = () => {
  setIsContainerDragging(false);
  setContainerDragY(0);
  setContainerOpacity(1);
};

// Apply to container
<div
  className={`course-question-box ${isContainerDragging ? 'dragging' : ''}`}
  style={{
    transform: isContainerDragging ? `translateY(${containerDragY}px)` : 'none',
    opacity: isContainerDragging ? containerOpacity : 1,
    transition: isContainerDragging ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }}
>
```

### Flow Requirements

1. **Question loads** → `canDrag = false` (initial state, cleaned from previous question)
2. **User selects wrong answer** → `handleDragStart()` triggered → `canDrag = true`
3. **User skips question** → No automatic drag state change (prevents phantom selections)
4. **User selects correct answer** → `handleDragStart()` triggered → `canDrag = false`
5. **Explanation shows** → `canDrag = true` (to allow continuing)
6. **Mode changes** → State completely cleared to prevent phantom selections

### State Management Improvements

**Prevents phantom selections by:**

- Only calling `onDragStart` when user actually selects an option (not on component mount)
- Clearing `lastQuestionState` on all transitions (correct, skip, explanation → next)
- Resetting `canDrag` to `false` on question changes
- Cleaning drag state when new questions load

**Version**: 4.1 - Fixed Phantom Selection Bug
