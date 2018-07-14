
/**
  *  class AuthController
  *
  */
 export default class AuthController {
    /**
      *  constructor
      *
      */
      constructor(dummy_data) {
        this.users = dummy_data.users;
        this.checksIfUserAlreadyExist = this.checksIfUserAlreadyExist.bind(this);
        this.checksForUserRequiredFields = this.checksForUserRequiredFields.bind(this);
      }
    

    
      /** An API for adding a new user:
      *  POST: api/v1/signup
      *  Takes 2 parameters
      *  @param {object} req the first parameter
      *  @param  {object} res the second parameter
      *
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

      /** An API for adding a new user:
      *  POST: api/v1/signup
      *  Takes 2 parameters
      *  @param {object} req the first parameter
      *  @param  {object} res the second parameter
      *
      *  @returns {object} return an object
      */
      checksForUserRequiredFields(req, res, next) {
        const errors = {};
    
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
    
        if(!req.body.confirm_password){
            errors.confirm_password = 'confirmPassword field is required';
        }
    
        if(req.body.password && req.body.confirm_password && req.body.password !== req.body.confirm_password){
            errors.confirm_password = 'Passwords do not match';
        }
    
    
          if (Object.keys(errors).length > 0) {
            res.status(400).send({ message: errors });
          } else {
            next();
          }
        }
      
    
    
    
    }