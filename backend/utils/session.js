const MongoDBSessionStore = require("connect-mongodb-session");

function MongoDBSessionStorage(session) {
  const MongoDBStore = MongoDBSessionStore(session);
  const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    databaseName: "online-shop",
    collection: "sessions",
  });
  return store;
}

function sessionStore(store) {
  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      sameSite: true, //This helps prevent CSRF attacks but best used in production mode not necessary for development mode
      maxAge: process.env.EXPIRES * 1000,
      SameSite: "Lax",
      Path: "/",
      httpOnly: true,
    },
  };
}

module.exports = {
  MongoDBSessionStorage,
  sessionStore,
};
