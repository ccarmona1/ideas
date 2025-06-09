const userProfile = {
  username: "john_doe",
  email: "john.doe@example.com",
  logDetails: function () {
    console.log(`Username: ${this.username}, Email: ${this.email}`);
  },
  logDetailsDelayed: function () {
    setTimeout(function () {
      this.logDetails(); // Problema: 'this' aquí no es userProfile
    }.bind(this), 1000);
  },
};

userProfile.logDetailsDelayed();
