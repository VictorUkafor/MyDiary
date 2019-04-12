'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @fileOverview this JS file contains logic for user's APIs logic
 *
 * @author  Victor Ukafor
 * @requires  NPM:jsonwebtoken
 * @requires  NPM:bcrypt
 * @version 1.0.0
 *
 */

/**
  *  class UserController
  *
  */
var UserController = function () {
  /**
    *  constructor
    *  Takes 4 parameters
    *  @param {object} jwt the first parameter
    *  @param  {object} bcrypt the second parameter
    *  @param  {object} env the third parameter
    *  @param  {object} queries the fourth parameter
    *
    */
  function UserController(jwt, bcrypt, env, queries) {
    _classCallCheck(this, UserController);

    this.jwt = jwt;
    this.bcrypt = bcrypt;
    this.env = env;
    this.queries = queries;
    this.postUser = this.postUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getAUser = this.getAUser.bind(this);
  }

  /** An API for adding a new user:
  *  POST: api/v1/auth/signup
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  *
  * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
  * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
  */


  _createClass(UserController, [{
    key: 'postUser',
    value: function () {
      function postUser(req, res) {
        var _this = this;

        var salt = this.bcrypt.genSaltSync(10);
        var registeredUser = [];
        var addUser = this.queries.insertUser(req, salt, this.bcrypt);

        addUser.on('row', function (row) {
          registeredUser.push(row);
        });
        addUser.on('end', function () {
          req.done();
          if (addUser) {
            var user = registeredUser[0];


            var token = _this.jwt.sign({ user_id: user.user_id }, _this.env.SECRET_KEY, { expiresIn: 60 * 60 });

            return res.status(201).send({ user: user, token: token });
          }

          return res.status(500).send({
            errorMessage: 'Internal server error'
          });
        });
      }

      return postUser;
    }()

    /**
     *  An API for logging into the app
     *  POST: /api/v1/auth/login
     *  Takes 2 parameters
     *  @param {object} req the first parameter
     *  @param  {object} res the second parameter
     *
     *  @returns {object} return an object
     */

  }, {
    key: 'loginUser',
    value: function () {
      function loginUser(req, res) {
        var user = req.user,
            body = req.body;

        var token = this.jwt.sign({ user_id: user.user_id }, this.env.SECRET_KEY, { expiresIn: 60 * 60 });

        if (this.bcrypt.compareSync(body.password.trim(), user.password)) {
          res.status(200).send({ user: user, token: token });
        } else {
          res.status(404).send({ errorMessage: 'Invalid email or password' });
        }
      }

      return loginUser;
    }()

    /**
     *  An API for fetching a single user from the app
     *  POST: /api/v1/user
     *  Takes 2 parameters
     *  @param {object} req the first parameter
     *  @param  {object} res the second parameter
     *
     *  @returns {object} return an object
     */

  }, {
    key: 'getAUser',
    value: function () {
      function getAUser(req, res) {
        var entries = [];
        var getEntries = this.queries.getAllEntries(req);

        getEntries.on('row', function (row) {
          entries.push(row);
        });
        req.user.entries = entries;

        getEntries.on('end', function () {
          req.done();
          return res.status(200).send(req.user);
        });
      }

      return getAUser;
    }()
  }]);

  return UserController;
}();

exports['default'] = UserController;
//# sourceMappingURL=users.js.map