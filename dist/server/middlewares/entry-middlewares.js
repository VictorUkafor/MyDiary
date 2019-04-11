

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
const EntryMiddleware = (function () {
  /**
    *  constructor
    *
    */
  function EntryMiddleware(queries) {
    _classCallCheck(this, EntryMiddleware);

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


  _createClass(EntryMiddleware, [{
    key: 'checksForAddEntryRequiredFields',
    value: (function () {
      function checksForAddEntryRequiredFields(req, res, next) {
        if (!req.body.content || req.body.content.trim() === 0) {
          return res.status(400).send({
            errors: 'Content field is required!'
          });
        }
        next();
      }

      return checksForAddEntryRequiredFields;
    }())

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

  }, {
    key: 'checksIfEntryExist',
    value: (function () {
      function checksIfEntryExist(req, res, next) {
        const entry = [];
        const entryId = parseInt(req.params.entryId, 10);

        if (isNaN(entryId)) {
          return res.status(400).send({
            errors: `You've entered an invalid entryId: ${String(req.params.entryId)}`
          });
        }
        const getEntry = this.queries.getAnEntry(req);

        getEntry.on('row', (row) => {
          entry.push(row);
        });

        getEntry.on('end', () => {
          req.done();
          if (entry.length === 0) {
            return res.status(404).send({ errors: 'Entry can not be found!' });
          }

          req.entry = entry[0];
          next();
        });
      }

      return checksIfEntryExist;
    }())

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

  }, {
    key: 'checksIfEntryCanBeUpdated',
    value: (function () {
      function checksIfEntryCanBeUpdated(req, res, next) {
        const twentyFourHoursInMins = 24 * 60;
        const timeNow = new Date();
        const timeDifferences = timeNow - req.entry.created_at;
        const timeDifferencesInMins = timeDifferences / 60000;

        if (timeDifferencesInMins > twentyFourHoursInMins) {
          return res.status(500).send({
            errors: 'Entries can only be Updated within 24 hours of creation!'
          });
        }

        next();
      }

      return checksIfEntryCanBeUpdated;
    }())
  }]);

  return EntryMiddleware;
}());

exports.default = EntryMiddleware;
// # sourceMappingURL=entry-middlewares.js.map
