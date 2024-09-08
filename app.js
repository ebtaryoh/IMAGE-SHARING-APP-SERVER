const express = require("express");
const app = express();
// const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const imageRouter = require("./routers/imageRouter");
// const adminRouter = require("./routers/adminRouter");
const adminLoginRouter = require("./routers/adminLoginRouter");

app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());

app.use("/api/images", imageRouter);
// app.use("/api/admin", adminRouter);
app.use("/api/admin", adminLoginRouter);

const PORT = 4000;

const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOO_URI);
    console.log(`DB is connected!`);
    app.listen(PORT, () => {
      console.log(`Server is listening on  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(
      `Couldn't connect to DB due to: Bad or no network which is ${error.message}`
    );
  }
};
start();
