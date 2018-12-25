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
export default class UserMiddleware {
  /**
      *  constructor
      *  Takes 2 parameters
      *  @param {object} jwt the first parameter
      *  @param  {object} env the second parameter
      *
      */
  constructor(jwt, env, queries) {
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
  checksIfUserAlreadyExist(req, res, next) {
    const registeredUser = [];
    const User = this.queries.getAUser(req);

    User.on('row', (row) => { registeredUser.push(row); });

    User.on('end', () => {
      req.done();
      if (registeredUser.length > 0) {
        return res.status(409).send({ errors: 'An account with this email has already been created!' });
      }
      next();
    });
  }

  /** A middleware method for checking  if login required fields are filled
    *  Takes 3 parameters
    *  @param {object} req the first parameter
    *  @param  {object} errors the second parameter
    *  @param  {string} field the third parameter
    *  @param  {string} fieldName the fourth parameter
    *  @returns {object} return an object
    */
  fieldIsEmpty(req, errors, field, fieldName) {
    if (!req.body[field] || req.body[field].trim() === 0) {
      errors[field] = `${fieldName} field is required`;
    }
  }


  /** A middleware method for checking  if login required fields are filled
  *  Takes 3 parameters
  *  @param {object} req the first parameter
  *  @param  {object} errors the second parameter
  *  @returns {object} return an object
  */
  emailIsValid(req, errors) {
    if (req.body.email) {
      if (!this.emailFormat.test(req.body.email.trim())) {
        errors.email = 'You\'ve entered an invalid email';
      }
    }
  }


  /** A method for checking if required fields are filled for signup API
        *  Takes 3 parameters
        *  @param {object} req the first parameter
        *  @param  {object} res the second parameter
        *  @param  {object} next the third parameter
        *  @returns {object} return an object
        */
  checksForSignUpRequiredFields(req, res, next) {
    const errors = {};

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
      return res.status(400).send({ errors: 'All fields must be filled' });
    }
    next();
  }


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
  checksIfUserExist(req, res, next) {
    const authenticatedUser = [];
    const User = this.queries.getAUser(req);

    User.on('row', (row) => { authenticatedUser.push(row); });

    User.on('end', () => {
      req.done();
      if (authenticatedUser.length === 0) {
        return res.status(404).send({ errors: 'Invalid email or password!' });
      }

      req.user = authenticatedUser[0];
      next();
    });
  }

  /** A middleware method for checking  if login required fields are filled
          *  Takes 3 parameters
          *  @param {object} req the first parameter
          *  @param  {object} res the second parameter
          *  @param  {object} next the third parameter
          *  @returns {object} return an object
          */
  checksForLogInRequiredFields(req, res, next) {
    const errors = {};

    this.fieldIsEmpty(req, errors, 'email', 'Email');
    this.fieldIsEmpty(req, errors, 'password', 'Password');
    this.emailIsValid(req, errors);

    if (Object.keys(errors).length > 0) {
      res.status(400).send({ errors: 'Both fields must be filled' });
    } else {
      next();
    }
  }


  /**
   *  A middleware method for checking  if login required fields are filled
   * Takes 3 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *  @param  {object} next the third parameter
   *  @returns {object} return an object
   */
  checksIfPhotoIsUploaded(req, res, next) {
    if (!req.files) {
      next();
    } else {
      if (req.files.photograph.mimetype !== 'image/jpeg' &&
       req.files.photograph.mimetype !== 'image/png' &&
       req.files.photograph.mimetype !== 'image/gif') {
        return res.status(400).send({ errors: 'Uploaded file must be an image type of png, jpg or gif' });
      }
      const photograph = req.files.photograph;
      photograph.mv(`./client/images/users/${photograph.name}`, (err) => {
        if (err) {
          return res.status(500).send({ errors: 'Server error! Photograph can not be saved' });
        }

        next();
      });
    }
  }


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
  checksIfUserIsAuthenticated(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.authentication;
    const authenticatedUser = [];

    if (!token) {
      return res.status(401).send({
        authenticated: false, errors: 'You are not registered user!'
      });
    }

    this.jwt.verify(token, this.env.SECRET_KEY, (err, authenticated) => {
      if (!authenticated) {
        return res.status(401).send({
          authenticated: false, errors: 'You are not registered user!'
        });
      }

      const getUser = this.queries.getAUserById(req, authenticated);

      getUser.on('row', (row) => { authenticatedUser.push(row); });

      getUser.on('end', () => {
        req.done();
        if (authenticatedUser.length === 0) {
          return res.status(404).send({ message: 'User can not be found!' });
        }

        req.user = authenticatedUser[0];
        next();
      });
    });
  }
}

