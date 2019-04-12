/**
 * @fileOverview this JS file contains logic for entry middleware methods
 *
 * @author  Victor Ukafor
 * @version 1.0.0
 *
 */

/**
  *  class EntryMiddleware
  *
  */
export default class EntryMiddleware {
  /**
    *  constructor
    *  @param  {object} queries the only parameter
    *
    */
  constructor(queries) {
    this.queries = queries;
    this.checksIfEntryExist = this.checksIfEntryExist.bind(this);
  }

  /** A middleware method for checking if required field for add entry is filled
      *  Takes 3 parameters
      *  @param {object} req the first parameter
      *  @param  {object} res the second parameter
      *  @param  {object} next the third parameter
      *  @returns {object} return an object
      */
  static checksForAddEntryRequiredFields(req, res, next) {
    if (!req.body.content || req.body.content.trim() === 0) {
      return res.status(400).send({
        errorMessage: 'Content field is required'
      });
    }
    next();
  }


  /**
   * A middleware method for checking if an entry exist
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the user object
   *
   * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
   * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
   */
  checksIfEntryExist(req, res, next) {
    const entry = [];
    const entryId = parseInt(req.params.entryId, 10);

    if (Number.isNaN(entryId)) {
      return res.status(400).send({
        errorMessage: `You've entered an invalid entryId: ${req.params.entryId}`
      });
    }
    const getEntry = this.queries.getAnEntry(req);

    getEntry.on('row', (row) => { entry.push(row); });

    getEntry.on('end', () => {
      req.done();
      if (entry.length === 0) {
        return res.status(404).send({ errorMessage: 'Entry can not be found' });
      }

      const [anEntry] = entry;
      req.entry = anEntry;
      next();
    });
  }


  /**
   * A middleware method for checking if an entry can be updated
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the user object
   *
   * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
   * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
   */
  static checksIfEntryCanBeUpdated(req, res, next) {
    const twentyFourHoursInMins = 24 * 60;
    const timeNow = new Date();
    const timeDifferences = timeNow - req.entry.created_at;
    const timeDifferencesInMins = timeDifferences / 60000;

    if (timeDifferencesInMins > twentyFourHoursInMins) {
      return res.status(500).send({
        errorMessage: 'Entries can only be Updated within 24 hours of creation'
      });
    }

    next();
  }
}
