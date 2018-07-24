import bcrypt from 'bcrypt';

/**
  *  class UserController
  *
  */
export default class UserController {
/**
  *  constructor
  *  Takes two parameter
  * @param {object} id the first parameter
  * @param {object} data the second parameter
  *
  */
  constructor(id, data) {
    this.users = data.users;
    this.id = id;
    this.postUser = this.postUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }


  /** An API for adding a new user:
  *  POST: api/v1/signup
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  postUser(req, res) {
    const salt = bcrypt.genSaltSync(10);

    const id = this.id.v4();
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;
    const password = bcrypt.hashSync(req.body.password, salt);
    const user = {
      id, firstName, lastName, email, password,
    };

    if(this.users.push(user)){
      return res.status(201).send({
        message: ['A user account has been created successfully', user]
      });
    }

    return res.status(500).send({
      message: 'Server error: User could not be created!'
    })

  }


  /**
   *  An API for logging into the app
   *  POST: /api/v1/login
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  loginUser(req, res) {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
      res.status(201).send({ message: `Welcome! ${req.user.firstName} ${req.user.lastName}` });
    } else {
      res.status(404).send({ message: 'Invalid email or password!' });
    }
  }
}
