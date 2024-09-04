/**
 * Base controller include all the read operations over the defined model.
 *
 * @name ReadableController
 * @author mbaez
 */
module.exports = class ReadableController {
  /**
   * @constructor
   * @param {BaseDelegate} delegate DAO used to fetch the information from the database.
   * @param {String} modelName the model name used for logging proposes
   */
  constructor(delegate, modelName) {
    this.delegate = delegate;
    this.modelName = modelName;
    this.logger = console;
  }

  /**
   * Get the keycloak access token from the request.
   *
   * @param {Express.Request} req Represents the HTTP request object.
   * @param {Express.Response} res Represents the HTTP response that an Express app sends when
   * it gets an HTTP request.
   * @param {Function} next Next middleware function.
   */
  getToken(req, res, next) {
    if (!req.kauth || !req.kauth.grant) {
      return {};
    }
    let source = req.kauth.grant.access_token.content;
    return Object.assign({}, source.content);
  }
  /**
   * Get all the records taking into account the filters, the order, and the pagination params.
   *
   * @param {Express.Request} req Represents the HTTP request object.
   * @param {Express.Response} res Represents the HTTP response that an Express app sends when
   * it gets an HTTP request.
   * @param {Function} next Next middleware function.
   */
  async getAll(req, res, next) {
    const list = await this.delegate.getAll(
      req.query.filters,
      req.query.orders,
      req.query.paging,
      req.query.all,
      req.query.preventCount,
      {},
      this.getToken(req, res, next)
    );
    res.json(list);
  }
  /**
   * Get the model by id.
   *
   * @param {Express.Request} req Represents the HTTP request object.
   * @param {Express.Response} res Represents the HTTP response that an Express app sends when
   * it gets an HTTP request.
   * @param {Function} next Next middleware function.
   */
  async get(req, res, next) {
    this.logger.info(`🏃- Will get ${this.modelName} ${req.params.id}`);
    const data = await this.delegate.get(
      req.params.id,
      {},
      this.getToken(req, res, next)
    );
    res.json(data);
  }

  /**
   * Add all the operations in the express router.
   *
   * @param {Express.Router} router Represents the app router
   */
  register(router) {
    router.get(`/`, (req, res, next) => {
      return this.getAll(req, res, next);
    });

    router.get(`/:id`, (req, res, next) => {
      return this.get(req, res, next);
    });
  }
};
