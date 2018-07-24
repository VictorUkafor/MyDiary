
/**
  *  class EntryController
  *
  */
export default class EntryController {
/**
  *  constructor
  *  Takes two parameter
  * @param {object} id the first parameter
  * @param {object} data the second parameter
  *
  */
  constructor(id, data) {
    this.entries = data.entries;
    this.id = id;
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
  */
  getAllEntries(req, res) {
    return res.status(200).send({
      message: this.entries
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
    const fetchEntry = this.entries.find(entry => entry.id === req.params.entryId);

    if (fetchEntry) {
      return res.status(200).send({
        message: fetchEntry
      });
    }
    return res.status(404).send({
      message: 'Entry can not be found!'
    });
  }


  // method for setting the title in postEntry method
  setTitle(title, content){
    if (!title) {
      return content.substring(0, 10);
    } else {
      return title;
    }
  }

  /** An API for adding a new diary entry:
  *  POST: api/v1/entries
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  postEntry(req, res) {
    if (req.body.content) {
      const id = this.id.v4();
      const { content } = req.body;
      const title = this.setTitle(req.body.title, content);

      const entry = { id, title, content };
      if(this.entries.push(entry)){
      return res.status(201).send({
        message: ['A new diary entry has been added successfully', entry]
      });
    }
    return res.status(500).send({
      message: 'Server error: Entry could be added!'
    })

    }
    
    return res.status(400).send({
      message: 'Content field is required!'
    });
  }


  /** An API for modifying diary entry:
  *  POST: api/v1/entries/<entryId>
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  putEntry(req, res) {
    const entryToModify = this.entries.find(entry => entry.id === req.params.entryId);

    if (entryToModify) {

      if((entryToModify.title = req.body.title ? req.body.title : entryToModify.title) &&
        (entryToModify.content = req.body.content ? req.body.content : entryToModify.content)){
          return res.status(200).send({
        message: ['The entry has been updated successfully', entryToModify]
      });
      }

      return res.status(500).send({
        message: 'Server error: Entry could be updated!'
      })


    }
    return res.status(404).send({
      message: 'Entry can not be found!'
    });
  }


  /** An API for deleting a diary entry:
  *  DELETE: api/v1/entries/<entryId>
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  deleteEntry(req, res) {
    const entryToDelete = this.entries.find(entry => entry.id === req.params.entryId);

    if (entryToDelete) {
      const index = this.entries.indexOf(entryToDelete);
      this.entries.splice(index, 1);

      return res.status(200).send({
        message: ['The entry has been deleted successfully', this.entries]
      });
    }
    return res.status(404).send({
      message: 'Entry can not be found!'
    });
  }
}
