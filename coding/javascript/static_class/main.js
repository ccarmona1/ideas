class UserFactory {
  static #maxNumberOfUsers;
  static #currentUsers = [];

  constructor(maxNumberOfUsers) {
    UserFactory.#maxNumberOfUsers = maxNumberOfUsers
    new.target
  }

  static createUser() {
    if (this.#currentUsers.length >= this.#maxNumberOfUsers) {
      throw new Error("Maximum number of users reached");
    }
    return new User(this.generateId());
  }

  static generateId() {
    return Math.floor(Math.random() * 1000000);
  }
}

class User {
  #id;
  constructor(id) {
    this.#id = id;
  }

  getId() {
    return this.#id;
  }
}

const user1 = UserFactory.createUser();
console.log(user1.getId());
const user2 = UserFactory.createUser();
console.log(user2.getId());
