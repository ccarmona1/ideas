const lista = [
  { name: 'Ana', role: 'admin' },
  { name: 'Luis', role: 'editor' },
  { name: 'Carlos', role: 'admin' },
  { name: 'Sofía', role: 'viewer' },
];

const mapa = lista.reduce((result, currentItem) => {
  if (result && result[currentItem.role]) {
    result[currentItem.role].push(currentItem.name);
  } else {
    result[currentItem.role] = [currentItem.name];
  }
  return result;
}, {});

console.log(mapa);
