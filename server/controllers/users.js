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
export default class UserController {
/**
  *  constructor
  *  Takes 3 parameters
  *  @param {object} jwt the first parameter
  *  @param  {object} bcrypt the second parameter
  *  @param  {object} env the third parameter
  *
  */
  constructor(jwt, bcrypt, env, queries) {
    this.jwt = jwt;
    this.bcrypt = bcrypt;
    this.env = env;
    this.queries = queries;
    this.postUser = this.postUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
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
  postUser(req, res) {
    const salt = this.bcrypt.genSaltSync(10);
    const registeredUser = [];
    const addUser = this.queries.insertUser(req, salt, this.bcrypt);
    const getUser = this.queries.getAUser(req);

    getUser.on('row', (row) => { registeredUser.push(row); });

    getUser.on('end', () => {
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


  /**
   *  An API for logging into the app
   *  POST: /api/v1/auth/login
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  loginUser(req, res) {
    const token = this.jwt.sign({ user_id: req.user.user_id },
      this.env.SECRET_KEY, { expiresIn: 60 * 60 }
    );

    if (this.bcrypt.compareSync(req.body.password.trim(), req.user.password)) {
      res.status(200).send({
        message: `Welcome! ${req.user.firstname} ${req.user.lastname}`, token
      });
    } else {
      res.status(404).send({ errors: 'Invalid email or password!' });
    }
  }

  /**
   *  An API for fetching a single user from the app
   *  POST: /api/v1/user
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  getAUser(req, res) {
    const entries = [];
    const getEntries = req.client.query(
      'SELECT * FROM entry WHERE entry_user_id=($1);',
      [req.user.user_id]
    );

    getEntries.on('row', (row) => { entries.push(row); });
    req.user.entries = entries;

    getEntries.on('end', () => {
      req.done();
      return res.status(200).send(req.user);
    });
  }
}
