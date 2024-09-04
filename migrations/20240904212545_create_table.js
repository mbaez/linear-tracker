const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "time_entries", deps: []
 *
 */

const info = {
  revision: 1,
  name: "create_table",
  created: "2024-09-04T21:25:45.319Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "time_entries",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        userId: { type: Sequelize.UUID, field: "userId", allowNull: false },
        email: { type: Sequelize.STRING, field: "email", allowNull: false },
        issueId: { type: Sequelize.UUID, field: "issueId", allowNull: false },
        issue: { type: Sequelize.STRING, field: "issue", allowNull: false },
        issueTitle: {
          type: Sequelize.STRING,
          field: "issueTitle",
          allowNull: false,
        },
        spentTime: {
          type: Sequelize.FLOAT,
          field: "spentTime",
          allowNull: false,
        },
        note: { type: Sequelize.STRING, field: "note" },
        date: { type: Sequelize.DATEONLY, field: "date", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["time_entries", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
