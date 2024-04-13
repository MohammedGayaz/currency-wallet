const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { DB_URI, PORT } = require("./config");
const mainRouter = require("./routes/index");

const app = express();

mongoose
  .connect(DB_URI)
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.log("Erorr Connecting Database ", err));

//middle ware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//main router
app.use("/api/v1", mainRouter);

app.listen(PORT, () => console.log("Server Listening at port,", PORT));
