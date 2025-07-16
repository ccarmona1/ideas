# 🎨 Estilos CSS en entrevistas técnicas con React

Una guía práctica con teoría, ejemplos y respuestas para entrevistas técnicas live coding que incluyan React y estilos.

---

## ✅ ¿Qué pueden evaluarte en estilos?

Aunque estés haciendo una app funcional, pueden fijarse en:

- Buen manejo de layout: Flexbox, Grid
- Claridad visual: espaciado, jerarquía, alineación
- Código limpio: `className`, evitar `style={{}}` innecesario
- Organización mínima del CSS
- Transiciones visuales (`hover`, `active`, `loading`)
- Responsive básico: media queries, `%`, `vw`, `clamp()`

---

## 🧱 Arquitectura mínima del CSS

```
/src
  /components
    /UserCard
      UserCard.jsx
      UserCard.module.css
  /styles
    globals.css
```

- ✅ Usa `.module.css` para activar **CSS Modules**
- ❌ Evita `!important`, IDs globales (`#header`) o clases genéricas (`.box`, `.red`)
- ✅ Usa nombres consistentes como `.user-card`, `.btn-primary`, `.layout-grid`

---

## 🧩 Uso de `className` con CSS Modules o Tailwind

### 🔹 CSS Modules

```jsx
import styles from './UserCard.module.css';

<div className={styles.card}>Hola</div>;
```

```css
/* UserCard.module.css */
.card {
  padding: 1rem;
  border-radius: 8px;
}
```

### 🔹 Tailwind CSS

```jsx
<div className="bg-white p-4 rounded-lg shadow hover:scale-105 transition">
  Hola
</div>
```

---

## ❓ Preguntas rápidas y buenas respuestas

### ¿Qué usas para estilizar en React?

> “Depende del proyecto. Para prototipos rápidos uso Tailwind. Para proyectos grandes prefiero CSS Modules o Styled Components por modularidad y escalabilidad.”

### ¿Cómo modularizas tus estilos?

> “Cada componente tiene su propio `.module.css`. También separo estilos globales en una carpeta `/styles`.”

### ¿Cómo haces un componente responsive?

> “Uso Flexbox o Grid con media queries. También utilizo unidades fluidas como `%`, `vw`, `clamp()` para que se adapten sin depender de breakpoints fijos.”

### ¿Qué opinas de Tailwind o CSS-in-JS?

> “Tailwind es productivo cuando el equipo sigue un sistema de diseño. CSS-in-JS es útil cuando necesitas estilos dinámicos por props o theming.”

### ¿Cómo manejas estados visuales (hover, loading)?

> “Uso pseudoclases como `:hover` y clases dinámicas como `.is-loading`. También aplico `transition` para suavizar los cambios visuales.”

---

## 💅 ¿Qué significa `&:hover`?

En preprocesadores o CSS-in-JS (como Styled Components), `&:hover` significa:

> "Cuando el elemento actual esté en estado hover."

```js
const Button = styled.button`
  background: blue;
  color: white;

  &:hover {
    background: darkblue;
  }
`;
```

---

## 📦 ¿Vite usa CSS Modules por defecto?

No. Si ves:

```js
import './App.css';
```

Estás usando un CSS **global**.

Para usar CSS Modules:

```js
import styles from './App.module.css';

<div className={styles.card}>Hola</div>;
```

---

## 🔍 ¿Cuál es el valor por defecto de `flex-wrap`?

```css
flex-wrap: nowrap;
```

Esto significa que los elementos **no se ajustan** a múltiples líneas. Para permitirlo:

```css
flex-wrap: wrap;
```

---

## 📏 ¿Qué hace `clamp()`?

```css
font-size: clamp(1rem, 2vw, 2rem);
```

Sintaxis:

```
clamp(MÍNIMO, IDEAL, MÁXIMO)
```

- Usa el valor ideal (ej. `2vw`)
- Nunca será menor a `1rem` ni mayor a `2rem`
- Ideal para diseños fluidos sin media queries

---

## 🔍 Explicación de `flex: 1 1 300px`

```css
flex-grow: 1; /* Puede crecer */
flex-shrink: 1; /* Puede encogerse */
flex-basis: 300px; /* Tamaño inicial base */
```

Shorthand:

```css
flex: 1 1 300px;
```

El ítem parte con 300px pero se adapta dinámicamente al espacio disponible.

---

## 🧪 Transiciones visuales en React con CSS

### HTML + CSS

```css
.button {
  background: #3498db;
  transition: background 0.3s ease-in-out;
}

.button:hover {
  background: #2980b9;
}
```

### React con estado

```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState(false);

  return (
    <button
      className={`btn ${active ? 'active' : ''}`}
      onClick={() => setActive(!active)}
    >
      Cambiar color
    </button>
  );
}
```

```css
.btn {
  background: #3498db;
  color: white;
  padding: 1rem 2rem;
  border-radius: 6px;
  transition: background 0.3s ease-in-out;
}

.btn.active {
  background: #e74c3c;
}
```

---

## 🧪 Layout responsive con `flex`, `clamp()` y media queries

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: clamp(1rem, 5vw, 3rem);
  justify-content: center;
}

.card {
  flex: 1 1 300px;
  max-width: 500px;
  background: white;
  padding: clamp(1rem, 2vw, 2rem);
  font-size: clamp(1rem, 2vw, 1.5rem);
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .card {
    max-width: 100%;
  }
}
```

---
