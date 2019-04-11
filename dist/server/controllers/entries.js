

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * @fileOverview this JS file contains logic for entry's APIs logic
 *
 * @author  Victor Ukafor
 * @version 1.0.0
 *
 */

/**
  *  class EntryController
  *
  */
const EntryController = (function () {
  /**
    *  constructor
    *
    */
  function EntryController(queries) {
    _classCallCheck(this, EntryController);

    this.queries = queries;
    this.getAllEntries = this.getAllEntries.bind(this);
    this.searchEntries = this.searchEntries.bind(this);
    this.postEntry = this.postEntry.bind(this);
    this.putEntry = this.putEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  /** An API for fetching all entries:
  *  GET: api/v1/entries
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  *
  * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
  * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
  */


  _createClass(EntryController, [{
    key: 'getAllEntries',
    value: (function () {
      function getAllEntries(req, res) {
        const allEntries = [];
        const allEntriesWithNoPag = [];
        let page = parseInt(req.query.page, 10);

        if (!req.query.page) {
          page = 1;
        }
        if (isNaN(page) || page === 0) {
          return res.status(400).send({
            errors: `You've entered an invalid page: ${String(req.query.page)}`
          });
        }

        const getEntries = this.queries.getEntriesWithPag(req, page);
        const getEntriesWithNoPag = this.queries.getAllEntries(req);

        getEntries.on('row', (row) => {
          allEntries.push(row);
        });
        getEntriesWithNoPag.on('row', (row) => {
          allEntriesWithNoPag.push(row);
        });

        getEntries.on('end', () => {
          req.done();
          if (allEntries.length === 0) {
            return res.status(404).send({ message: 'You have no entries yet!' });
          }

          getEntriesWithNoPag.on('end', () => {
            req.done();

            return res.status(200).send({
              allEntries,
              total: allEntriesWithNoPag.length
            });
          });
        });
      }

      return getAllEntries;
    }())

    /** An API for searching for specific entries:
    *  POST: api/v1/entries/search?page=pageNumber
    *  Takes 2 parameters
    *  @param {object} req the first parameter
    *  @param  {object} res the second parameter
    *
    *  @returns {object} return an object
    *
    * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
    * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
    */

  }, {
    key: 'searchEntries',
    value: (function () {
      function searchEntries(req, res) {
        const allEntries = [];
        const allEntriesWithNoPag = [];
        let page = parseInt(req.query.page, 10);

        if (!req.query.page) {
          page = 1;
        }
        if (!req.body.search) {
          req.body.search = '';
        }
        if (isNaN(page) || page === 0) {
          return res.status(400).send({
            errors: `You've entered an invalid page: ${String(req.query.page)}`
          });
        }

        const getEntries = this.queries.searchEntriesWithPag(req, page);
        const getEntriesWithNoPag = this.queries.searchEntries(req);

        getEntries.on('row', (row) => {
          allEntries.push(row);
        });
        getEntriesWithNoPag.on('row', (row) => {
          allEntriesWithNoPag.push(row);
        });

        getEntries.on('end', () => {
          req.done();
          if (allEntries.length === 0) {
            return res.status(404).send({ message: 'You have no entries yet!' });
          }

          getEntriesWithNoPag.on('end', () => {
            req.done();

            return res.status(200).send({
              allEntries,
              total: allEntriesWithNoPag.length
            });
          });
        });
      }

      return searchEntries;
    }())

    /** An API for fetching a single entries:
    *  GET: api/v1/entries/<entryId>
    *  Takes 2 parameters
    *  @param {object} req the first parameter
    *  @param  {object} res the second parameter
    *
    *  @returns {object} return an object
    */

  }, {
    key: 'getEntry',
    value: (function () {
      function getEntry(req, res) {
        return res.status(200).send(req.entry);
      }

      return getEntry;
    }())

    /** method for setting the title in postEntry method
    *  Takes 2 parameters
    *  @param {string} title the first parameter
    *  @param  {string} content the second parameter
    *
    *  @returns {string} return an string
    */

  }, {
    key: 'setTitle',
    value: (function () {
      function setTitle(title, content) {
        if (!title) {
          return content.substring(0, 20);
        }
        return title;
      }

      return setTitle;
    }())

    /** An API for adding a new diary entry:
    *  POST: api/v1/entries
    *  Takes 2 parameters
    *  @param {object} req the first parameter
    *  @param  {object} res the second parameter
    *
    *  @returns {object} return an object
    *
    * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
    * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
    */

  }, {
    key: 'postEntry',
    value: (function () {
      function postEntry(req, res) {
        let title = '';
        if (req.body.title) {
          title = req.body.title.trim();
        }
        const content = req.body.content.trim();
        const newTitle = this.setTitle(title, content);
        const newEntry = [];
        const addEntry = this.queries.insertEntry(req, newTitle, content);

        addEntry.on('row', (row) => {
          newEntry.push(row);
        });

        addEntry.on('end', () => {
          req.done();
          if (addEntry) {
            return res.status(201).send({
              success: 'A new diary entry has been added successfully', newEntry
            });
          }

          return res.status(500).send({
            errors: 'Server error: Entry could not be added!'
          });
        });
      }

      return postEntry;
    }())

    /** method for setting the title in updateEntry method
    *  Takes 2 parameters
    *  @param {string} title the first parameter
    *  @param  {string} entry the second parameter
    *
    *  @returns {string} return an string
    */

  }, {
    key: 'setTitleForUpdate',
    value: (function () {
      function setTitleForUpdate(title, entry) {
        if (!title) {
          return entry.title;
        }
        return title;
      }

      return setTitleForUpdate;
    }())

    /** method for setting the content in updateEntry method
    *  Takes 2 parameters
    *  @param {string} content the first parameter
    *  @param  {string} entry the second parameter
    *
    *  @returns {string} return an string
    */

  }, {
    key: 'setContentForUpdate',
    value: (function () {
      function setContentForUpdate(content, entry) {
        if (!content) {
          return entry.content;
        }
        return content;
      }

      return setContentForUpdate;
    }())

    /** An API for modifying diary entry:
    *  POST: api/v1/entries/<entryId>
    *  Takes 2 parameters
    *  @param {object} req the first parameter
    *  @param  {object} res the second parameter
    *
    *  @returns {object} return an object
    *
    * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
    * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
    */

  }, {
    key: 'putEntry',
    value: (function () {
      function putEntry(req, res) {
        const updatedEntry = [];

        let title = '';
        let content = '';

        if (req.body.title) {
          title = req.body.title.trim();
        }
        if (req.body.content) {
          content = req.body.content.trim();
        }

        const titleUpdated = this.setTitleForUpdate(title, req.entry);
        const contentUpdated = this.setContentForUpdate(content, req.entry);
        const newDate = new Date();
        const update = this.queries.updateEntry(req, titleUpdated, contentUpdated, newDate);

        update.on('row', (row) => {
          updatedEntry.push(row);
        });
        update.on('end', () => {
          req.done();
          if (update) {
            return res.status(200).send({
              success: 'The entry has been updated successfully', updatedEntry
            });
          }

          return res.status(500).send({
            errors: 'Server error: Entry could not be updated!'
          });
        });
      }

      return putEntry;
    }())

    /** An API for deleting a diary entry:
    *  DELETE: api/v1/entries/<entryId>
    *  Takes 2 parameters
    *  @param {object} req the first parameter
    *  @param  {object} res the second parameter
    *
    *  @returns {object} return an object
    *
    * The logic behind this was inspired by 'PostreSQL and NodeJS' article on 'www.mherman.com'
    * see full link https://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
    */

  }, {
    key: 'deleteEntry',
    value: (function () {
      function deleteEntry(req, res) {
        const deleteEntry = this.queries.deleteEntry(req);

        if (deleteEntry) {
          return res.status(200).send({
            success: 'The entry has been deleted successfully'
          });
        }

        return res.status(500).send({
          errors: 'Server error: Entry could not be deleted!'
        });
      }

      return deleteEntry;
    }())
  }]);

  return EntryController;
}());

exports.default = EntryController;
// # sourceMappingURL=entries.js.map
