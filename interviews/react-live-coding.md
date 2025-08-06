# React Live Coding Exercises - Senior Full Stack

Este documento contiene ejercicios de live coding orientados a ingenieros senior con experiencia full stack. Evalúan conocimientos modernos de React, arquitectura, rendimiento y buenas prácticas.

---

## 1. Debounced Input Component (Completado)

**Descripción:**  
Crea un componente `<DebouncedInput>` que reciba un `value`, lo actualice internamente y exponga el valor "debounced" luego de 300ms de inactividad. Debe funcionar como un `<input>` tradicional y aceptar props como `placeholder`, `onChange`, etc.

**Evalúa:**

- Custom hooks
- Timers con `useEffect`
- Props forwarding
- Estado controlado y no controlado

---

## 2. UserProfile con Suspense y Lazy Loading (Completado)

**Descripción:**  
Construye un componente `<UserProfile>` que haga fetch de información de usuario al montarse. Usa `React.lazy` y `React.Suspense` para cargar el componente y mostrar un loader mientras se obtiene la información.

**Evalúa:**

- Suspense y Lazy loading
- Fetch de datos
- Renderizado asíncrono

---

## 3. Estado Global con Context + useReducer (Completado)

**Descripción:**  
Implementa un contexto de autenticación que maneje acciones de `login`, `logout` y persistencia con `localStorage`.

**Evalúa:**

- Manejo de estado global sin Redux
- Reducers en React
- Context API + localStorage

---

## 4. Formulario Dinámico desde JSON (Completado)

**Descripción:**  
Crea un componente `<FormBuilder>` que reciba un esquema en JSON y genere un formulario con campos dinámicos (`input`, `select`, etc.).

**Ejemplo de input:**

```json
[
  { "type": "text", "name": "firstName", "label": "First Name" },
  {
    "type": "select",
    "name": "country",
    "label": "Country",
    "options": ["Colombia", "Argentina"]
  }
]
```

**Evalúa:**

- Render dinámico de componentes
- Manejo de formularios controlados
- Reutilización de componentes

---

## 5. Optimización con Memo y Hooks (Completado)

**Descripción:**  
Optimiza una lista grande de productos usando `React.memo`, `useMemo` y `useCallback`. Asegúrate de que los componentes hijos no se rendericen innecesariamente.

**Evalúa:**

- Renderizado eficiente
- Memoización de props y callbacks
- Pensamiento en rendimiento

---

## 6. CRUD de Tareas con API

**Descripción:**  
Consume un API REST (`/api/tasks`) para mostrar una tabla de tareas. Permite crear y eliminar tareas desde la UI con manejo de estado reactivo.

**Evalúa:**

- Fetch de datos
- Actualización optimista de UI
- Manejo de estados (`loading`, `error`, `success`)

---

## 7. Testing con React Testing Library

**Descripción:**  
Crea un componente de botón que cambia su texto al hacer click. Luego, escribe un test usando RTL que verifique este comportamiento.

```tsx
<Button>Click me</Button> → onClick → "Thanks!"
```

**Evalúa:**

- Testing funcional
- RTL + Jest
- Accesibilidad (`getByRole`, `getByText`)

---

## 8. DataFetcher con Render Props

**Descripción:**  
Crea un componente `<DataFetcher>` que reciba una `url` y renderice los datos mediante una función pasada como hijo.

**Ejemplo de uso:**

```tsx
<DataFetcher url="/api/data">{(data) => <Chart data={data} />}</DataFetcher>
```

**Evalúa:**

- Render props
- Separación lógica / presentación
- Componentes reutilizables
