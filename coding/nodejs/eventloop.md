Tick 1
Línea 5 - console.log 1
Heap = []
Callstack = []
NextTicks = []
NodeApis = []
Microtasks = []
Macrotasks = []

Tick 2
Línea 7 - se registra timeout con callback de línea 8
Heap = []
Callstack = []
NextTicks = []
NodeApis = []
Microtasks = []
Macrotasks = [callBackLinea8]

Tick 3
Línea 17 - se registra setImmediate con callback linea 18
Heap = []
Callstack = []
NextTicks = []
NodeApis = []
Microtasks = []
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 4
Línea 24 - se registra microtask de .then() con callback línea 25
Heap = []
Callstack = []
NextTicks = []
NodeApis = []
Microtasks = [.thenLinea25]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 4
Línea 24 - se registra microtask de .then() con callback línea 25
Heap = []
Callstack = []
NextTicks = []
NodeApis = []
Microtasks = [.thenLinea25]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 5
Línea 31 - se registra next tick con callback línea 32
Heap = []
Callstack = []
NextTicks = [nextTick32]
NodeApis = []
Microtasks = [.thenLinea25]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 6
Línea 38 - se registra node api readFile callback 39
Heap = []
Callstack = []
NextTicks = [nextTick32]
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea25]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 7
Línea 54 - registra promesa en Head
Heap = [promesaSomething(pending)]
Callstack = []
NextTicks = [nextTick32]
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea25]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 7
Línea 46 - se registra console.log 7
Heap = [promesaSomething(pending)]
Callstack = []
NextTicks = [nextTick32]
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea25]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 8
Línea 47 - se registra then simple línea 47 y se registra .then linea 48 en promesaSomething
Heap = [promesaSomething(pending,.thenLinea48)]
Callstack = []
NextTicks = [nextTick32]
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea25,.thenLinea47]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 9
Línea 56 - se registra log 9
Heap = [promesaSomething(pending,.thenLinea48)]
Callstack = []
NextTicks = [nextTick32]
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea25,.thenLinea47]
Macrotasks = [callBackLinea8,callBackLinea18]

Inicia event loop

// Hay nextTicks?

// Sí - nextTick32

Tick 10
Línea 32 - Se ejecuta console log 2
Heap = [promesaSomething(pending,.thenLinea48)]
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea25,.thenLinea47]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 11
Línea 33 - Se registra .then con callback linea 34
Heap = [promesaSomething(pending,.thenLinea48)]
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea25,.thenLinea47,.thenLinea34]
Macrotasks = [callBackLinea8,callBackLinea18]

// Hay nextTicks?

// No

// Hay microTasks?

// sí - .thenLinea25

Tick 12
Línea 25 - Console log 3
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39]
Microtasks = [.thenLinea47,.thenLinea48,.thenLinea34]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 13
Línea 26 - se registra setImmediate callBack26
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setImmediate26]
Microtasks = [.thenLinea47,.thenLinea48,.thenLinea34]
Macrotasks = [callBackLinea8,callBackLinea18]

// Hay nextTicks? no
// Hay microTasks? sí .thenLinea47

Tick 14
Línea 48 - console log 8
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setImmediate26]
Microtasks = [.thenLinea34]
Macrotasks = [callBackLinea8,callBackLinea18]

Tick 15
Línea 49 - se registra timeout callback 16
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setImmediate26,setTimeout16]
Microtasks = [.thenLinea34]
Macrotasks = [callBackLinea8,callBackLinea18]

// Hay nextTicks? no
// Hay microTasks? sí .thenLinea34

Tick 16
Línea 34 - console log 14
Heap = []
Callstack = []
NextTicks = []
NodeApis = [timeout8,setInmediatte18,readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = []

// hay nextTicks? hay microTasks? hay no
// se resuelve el nodeApis? sí setTimeout16

// hay nextTicks? hay microTasks? no
// se resuelve el nodeApis? sí setTimeout16

Tick 17
Línea 16 - console log 14
Heap = []
Callstack = []
NextTicks = []
NodeApis = [setInmediatte18,readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = [callBackLinea8]

Tick 18
Línea 8 - console log 4
Heap = []
Callstack = []
NextTicks = []
NodeApis = [setInmediatte18,readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = []

Tick 19
Línea 8 - Se registra .then 10
Heap = []
Callstack = []
NextTicks = []
NodeApis = [setInmediatte18,readFileCallback39,setImmediate26,setTimeout16]
Microtasks = [.then10]
Macrotasks = []

// hay nextTicks? no

// hay microtasks? sí - .then10

Tick 20
Línea 10 - console log 10
Heap = []
Callstack = []
NextTicks = []
NodeApis = [setInmediatte18,readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = []

Tick 21
Línea 11 - se registra nextTick12
Heap = []
Callstack = []
NextTicks = [nextTick12]
NodeApis = [setInmediatte18,readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = []

// hay nextTicks? sí

Tick 21
Línea 12 - log 11
Heap = []
Callstack = []
NextTicks = []
NodeApis = [setInmediatte18,readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = []

// hay nextTicks? microtasks? macrotasks? no
// se simula setInmediate 

Tick 22
Línea 12 - log 11
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = [setInmediatteCallback18]

// hay nextTicks? microtasks? no
// macrotasks? sí

Tick 23
Línea 18 - console log 5
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setImmediate26,setTimeout16]
Microtasks = []
Macrotasks = []

Tick 24
Línea 19 - se registra setTimeout20
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setImmediate26,setTimeout16,setTimeout20]
Microtasks = []
Macrotasks = []

// hay nextTicks? microtasks? macrotasks? no
// se simula setImmediate26

Tick 25
Línea 27 - se registra 13
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setTimeout50,setTimeout20]
Microtasks = []
Macrotasks = []

// hay nextTicks? microtasks? macrotasks? no
// se simula setImmediate26

Tick 26
Línea 50 - se registra 16
Heap = []
Callstack = []
NextTicks = []
NodeApis = [readFileCallback39,setTimeout20]
Microtasks = []
Macrotasks = []

// hay nextTicks? microtasks? macrotasks? no
// se simula readFileCallback39

Tick 27
Línea 39 - se registra 6
Heap = []
Callstack = []
NextTicks = []
NodeApis = [setTimeout20]
Microtasks = []
Macrotasks = []

Tick 28
Línea 39 - se registra nextTick41
Heap = []
Callstack = []
NextTicks = [nextTick41]
NodeApis = [setTimeout20]
Microtasks = []
Macrotasks = []

// hay nextTicks? sí nextTick41

Tick 29
Línea 41 - se registra 15
Heap = []
Callstack = []
NextTicks = []
NodeApis = [setTimeout20]
Microtasks = []
Macrotasks = []

// hay nextTicks? microtasks? macrotasks? no
// se simula setTimeout20

Tick 30
Línea 20 - se registra 12
Heap = []
Callstack = []
NextTicks = []
NodeApis = []
Microtasks = []
Macrotasks = []

Resultado
1
7
9
2
3
8
14
4
10
11
5
13
16
6
15
12