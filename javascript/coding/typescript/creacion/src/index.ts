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
