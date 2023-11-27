require("dotenv").config();
const express = require("express");
const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/staticRoute");
const userRoutes = require("./routes/userRoute");
const {
  checkAuthentication,
  restrictTo,
} = require("./middleware/authMiddleware");
const path = require("path");
const { connectToMOngoDb } = require("./connection");
const URL = require("./models/url");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8000;

connectToMOngoDb(process.env.MONGO_URI).then(() =>
  console.log("MONGODB connected")
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication);
// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictTo(["Normal", "Admin"]), urlRoutes);
app.use("/", staticRoutes);
app.use("/user", userRoutes);
app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const event = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  if (!event) return res.status(400).json({ error: "Database not found" });
  res.redirect(event.redirectUrl);
});
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
