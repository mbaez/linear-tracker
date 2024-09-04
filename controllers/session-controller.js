const jwt = require("jsonwebtoken");
var express = require("express");
const qs = require("qs");
const { LinearClient } = require("@linear/sdk");
var router = express.Router();
var axios = require("axios");

/**
 * Controller includes all read operations.
 *
 * @name class SessionController
 * @author mbaez
 */
class SessionController {
  /**
   * @constructor
   */
  constructor() {
    this.api = axios.create({ baseURL: "https://api.linear.app" });
  }

  /**
   *
   * @param {*} code
   */
  async login(req, res, next) {
    const { code } = req.body;
    const formData = {
      code: code,
      redirect_uri: process.env.BASE_URL,
      client_id: process.env.LINEAR_CLIENT_ID,
      client_secret: process.env.LINEAR_CLIENT_SECRET,
      grant_type: "authorization_code",
    };
    try {
      const response = await this.api.post(
        "/oauth/token",
        qs.stringify(formData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      if (response.status !== 200) {
        return res.status(response.status).json(data);
      }

      const data = response.data;
      const client = new LinearClient({ accessToken: data.access_token });
      const me = await client.viewer;

      const token = jwt.sign(
        { email: me.email, linearToken: data.access_token },
        process.env.JWT_SECRET,
        {
          expiresIn: data.expires_in,
        }
      );

      res.status(200).json({
        email: me.email,
        name: me.name,
        avatarUrl: me.avatarUrl,
        accessToken: token,
      });
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
    router.post(
      "/login",
      async (req, res, next) => await this.login(req, res, next)
    );
  }
}

const ctrl = new SessionController();
ctrl.register(router);

module.exports = router;
