# react_fiber_architecture_and_concurrent_rendering

> **Nota:** Este diagrama ilustra cómo React Fiber divide el trabajo de actualización en pequeñas unidades (fibers), prioriza tareas, permite la concurrencia y el scheduling, y cómo esto impacta el proceso de reconciliación y commit.

```mermaid
flowchart TD
  A[Inicio - Cambio de estado o props] --> B[Scheduler - Prioriza tareas y asigna lanes]
  B --> C[Work Loop - Divide el trabajo en unidades pequeñas - fibers]
  C --> D{¿Hay tiempo suficiente?}
  D -- Sí --> E[Procesa siguiente unidad de trabajo-fiber]
  E --> D
  D -- No --> F[Pausa y cede el control al navegador]
  F --> G[Reanuda cuando hay tiempo disponible]
  G --> D
  D -- Todas las unidades listas --> H[Commit Phase - Aplica cambios al DOM real]
  H --> I[Efectos secundarios - useEffect, componentDidMount, etc.]
  I --> J[UI lista para interacción]

  subgraph Fiber Tree
    C1[Fiber Root]
    C2[Fiber hijo 1]
    C3[Fiber hijo 2]
    C4[...]
  end
  C --> C1
  C1 --> C2
  C1 --> C3
  C1 --> C4

  style B fill:#6ec6ff,stroke:#222,stroke-width:1px,color:#222
  style C fill:#ffd166,stroke:#222,stroke-width:1px,color:#222
  style D fill:#b388ff,stroke:#222,stroke-width:1px,color:#fff
  style E fill:#2ecc71,stroke:#222,stroke-width:1px,color:#fff
  style F fill:#ff6e6e,stroke:#222,stroke-width:1px,color:#fff
  style G fill:#6ec6ff,stroke:#222,stroke-width:1px,color:#222
  style H fill:#00bfae,stroke:#222,stroke-width:1px,color:#fff
  style I fill:#2ecc71,stroke:#222,stroke-width:1px,color:#fff
  style J fill:#2ecc71,stroke:#222,stroke-width:1px,color:#fff
  style C1 fill:#ffd166,stroke:#222,stroke-width:1px,color:#222
  style C2 fill:#ffd166,stroke:#222,stroke-width:1px,color:#222
  style C3 fill:#ffd166,stroke:#222,stroke-width:1px,color:#222
  style C4 fill:#ffd166,stroke:#222,stroke-width:1px,color:#222
```
