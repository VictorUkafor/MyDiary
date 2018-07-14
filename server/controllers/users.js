
/**
  *  class UserController
  *
  */
export default class UserController {
/**
  *  constructor
  *  Takes two parameter
  *  @param {object} dummyData the first parameter
  * @param {object} id the second parameter
  *
  */
  constructor(dummyData, id) {
    this.users = dummyData.users;
    this.id = id;
    this.postUser = this.postUser.bind(this);
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
    const id = this.id.v4();
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const user = {
      id, firstName, lastName, email, password,
    };

    this.users.push(user);
    return res.status(201).send({
      message: ['A user account has been created successfully', user]
    });
  }
}
