var express = require("express");
const ReadableController = require("./readable-controller");
const Dao = require("../dao/time-entry-dao");
const { Sequelize } = require("sequelize");
const { LinearClient } = require("@linear/sdk");
var router = express.Router();

/**
 * Controller includes all read operations.
 *
 * @name class TimeEntryController
 * @author mbaez
 */
class TimeEntryController extends ReadableController {
  /**
   * @constructor
   */
  constructor() {
    super(new Dao(), "time-entry");
  }

  /**
   *
   * @param {*} code
   */
  async create(req, res, next) {
    try {
      const auth = req.auth;
      const client = new LinearClient({ accessToken: auth.linearToken });
      const me = await client.viewer;

      const data = {
        userId: me.id,
        email: me.email,
        ...req.body,
      };
      const d = await this.delegate.save(data);
      this.#addComment(client, data);
      //
      res.status(200).json(d);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
   * Get all the records taking into account the filters, the order, and the pagination params.
   *
   * @param {Express.Request} req Represents the HTTP request object.
   * @param {Express.Response} res Represents the HTTP response that an Express app sends when
   * it gets an HTTP request.
   * @param {Function} next Next middleware function.
   * @override
   */
  async getAll(req, res, next) {
    // add the new filter criteria
    req.query.filters.push({
      email: {
        [Sequelize.Op.eq]: req.auth.email,
      },
    });

    await super.getAll(req, res, next);
  }

  async #addComment(client, data) {
    const commentPayload = await client.createComment({
      issueId: data.issueId,
      body: `Added ${data.spentTime}horus using linear time traker`,
    });

    if (commentPayload.success) {
      return commentPayload.comment;
    } else {
      return new Error("Failed to create comment");
    }
  }

  /**
   * Add all the operations in the express router.
   *
   * @param {Express.Router} router Represents the app router
   */
  register(router) {
    super.register(router);
    router.post(
      "/",
      async (req, res, next) => await this.create(req, res, next)
    );
  }
}

const ctrl = new TimeEntryController();
ctrl.register(router);

module.exports = router;
