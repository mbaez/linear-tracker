const BaseDao = require("./base-dao");
const { time_entry: Model } = require("../models");

module.exports = class TimeEntryDao extends BaseDao {
  /**
   * @constructor
   */
  constructor() {
    super(Model, "time-entry");
    this.logger = console;
  }
};
