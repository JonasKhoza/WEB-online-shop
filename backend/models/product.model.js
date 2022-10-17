const db = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class Product {
  constructor(title, image, summary, price, description, instock, id) {
    (this.title = title),
      (this.image = image),
      (this.summary = summary),
      (this.price = price),
      (this.description = description),
      (this.instock = instock);
    this.id = id;
  }

  save() {
    const product = {
      title: this.title,
      image: this.image,
      summary: this.summary,
      price: +this.price,
      instock: Math.floor(this.instock),
      description: this.description,
    };

    return db.getDb().collection("products").insertOne(product);
  }

  static findAll() {
    return db.getDb().collection("products").find().toArray();
  }

  static findById(id) {
    return db.getDb().collection("products").findOne({ _id: id });
  }

  updateProduct() {
    return db
      .getDb()
      .collection("products")
      .updateOne(
        { _id: new ObjectId(this.id) },
        {
          $set: {
            title: this.title,
            image: this.image,
            summary: this.summary,
            price: +this.price,
            instock: Math.floor(this.instock),
            description: this.description,
          },
        }
      );
  }

  static deleteProduct(id) {
    return db
      .getDb()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
  }

  //   getProduct() {
  //     return db
  //       .getDb()
  //       .collection("products")
  //       .findOne({ _id: new ObjectId(this.id) });
  //   }
}

module.exports = Product;
