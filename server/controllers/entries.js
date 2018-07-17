import data from '../dummy_data';

/**
  *  class EntryController
  *
  */
export default class EntryController {
/**
  *  constructor
  *  Takes two parameter
  * @param {object} id the second parameter
  *
  */
  constructor(id) {
    this.id = id;
    this.getAllEntries = this.getAllEntries.bind(this);
    this.getEntry = this.getEntry.bind(this);
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
      message: data.entries
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
  const fetchEntry = data.entries.find(entry => entry.id === req.params.entryId);

  if(fetchEntry){
    return res.status(200).send({
      message: fetchEntry
  });
  } else {
    return res.status(404).send({
      message: 'Entry can not be found!'
  });
  }
}


}
