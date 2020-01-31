const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

const items = require("./routes/api/items");
const orders = require("./routes/api/orders");
const foods = require("./routes/api/foods");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

//Body parser middleware
app.use(express.json());

// DB config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

app.use("/api/items", items);
app.use("/api/orders", orders);
app.use("/api/foods", foods);
app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
