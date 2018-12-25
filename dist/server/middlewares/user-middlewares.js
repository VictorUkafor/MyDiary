'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @fileOverview this JS file contains logic for user middleware methods
 *
 * @author  Victor Ukafor
 * @requires  NPM:jsonwebtoken
 * @version 1.0.0
 *
 */

/**
  *  class UserMiddleware
  *
  */
var UserMiddleware = function () {
  /**
      *  constructor
      *  Takes 2 parameters
      *  @param {object} jwt the first parameter
      *  @param  {object} env the second parameter
      *
      */
  function UserMiddleware(jwt, env, queries) {
    _classCallCheck(this, UserMiddleware);

    this.jwt = jwt;
    this.env = env;
    this.queries = queries;

    // The regular expression used here is a code snippet from  stackoverflow.com. I'm yet
    // to fully understand regular expression in javascript. See the full link below
    // "https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation?lq=1"
    this.emailFormat = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    this.checksIfUserAlreadyExist = this.checksIfUserAlreadyExist.bind(this);
    this.checksIfUserExist = this.checksIfUserExist.bind(this);
    this.checksForSignUpRequiredFields = this.checksForSignUpRequiredFields.bind(this);
    this.checksForLogInRequiredFields = this.checksForLogInRequiredFields.bind(this);
    this.checksIfUserIsAuthenticated = this.checksIfUserIsAuthenticated.bind(this);
  }

  /** A middleware method for checking if user already exist
        *  Takes 3 parameters
        *  @param {object} req the first parameter
        *  @param  {object} res the second parameter
        *  @param  {object} next the third parameter
        *  @returns {object} return an object
        *
        * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
        * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
        */


  _createClass(UserMiddleware, [{
    key: 'checksIfUserAlreadyExist',
    value: function () {
      function checksIfUserAlreadyExist(req, res, next) {
        var registeredUser = [];
        var User = this.queries.getAUser(req);

        User.on('row', function (row) {
          registeredUser.push(row);
        });

        User.on('end', function () {
          req.done();
          if (registeredUser.length > 0) {
            return res.status(409).send({ errors: 'An account with this email has already been created!' });
          }
          next();
        });
      }

      return checksIfUserAlreadyExist;
    }()

    /** A middleware method for checking  if login required fields are filled
      *  Takes 3 parameters
      *  @param {object} req the first parameter
      *  @param  {object} errors the second parameter
      *  @param  {string} field the third parameter
      *  @param  {string} fieldName the fourth parameter
      *  @returns {object} return an object
      */

  }, {
    key: 'fieldIsEmpty',
    value: function () {
      function fieldIsEmpty(req, errors, field, fieldName) {
        if (!req.body[field] || req.body[field].trim() === 0) {
          errors[field] = String(fieldName) + ' field is required';
        }
      }

      return fieldIsEmpty;
    }()

    /** A middleware method for checking  if login required fields are filled
    *  Takes 3 parameters
    *  @param {object} req the first parameter
    *  @param  {object} errors the second parameter
    *  @returns {object} return an object
    */

  }, {
    key: 'emailIsValid',
    value: function () {
      function emailIsValid(req, errors) {
        if (req.body.email) {
          if (!this.emailFormat.test(req.body.email.trim())) {
            errors.email = 'You\'ve entered an invalid email';
          }
        }
      }

      return emailIsValid;
    }()

    /** A method for checking if required fields are filled for signup API
          *  Takes 3 parameters
          *  @param {object} req the first parameter
          *  @param  {object} res the second parameter
          *  @param  {object} next the third parameter
          *  @returns {object} return an object
          */

  }, {
    key: 'checksForSignUpRequiredFields',
    value: function () {
      function checksForSignUpRequiredFields(req, res, next) {
        var errors = {};

        this.fieldIsEmpty(req, errors, 'firstName', 'First Name');
        this.fieldIsEmpty(req, errors, 'lastName', 'Last Name');
        this.fieldIsEmpty(req, errors, 'email', 'Email');
        this.fieldIsEmpty(req, errors, 'password', 'Password');
        this.fieldIsEmpty(req, errors, 'confirm_password', 'Confirm Password');
        this.emailIsValid(req, errors);

        if (req.body.password && req.body.confirm_password) {
          if (req.body.password.trim() !== req.body.confirm_password.trim()) {
            errors.confirm_password = 'Passwords do not match';
          }
        }

        if (Object.keys(errors).length > 0) {
          return res.status(400).send({ errors: errors });
        }
        next();
      }

      return checksForSignUpRequiredFields;
    }()

    /** A method for checking if user exist
          *  Takes 3 parameters
          *  @param {object} req the first parameter
          *  @param  {object} res the second parameter
          *  @param  {object} next the third parameter
          *  @returns {object} return an object
          *
          * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
          * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
          */

  }, {
    key: 'checksIfUserExist',
    value: function () {
      function checksIfUserExist(req, res, next) {
        var authenticatedUser = [];
        var User = this.queries.getAUser(req);

        User.on('row', function (row) {
          authenticatedUser.push(row);
        });

        User.on('end', function () {
          req.done();
          if (authenticatedUser.length === 0) {
            return res.status(404).send({ errors: 'Invalid email or password!' });
          }

          req.user = authenticatedUser[0];
          next();
        });
      }

      return checksIfUserExist;
    }()

    /** A middleware method for checking  if login required fields are filled
            *  Takes 3 parameters
            *  @param {object} req the first parameter
            *  @param  {object} res the second parameter
            *  @param  {object} next the third parameter
            *  @returns {object} return an object
            */

  }, {
    key: 'checksForLogInRequiredFields',
    value: function () {
      function checksForLogInRequiredFields(req, res, next) {
        var errors = {};

        this.fieldIsEmpty(req, errors, 'email', 'Email');
        this.fieldIsEmpty(req, errors, 'password', 'Password');
        this.emailIsValid(req, errors);

        if (Object.keys(errors).length > 0) {
          res.status(400).send({ errors: errors });
        } else {
          next();
        }
      }

      return checksForLogInRequiredFields;
    }()

    /**
     *  A middleware method for checking  if login required fields are filled
     * Takes 3 parameters
     *  @param {object} req the first parameter
     *  @param  {object} res the second parameter
     *  @param  {object} next the third parameter
     *  @returns {object} return an object
     */

  }, {
    key: 'checksIfPhotoIsUploaded',
    value: function () {
      function checksIfPhotoIsUploaded(req, res, next) {
        if (!req.files) {
          next();
        } else {
          if (req.files.photograph.mimetype !== 'image/jpeg' && req.files.photograph.mimetype !== 'image/png' && req.files.photograph.mimetype !== 'image/gif') {
            return res.status(400).send({ errors: 'Uploaded file must be an image type of png, jpg or gif' });
          }
          var photograph = req.files.photograph;
          photograph.mv('./client/images/users/' + String(photograph.name), function (err) {
            if (err) {
              return res.status(500).send({ errors: 'Server error! Photograph can not be saved' });
            }

            next();
          });
        }
      }

      return checksIfPhotoIsUploaded;
    }()

    /**
       * A middleware method for checking if user is authenticated
       * Takes req and res to return the user object
       * @param {object} req the request object
       * @param {object} res the response object
       * @param {object} next the next object
       * @returns {object} the user object
       *
       * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
       * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
       */

  }, {
    key: 'checksIfUserIsAuthenticated',
    value: function () {
      function checksIfUserIsAuthenticated(req, res, next) {
        var _this = this;

        var token = req.body.token || req.query.token || req.headers.authentication;
        var authenticatedUser = [];

        if (!token) {
          return res.status(401).send({
            authenticated: false, errors: 'You are not registered user!'
          });
        }

        this.jwt.verify(token, this.env.SECRET_KEY, function (err, authenticated) {
          if (!authenticated) {
            return res.status(401).send({
              authenticated: false, errors: 'You are not registered user!'
            });
          }

          var getUser = _this.queries.getAUserById(req, authenticated);

          getUser.on('row', function (row) {
            authenticatedUser.push(row);
          });

          getUser.on('end', function () {
            req.done();
            if (authenticatedUser.length === 0) {
              return res.status(404).send({ message: 'User can not be found!' });
            }

            req.user = authenticatedUser[0];
            next();
          });
        });
      }

      return checksIfUserIsAuthenticated;
    }()
  }]);

  return UserMiddleware;
}();

exports['default'] = UserMiddleware;
//# sourceMappingURL=user-middlewares.js.map