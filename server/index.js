require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connect to db
let db = require("./config/database");
db.connect();

//import Url from model
let { Url } = require("./model/url");

function getDate() {
  let today = new Date();
  let year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;
  return todayDate;
}

function shortenUrl(originalUrl) {
  const shortUrl = shortid.generate();
  const shortenedUrl = `localhost:${process.env.PORT}/${shortUrl}`;
  return shortenedUrl;
}

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/createUrl", async (req, res) => {
  const { url } = req.body;
  console.log(req.body);
  try {
    console.log("inside try");
    // let old=await Url.find({full_url: url});
    // if(old){
    //     return res.status(409).send("url already exists");
    // }
    let date = getDate();
    let shortened_url = shortenUrl(url);
    let obj = {
      full_url: url,
      shortened_url,
      date_added: date,
      clicks: 0,
    };
    console.log(obj);
    let urlObj = await Url.create({
      full_url: url,
      shortened_url,
      date_added: date,
      clicks: 0,
    });

    return res.status(201).json(urlObj);
  } catch (err) {
    console.log("error in adding it to db");
    res.send("error in creating url");
  }
});
app.get("/getData", async (req, res) => {
  console.log("get data");
  try {
    let data = await Url.find({});
    res.json(data);
  } catch (err) {
    console.log("error in fetching data from db");
  }
});

app.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log("id is ", id);
    if (!id) {
      return res.send("url not found");
    }
    let currUrl = `localhost:3001/${id}`;
    console.log("currUrl is ", currUrl);
    let obj = await Url.findOne({ shortened_url: currUrl });
    console.log("object is ", obj);
    if (!obj) {
      return res.status(404).send("url not found");
    }
    let result = await Url.updateOne({ _id: obj._id},{clicks: obj.clicks+1});
    return res.redirect(obj.full_url);
  } catch (err) {
    console.log("error in redirecting");
  }
});

let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on port 3001");
});
