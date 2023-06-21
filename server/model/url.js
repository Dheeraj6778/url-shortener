const mongoose = require("mongoose");
const urlSchema = mongoose.Schema({
  full_url: { type: String, required: true },
  shortened_url: { type: String,required:true },
  date_added: { type: String },
  clicks: { type: Number},
});

//creating a model using th schema
const Url = mongoose.model("url", urlSchema);
module.exports = {
  Url,
};
