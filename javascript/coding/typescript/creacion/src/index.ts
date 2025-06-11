export async function holiwi(params: string) {
  const promise = new Promise((resolve, reject) => {
    console.log(`Holiwi ${params}`);
    resolve(`Holiwi ${params}`);
  });
  return promise;
}

await holiwi('holiwi');
