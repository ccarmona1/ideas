import type React from 'react';
import { useDebounced } from './useDebounced';
import { useCallback, useEffect, useState } from 'react';

export interface DebouncedProps
  extends Partial<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  > {
  value?: string;
  handleNewDebouncedValue: (debouncedValue: string) => void;
}

export const Debounced: React.FC<DebouncedProps> = ({
  value,
  handleNewDebouncedValue,
  ...inputProps
}) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useDebounced(value ?? '', setDebouncedValue);

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedValue(event.target.value);
    },
    []
  );

  useEffect(() => {
    handleNewDebouncedValue(debouncedValue);
  }, [debouncedValue, handleNewDebouncedValue]);

  return (
    <input
      {...inputProps}
      value={debouncedValue}
      onChange={handleInput}
    ></input>
  );
};

/*
### Evaluación del componente Debounced y su custom hook

#### 1. **Custom Hook (`useDebounced`)**
- **Uso correcto:** El hook `useDebounced` implementa correctamente un timer con `useEffect` para actualizar el valor "debounced" tras 300ms de inactividad.
- **Firma:**  
  ```ts
  export const useDebounced = (
    value: string,
    setDebouncedValue: (value: string) => void
  ) => { ... }
  ```
- **Limpieza:** El efecto limpia el timeout anterior, evitando fugas de memoria o actualizaciones innecesarias.

#### 2. **Timers con `useEffect`**
- El timer está bien implementado en el hook, usando `setTimeout` y `clearTimeout` en el cleanup del efecto.

#### 3. **Props Forwarding**
- El componente `Debounced` extiende correctamente las props de un `<input>` estándar usando:
  ```tsx
  extends Partial<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>
  ```
- Forwardea todas las props adicionales (`...inputProps`) al `<input>`, permitiendo usar `placeholder`, `onChange`, etc.

#### 4. **Estado controlado y no controlado**
- El componente mantiene un estado interno `debouncedValue` y lo sincroniza con la prop `value` usando el hook.
- El valor mostrado en el input es siempre el estado interno (`debouncedValue`), lo que lo hace controlado internamente.
- El valor "debounced" se expone hacia afuera mediante el callback `handleNewDebouncedValue` tras el delay.

#### 5. **Funcionamiento como `<input>` tradicional**
- El componente acepta y forwardea props estándar de `<input>`.
- El valor mostrado se actualiza al escribir, y el valor "debounced" se expone tras 300ms de inactividad.

---

### **Resumen**

- ✅ **Custom hook**: bien implementado.
- ✅ **Timers con useEffect**: correcto.
- ✅ **Props forwarding**: correcto.
- ✅ **Estado controlado**: correcto.
- ✅ **Funciona como input tradicional**: sí.

**Conclusión:**  
El componente y su hook cumplen correctamente con los requisitos descritos para un `<DebouncedInput>`. Puedes ver el código relevante en Debounced.tsx y useDebounced.ts.
*/

/*

| Hook                | Sin deps (`useX(() => {})`)         | Deps vacías (`useX(() => {}, [])`) | Con deps (`useX(() => {}, [a, b])`)         | Ejemplo de uso en la vida real                                 |
|---------------------|-------------------------------------|-------------------------------------|---------------------------------------------|---------------------------------------------------------------|
| **useEffect**       | En cada render                      | Solo en el montaje                  | En el montaje y cuando cambian deps         | Llamadas a APIs, suscripción a eventos, sincronizar datos      |
| **useLayoutEffect** | En cada render                      | Solo en el montaje                  | En el montaje y cuando cambian deps         | Medir el DOM antes de pintar, animaciones sincronizadas        |
| **useMemo**         | Recalcula en cada render            | Solo una vez (memoriza)             | Recalcula cuando cambian deps               | Memorizar cálculos costosos, filtrar listas grandes            |
| **useCallback**     | Nueva función en cada render        | Misma función siempre               | Misma función mientras no cambien deps      | Pasar handlers a componentes hijos para evitar renders extra   |
| **useRef**          | _No aplica_                         | _No aplica_                         | _No aplica_                                 | Acceder a elementos del DOM, guardar valores mutables          |
| **useState**        | _No aplica_                         | _No aplica_                         | _No aplica_                                 | Manejar formularios, toggles, cualquier estado local           |
| **useReducer**      | _No aplica_                         | _No aplica_                         | _No aplica_                                 | Estados complejos, lógica de actualización tipo Redux          |

- **Nota:**  
  - "Sin deps" = no se pasa segundo argumento.  
  - "Deps vacías" = se pasa `[]` como segundo argumento.  
  - "Con deps" = se pasa un array de dependencias.  
  - useRef, useState y useReducer no usan dependencias.

*/
