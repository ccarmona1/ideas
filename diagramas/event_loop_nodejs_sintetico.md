```mermaid

graph TD

    %% Este gráfico aplica para Node.js
    %% Primero se ejecuta el proceso de Código Síncrono, esto bloquea el hilo principal
    %% Las iteraciones Event Loop y Node.js APIs comienzan apenas se desbloquea el hilo (termine la ejecución de código síncrono)

    subgraph 3 - Thread Pool
        TP[Thread Pool libuv]
        TP -->|Opera en paralelo| P
    end

    subgraph 2 - Event Loop - tick por cada iteración
        L{¿Hay algo en CallStack?} -->|Sí| T[Se ejecuta]
        L -->|No| NT{¿Hay algo en nextTick?}
        NT -->|Sí| SNT[Se ejecuta nextTick]
        SNT --> NT
        NT -->|No| M{¿Hay algo en MicroTasks?}
        M -->|Sí| S[Se ejecuta Microtask]
        S --> M
        M -->|No| N{¿Hay algo en MacroTasks?}
        N -->|Sí| R[Se ejecuta MacroTask]
        N -->|No| L
        classDef tick fill:#ffd,stroke:#f90,stroke-width:2px;
        L:::tick
        NT:::tick
        M:::tick
        N:::tick
        R:::tick
    end

    subgraph 2 - NodeJS_APIs
        P{¿Hay alguna Node.js API completada?}
        P -->|Sí| Q[Lo agrega a macroTasks]
        P -->|No| P
    end

    subgraph 1- Código Síncrono
        A[Contexto de Ejecución Global o de Función]
            --> B{¿Es código síncrono? ej: console.log, declaración, llamada directa, readFileSync}
        B -->|Sí| C[Se agrega al CallStack]
        C --> D[Se ejecuta inmediatamente si el único item en el CallStack]
        B -->|No| E{¿Es una Node.js API?}
        E -->|Sí| F1{¿Requiere thread pool?}
        F1 -->|Sí| FP[Ej: fs.readFile, crypto, dns.lookup] 
        FP --> TP
        F1 -->|No| F2{¿Es Timer o setImmediate?}
        F2 -->|Sí| FT[Ej: setTimeout, setInterval, setImmediate]
        FT --> F[Se agrega a la lista de Node.js APIs]
        F2 -->|No| F[Se agrega a la lista de Node.js APIs]
        E -->|No| G{¿Es una microTask? ej: Promise.then, Promise.resolve}
        G -->|Sí| H[Se agrega a la lista de MicroTasks]
        G -->|No| I{¿Es nextTick? ej: process.nextTick}
        I -->|Sí| J[Se agrega a la lista de nextTick]
        I -->|No| X[No se agrega a ninguna cola]
    end
```

## Notas sobre microtasks, macrotasks y thread pool en Node.js

- **Microtasks**: Promises (`Promise.then`, `Promise.resolve`), pero en Node.js también existen las tareas de `process.nextTick`, que tienen prioridad sobre las microtasks estándar.
- **Macrotasks**: Timers (`setTimeout`, `setInterval`), I/O callbacks (`fs.readFile`, etc), `setImmediate`.
- **Thread Pool**: Solo operaciones como `fs.readFile`, `crypto.pbkdf2`, `dns.lookup` (no-cached) se delegan al thread pool de libuv si no pueden ser asíncronas a nivel de sistema operativo. Timers y setImmediate NO usan el thread pool. Cuando terminan, notifican al event loop y su callback se agrega a la cola de macrotasks.
- El event loop de Node.js ejecuta primero todas las tareas de nextTick, luego las microtasks, y después una macrotask.

### Ejemplo:

```js
console.log('A');
setTimeout(() => console.log('B'), 0); // macrotask
setImmediate(() => console.log('C')); // macrotask
Promise.resolve().then(() => console.log('D')); // microtask
process.nextTick(() => console.log('E')); // nextTick
fs.readFile('archivo.txt', () => console.log('F')); // thread pool + macrotask
console.log('G');
```

// Orden de impresión: A, G, E, D, B/C, F (el orden de B, C y F puede variar)

```

### En el diagrama:
- El código síncrono se ejecuta primero (va al CallStack).
- Las tareas de process.nextTick se ejecutan antes que las microtasks (Promises).
- Las microtasks (Promises) se ejecutan antes que las macrotasks.
- Las macrotasks incluyen Timers, I/O y setImmediate.
- El thread pool opera en paralelo y notifica al event loop solo para operaciones como fs.readFile, crypto, dns.lookup.
