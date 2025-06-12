export async function holiwi(params: string) {
  const promise = new Promise((resolve, reject) => {
    console.log(`Holiwi ${params}`);
    resolve(`Holiwi ${params}`);
  });
  return promise;
}

await holiwi('holiwi');

type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<bigint[]>; // bigint
type B = ElementType<string>; // string

type T<T> = T extends number ? string : boolean;
type R = T<1 | true>;

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type D = ReturnType<() => number>; // number
type E = ReturnType<(x: string) => boolean>; // boolean

// branded types

type UserId = string & { readonly __brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

const userId: UserId = createUserId('abc123');
const normalString: string = 'xyz';
//const invalid: UserId = normalString; // Error: Type 'string' is not assignable to type 'UserId'.

type User = { id: number; name: string };

const obj2 = { id: 1, name: 'something' } satisfies User;

const colores = ['rojo', 'verde', 'azul'] as const;
// Tipo: readonly ['rojo', 'verde', 'azul']

// colores[3] = 'azul' - error

const estado = {
  ok: true,
  mensaje: 'Listo',
} as const;
// Tipo: { readonly ok: true; readonly mensaje: 'Listo' }
