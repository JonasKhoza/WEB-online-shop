const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const session = require("express-session");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    "Access-Control-Allow-Origin": "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
//Requiring code from other files
const db = require("./data/database");
const MongoDBSessionStoreConfig = require("./utils/session");
const MongoDBSessionStore =
  MongoDBSessionStoreConfig.MongoDBSessionStorage(session);

const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const baseRoutes = require("./routes/base.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/order.routes");
//Registering middlewares

//we'll replace it with real domain when we deploy
app.disable("x-powered-by"); //this makes it more difficult for users to see that I am using Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(MongoDBSessionStoreConfig.sessionStore(MongoDBSessionStore)));
//Images
app.use("/product-images/images", express.static("product-images/images"));
//Routes
app.use(baseRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);

//Server error handler
app.use(function (error, req, res, next) {
  res.status(500).json({ message: error.message });
});
const port = process.env.PORT || 5000;
db.connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connection established on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Database connection not established");
  });
