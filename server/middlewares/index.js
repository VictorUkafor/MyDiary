import pg from 'pg';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import key from '../models/key';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:success4me@localhost:5432/mydiary_dev';

/**
  *  class AuthController
  *
  */
export default class AuthController {
  /**
      *  constructor
      *
      */
  constructor() {
    this.checksIfUserAlreadyExist = this.checksIfUserAlreadyExist.bind(this);
    this.checksForSignUpRequiredFields = this.checksForSignUpRequiredFields.bind(this);
    this.checksIfUserExist = this.checksIfUserExist.bind(this);
    this.checksForLogInRequiredFields = this.checksForLogInRequiredFields.bind(this);
    this.checksIfUserIsAuthenticated = this.checksIfUserIsAuthenticated.bind(this);
  }


  /** A method for checking if required fields are entered
      *  POST: api/v1/signup
      *  Takes 3 parameters
      *  @param {object} req the first parameter
      *  @param  {object} res the second parameter
      *  @param  {object} next the third parameter
      *  @returns {object} return an object
      */
  checksIfUserAlreadyExist(req, res, next) {

    const registeredUser = [];
    
    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }

    const User = client.query('SELECT * FROM diaryUser WHERE email=($1);', [req.body.email]);

    User.on('row', (row) => { 
      registeredUser.push(row); 
    });

    User.on('end', () => { 
      done();
      if(registeredUser.length > 0){
        return res.status(400).send({ message: 'An account with this email has already been created!' });
      } 
      
      next();
    });

  });
  
 
  }

  /** A method for checking if user has already been registered:
      *  POST: api/v1/signup
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
      return res.status(400).send({ message: errors });
    } else {
      next();
    }
  }


  /** A method for checking if required fields are entered
      *  POST: api/v1/signup
      *  Takes 3 parameters
      *  @param {object} req the first parameter
      *  @param  {object} res the second parameter
      *  @param  {object} next the third parameter
      *  @returns {object} return an object
      */
  checksIfUserExist(req, res, next) {
    const authenticatedUser = [];
    
    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }

    const User = client.query('SELECT * FROM diaryUser WHERE email=($1);', [req.body.email]);

    User.on('row', (row) => { 
      authenticatedUser.push(row); 
    });

    User.on('end', () => { 
      done();
      if(authenticatedUser.length === 0){
        return res.status(404).send({ message: 'Invalid email or password!' });
      } 

      req.user = authenticatedUser[0];
      next();
    });

  });    


  }

  /** A method for checking login required fields:
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
      res.status(400).send({ message: errors });
    } else {
      next();
    }
  }



    /**
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the user object
   */
  checksIfUserIsAuthenticated(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['authentication'];
    const authenticatedUser = [];

    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }
    
    if (!token) {
      return res.status(401).send({
        authenticated: false, message: 'Token not found!'
      });
    }
    
    jwt.verify(token, key.secret, (err, authenticated) => {
      if (!authenticated) {
        return res.status(500).send({
          authenticated: false, message: 'You are not registered user!'
        });
      }

      const getUser = client.query('SELECT * FROM diaryUser WHERE id=($1);', [authenticated.id]);

      getUser.on('row', (row) => { 
        authenticatedUser.push(row); 
      });
  
      getUser.on('end', () => { 
        done();
        if(authenticatedUser.length === 0){
          return res.status(404).send({ message: 'User can not be found!' });
        }
        
        req.user = authenticatedUser[0];
        next();
      });
        
      });
    });

  }



}
