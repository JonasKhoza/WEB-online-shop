const mongodb = require("mongodb");
const db = require("../data/database");

class User {
  constructor(email, password, fullName, street, postal, city, contacts) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.street = street;
    this.postal = postal;
    this.city = city;
    this.contacts = contacts;
  }

  saveUser() {
    const user = {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      contacts: this.contacts,
      isAdmin: false,
      address: {
        street: this.street,
        postal: this.postal,
        city: this.city,
      },
    };

    return db.getDb().collection("users").insertOne(user);
  }

  static findById(userId) {
    const uid = mongodb.ObjectId(userId);
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }

  static findByEmail(enteredEmail) {
    return db.getDb().collection("users").findOne({ email: enteredEmail });
  }

  //   getUser() {
  //     return db.getDb().collection("users").findOne({ email: this.email });
  //   }
}

module.exports = User;
