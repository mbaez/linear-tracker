class AppRouter {
  routes() {
    return ["time-entry", "session", "profile"];
  }
  /**
   * @constructor
   */
  constructor() {}
  register(app) {
    this.routes().map((resource) => {
      return app.use(
        `/api/v1/${resource}`,
        require(`./controllers/${resource}-controller`)
      );
    });
  }
}

const router = new AppRouter();
module.exports = router;
