/**
  *  class AuthController
  *
  */
export default class AuthController {
  /**
      *  constructor
      *  Takes one parameter
      * @param {object} data the first parameter
      *
      */
  constructor(data) {
    this.users = data.users;
    this.checksIfUserAlreadyExist = this.checksIfUserAlreadyExist.bind(this);
    this.checksForSignUpRequiredFields = this.checksForSignUpRequiredFields.bind(this);
    this.checksIfUserExist = this.checksIfUserExist.bind(this);
    this.checksForLogInRequiredFields = this.checksForLogInRequiredFields.bind(this);
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
    const registeredUser = this.users.find(user => user.email === req.body.email);

    if (registeredUser) {
      res.status(500).send({ message: 'An account with this email has already been created!' });
    } else {
      next();
    }
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
      res.status(400).send({ message: errors });
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
    const authenticatedUser = this.users.find(user => user.email === req.body.email);

    if (!authenticatedUser) {
      res.status(404).send({ message: 'Invalid email or password!' });
    } else {
      req.user = authenticatedUser;
      next();
    }
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
}
