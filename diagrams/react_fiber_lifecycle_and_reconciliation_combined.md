# react_fiber_lifecycle_and_reconciliation_combined

> **Nota:** Este diagrama integra el ciclo de vida de componentes, el flujo de reconciliación y commit, y el rol de React Fiber como scheduler y work loop concurrente.

```mermaid
flowchart TD
  A[Usuario interactúa o cambia estado/props] --> B[Scheduler de Fiber prioriza tarea]
  B --> C[Work Loop de Fiber - divide en unidades-fibers]
  C --> D{¿Hay tiempo suficiente?}
  D -- Sí --> E[Ejecuta función componente o método render]
  E --> F[Genera nuevo Virtual DOM]
  F --> G[Diffing y reconciliación]
  G --> H[Commit Phase - actualiza DOM real]
  H --> I[Efectos secundarios - useEffect, componentDidMount, componentDidUpdate]
  I --> J[UI lista para nueva interacción]
  D -- No --> K[Pausa y cede control al navegador]
  K --> L[Reanuda cuando hay tiempo disponible]
  L --> D
  D -- Todas las unidades listas --> H

  subgraph Ciclo de Vida Clase
    E1[constructor]
    E2[getDerivedStateFromProps]
    E3[render]
    E4[componentDidMount]
    E5[shouldComponentUpdate]
    E6[getSnapshotBeforeUpdate]
    E7[componentDidUpdate]
    E8[componentWillUnmount]
    E9[getDerivedStateFromError]
    E10[componentDidCatch]
  end

  subgraph Ciclo de Vida Función
    F1[useState y useReducer]
    F2[useEffect y useLayoutEffect]
    F3[Cleanup de useEffect]
  end

  E --> E3
  E3 --> F
  H --> E4
  H --> E7
  H --> F2
  F2 --> F3

  style B fill:#6ec6ff,stroke:#222,stroke-width:1px,color:#222
  style C fill:#ffd166,stroke:#222,stroke-width:1px,color:#222
  style D fill:#b388ff,stroke:#222,stroke-width:1px,color:#fff
  style E fill:#2ecc71,stroke:#222,stroke-width:1px,color:#fff
  style F fill:#e6f7ff,stroke:#222,stroke-width:1px,color:#222
  style G fill:#b388ff,stroke:#222,stroke-width:1px,color:#fff
  style H fill:#00bfae,stroke:#222,stroke-width:1px,color:#fff
  style I fill:#2ecc71,stroke:#222,stroke-width:1px,color:#fff
  style J fill:#2ecc71,stroke:#222,stroke-width:1px,color:#fff
  style K fill:#ff6e6e,stroke:#222,stroke-width:1px,color:#fff
  style L fill:#6ec6ff,stroke:#222,stroke-width:1px,color:#222
```
