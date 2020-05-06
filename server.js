require("dotenv").config();
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
    currentPort: PORT,
  });
});

const users = [
  {
    _id: "1",
    email: "bob@gmail.com",
    password: "password",
  },
  {
    _id: "2",
    email: "debby@gmail.com",
    password: "password",
  },
  {
    _id: "3",
    email: "test@gmail.com",
    password: "password",
  },
];

app.post("/api/users", (req, res) => {
  // TODO: User Authentication
  // if user exists in my database.
  const { email, password } = req.body;
  const foundUserArray = users.filter((user) => user.email === email);
  console.log(foundUserArray);
  if (foundUserArray.length > 0) {
    const userToAuthenticate = foundUserArray[0];
    if (userToAuthenticate.password === password) {
      res.json({
        success: true,
        message: "We found a user",
        // TODO: Convert data here to a JWT for future authentication.
        data: userToAuthenticate,
      });
    } else {
      res.status(403);
      res.json({
        success: false,
        message: "Invalid username or password.",
        data: null,
      });
    }
  } else {
    res.status(400);
    res.json({
      success: false,
      message: "Invalid username or password.",
      data: null,
    });
  }
});

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Express App is running on http://localhost:${PORT}`);
});
