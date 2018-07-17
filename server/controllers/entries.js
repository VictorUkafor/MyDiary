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
    this.postEntry = this.postEntry.bind(this);
    this.putEntry = this.putEntry.bind(this);
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


    /** An API for adding a new diary entry:
  *  POST: api/v1/entries
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
 postEntry(req, res) {
   if(req.body.content){

     if(!req.body.title){
     const id = this.id.v4();
     const { content } = req.body;
     const title = content.substring(0, 10);

     const entry = { id, title, content }
     data.entries.push(entry);
     return res.status(201).send({
      message: ['A new diary entry has been added successfully', entry]
    });

     } else {
       
      const id = this.id.v4();
      const { title } = req.body;
      const { content } = req.body;
      
      const entry = { id, title, content }
      data.entries.push(entry);
      return res.status(201).send({
       message: ['A new diary entry has been added successfully', entry]
     }); 
     }

   } else {
     return res.status(400).send({
       message: 'Content field is required!'
      }); 
   }

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
  const entryToModify = data.entries.find(entry => entry.id === req.params.entryId);

  if(entryToModify){
    entryToModify.title = req.body.title ?
    req.body.title : entryToModify.title;

    entryToModify.content = req.body.content ?
    req.body.content : entryToModify.content;

    return res.status(201).send({
      message: ['The entry has been updated successfully', entryToModify]
    });    

  }else{
    return res.status(404).send({
      message: 'Entry can not be found!'
    });
  }

}


}
