'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @fileOverview this JS file contains logic for database middleware methods
 *
 * @author  Victor Ukafor
 * @version 1.0.0
 *
 */

/**
  *  class DatabaseMiddleware
  *
  */
var DatabaseMiddleware = function () {
  /**
    *  constructor
    *  Takes 2 parameters
    *  @param  {object} pg the first parameter
    * @param  {object} env the second parameter
    *
    */
  function DatabaseMiddleware(pg, env) {
    _classCallCheck(this, DatabaseMiddleware);

    this.pg = pg;
    this.env = env;
    this.handlesConnectionToTheDatabase = this.handlesConnectionToTheDatabase.bind(this);
  }

  /** A middleware method for setting up connection to database
      *  Takes 3 parameters
      *  @param {object} req the first parameter
      *  @param  {object} res the second parameter
      *  @param  {object} next the third parameter
      *  @returns {object} return an object
      *
      * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
      * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
      */


  _createClass(DatabaseMiddleware, [{
    key: 'handlesConnectionToTheDatabase',
    value: function () {
      function handlesConnectionToTheDatabase(req, res, next) {
        var connectionString = this.env.DATABASE_DEV_URL;
        if (this.env.NODE_ENV === 'test') {
          connectionString = this.env.DATABASE_TEST_URL;
        }
        var pool = new this.pg.Pool({ connectionString: connectionString });

        pool.connect(function (err, client, done) {
          if (err) {
            done();
            return res.status(500).send({
              errors: 'Server error: Connection to the database failed!'
            });
          }

          req.client = client;
          req.done = done;
          next();
        });
      }

      return handlesConnectionToTheDatabase;
    }()
  }]);

  return DatabaseMiddleware;
}();

exports['default'] = DatabaseMiddleware;
//# sourceMappingURL=database-middlewares.js.map