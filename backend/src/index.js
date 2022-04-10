import express from "express";
import bodyParser from "body-parser";
const cors = require("cors");
const formData = require("express-form-data");

import { api } from "./routes";
import { connectDb, configResponse, configViewEngine } from "./config";
let app = express();
// config response
configResponse(app);
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
connectDb();
app.use("/api/v1", api);
app.use(formData.parse());
// config multer

// config port
let port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(
    "backend nodejs is running  http://localhost:" + port + "/api/v1/"
  );
});
