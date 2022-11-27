const cors = require("cors");
const express = require("express");
const router = require("./routes/router");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.0.7:3000",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    secret: "todosecret",
    signed: true,
    secure: false, //True for production,
    maxAge: 1440 * 60 * 1000, // 24 hours,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use(router);

app.listen(8080, () => {
  console.log("Server runnning on port 8080 🚀");
});
