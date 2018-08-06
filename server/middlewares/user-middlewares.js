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
      *  @param  {object} key the third parameter
      *
      */
    constructor(jwt, key) {
      this.jwt = jwt;
      this.key = key;
      this.checksIfUserAlreadyExist = this.checksIfUserAlreadyExist.bind(this);
      this.checksForSignUpRequiredFields = this.checksForSignUpRequiredFields.bind(this);
      this.checksIfUserExist = this.checksIfUserExist.bind(this);
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
      const User = req.client.query('SELECT * FROM account WHERE email=($1);', [req.body.email]);
  
      User.on('row', (row) => { registeredUser.push(row); });
  
      User.on('end', () => {
        req.done();
        if (registeredUser.length > 0) {
          return res.status(409).send({ errors: 'An account with this email has already been created!' });
        }
  
        next();
      });
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
  
      if (!req.body.firstName) {
        errors.firstName = 'First Name field is required';
      }
  
      if (!req.body.lastName) {
        errors.lastName = 'Last Name field is required';
      }
  
      if (!req.body.email) {
        errors.email = 'Email field is required';
      }
  
      if (req.body.email && req.body.email.indexOf('@') === -1) {
        errors.email = 'You\'ve entered an invalid email';
      }
  
      if (!req.body.password) {
        errors.password = 'Password field is required';
      }
  
      if (!req.body.confirm_password) {
        errors.confirm_password = 'confirmPassword field is required';
      }
  
      if (req.body.password && req.body.confirm_password &&
         req.body.password !== req.body.confirm_password) {
        errors.confirm_password = 'Passwords do not match';
      }
  
  
      if (Object.keys(errors).length > 0) {
        return res.status(400).send({ errors: errors });
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
      const User = req.client.query('SELECT * FROM account WHERE email=($1);', [req.body.email]);
  
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
  
      if (!req.body.email) {
        errors.email = 'Email field is required';
      }
  
      if (req.body.email && req.body.email.indexOf('@') === -1) {
        errors.email = 'You\'ve entered an invalid email';
      }
  
      if (!req.body.password) {
        errors.password = 'Password field is required';
      }
  
      if (Object.keys(errors).length > 0) {
        res.status(400).send({ errors });
      } else {
        next();
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
  
      this.jwt.verify(token, this.key.secret, (err, authenticated) => {
        if (!authenticated) {
          return res.status(500).send({
            authenticated: false, errors: 'You are not registered user!'
          });
        }
  
        const getUser = req.client.query('SELECT * FROM account WHERE user_id=($1)', [authenticated.user_id]);
  
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
  