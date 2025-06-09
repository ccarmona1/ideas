function* csvParser(csvContent) {
    const lines = csvContent.split('\n');

    for (const line of lines) {
        yield line
    }

    return true;
}

const newCvsParser = csvParser("name,age\nAlice,30\nBob,25");

console.log(newCvsParser.next()); // { value: 'name,age', done: false }
console.log(newCvsParser.next()); // { value: 'Alice,30', done: false }
console.log(newCvsParser.next()); // { value: 'Bob,25', done: false }
console.log(newCvsParser.next()); // { value: undefined, done: true }