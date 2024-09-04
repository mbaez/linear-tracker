const cls = require("cls-hooked");
const { sequelize, Sequelize } = require("../models");
var onFinished = require("on-finished");

const namespace = cls.getNamespace("linear-time-tracker");

module.exports = (req, res, next) => {
  const trxTime = Date.now();
  console.log(`Begin Transaction ${req.url} ${trxTime}`);
  namespace.bindEmitter(req);
  namespace.bindEmitter(res);
  namespace.bind(next);
  namespace.run(async () => {
    const transaction = await sequelize.transaction();
    namespace.set("transaction", transaction);
    onFinished(res, (err) => {
      if (res.statusCode == 200) {
        transaction.commit();
        console.log(`Commit Transaction ${req.url} ${transaction?.id}`);
      } else {
        transaction.rollback();
        console.log(`Rollback Transaction ${req.url} ${transaction?.id}`);
      }
    });
    next();
  });
};
