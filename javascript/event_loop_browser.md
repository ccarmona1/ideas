```mermaid

graph TD

    %% Este gráfico solo aplica para navegadores
    %% Primero se ejecuta el proceso de Código Síncrono, esto bloquea el hilo
    %% Las iteraciones Event Loop y WebApis comenzarán apenas se desbloqueé el hilo (termine la ejecució de código síncrono)

    subgraph 2 - Event Loop - tick por cada iteracion
        L{¿Hay Algo en CallStack?} -->|Sí| T[Se Ejecuta]
        L -->|No| M{¿Hay algo en MicroTasks?}
        M -->|Sí| S[Se ejecuta Microtask]
        S --> M
        M -->|No| N{¿Hay algo en MacroTasks?}
        N -->|Sí| R[Se ejecuta MacroTask]
        N -->|No| L
        classDef tick fill:#ffd,stroke:#f90,stroke-width:2px;
        L:::tick
        M:::tick
        N:::tick
        R:::tick
    end

    subgraph 2 - WebApis
        P{¿Hay alguna webApi completada?}
        P -->|Sí| Q[Lo agrega a macroTasks]
        P -->|No| P
    end

    subgraph 1- Código Síncrono
        A[Contexto de Ejecución Global o de Función]
            --> B{¿Es un código que se ejecuta de forma síncrona? ej: console.log, 'new Promise - constructor' 'no .then', llamada a function};
        B -->|Sí| C[Se agrega al CallStack]
        C --> D[Se ejecuta inmediatamente si el único item en el CallStack]
        B -->|No| E{¿Es una función webApi? ej: setTimeout}
        E -->|Sí| F[Se agrega a la lista de WebApis]
        E -->|NO| G{¿Es una microTask? ej: 'Promise.resolve' o 'resolve'}
        G -->|Sí| H[Se agrega a la lista de MicroTask]
        G -->|No| X[No se agrega a ningula cola]
    end
```
