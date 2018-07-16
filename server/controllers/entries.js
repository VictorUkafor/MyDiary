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
  }


  /** An API for adding a new user:
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


}
