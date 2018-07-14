
/**
  *  class UserController
  *
  */
export default class UserController {
/**
  *  constructor
  *  Takes two parameter
  *  @param {object} dummy_data the first parameter
  * @param {object} id the second parameter
  *
  */
  constructor(dummy_data, id) {
    this.users = dummy_data.users;
    this.id = id;
    this.addUser = this.addUser.bind(this);
  }


  /** An API for adding a new user:
  *  POST: api/v1/signup
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  addUser(req, res) {
    const errors = {};
    const registeredUser = this.users.find(user => user.email === req.body.email);

    if(!req.body.firstName){
        errors.firstName = 'First Name field is required';
    }

    if(!req.body.lastName){
        errors.lastName = 'Last Name field is required';
    }

    if(!req.body.email){
        errors.email = 'Email field is required';
    }

    if(req.body.email && req.body.email.indexOf('@') === -1){
        errors.email = 'You\'ve entered an invalid email';
    }

    if(!req.body.password){
        errors.password = 'Password field is required';
    }

    if(!req.body.confirmPassword){
        errors.confirmPassword = 'confirmPassword field is required';
    }

    if(req.body.password && req.body.confirmPassword && req.body.password !== req.body.confirmPassword){
        errors.confirmPassword = 'Passwords do not match';
    }



      if (Object.keys(errors).length > 0) {
        res.status(400).send({ message: errors });
      } else if (registeredUser) {
        res.status(500).send({ message: 'An account with this email has already been created!' });
      } else {
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
  



}