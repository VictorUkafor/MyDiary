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
  *  @param  {object} key the third parameter
  *
  */
  constructor(jwt, bcrypt, key) {
    this.jwt = jwt;
    this.bcrypt = bcrypt;
    this.key = key;
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

    req.client.query(
      'INSERT INTO diaryUser(firstName, lastName, email, password) values($1, $2, $3, $4)',
      [req.body.firstName, req.body.lastName, req.body.email,
        this.bcrypt.hashSync(req.body.password, salt)]
    );

    const getUser = req.client.query('SELECT * FROM diaryUser WHERE email=($1);', [req.body.email]);

    getUser.on('row', (row) => { registeredUser.push(row); });

    getUser.on('end', () => {
      req.done();
      return res.status(201).send({
        message: 'User registered successfully', registeredUser
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
    const token = this.jwt.sign({ id: req.user.id }, this.key.secret, { expiresIn: 60 * 60 });

    if (this.bcrypt.compareSync(req.body.password, req.user.password)) {
      res.status(200).send({
        message: `Welcome! ${req.user.firstname} ${req.user.lastname}`, token
      });
    } else {
      res.status(404).send({ message: 'Invalid email or password!' });
    }
  }
}
