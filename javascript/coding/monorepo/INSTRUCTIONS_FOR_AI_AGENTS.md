# React Quiz App - AI Agent Instructions

## Overview

**React + TypeScript + Vite interactive quiz application** que permite a los usuarios responder preguntas de múltiple opción con un sistema de drag/click intuitivo y diseño totalmente responsivo. La aplicación maneja explicaciones detalladas para respuestas incorrectas y tiene un sistema de navegación suave con scroll automático.

## Key Features

- **Sistema de drag/click unificado** con SimpleDragHint para navegación intuitiva
- **Scroll global nunca bloqueado** - el usuario siempre puede hacer scroll
- **Auto scroll-to-top** en todas las transiciones de estado
- **Diseño responsivo completo** (tarjetas en desktop, flat en mobile)
- **Explicaciones detalladas** para respuestas incorrectas con razones específicas
- **Sistema de puntuación en tiempo real** con estadísticas completas
- **Reordenamiento de preguntas** saltadas al final de la cola
- **Prevención de phantom clicks** con sistema de estado robusto
- **Animaciones suaves** con spring easing y feedback visual

## Architecture

```
src/
├── App.tsx                 # Router setup (React Router)
├── main.tsx               # Entry point + React 18 StrictMode
├── index.css              # CSS Variables + base styles
├── types/index.ts         # TypeScript interfaces centralizadas
└── features/components/
    ├── courses/           # Course selection + data fetching
    │   ├── Courses.tsx    # Grid de cursos disponibles
    │   ├── getCourseHook.tsx  # Hook para fetch de preguntas
    │   └── getCoursesHook.tsx # Hook para fetch de cursos
    ├── course/            # Main quiz logic + state management
    │   ├── Course.tsx     # Componente principal del quiz
    │   └── Course.css     # Estilos del quiz + responsive design
    ├── question/          # Question + explanation display
    │   ├── Question.tsx   # Componente de pregunta
    │   ├── Question.css   # Estilos de opciones + animaciones
    │   ├── Explanation.tsx # Componente de explicación
    │   └── Explanation.css # Estilos de explicación
    └── common/            # Shared components
        ├── SimpleDragHint.tsx # Sistema unificado de drag/click
        └── DragHint.css       # Estilos del sistema de drag
```

## UI Structure & Flow

```
Course Container (main layout)
├── Header (unified, always visible, horizontal layout)
│   ├── Back Button → "Volver a cursos" (icono circular en mobile)
│   └── Scoreboard → Stats en tiempo real (✔ correctas ✖ incorrectas)
└── Question Box (draggable container with card swipe effect)
    ├── Question Component (multiple choice + skip option)
    ├── Explanation Component (wrong answer analysis)
    └── Completion Screen (final stats + accuracy)
```

## State Flow & Transitions

```
1. Course List → 2. Question → 3. Answer Selection
   ┌─ Correct Answer → Auto advance to next question (auto scroll)
   ├─ Incorrect Answer → Explanation screen → Next question (auto scroll)
   └─ Skip Question → Requeue at end → Next question (auto scroll)

Special Flows:
- Last Question → Completion Screen
- Skipped Questions → Return at end of queue
- All Questions Completed → Final statistics
```

## SimpleDragHint System (v5.0)

### Core Implementation

El `SimpleDragHint` es un componente autocontenido que maneja **toda la lógica de drag/click** internamente y proporciona **sincronización perfecta** con el contenedor padre para crear un efecto de "card swipe" unificado.

### Key Features & Thresholds

- **15px drag threshold**: Movimiento mínimo para considerar drag (no click)
- **80px action threshold**: Arrastre hacia arriba mínimo para ejecutar acción
- **0.4x downward resistance**: Resistencia reducida al arrastrar hacia abajo
- **Click fallback**: Si no hay drag, se trata como click normal
- **Visual feedback**: Transform + opacity sincronizados durante drag
- **Parent synchronization**: Mueve el contenedor padre en sincronía
- **Touch optimized**: `touch-action: none` solo en elementos específicos
- **Spring animation**: Animación de rebote suave (cubic-bezier)
- **Event isolation**: `preventDefault` + `stopPropagation` para evitar conflictos

### Usage Pattern

```typescript
// En el componente padre (Course.tsx)
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

// Aplicar al contenedor
<div
  className={`course-question-box ${isContainerDragging ? 'dragging' : ''}`}
  style={{
    transform: isContainerDragging ? `translateY(${containerDragY}px)` : 'none',
    opacity: isContainerDragging ? containerOpacity : 1,
    transition: isContainerDragging ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }}
>

// En el componente hijo
<SimpleDragHint
  text="Arrastra o haz click aquí para continuar"
  onAction={() => executeAction()}
  canDrag={true}
  onDragStart={handleContainerDragStart}
  onDragMove={handleContainerDragMove}
  onDragEnd={handleContainerDragEnd}
/>
```

## Critical CSS Rules & Touch Behavior

### Scroll (NEVER BLOCK)

```css
/* ✅ ALWAYS ALLOW scroll */
.question-container,
.course-question-box,
.option-btn,
.course-container {
  touch-action: auto; /* Nunca 'none' excepto en drag elements */
  overflow: visible; /* Nunca 'hidden' en contenedores principales */
}
```

### Drag (SPECIFIC ELEMENTS ONLY)

```css
/* ✅ CAPTURE drag solo en SimpleDragHint */
.drag-hint-interactive {
  touch-action: none; /* Solo para elementos drag */
  cursor: grab;
}

.drag-hint-interactive:active,
.dragging .drag-hint-interactive {
  cursor: grabbing;
}
```

### Responsive Design Philosophy

```css
/* Desktop: Card design with shadows and borders */
.course-question-box {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  border: 1px solid var(--color-gray-200);
  padding: var(--spacing-2xl);
}

/* Mobile: Flat design, no cards */
@media (max-width: 768px) {
  .course-question-box {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    border: none;
    padding: var(--spacing-lg) 0;
  }

  .course-back-button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 0;
  }

  .back-button-text {
    display: none; /* Solo mostrar icono en mobile */
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

// Llamado en TODAS las transiciones de estado:
// - handleCorrect() → Respuesta correcta
// - handleShowExplanation() → Mostrar explicación
// - handleNextFromExplanation() → Continuar desde explicación
// - handleSkipQuestion() → Saltar pregunta
```

## State Management & Phantom Click Prevention

### Main State Variables

```typescript
// Estado principal del quiz
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [correctCount, setCorrectCount] = useState(0);
const [incorrectCount, setIncorrectCount] = useState(0);
const [skippedCount, setSkippedCount] = useState(0);

// Sistema de navegación
const [currentViewMode, setCurrentViewMode] = useState<
  'question' | 'explanation' | 'completed'
>('question');
const [showingExplanation, setShowingExplanation] = useState(false);
const [questionTransition, setQuestionTransition] = useState<
  'entering' | 'exiting' | 'idle'
>('idle');

// Sistema de drag
const [canDrag, setCanDrag] = useState(false);
const [isProcessingAction, setIsProcessingAction] = useState(false);
const [lastQuestionState, setLastQuestionState] = useState<{
  hasSelectedOption: boolean;
  isCorrect: boolean;
  selectedOptionIndex: number;
} | null>(null);

// Visual drag del contenedor
const [containerDragY, setContainerDragY] = useState(0);
const [containerOpacity, setContainerOpacity] = useState(1);
const [isContainerDragging, setIsContainerDragging] = useState(false);
```

### Phantom Click Prevention System

**Problema resuelto**: Clicks en SimpleDragHint que automáticamente seleccionaban respuestas en la siguiente pregunta.

**Solución implementada**:

1. **Delay en transiciones**: 50ms delay en `handleNextFromExplanation()` para evitar propagación
2. **Event isolation**: `preventDefault()` + `stopPropagation()` en todos los eventos de SimpleDragHint
3. **Ready state**: Estado `isReady` con 100ms delay en Question.tsx antes de permitir selecciones
4. **State clearing**: Limpieza completa de `lastQuestionState` en todas las transiciones

```typescript
// En Course.tsx - Delay de transición
const handleNextFromExplanation = useCallback(() => {
  setTimeout(() => {
    setCurrentViewMode('question');
    setShowingExplanation(false);
    setExplanationData(null);
    setLastQuestionState(null);
    setCanDrag(false);
    // ... resto de la transición
  }, 50); // Delay para evitar phantom clicks
}, []);

// En Question.tsx - Ready state
const [isReady, setIsReady] = useState(false);

useEffect(() => {
  setSelectedOption(undefined);
  setAnsweredCorrectly(false);
  setIsReady(false);

  const timer = setTimeout(() => {
    setIsReady(true);
  }, 100);

  return () => clearTimeout(timer);
}, [question.question]);

const handleSelectOption = (index: number) => {
  if (!answeredCorrectly && !disabled && isReady) {
    // Solo permitir selección cuando isReady = true
  }
};
```

## Key Components Deep Dive

### Course.tsx - Main State Manager

**Responsibilities**:

- **State management**: Manejo completo del estado del quiz (preguntas, puntuación, navegación)
- **Question queue**: Cola de preguntas con reordenamiento de saltadas
- **Auto scroll**: Scroll-to-top en todas las transiciones
- **Drag coordination**: Sincronización del drag entre SimpleDragHint y contenedor
- **Unified header**: Header horizontal con back button y scoreboard
- **Responsive design**: Adaptación mobile con botón circular

**Key Methods**:

```typescript
handleCorrect(index: number) // Respuesta correcta → avanzar
handleIncorrect() // Incrementar contador de incorrectas
handleShowExplanation(question, selectedOption) // Mostrar explicación
handleNextFromExplanation() // Continuar desde explicación
handleSkipQuestion() // Saltar pregunta → reencolar al final
handleDragStart(selectedOption, isCorrect) // Configurar canDrag
executeAction() // Router central de acciones de drag/click
```

### SimpleDragHint.tsx - Unified Interaction System

**Self-contained drag/click handler que**:

- **Detecta drag vs click** internamente con thresholds precisos
- **Maneja eventos pointer/touch** con capture y release apropiados
- **Proporciona feedback visual** con transform y opacity
- **Sincroniza con parent** vía callbacks para efecto "card swipe"
- **Keyboard accessible** (Enter/Space)
- **Mobile optimized** con touch-action apropiado

**Internal Configuration**:

```typescript
const DRAG_THRESHOLD = 15; // Movimiento mínimo para drag
const ACTION_THRESHOLD = 80; // Arrastre mínimo para acción
const DOWNWARD_RESISTANCE = 0.4; // Resistencia hacia abajo
```

### Question.tsx - Question Display & Interaction

**Features**:

- **Multiple choice rendering** con indicadores visuales de estado
- **Answer validation** con animaciones de correcto/incorrecto
- **Skip functionality** con SimpleDragHint integrado
- **Ready state** para prevenir phantom clicks
- **Accessibility** con ARIA labels y roles apropiados

### Explanation.tsx - Wrong Answer Analysis

**Shows**:

- **User's selected answer** con indicador incorrecto
- **Correct answer** destacada
- **Detailed explanation** del concepto
- **Specific reasoning** de por qué la respuesta seleccionada es incorrecta (invalidOptions)

## CSS Variables System

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-light: #3b82f6;
  --color-primary-bg: #eff6ff;
  --color-success: #10b981;
  --color-success-bg: #ecfdf5;
  --color-incorrect: #6366f1;
  --color-incorrect-bg: #eef2ff;
  --color-warning: #f59e0b;

  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-base: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 2.5rem;
  --spacing-3xl: 3rem;

  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Layout */
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-normal: 200ms ease-in-out;
}
```

## TypeScript Interfaces

```typescript
// Main question structure
interface QuestionMetadata {
  question: string;
  options: string[]; // Array de 4 opciones
  answer: string; // 'a'|'b'|'c'|'d'
  explanation: string; // Explicación de la respuesta correcta
  invalidOptions: Partial<Record<'a' | 'b' | 'c' | 'd', string>>; // Razones específicas por opción incorrecta
}

// Course metadata
interface CourseMetadata {
  sha: string;
  name: string;
}

// SimpleDragHint component interface
interface SimpleDragHintProps {
  text: string;
  onAction: () => void;
  canDrag?: boolean;
  onDragStart?: () => void;
  onDragMove?: (deltaY: number, opacity: number) => void;
  onDragEnd?: () => void;
}

// Question component interface
interface QuestionProps {
  question: QuestionMetadata;
  onCorrect: () => void;
  onIncorrect?: () => void;
  onSkip?: () => void;
  onDragStart?: (
    selectedOption: number | undefined,
    isCorrect: boolean
  ) => boolean;
  onDragAction?: () => void;
  canDrag?: boolean;
  disabled?: boolean;
  onContainerDragStart?: () => void;
  onDragMove?: (deltaY: number, opacity: number) => void;
  onDragEnd?: () => void;
}
```

## Backend Integration

### API Endpoints

```typescript
// Get course questions
GET /api/github/course/:courseName
Response: QuestionMetadata[]

// Generate new questions (Gemini AI)
POST /api/questions/generate
Body: {
  prompt: string;
  numQuestions?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple-choice' | 'true-false' | 'mixed';
}
Response: {
  success: boolean;
  data: QuestionAnswer[];
  metadata: {
    count: number;
    difficulty: string;
    type: string;
    generatedAt: string;
  };
}
```

### Data Fetching Hooks

```typescript
// Custom hook para obtener preguntas de un curso
export const useGetQuestions = (setQuestions: Function, name: string) => {
  useEffect(() => {
    async function getQuestions() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/github/course/${name}`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      const questions = await response.json();
      setQuestions(questions);
    }
    getQuestions();
  }, [setQuestions, name]);
};
```

## Prohibited Changes & Critical Rules

### ❌ NEVER DO

- **Block scroll**: No `overflow: hidden` en contenedores principales
- **Remove auto-scroll**: Debe scroll-to-top en todas las transiciones
- **Change touch-action rules**: Critical para separación drag/scroll
- **Force card styles on mobile**: Filosofía de diseño responsivo
- **Skip state clearing**: Esencial para prevenir phantom clicks
- **Remove event isolation**: `preventDefault`/`stopPropagation` necesarios

### ✅ ALWAYS DO

- **Maintain scroll freedom**: `touch-action: auto` en elementos no-drag
- **Clear state on transitions**: Reset completo de estados temporales
- **Use spring animations**: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Apply mobile-first**: Diseño plano en mobile, cards en desktop
- **Test drag thresholds**: 15px para drag, 80px para acción
- **Preserve accessibility**: ARIA labels y keyboard navigation

## Common Issues & Debugging

### 1. Scroll Blocked

**Symptoms**: Usuario no puede hacer scroll
**Solution**: Verificar `touch-action: auto` y remover `overflow: hidden`

### 2. Phantom Clicks

**Symptoms**: Clicks automáticos en siguiente pregunta
**Solution**: Verificar delay de transición y estado `isReady`

### 3. Drag Not Working

**Symptoms**: No responde a drag/touch
**Solution**: Verificar `canDrag` state y `onAction` callback

### 4. Mobile Design Broken

**Symptoms**: Cards aparecen en mobile
**Solution**: Verificar media queries y flat design

### 5. Auto-scroll Missing

**Symptoms**: No scroll automático en transiciones
**Solution**: Verificar llamadas a `scrollToTop()` en handlers

### 6. Visual Lag in Drag

**Symptoms**: Arrastre se siente lento
**Solution**: Verificar thresholds y sincronización parent/child

## Testing Checklist

### Desktop

- [ ] Card design con sombras y bordes
- [ ] Drag funciona con umbrales apropiados
- [ ] Click funciona como fallback
- [ ] Header horizontal con back button y stats
- [ ] Auto-scroll en todas las transiciones
- [ ] Animaciones spring suaves

### Mobile

- [ ] Diseño flat sin cards
- [ ] Touch gestures respondan apropiadamente
- [ ] Back button circular, solo icono
- [ ] Scoreboard compacto
- [ ] No interferencia con scroll nativo
- [ ] Thresholds optimizados para touch

### Cross-Platform

- [ ] No phantom clicks entre transiciones
- [ ] Estado se limpia correctamente
- [ ] Navegación funciona en ambas direcciones
- [ ] Accesibilidad con teclado
- [ ] Performance sin lags

## Version History

- **v5.0**: Estado actual estable
  - SimpleDragHint sistema unificado
  - Phantom click prevention completo
  - Mobile design optimizado
  - State management robusto
  - Backend integration completa
  - Responsive design philosophy

**Current Status**: ✅ **STABLE & PRODUCTION READY**

La aplicación está completamente funcional con un sistema de drag/click intuitivo, diseño responsivo perfecto, y manejo de estado robusto que previene todos los edge cases conocidos.
