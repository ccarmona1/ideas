const targetObject = {
  _privateValue: 100, // Convención para "privado"
  publicValue: 50,
  secret: "shhh!",
  hola: function () {
    console.log("Hola desde el objeto original!");
  }
};

const handler = {
  // Trap 'get': se activa cuando se intenta leer una propiedad
  get(target, prop, receiver) {
    if (prop === "_privateValue") {
      console.warn(`Attempted to access private property: ${String(prop)}`);
      return undefined; // O lanzar un error, o devolver un valor especial
    }
    if (prop === "secret") {
      throw new Error("Access to secret is forbidden!");
    }
    console.log(`Getting property: ${String(prop)}`);
    // Usar Reflect para obtener el comportamiento por defecto del target
    return Reflect.get(target, prop, receiver);
  },
  // Trap 'set': se activa cuando se intenta escribir una propiedad
  set(target, prop, value, receiver) {
    if (prop === "publicValue" && typeof value !== "number") {
      console.error(
        `Invalid value for publicValue: ${value}. Must be a number.`
      );
      return false; // Indica que la operación falló
    }
    console.log(`Setting property: ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
  hola(target) {
    console.log("Hola desde el proxy!");
    return Reflect.apply(target.hola, target, []);
  }
};

const proxy = new Proxy(targetObject, handler);

console.log(proxy.publicValue); // Getting property: publicValue -> 50
proxy.publicValue = 60; // Setting property: publicValue to 60
proxy.publicValue = "abc"; // Invalid value for publicValue: abc. Must be a number.
proxy.hola(); // Hola desde el proxy!

console.log(proxy._privateValue); // Attempted to access private property: _privateValue -> undefined
// console.log(proxy.secret); // Uncaught Error: Access to secret is forbidden!
console.log(targetObject.secret); // El objeto original no se ve afectado directamente por el proxy
