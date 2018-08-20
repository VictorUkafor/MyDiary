/**
 * @fileOverview this JS file contains logic for database middleware methods
 *
 * @author  Victor Ukafor
 * @requires  NPM:pg
 * @version 1.0.0
 *
 */

/**
  *  class DatabaseMiddleware
  *
  */
export default class DatabaseMiddleware {
  /**
    *  constructor
    *  Takes 2 parameters
    *  @param  {object} pg the first parameter
    * @param  {object} env the second parameter
    *
    */
  constructor(pg, env) {
    this.pg = pg;
    this.env = env;
    this.handlesConnectionToTheDatabase = this.handlesConnectionToTheDatabase.bind(this);
  }


  /** A middleware method for setting up connection to database
      *  Takes 3 parameters
      *  @param {object} req the first parameter
      *  @param  {object} res the second parameter
      *  @param  {object} next the third parameter
      *  @returns {object} return an object
      *
      * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
      * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
      */
  handlesConnectionToTheDatabase(req, res, next) {
    const connectionString = this.env.DATABASE_DEV_URL;
    const pool = new this.pg.Pool({ connectionString });

    pool.connect((err, client, done) => {
      if (err) {
        done();
        return res.status(500).send({
          errors: 'Server error: Connection to the database failed!'
        });
      }

      req.client = client;
      req.done = done;
      next();
    });
  }
}
