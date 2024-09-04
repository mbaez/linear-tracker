const express = require("express");
const path = require("path");
const dev = process.env.NODE_ENV !== "production";
const appRouter = require("./app-router");
// middlewares
const jwt = require("./middlewares/jwt-middleware");
const error = require("./middlewares/error-middleware");
const dataParser = require("./middlewares/persistence-data-parser");
const sequelizeTrx = require("./middlewares/sequelize-transaction-middleware");



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
  console.log("🚀 ~ app.use ~ req:", req.path);

  if (
    /(.ico|.js|.css|.jpg|.png|.svg|.json|.map|.woff2|.ttf)$/i.test(req.path) ||
    req.path.includes("/api/v1")
  ) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(__dirname, "./webapp/build", "index.html"));
  }
});

app.use(express.static(path.join(__dirname, "./webapp/build")));
// Security layer
app.use(jwt);
// middlewares
app.use(sequelizeTrx);
app.use(dataParser);
// add the routes for each app
appRouter.register(app);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
