const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const port = 4000;
const mongoose = require("mongoose");

const userModel = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/dcs")
  .then(() => console.log("mongo db connected"));

app.get("/", (req, res) => res.send("Hello Fullstack!"));

// Register user
app.post("/api/registration", (req, res) => {
  const newUser = req.body;
  userModel.create(newUser);
  return res.json({ data: "Regristation User Successfully...." });
});

// Login User
app.post("/api/Login", async (req, res) => {
  var post = req.body;
  var display_data = [];
  display_data = await userModel.find({ email: post.email, password: post.password });
  //console.log(display_data);
  if (display_data.length > 0) {
    return res.json(display_data);
  } else {
    return res.json({ error: false });
  }
});

// Display user information from name
app.post("/api/getData", async (req, res) => {
  var post1 = req.body;
  var display_data1 = [];
  var display_data1 = await userModel.find({ name: post1.name });
  // console.log(display_data1);
  if (display_data1 != null) {
    return res.json(display_data1);
  }
  else {
    return res.json({ data: "No Data Found" });
  }
});
//Display user information from name
app.post("/api/getDataUser", async (req, res) => {
  var post1 = req.body;
  //console.log(post1.email1);
  var display_data = [];
  var display_data = await userModel.find({ email: post1.email1 });
  //console.log(display_data);
  if (display_data != null) {
    return res.json({ display_data });
  }
  else {
    return res.json({ data: "No Data Found" });
  }
});

//Delete the user
app.post("/api/Delete", async (req, res) => {
  console.log(req.body.email1);
  const deleteUser = await userModel.findOneAndDelete({ email: req.body.email1 });
  if (deleteUser == null) {
    return res.json({ data: "User Already Deleted..." });
  }
  else {
    return res.json({ data: "User Info Deleted..." });
  }
});

//Update the User
app.put("/api/Update", async (req, res) => {
  const updateUser = await userModel.findOneAndUpdate(
    { email: req.body.email1 },
    { name: req.body.name, address: req.body.address, phone_no: req.body.phone_no },
    { new: true }
  );
  if (updateUser == null) {
    return res.json({ data: "User info not updated.." });
  } else {
    return res.json({ data: "User info updated..." });
  }
});
app.listen(port, () => console.log(`server running on port 4000`));