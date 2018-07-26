import pg from 'pg';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import key from '../models/key';

const salt = bcrypt.genSaltSync(10);
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:success4me@localhost:5432/mydiary_dev';


/**
  *  class UserController
  *
  */
export default class UserController {
/**
  *  constructor
  *
  */
  constructor() {
    this.postUser = this.postUser.bind(this);
    //this.loginUser = this.loginUser.bind(this);
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
    const registeredUser = [];
    
    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }

    client.query('INSERT INTO diaryUser(firstName, lastName, email, password) values($1, $2, $3, $4)',
    [req.body.firstName, req.body.lastName, req.body.email, bcrypt.hashSync(req.body.password, salt)]);

    const getUser = client.query('SELECT * FROM diaryUser WHERE email=($1);', [req.body.email]);

    getUser.on('row', (row) => { 
      registeredUser.push(row); 
    });

    const token = jwt.sign({ id: registeredUser.id }, key.secret, { expiresIn: 60 * 60 });
    getUser.on('end', () => { 
      done();
      return res.status(201).send({
        message: 'User registered successfully', 
        registeredUser, token
      });
    });
  
  });

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
    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }

    const token = jwt.sign({ id: req.user.id }, key.secret, { expiresIn: 60 * 60 });

    if (bcrypt.compareSync(req.body.password, req.user.password)) {
      res.status(200).send({ 
        message: `Welcome! ${req.user.firstname} ${req.user.lastname}`,
        token 
      });
    } else {
      res.status(404).send({ message: 'Invalid email or password!' });
    }
  
  
  });

}





  
}
