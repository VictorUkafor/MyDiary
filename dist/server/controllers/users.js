

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
const UserController = (function () {
  /**
    *  constructor
    *  Takes 3 parameters
    *  @param {object} jwt the first parameter
    *  @param  {object} bcrypt the second parameter
    *  @param  {object} env the third parameter
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
    value: (function () {
      function postUser(req, res) {
        const salt = this.bcrypt.genSaltSync(10);
        const registeredUser = [];
        const addUser = this.queries.insertUser(req, salt, this.bcrypt);

        addUser.on('row', (row) => {
          registeredUser.push(row);
        });
        addUser.on('end', () => {
          req.done();
          if (addUser) {
            return res.status(201).send({
              success: 'User registered successfully', registeredUser
            });
          }

          return res.status(500).send({
            errors: 'Server error: User could not be added!'
          });
        });
      }

      return postUser;
    }())

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
    value: (function () {
      function loginUser(req, res) {
        const token = this.jwt.sign({ user_id: req.user.user_id }, this.env.SECRET_KEY, { expiresIn: 60 * 60 });

        if (this.bcrypt.compareSync(req.body.password.trim(), req.user.password)) {
          res.status(200).send({
            message: `Welcome! ${String(req.user.firstname)} ${String(req.user.lastname)}`, token
          });
        } else {
          res.status(404).send({ errors: 'Invalid email or password!' });
        }
      }

      return loginUser;
    }())

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
    value: (function () {
      function getAUser(req, res) {
        const entries = [];
        const getEntries = this.queries.getAllEntries(req);

        getEntries.on('row', (row) => {
          entries.push(row);
        });
        req.user.entries = entries;

        getEntries.on('end', () => {
          req.done();
          return res.status(200).send(req.user);
        });
      }

      return getAUser;
    }())
  }]);

  return UserController;
}());

exports.default = UserController;
// # sourceMappingURL=users.js.map
