// Inicio Contexto de Ejecución Global

/**
 * Iteración 1:
 * Línea 1: console.log("Inicio")
 * CallStack: [console.log]
 * Web APIs: []
 * Microtasks: []
 * MacroTasks: []
 * Se ejecuta el console log y se saca del call stack
 */

/**
 * Iteración 2:
 * Línea 26: operacionCallback
 * CallStack: [operacionCallback]
 * Web APIs: []
 * Microtasks: []
 * MacroTasks: []
 * Se ejecuta operactionCallback
 */

// Inicio Contexto operactionCallback - global

/**
 * Iteración 3:
 * Línea 8: console.log("Iniciando operacionCallback");
 * CallStack: [log]
 * Web APIs: []
 * Microtasks: []
 * MacroTasks: []
 * Se ejecuta console.log y se limpia el callstack
 */

/**
 * Iteración 4:
 * Línea 9: setTimeout(callbackLinea19)
 * CallStack: []
 * Web APIs: [setTimeout(callbackLinea19, 50)]
 * Microtasks: []
 * MacroTasks: []
 * Se agrega el timeout al webApi
 */

// Fin Contexto operactionCallback - global

// Continuación Contexto Global

/**
 * Iteración 5:
 * Línea 31
 * CallStack: [promise.Resolve()]
 * Web APIs: [setTimeout(callbackLinea19, 50)]
 * Microtasks: []
 * MacroTasks: []
 * Con Promise.Resolve() se agrega el then inmediatamente al microtasks
 */

/**
 * Iteración 6:
 * Línea 31
 * CallStack: []
 * Web APIs: [setTimeout(callbackLinea19, 50)]
 * Microtasks: [then()Línea31]
 * MacroTasks: []
 */

/**
 * Iteración 7
 * Línea 35
 * CallStack: [operacionPromise("param1")]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * Microtasks: [then()Línea31]
 * MacroTasks: []
 * Se ejecuta operacionPromise con un nuevo CE
 */

// Inicio CE operacionPromise - global

/**
 * Iteración 8
 * Línea 16: console.log("Iniciando operacionPromise con:", "param1");
 * CallStack: [console.log]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * Microtasks: [then()Línea31]
 * MacroTasks: []
 * Se pinta Iniciando operacionPromise con: param1
 */

/**
 * Iteración 9
 * Línea 17
 * CallStack [new PromiseLinea17]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * Microtasks: [then()Línea31]
 * MacroTasks: []
 * Se crea una nueva promesa y se crea un CE para su executor
 */

//Inicio EC PromiseLinea17 - operacionPromise - global

/**
 * Iteración 10
 * Línea 18
 * CallStack: []
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callbackLinea19, 30)]
 * Microtasks: [then()Línea31]
 * MacroTasks: []
 * Se agrega setTimeout(callbackLinea19, 30)
 */

// Fin EC PromiseLinea17 - operacionPromise - global

// Fin operacionPromise - global

// Continuación global

/**
 * Iteración 11
 * Línea 36
 * CallStack: []
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callbackLinea19, 30)]
 * Microtasks: [then()Línea31, then()Línea36]
 * MacroTasks: []
 * Se agrega then linea 36 a microtasks
 */

/**
 * Iteración 12
 * Línea 41
 * CallStack: []
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callbackLinea19, 30)]
 * Microtasks: [then()Línea31, then()Línea36, , then()Línea41]
 * MacroTasks: [] 
 * Se agrega then linea 41 a microtasks
 */

/**
 * Iteración 13
 * Linea 45
 * CallStack: []
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callbackLinea19, 30), setTimeout(callBackLinea46, 20)]
 * Microtasks: [then()Línea31, then()Línea36, , then()Línea41]
 * MacroTasks: []  
 */

/**
 * Iteración 14
 * Línea 49
 * CallStack: [console.log("Fin")]
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callbackLinea19, 30), setTimeout(callBackLinea46, 20)]
 * Microtasks: [then()Línea31, then()Línea36, , then()Línea41]
 * MacroTasks: [] 
 * Se pinta fin  
 */

// Fin Ejecución Sincrona de global

// empieza el event loop

// ¿Hay microtasks completas??
// Sí [then()Línea31, then()Línea36*, then()Línea41*]

/**
 * Iteración 15
 * Línea 32
 * CallStack: [Microtarea 1 (inmediata)]
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callbackLinea19, 30), setTimeout(callBackLinea46, 20)]
 * PromesasPending: [then()Línea36-Pending, then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: [] 
 * Se pinta Microtarea 1 (inmediata)
*/

// ¿Hay Microtasks? no

// ¿Hay MacroTasks? Sí setTimeout(callBackLinea46, 20)

/**
 * Iteración 16
 * Linea 46 
 * CallStack: [log Macrotarea Final (20ms)]
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callbackLinea19, 30)]
 * PromesasPending: [then()Línea36-Pending, then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: [] 
 * Se pinta "Macrotarea Final (20ms)"
 */

// ¿Hay Microtasks? no

// ¿Hay MacroTasks? Sí - setTimeout(callbackLinea19, 30)

/**
 * Iteración 17
 * Línea 19
 * CallStack: [log Promesa de operacionPromise resuelta]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea36-Pending, then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: [] 
 * Se pinta "Promesa de operacionPromise resuelta" 
 */

/**
 * Iteración 18
 * Linea 20
 * CallStack: [Se resuelve promesa de then()Línea36-Pending]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: [then()Línea36]
 * MacroTasks: []  
 * Se resuelve promesa de then()Línea36-Pending
 */

// ¿Hay Microtasks? Sí - then()Línea36

/**
 * Iteración 19
 * Linea 37 
 * CallStack: [Log "Manejando datos de Promesa:"]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se pinta Manejando datos de Promesa:
 */

/**
 * Iteración 20
 * Línea 38
 * CallStack: [operacionSincronaAnidada]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se ejecuta operacionSincronaAnidada
 */

// Inicio operacionSincronaAnidada - then()Línea36 - microtask

/**
 * Iteración 21
 * Linea 4
 * CallStack: [console.log("Dentro de operacionSincronaAnidada")]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se pinta Dentro de operacionSincronaAnidada
 */

// Fin operacionSincronaAnidada - then()Línea36 - microtask

// Continuación then()Línea36 - microtask

/**
 * Iteración 22
 * Línea 39
 * CallStack: [operacionPromise(param2))]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se ejecuta operacionPromise
 */ 

// Inicio operacionPromise - then()Línea36 - microtask

/**
 * Iteración 23
 * Linea 16
 * CallStack: [console.log("Iniciando operacionPromise con:", param2)]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se pinta Iniciando operacionPromise con: param2
 */

/**
 * Iteración 24
 * Línea 17
 * CallStack: [new Promise-pending]
 * Web APIs: [setTimeout(callbackLinea27, 50)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se crea nueva promesa pending y se ejecuta su executor inmediatamente
 */

// inicio nueva promise executor - operacionPromise - then()Línea36 - microtask

/**
 * Iteración 25
 * Linea 18
 * CallStack: []
 * Web APIs: [setTimeout(callbackLinea27, 50), setTimeout(callBackLinea19, 30)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se agrega el timeout a webApis
 */

// fin nueva promise executor - operacionPromise - then()Línea36 - microtask

// fin operacionPromise - then()Línea36 - microtask

// fin then()Línea36

// hay microtasks? no

// hay macrotasks? no

// se resolvió un timeout? sí setTimeout(callbackLinea27, 50)

// nueva macrotask

/**
 * Iteracion 26
 * Linea 10
 * CallStack: [log Callback de operacionCallback ejecutado]
 * Web APIs: [setTimeout(callBackLinea19, 30)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Callback de operacionCallback ejecutado
*/

/**
 * Iteracion 27
 * Linea 11
 * CallStack: [callback(Datos de Callback)]
 * Web APIs: [setTimeout(callBackLinea19, 30)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * se ejecuta callback(Datos de Callback)
*/

/**
 * Iteración 28
 * Linea 27
 * CallStack: [log Manejando datos de Callback: Datos de Promesa]
 * Web APIs: [setTimeout(callBackLinea19, 30)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se loguea Manejando datos de Callback: Datos de Promesa
 */

/**
 * Iteracion 29
 * Linea 28
 * CallStack: [operacionSincronaAnidada]
 * Web APIs: [setTimeout(callBackLinea19, 30)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * se ejecuta operacionSincronaAnidada
 */

/** 
 * Iteracion 28
 * Linea 4
 * CallStack: [log Dentro de operacionSincronaAnidada]
 * Web APIs: [setTimeout(callBackLinea19, 30)]
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se loguea Dentro de operacionSincronaAnidada
 */

// Termina macrotask

// hay micro tasks? no
// hay macro tasks? no
// se resolvió un timeout, sí - setTimeout(callBackLinea19, 30)

// nueva macrotask: setTimeout(callBackLinea19, 30)

/**
 * Iteración 29
 * Linea 19
 * CallStack: [log Promesa de operacionPromise resuelta]
 * Web APIs: []
 * PromesasPending: [then()Línea41-Pending]
 * Microtasks: []
 * MacroTasks: []  
 * Se loguea Promesa de operacionPromise resuelta
 */

/**
 * Iteracion 30
 * Linea 20
 * CallStack: [se resuelve then()Línea41]
 * Web APIs: []
 * PromesasPending: []
 * Microtasks: [then()Línea41]
 * MacroTasks: []  
 * se resuelve then()Línea41
 */

// Fin macro task

// Hay micro tasks? sí, then()Línea41

/**
 * Iteracion 31
 * Linea 42
 * CallStack: [log Manejando segundos datos de Promesa: param2]
 * Web APIs: []
 * PromesasPending: []
 * Microtasks: []
 * MacroTasks: []  
 * log Manejando segundos datos de Promesa: param2
 */

// fin micro task

// hay código sync? no
// hay micro tasks? no
// hay macro tasks? no
// hay webApis? no

// fin programa


/**
 * Resultado:
 * Inicio
 * Iniciando operacionCallback
 * Iniciando operacionPromise con: param1
 * Fin
 * Microtarea 1 (inmediata)
 * Macrotarea Final (20ms)
 * Promesa de operacionPromise resuelta
 * Manejando datos de Promesa: Datos de Promesa
 * Dentro de operacionSincronaAnidada
 * Iniciando operacionPromise con: param2
 * Callback de operacionCallback ejecutado
 * Manejando datos de Callback: Datos de Callback
 * Dentro de operacionSincronaAnidada
 * Promesa de operacionPromise resuelta
 * Manejando segundos datos de Promesa: Datos de Promesa
 */