"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TimeEntry extends Model {
    static associate(models) {}
  }
  TimeEntry.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      issueId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      issue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      issueTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spentTime: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      schema: "public",
      paranoid: true,
      modelName: "time_entry",
    }
  );

  return TimeEntry;
};
