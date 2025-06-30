import { useState, useEffect } from 'react';

export const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<
    object & Partial<{ name: string }>
  >();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      const jsonData = await response.json();
      setUserProfile(jsonData);
    };
    void fetchData();
    return () => {};
  }, []);

  return userProfile ? (
    <>Lazy Component {userProfile?.name}</>
  ) : (
    <>Loading Data...</>
  );
};

/*

Tu implementación cumple correctamente con los requisitos de la descripción:

### Evaluación

#### 1. **Suspense y Lazy loading**
- Usas `React.lazy` para cargar el componente `UserProfile` de forma diferida:
    ```tsx
    const UserProfile = lazy<React.FC>( ... );
    ```
- El componente `UserProfile` se importa dinámicamente con un retraso simulado de 5 segundos usando `setTimeout`, lo que permite observar el fallback de Suspense.
- El componente `Lazy` envuelve `UserProfile` en un `<Suspense fallback={<>Loading</>}>`, mostrando el loader mientras se resuelve la promesa.

#### 2. **Fetch de datos**
- Dentro de `UserProfile`, usas `useEffect` para hacer fetch a una API externa al montarse el componente.
- El estado `userProfile` se actualiza con los datos recibidos.

#### 3. **Renderizado asíncrono**
- Mientras se carga el componente (por lazy loading), se muestra el fallback de Suspense.
- Cuando el componente se monta, muestra "Loading Data..." hasta que los datos del usuario están disponibles, luego muestra el nombre del usuario.

---

### Sugerencias menores

- Puedes tipar mejor el estado para mayor claridad:
    ```tsx
    const [userProfile, setUserProfile] = useState<{ name?: string }>();
    ```
- El fallback de Suspense podría ser más descriptivo, por ejemplo: `<div>Cargando componente...</div>`

---

### Conclusión

Tu código demuestra correctamente el uso de Suspense, lazy loading, fetch de datos y renderizado asíncrono.  
Puedes ver los archivos relevantes aquí:
- `Lazy.tsx`
- `UserProfile.tsx`

*/
