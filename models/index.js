"use strict";

const fs = require("fs");
const path = require("path");
const cls = require("cls-hooked");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
const namespace = cls.createNamespace("linear-time-tracker");

Sequelize.useCLS(namespace);
let sequelize;
sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
  ...config,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    if (typeof model == "Array") model.map((m) => (db[m.name] = m));
    else db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.namespace = namespace;

module.exports = db;
