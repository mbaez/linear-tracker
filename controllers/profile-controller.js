var express = require("express");
const { LinearClient, LinearDocument, IssueFilter } = require("@linear/sdk");
var router = express.Router();

/**
 * Controller includes all read operations.
 *
 * @name class ProfileController
 * @author mbaez
 */
class ProfileController {
  /**
   * @constructor
   */
  constructor() {}

  /**
   *
   * @param {*} code
   */
  async me(req, res, next) {
    try {
      const auth = req.auth;
      const client = new LinearClient({ accessToken: auth.linearToken });
      const me = await client.viewer;
      res.status(200).json(me);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  /**
   *
   * @param {*} code
   */
  async myAssignments(req, res, next) {
    try {
      const auth = req.auth;
      const client = new LinearClient({ accessToken: auth.linearToken });
      const me = await client.viewer;
      const myIssues = await me.assignedIssues({
        first: 100,
        orderBy: LinearDocument.PaginationOrderBy.CreatedAt,
      });
      const i = await Promise.all(
        myIssues.nodes.map(async (issue) => {
          issue.meta = {
            state: await issue.state,
            project: await issue.project,
          };
          return issue;
        })
      );
      res.status(200).json(myIssues);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
   * Add all the operations in the express router.
   *
   * @param {Express.Router} router Represents the app router
   */
  register(router) {
    router.get("/me", async (req, res, next) => await this.me(req, res, next));
    router.get(
      "/my-assignments",
      async (req, res, next) => await this.myAssignments(req, res, next)
    );
  }
}

const ctrl = new ProfileController();
ctrl.register(router);

module.exports = router;
