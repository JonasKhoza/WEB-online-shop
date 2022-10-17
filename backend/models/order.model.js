const db = require("../data/database");
const mongodb = require("mongodb");
class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);

    this.id = orderId;
  }
  //Finds all orders for admin
  static findAll() {
    return db.getDb().collection("orders").find().sort({ _id: -1 }).toArray();
  }
  //All orders for user
  static findAllForUser(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();
  }

  //Single order fo admin
  static findById(orderId) {
    return db
      .getDb()
      .collection("orders")
      .findOne({ _id: mongodb.ObjectId(orderId) });
  }
  save() {
    if (this.id) {
      //Updating by admin
      const orderId = mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { status: this.status } });
    } else {
      //Adding a new order
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };
      return db.getDb().collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
