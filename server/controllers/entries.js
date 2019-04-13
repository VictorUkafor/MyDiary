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
export default class EntryController {
  /**
    *  constructor
    *  Takes one parameters
    *  @param {object} queries the only parameter
    */
  constructor(queries) {
    this.queries = queries;
    this.getAllEntries = this.getAllEntries.bind(this);
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
  getAllEntries(req, res) {
    const entriesInPage = [];
    const allEntries = [];
    let pageNumber = parseInt(req.query.page, 10);

    if (!req.query.page) { pageNumber = 1; }
    if (Number.isNaN(pageNumber) || pageNumber === 0) {
      return res.status(400).send({
        errorMessage: `You've entered an invalid page number: ${req.query.page}`
      });
    }

    const getEntries = this.queries.getEntriesWithPag(req, pageNumber);
    const getEntriesWithNoPag = this.queries.getAllEntries(req);

    getEntries.on('row', (row) => {
      entriesInPage.push(row);
    });

    getEntriesWithNoPag.on('row', (row) => {
      allEntries.push(row);
    });

    getEntries.on('end', () => {
      req.done();
      if (entriesInPage.length === 0) {
        return res.status(404).send({ errorMessage: 'You have no entries' });
      }

      getEntriesWithNoPag.on('end', () => {
        req.done();

        return res.status(200).send({
          entries: entriesInPage,
          total: allEntries.length
        });
      });
    });
  }


  /** An API for fetching a single entries:
  *  GET: api/v1/entries/<entryId>
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *  @returns {object} return an object
  */
  static getEntry(req, res) {
    return res.status(200).send(req.entry);
  }


  /** method for setting the title in postEntry method
  *  Takes 2 parameters
  *  @param {string} title the first parameter
  *  @param  {string} content the second parameter
  *
  *  @returns {string} return an string
  */
  static setTitle(title, content) {
    if (!title) {
      return content.substring(0, 20);
    }
    return title;
  }

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
  postEntry(req, res) {
    let title = '';
    if (req.body.title) {
      title = req.body.title.trim();
    }
    const content = req.body.content.trim();
    const newTitle = EntryController.setTitle(title, content);
    const newEntry = [];
    const addEntry = this.queries.insertEntry(req, newTitle, content);

    addEntry.on('row', (row) => {
      newEntry.push(row);
    });

    addEntry.on('end', () => {
      req.done();
      if (addEntry) {
        return res.status(201).send({
          successMessage: 'Entry added successfully', newEntry
        });
      }

      return res.status(500).send({
        errorMessage: 'Internal Server error'
      });
    });
  }

  /** method for setting the title in updateEntry method
  *  Takes 2 parameters
  *  @param {string} title the first parameter
  *  @param  {string} entry the second parameter
  *
  *  @returns {string} return an string
  */
  static setTitleForUpdate(title, entry) {
    if (!title) {
      return entry.title;
    }
    return title;
  }


  /** method for setting the content in updateEntry method
  *  Takes 2 parameters
  *  @param {string} content the first parameter
  *  @param  {string} entry the second parameter
  *
  *  @returns {string} return an string
  */
  static setContentForUpdate(content, entry) {
    if (!content) {
      return entry.content;
    }
    return content;
  }

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
  putEntry(req, res) {
    const updatedEntry = [];

    let title = '';
    let content = '';

    if (req.body.title) { title = req.body.title.trim(); }
    if (req.body.content) { content = req.body.content.trim(); }

    const titleUpdated = EntryController.setTitleForUpdate(title, req.entry);
    const contentUpdated = EntryController.setContentForUpdate(content, req.entry);
    const newDate = new Date();
    const update = this.queries.updateEntry(req, titleUpdated, contentUpdated, newDate);

    update.on('row', (row) => { updatedEntry.push(row); });
    update.on('end', () => {
      req.done();
      if (update) {
        return res.status(200).send({
          successMessage: 'Entry updated successfully', entry: updatedEntry
        });
      }

      return res.status(500).send({
        errorMessage: 'Internal server error'
      });
    });
  }


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
  deleteEntry(req, res) {
    const deleteEntry = this.queries.deleteEntry(req);

    if (deleteEntry) {
      return res.status(200).send({
        successMessage: 'Entry deleted successfully'
      });
    }

    return res.status(500).send({
      errorMessage: 'Internal server error!'
    });
  }
}
