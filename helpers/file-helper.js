const fs = require("fs");
const os = require("os");
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
   * Move the a file from the tmp dir to a persistence one.
   *
   * @param {String} tmpFile
   */
  async move(tmpFile) {
    const tmpdir = path.join(os.tmpdir());
    const oldPath = path.join(tmpdir, tmpFile);
    const newPath = path.join(__dirname, "..", "data/", tmpFile);
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    // se encarga de copiar el archivo del tmp al directorio final.
    fs.copyFile(oldPath, newPath, (err) => {
      if (err) {
        return reject(`Error trying to move the file ${newPath}`);
      }
      return resolve(newPath);
    });

    return promise;
  },
};
