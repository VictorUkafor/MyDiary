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
  constructor() {
    this.getAllEntries = this.getAllEntries.bind(this);
    this.getEntry = this.getEntry.bind(this);
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
    const getEntries = req.client.query('SELECT * FROM entry;');

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
    const title = this.setTitle(req.body.title, req.body.content);
    const allEntries = [];
    const addEntry = req.client.query('INSERT INTO entry(entry_user_id, title, content) values($1, $2, $3)',
      [req.user.user_id, title, req.body.content]
    );

    const getEntries = req.client.query('SELECT * FROM entry WHERE entry_user_id=($1);', [req.user.user_id]);

    getEntries.on('row', (row) => {
      allEntries.push(row);
    });

    getEntries.on('end', () => {
      req.done();
      if (addEntry) {
        return res.status(201).send({
          message: 'A new diary entry has been added successfully', allEntries
        });
      }

      return res.status(500).send({
        message: 'Server error: Entry could be added!'
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
    const title = this.setTitleForUpdate(req.body.title, req.entry);
    const content = this.setContentForUpdate(req.body.content, req.entry);

    const update = req.client.query('UPDATE entry SET title=($1), content=($2) WHERE entry_id=($3)',
      [title, content, req.entry.entry_id]);

    const getUpdatedEntry = req.client.query('SELECT * FROM entry WHERE entry_id=($1);', [req.entry.entry_id]);

    getUpdatedEntry.on('row', (row) => {
      updatedEntry.push(row);
    });

    getUpdatedEntry.on('end', () => {
      req.done();
      if (update) {
        return res.status(200).send({
          message: 'The entry has been updated successfully', updatedEntry
        });
      }

      return res.status(500).send({
        message: 'Server error: Entry could be added!'
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
    const deleteEntry = req.client.query('DELETE FROM entry WHERE entry_id=($1)', [req.entry.entry_id]);

    if (deleteEntry) {
      return res.status(204).send({
        message: 'The entry has been deleted successfully'
      });
    }

    return res.status(500).send({
      message: 'Server error: Entry could be added!'
    });
  }
}
