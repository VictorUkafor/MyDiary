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
    *
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
    const allEntries = [];
    let page = parseInt(req.query.page, 10);

    if (!req.query.page) { page = 1; }
    if (isNaN(page) || page === 0) {
      return res.status(400).send({
        errors: `You've entered an invalid page: ${req.query.page}`
      });
    }

    const getEntries = this.queries.getEntriesWithPag(req, page);

    getEntries.on('row', (row) => { allEntries.push(row); });

    getEntries.on('end', () => {
      req.done();
      if (allEntries.length === 0) {
        return res.status(404).send({ message: 'You have no entries yet!' });
      }
      return res.status(200).send(allEntries);
    });
  }


  /** An API for fetching a single entries:
  *  GET: api/v1/entries/<entryId>
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  getEntry(req, res) {
    return res.status(200).send(req.entry);
  }


  /** method for setting the title in postEntry method
  *  Takes 2 parameters
  *  @param {string} title the first parameter
  *  @param  {string} content the second parameter
  *
  *  @returns {string} return an string
  */
  setTitle(title, content) {
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
    const newTitle = this.setTitle(title, content);
    const newEntry = [];
    const addEntry = this.queries.insertEntry(req, newTitle, content);
    //const getEntries = this.queries.getAllEntries(req);

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

  /** method for setting the title in updateEntry method
  *  Takes 2 parameters
  *  @param {string} title the first parameter
  *  @param  {string} entry the second parameter
  *
  *  @returns {string} return an string
  */
  setTitleForUpdate(title, entry) {
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
  setContentForUpdate(content, entry) {
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

    const titleUpdated = this.setTitleForUpdate(title, req.entry);
    const contentUpdated = this.setContentForUpdate(content, req.entry);
    const newDate = new Date();
    const update = this.queries.updateEntry(req, titleUpdated, contentUpdated, newDate);
    const getUpdatedEntry = this.queries.getAnEntry(req);


    getUpdatedEntry.on('row', (row) => { updatedEntry.push(row); });

    getUpdatedEntry.on('end', () => {
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
        success: 'The entry has been deleted successfully'
      });
    }

    return res.status(500).send({
      errors: 'Server error: Entry could not be deleted!'
    });
  }
}
