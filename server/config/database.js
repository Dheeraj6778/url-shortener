const mongoose = require("mongoose");
const { MONGO_URI } = process.env;
let connect = () => {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connected to the database");
    })
    .catch((err) => {
      console.log("connection failed");
      console.log(err);
      process.exit(1);
    });
};
module.exports = {
  connect,
};
