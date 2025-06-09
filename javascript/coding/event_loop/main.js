console.log("Inicio");

function operacionSincronaAnidada() {
    console.log("Dentro de operacionSincronaAnidada");
}

function operacionCallback(callback) {
    console.log("Iniciando operacionCallback");
    setTimeout(() => {
        console.log("Callback de operacionCallback ejecutado");
        callback("Datos de Callback");
    }, 50);
}

function operacionPromise(data) {
    console.log("Iniciando operacionPromise con:", data);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Promesa de operacionPromise resuelta");
            resolve("Datos de Promesa");
        }, 30);
    });
}

// Bloque de ejecución principal
operacionCallback(datosCallback => {
    console.log("Manejando datos de Callback:", datosCallback);
    operacionSincronaAnidada();
});

Promise.resolve().then(() => {
    console.log("Microtarea 1 (inmediata)");
});

operacionPromise("param1")
    .then(datosPromise => {
        console.log("Manejando datos de Promesa:", datosPromise);
        operacionSincronaAnidada();
        return operacionPromise("param2"); // Anidando otra promesa
    })
    .then(segundosDatosPromise => {
        console.log("Manejando segundos datos de Promesa:", segundosDatosPromise);
    });

setTimeout(() => {
    console.log("Macrotarea Final (20ms)");
}, 20);

console.log("Fin");


