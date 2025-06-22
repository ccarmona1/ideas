# Instrucciones para Agentes IA - Aplicación de Tarjetas de Preguntas React

## Descripción General de la Aplicación

Esta es una aplicación **React + TypeScript + Vite** de aprendizaje interactivo que presenta preguntas de opción múltiple con un sistema de arrastre vertical avanzado para navegación. La aplicación está diseñada para funcionar tanto en escritorio como en dispositivos móviles con scroll global y arrastre específico en elementos interactivos.

### Características Principales

- **Scroll global funcional** en toda la aplicación (PC y móvil)
- **Sistema de arrastre vertical** exclusivo para hints interactivos
- **Navegación por preguntas** con feedback visual inmediato
- **Explicaciones detalladas** para respuestas incorrectas
- **Sistema de puntuación** con estadísticas en tiempo real
- **Arquitectura modular** con tipos TypeScript estrictos
- **Diseño responsivo** con card solo en pantallas grandes (≥768px)
- **Scroll automático** hacia arriba en todas las transiciones de estado

## Arquitectura y Estructura de Archivos

### Estructura Principal

```
apps/frontend/src/
├── App.tsx                              # Componente raíz con routing
├── main.tsx                             # Punto de entrada
├── index.css                            # Variables globales del sistema de diseño
├── App.css                              # Estilos globales de la aplicación
├── types/index.ts                       # Tipos TypeScript centralizados
└── features/components/
    ├── courses/
    │   ├── Courses.tsx                  # Lista de cursos disponibles
    │   └── Courses.css
    ├── course/
    │   ├── Course.tsx                   # Componente principal del curso
    │   ├── Course.css
    │   ├── useDragGesture.ts           # Hook personalizado para arrastre
    │   ├── dragConfig.ts               # Configuración del sistema de arrastre
    │   ├── examen_modulo1.json         # Datos de preguntas módulo 1
    │   └── examen_modulo2.json         # Datos de preguntas módulo 2
    ├── question/
    │   ├── Question.tsx                # Componente de pregunta individual
    │   ├── Question.css
    │   ├── Explanation.tsx             # Componente de explicación
    │   └── Explanation.css
    ├── common/
    │   └── DragHint.tsx                # Componente reutilizable para hints de arrastre
    └── header/
        └── Header.tsx                  # Componente de cabecera (opcional)
```

### Dependencias Clave

- **React 19.1.0** con hooks modernos
- **React Router DOM 7.6.2** para navegación
- **TypeScript 5.8.3** con tipos estrictos
- **Vite 6.3.5** como bundler

## Flujo de Navegación y Estados

### Estados Principales

1. **Lista de Cursos** (`/`) - Muestra cursos disponibles
2. **Vista de Pregunta** (`/course/:courseId`) - Pregunta activa con opciones
3. **Vista de Explicación** - Explicación detallada para respuestas incorrectas
4. **Vista de Completado** - Estadísticas finales del cuestionario

### Flujo de Interacción

```
[Seleccionar Curso] → [Pregunta] → [Seleccionar Opción]
                                      ↓
                      [Correcta] → [Siguiente Pregunta]
                      [Incorrecta] → [Explicación] → [Siguiente Pregunta]
                      [Sin Respuesta] → [Saltar] → [Reprogramar Pregunta]
```

## Sistema de Arrastre y Scroll

### Filosofía de Diseño

- **Scroll global**: Funciona en TODA la superficie de la aplicación
- **Arrastre específico**: Solo en elementos `.drag-hint-interactive`
- **No conflicto**: El arrastre nunca interfiere con el scroll normal

### Reglas CSS Críticas

#### Touch Action

```css
/* PERMITIR scroll normal */
.option-btn,
.question-container,
.course-question-box {
  touch-action: auto; /* Nunca cambiar a 'none' */
}

/* CAPTURAR arrastre exclusivamente */
.drag-hint-interactive {
  touch-action: none; /* Solo para hints de arrastre */
}
```

#### Overflow y Altura

```css
/* NUNCA usar estas propiedades en contenedores principales */
.question-container,
.course-question-box {
  /* ❌ overflow-y: auto; - Bloquea scroll global */
  /* ❌ max-height: 100vh; - Limita altura */
  /* ❌ height: 100%; - Fuerza contenido */
}

/* ✅ Permitir crecimiento natural del contenido */
.app-root,
.app-main {
  min-height: 100vh; /* Altura mínima, no máxima */
}
```

### Configuración del Arrastre (dragConfig.ts)

```typescript
export const DRAG_CONFIG = {
  SWIPE_THRESHOLD: -180, // Distancia para activar acción
  DOWNWARD_RESISTANCE: 0.3, // Resistencia al arrastrar hacia abajo
  OPACITY_FADE_START: -60, // Inicio de desvanecimiento
  OPACITY_FADE_END: -120, // Fin de desvanecimiento
  ANIMATION: {
    CLEANUP_DELAY: 100,
    RESET_DELAY: 300,
    SUCCESS_FEEDBACK_DELAY: 200,
  },
};
```

## Tipos TypeScript Importantes

### Interfaces Principales

```typescript
interface QuestionMetadata {
  question: string;
  options: string[];
  answer: string; // 'a', 'b', 'c', 'd'
  explanation: string;
  invalidOptions: Partial<Record<'a' | 'b' | 'c' | 'd', string>>;
}

interface DragHandlers {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e?: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (e?: React.PointerEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}
```

## Hook useDragGesture

### Propósito

Maneja todo el comportamiento de arrastre vertical con:

- Detección de inicio de arrastre
- Cálculo de resistencia
- Animaciones de feedback
- Prevención de scroll durante arrastre activo

### Uso Típico

```typescript
const {
  containerRef,
  dragY,
  isDragging,
  isAnimating,
  resetPosition,
  handlers: dragHandlers,
} = useDragGesture({
  canDrag: true,
  onSwipeUp: executeAction,
});
```

## Sistema de Variables CSS

### Variables de Diseño (index.css)

```css
:root {
  /* Colores */
  --color-primary: #2563eb;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-incorrect: #6366f1; /* Color suave para incorrectas */

  /* Tipografía */
  --font-family-primary: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-weight-semibold: 600;

  /* Espaciado */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Animaciones */
  --transition-normal: 200ms ease-in-out;
}
```

## Sistema de Scroll Automático

### Filosofía del Scroll Automático

La aplicación implementa scroll automático hacia arriba en todas las transiciones de estado para garantizar que el usuario siempre vea el contenido nuevo sin necesidad de hacer scroll manual.

### Escenarios de Activación

El scroll automático se activa en los siguientes casos:

1. **Respuesta Correcta → Nueva Pregunta**: Después del feedback de éxito
2. **Respuesta Incorrecta → Explicación**: Al mostrar la explicación
3. **Explicación → Nueva Pregunta**: Al continuar desde la explicación
4. **Saltar Pregunta → Nueva Pregunta**: Al saltar una pregunta

### Implementación Técnica

```typescript
// Función helper para scroll suave hacia arriba
const scrollToTop = useCallback(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}, []);
```

### Integración en Transiciones

El scroll automático se ejecuta después de:

- Actualizar el estado de la aplicación
- Resetear la posición de arrastre
- Antes de las animaciones de transición

```typescript
// Ejemplo en handleCorrect
setTimeout(() => {
  // Cambios de estado...
  setCurrentQuestionIndex(index + 1);
  setQuestionTransition('entering');
  resetPosition();

  // Scroll automático
  scrollToTop();

  setTimeout(() => setQuestionTransition('idle'), 100);
}, DRAG_CONFIG.ANIMATION.SUCCESS_FEEDBACK_DELAY);
```

### Reglas para el Scroll Automático

#### ✅ PERMITIDO

- Ajustar el comportamiento del scroll (smooth vs instant)
- Modificar el timing del scroll en relación a las animaciones
- Agregar condiciones específicas para activar/desactivar el scroll

#### ❌ PROHIBIDO

- Remover el scroll automático de las transiciones principales
- Cambiar el destino del scroll (siempre debe ir a top: 0)
- Interferir con el scroll global de la aplicación

## Diseño Responsivo

### Filosofía de Diseño Responsivo

La aplicación implementa un diseño adaptativo que distingue entre:

- **Pantallas grandes (≥768px)**: Interfaz tipo "card" con contenedor central, sombras y bordes redondeados
- **Dispositivos móviles (<768px)**: Interfaz plana sin estilos de card, aprovechando todo el ancho disponible

### Implementación de la Card Responsiva

#### Pantallas Grandes (Desktop/Tablet)

```css
.course-question-box {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  border: 1px solid var(--color-gray-200);
  padding: var(--spacing-2xl);
}
```

#### Dispositivos Móviles (<768px)

```css
@media (max-width: 768px) {
  .course-question-box {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    border: none;
    padding: var(--spacing-lg) 0;
    max-width: none;
  }

  .course-question-box::before {
    display: none; /* Remover barra decorativa superior */
  }
}
```

### Reglas para Modificaciones Responsivas

#### ✅ PERMITIDO

- Ajustar espaciado y tipografía para diferentes pantallas
- Modificar colores o efectos visuales específicos por dispositivo
- Agregar breakpoints adicionales (tablet, desktop grande)
- Optimizar interacciones táctiles para móviles

#### ❌ PROHIBIDO

- Cambiar la lógica de mostrar/ocultar la card responsiva
- Forzar estilos de card en móviles (va contra la filosofía de diseño)
- Romper la jerarquía visual entre desktop y móvil

## Reglas Para Modificaciones

### ✅ PERMITIDO

#### Agregar Nuevas Funcionalidades

- Nuevas vistas/rutas
- Componentes adicionales
- Animaciones complementarias
- Campos en tipos existentes

#### Modificar Contenido

- Preguntas en archivos JSON
- Textos y etiquetas
- Colores y estilos visuales
- Configuraciones en dragConfig.ts

#### Optimizar Rendimiento

- Memoización con React.memo
- Optimización de re-renders
- Lazy loading de componentes

### ❌ PROHIBIDO

#### Cambios en Sistema de Scroll

```css
/* NUNCA hacer esto */
.question-container {
  overflow-y: auto; /* ❌ */
  max-height: 100vh; /* ❌ */
  touch-action: none; /* ❌ */
}

/* NUNCA cambiar esto */
.drag-hint-interactive {
  touch-action: auto; /* ❌ */
}
```

#### Modificaciones Destructivas

- Cambiar la estructura de `QuestionMetadata`
- Remover props requeridas de componentes
- Alterar la lógica de transición de estados
- Modificar el hook `useDragGesture` sin entender completamente su funcionamiento

## Flujo de Datos y Estados

### Estado Principal (Course.tsx)

```typescript
// Cola de preguntas con reordenamiento dinámico
const [questionQueue, setQuestionQueue] = useState<QuestionMetadata[]>();

// Índices y contadores
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [correctCount, setCorrectCount] = useState(0);
const [incorrectCount, setIncorrectCount] = useState(0);
const [skippedCount, setSkippedCount] = useState(0);

// Estados de vista
const [currentViewMode, setCurrentViewMode] = useState<
  'question' | 'explanation' | 'completed'
>();
const [showingExplanation, setShowingExplanation] = useState(false);
```

### Gestión de Acciones

```typescript
// Función centralizada para evitar ejecuciones múltiples
const executeAction = useCallback(() => {
  if (isProcessingAction) return;

  setIsProcessingAction(true);

  if (currentViewMode === 'explanation') {
    handleNextFromExplanation();
  } else if (currentViewMode === 'question') {
    // Lógica basada en lastQuestionState
  }

  setTimeout(() => setIsProcessingAction(false), 500);
}, [currentViewMode, lastQuestionState]);

// Función helper para scroll automático
const scrollToTop = useCallback(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}, []);
```

## Componentes Clave

### DragHint.tsx

Componente reutilizable que encapsula:

- Handlers de arrastre opcionales
- Accesibilidad (roles, tabIndex, keyboard)
- Clase CSS específica para touch-action

### Question.tsx

- Gestión de selección de opciones
- Feedback visual inmediato
- Notificación al padre sobre estado de arrastre
- Resaltado de respuesta correcta

### Explanation.tsx

- Muestra explicación detallada
- Razón específica de por qué la opción es incorrecta
- Hint de arrastre para continuar

## Debugging y Troubleshooting

### Problemas Comunes

#### El scroll no funciona

1. Verificar `touch-action: auto` en elementos de scroll
2. Revisar que no hay `overflow-y: hidden` en ancestros
3. Confirmar que no hay `max-height` restrictivo

#### El arrastre no funciona

1. Verificar `touch-action: none` en `.drag-hint-interactive`
2. Confirmar que `canDrag` es true
3. Revisar threshold en dragConfig.ts

#### Animaciones entrecortadas

1. Verificar transiciones CSS en elementos arrastrados
2. Confirmar que `will-change: transform` se aplica durante arrastre
3. Revisar tiempos en DRAG_CONFIG.ANIMATION

### Herramientas para Debug

```typescript
// Agregar logs temporalmente
console.log('Action triggered', { currentViewMode, lastQuestionState });
console.log('Drag state', { dragY, isDragging, canDrag });
```

## Testing y Validación

### Casos de Prueba Esenciales

#### Funcionalidad de Scroll

- [ ] Scroll funciona en toda la superficie en desktop
- [ ] Scroll funciona en toda la superficie en móvil
- [ ] Scroll funciona sobre botones de opciones
- [ ] Scroll funciona en explicaciones largas

#### Funcionalidad de Arrastre

- [ ] Arrastre funciona solo en hints interactivos
- [ ] Arrastre hacia arriba ejecuta acción correcta
- [ ] Arrastre insuficiente vuelve a posición original
- [ ] No hay conflicto entre scroll y arrastre

#### Estados de la Aplicación

- [ ] Transición correcta entre pregunta y explicación
- [ ] Estadísticas actualizadas correctamente
- [ ] Reordenamiento de preguntas saltadas
- [ ] Vista de completado muestra datos correctos

#### Scroll Automático

- [ ] Scroll hacia arriba al responder correctamente y pasar a la siguiente pregunta
- [ ] Scroll hacia arriba al responder incorrectamente y mostrar explicación
- [ ] Scroll hacia arriba al continuar desde explicación a nueva pregunta
- [ ] Scroll hacia arriba al saltar pregunta y mostrar siguiente
- [ ] Scroll suave (behavior: 'smooth') funciona correctamente
- [ ] No hay conflicto entre scroll automático y scroll manual del usuario

#### Diseño Responsivo

- [ ] En desktop (≥768px): preguntas se muestran en card con sombra y bordes
- [ ] En móvil (<768px): preguntas se muestran sin estilos de card, fondo transparente
- [ ] Barra decorativa superior solo visible en desktop
- [ ] Espaciado y tipografía se ajustan correctamente en móvil
- [ ] Transición suave entre breakpoints al redimensionar ventana

## Mejores Prácticas para Modificaciones

### Antes de Hacer Cambios

1. **Leer completamente** este documento
2. **Probar la funcionalidad actual** en desktop y móvil
3. **Identificar componentes afectados** por el cambio
4. **Crear una rama** para cambios experimentales

### Durante el Desarrollo

1. **Mantener tipos TypeScript** actualizados
2. **Probar scroll y arrastre** después de cada cambio
3. **Usar variables CSS** existentes cuando sea posible
4. **Evitar duplicación** de lógica entre componentes

### Después de los Cambios

1. **Validar todos los casos de prueba** mencionados arriba
2. **Probar en dispositivos reales** (no solo dev tools)
3. **Verificar que no hay regresiones** en funcionalidad existente
4. **Actualizar este documento** si hay cambios arquitectónicos

## Patrones de Código Recomendados

### Manejo de Estados

```typescript
// ✅ Usar callbacks para evitar re-renders
const handleAction = useCallback(() => {
  // lógica
}, [dependencias]);

// ✅ Agrupar estados relacionados
const [dragState, setDragState] = useState({
  canDrag: false,
  isProcessing: false,
  lastAction: null,
});
```

### Estilos CSS

```css
/* ✅ Usar variables del sistema */
.component {
  color: var(--color-primary);
  font-size: var(--font-size-base);
  transition: var(--transition-normal);
}

/* ✅ Seguir convención de nomenclatura */
.component-name {
}
.component-name__element {
}
.component-name--modifier {
}
```

### TypeScript

```typescript
// ✅ Usar tipos existentes
interface NewComponentProps {
  question: QuestionMetadata; // Reutilizar tipos
  onAction?: () => void; // Props opcionales
}

// ✅ Tipar handlers correctamente
const handleDrag = (e: React.PointerEvent<HTMLDivElement>) => {
  // lógica
};
```

---

## Contacto y Soporte

Para preguntas específicas sobre implementación o dudas arquitectónicas, referirse a:

1. **Este documento** como fuente primaria de verdad
2. **Código existente** como referencia de patrones
3. **Comentarios en el código** para contexto específico

**Versión del documento**: 1.3  
**Última actualización**: Refactorización completa del frontend - código limpio y mantenible  
**Compatibilidad**: React 19.x, TypeScript 5.x, Vite 6.x

## Historial de Cambios

### Versión 1.3 - Refactorización Completa del Frontend

- **Código limpio**: Eliminación de todos los comentarios redundantes y código obsoleto
- **Consolidación de estilos**: Unificación de variables CSS y eliminación de duplicaciones
- **Optimización de componentes**: Refactorización de Question.tsx, Explanation.tsx, Header.tsx y todos los archivos CSS
- **Separación de responsabilidades**: Extracción de estilos inline a archivos CSS dedicados
- **Mejora de legibilidad**: Simplificación de lógica condicional y estructuras de código
- **Mantenibilidad**: Código más limpio y estructurado sin pérdida de funcionalidad

### Versión 1.2 - Sistema de Scroll Automático

- Implementación de scroll automático en todas las transiciones de estado
- Integración con el sistema de arrastre existente
- Casos de prueba actualizados para validar scroll automático

### Versión 1.1 - Diseño Responsivo

- Implementación de cards responsivas (desktop/móvil)
- Media queries para diferentes breakpoints
- Optimización de interfaz táctil

## Estándares de Código Limpio

### Principios Implementados

El frontend ha sido refactorizado siguiendo principios de código limpio para mejorar la mantenibilidad y legibilidad:

#### Eliminación de Comentarios Redundantes

```typescript
// ❌ ANTES - Comentarios obvios
// Estado para manejar la cola de preguntas
const [questionQueue, setQuestionQueue] = useState<QuestionMetadata[]>();

// ✅ DESPUÉS - Código autoexplicativo
const [questionQueue, setQuestionQueue] = useState<QuestionMetadata[]>();
```

#### Consolidación de Lógica

```typescript
// ❌ ANTES - Lógica verbosa con comentarios
if (lastQuestionState.hasSelectedOption && !lastQuestionState.isCorrect) {
  // Respuesta incorrecta -> mostrar explicación
  handleShowExplanation(currentQuestion, lastQuestionState.selectedOptionIndex);
}

// ✅ DESPUÉS - Lógica concisa y clara
if (lastQuestionState.hasSelectedOption && !lastQuestionState.isCorrect) {
  handleShowExplanation(currentQuestion, lastQuestionState.selectedOptionIndex);
}
```

#### Separación de Responsabilidades

```typescript
// ❌ ANTES - Estilos inline mezclados con lógica
<header style={{
  background: '#222',
  color: '#fff',
  padding: '1rem'
}}>

// ✅ DESPUÉS - Estilos en archivos CSS dedicados
<header className="header">
```

#### Funciones Concisas

```typescript
// ❌ ANTES - Funciones largas con muchos comentarios
const handleCorrect = (index: number) => {
  setCorrectCount((c) => c + 1);
  // Delay corto para mostrar la animación de éxito, luego cambio inmediato
  setTimeout(() => {
    // Cambio inmediato sin timeouts anidados
    if (index < questionQueue.length - 1) {
      setCurrentQuestionIndex(index + 1);
    }
    // Resetear posición de arrastre
    resetPosition();
  }, 800);
};

// ✅ DESPUÉS - Función limpia y directa
const handleCorrect = (index: number) => {
  setCorrectCount((c) => c + 1);
  setTimeout(() => {
    if (index < questionQueue.length - 1) {
      setCurrentQuestionIndex(index + 1);
    }
    setQuestionTransition('entering');
    resetPosition();
    scrollToTop();
    setTimeout(
      () => setQuestionTransition('idle'),
      DRAG_CONFIG.ANIMATION.CLEANUP_DELAY
    );
  }, DRAG_CONFIG.ANIMATION.SUCCESS_FEEDBACK_DELAY);
};
```

### Reglas de Mantenimiento de Código Limpio

#### ✅ MANTENER

- **Nombres descriptivos**: Variables y funciones que explican su propósito
- **Funciones pequeñas**: Una responsabilidad por función
- **Consistencia**: Patrones uniformes en toda la aplicación
- **Tipos explícitos**: TypeScript estricto para mejor mantenibilidad
- **Separación CSS**: Estilos en archivos dedicados, no inline

#### ❌ EVITAR

- **Comentarios obvios**: El código debe ser autoexplicativo
- **Funciones largas**: Dividir en funciones más pequeñas
- **Lógica duplicada**: Consolidar en funciones reutilizables
- **Estilos inline**: Usar clases CSS en su lugar
- **Variables con nombres genéricos**: Usar nombres descriptivos
