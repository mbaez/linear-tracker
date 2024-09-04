const fs = require("fs");
const path = require("path");

module.exports = {
  /**
   * Se encarga de cargar un archivo  de forma asincrona.
   *
   * @param {string} fileName
   * @returns {Promise} un promise para la operación.
   */
  async load(fileName) {
    let resolve, reject;
    var fname = path.join(__dirname, "..", fileName);
    var p = new Promise(function (_resolve, _reject) {
      resolve = _resolve;
      reject = _reject;
    });

    fs.readFile(fname, "utf-8", (err, data) => {
      if (err) {
        console.log(data, err);
        reject(err);
      } else {
        resolve(data);
      }
    });

    return p;
  },

  /**
   * Se encarga de ejecutar un query
   * @param {*} sql
   * @param {*} filters
   */
  async run(sql, filters, conn) {
    const {sequelize, Sequelize} = conn
    
    return sequelize.query(sql, {
      replacements: filters,
      type: Sequelize.QueryTypes.SELECT,
    });
  },
};
