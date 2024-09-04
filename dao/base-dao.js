//const Boom = require("boom");
const { Sequelize } = require("sequelize");
const { constructSettings } = require("../helpers/db-persistence-helper");

/**
 * Data access object layer, base layer that implements the base operations
 * to perform CRUD operations over the models.
 *
 * @name BaseDao
 * @author mbaez
 */
module.exports = class BaseDao {
  /**
   * @constructor
   *
   * @param {Sequelize.Model} model model instance used to fetch the information from the database.
   * @param {String} modelName the model name used for logging proposes
   */
  constructor(model, modelName) {
    this.model = model;
    this.modelName = modelName;
    this.logger = console;
  }

  /**
   * Get the logged in user data.
   * @param {*} token
   */
  async getUser(token) {
    if (token) {
      // return await UserModel.findOne({ where: { mail: token.email } });
    }
  }

  /**
   * Fetch all the record that matches with the defined criteria.
   *
   * @param {*} filters
   * @param {*} orders
   * @param {*} paging
   * @param {*} generalFilter
   * @param {*} preventCount
   * @param {*} defaultSettings
   * @param {*} token
   */
  async getAll(
    filters,
    orders,
    paging,
    generalFilter,
    preventCount,
    defaultSettings,
    token
  ) {
    try {
      this.logger.info(`👷-Fetch all ${this.modelName}`);
      defaultSettings = defaultSettings ? defaultSettings : {};
      let settings = constructSettings(
        defaultSettings,
        this.model,
        filters,
        orders,
        paging,
        generalFilter
      );
      
      this.logger.info(`👷-Fetch with ${JSON.stringify(settings)}`);
      if (preventCount) {
        return await this.model.findAll(settings);
      }
      return await this.model.findAndCountAll(settings);
    } catch (error) {
      this.logger.error(`💥- ${error}`);
    }
  }

  /**
   * Fetch all the record that matches with the defined filter criteria.
   * @param {*} filters
   * @returns
   */
  async findWhere(filters) {
    this.logger.info(
      `👷- Fetch ${this.modelName} where: ${JSON.stringify(filters)}`
    );

    const resp = await this.model.findAll({
      where: filters,
    });
    return resp;
  }

  /**
   * Fetch the first record that matches with the defined filter criteria.
   * @param {*} filters
   * @returns
   */
  async findOne(filters, settings) {
    this.logger.info(
      `👷- Fetch ${this.modelName} where: ${JSON.stringify(filters)}`
    );

    const resp = await this.model.findOne({
      where: filters,
      ...settings,
    });
    return resp;
  }

  /**
   * Fetch the record by id
   *
   * @param {*} id
   * @param {*} token
   */
  async get(id, defaultSettings, token) {
    if (!id) {
      return null;
    }
    try {
      this.logger.info(`👷- Fetch ${this.modelName} with id: ${id}`);
      defaultSettings = defaultSettings ? defaultSettings : {};

      return await this.model.findByPk(String(id), defaultSettings);
    } catch (error) {}
  }

  /**
   * Persist a record.
   *
   * @param {*} model
   * @param {*} token
   */
  async save(model, token) {
    if (!model) {
      return null;
    }
    try {
      if (!!token) {
        const current = await this.getUser(token);
        model["user_id"] = current.id;
      }
      this.logger.info(`👷- Save ${this.modelName}`);
      const newModel = this.model.build(model);
      await newModel.save();
      return newModel;
    } catch (error) {
      this.logger.error(`💥- ${error}`);
    }
  }

  /**
   * Update a record.
   *
   * @param {*} id
   * @param {*} model
   * @param {*} token
   */
  async update(id, model, token) {
    if (!model) {
      return null;
    }
    const persisted = await this.findOne({ id: id });
    if (!persisted) {
      return null;
    }
    //this.logger.info(`👷- Update ${this.modelName} with id ${id}`);
    const unless = ["id", "createdAt", "updatedAt", "deletedAt"];

    if (token) {
      const current = await this.getUser(token);
      model["updatedBy"] = current.id;
    }

    Object.keys(model).forEach((key) => {
      if (unless.indexOf(key) === -1) {
        persisted[key] = model[key];
      }
    });

    try {
      await persisted.save();
      return persisted;
    } catch (error) {
      this.logger.error(`💥- ${error}`);
    }
  }

  /**
   * Soft delete a record.
   *
   * @param {*} id
   * @param {*} token
   */
  async remove(id, token) {
    if (!id) {
      return null;
    }
    try {
      this.logger.info(`👷- Remove ${this.modelName} with id ${id}`);
      const persisted = await this.model.findById(id);
      return await persisted.destroy();
    } catch (error) {
      this.logger.error(`💥- ${error}`);
    }
  }
};
