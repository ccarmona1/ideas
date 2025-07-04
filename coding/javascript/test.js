// test.js
function createUser(name) {
  let user = { name: name };
  return user;
}

function addEmail(user, email) {
  user.email = email; // Cambia la Hidden Class si 'email' no estaba presente
}

function runTest() {
  for (let i = 0; i < 1000000; i++) {
    let u = createUser(`TestUser${i}`);
    if (i % 2 === 0) {
      u.email = `test${i}@example.com`;
    }
    // Acceso a propiedades
    let x = u.name;
    if (u.email) {
      let y = u.email;
    }
  }
  console.log("Test finished. Check V8 logs.");
}

runTest();
