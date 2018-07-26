import pg from 'pg';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import key from '../models/key';

const salt = bcrypt.genSaltSync(10);
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:success4me@localhost:5432/mydiary_dev';


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
  */
  getAllEntries(req, res) {
    const token = req.body.token || req.query.token || req.headers['authentication'];
    const allEntries = [];

    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }
    
    
      const getEntries = client.query('SELECT * FROM entry WHERE diaryUserId=($1);', [req.user.id]);

      getEntries.on('row', (row) => { 
        allEntries.push(row); 
      });
  
      getEntries.on('end', () => { 
        done();
        if(allEntries.length === 0){
            return res.status(404).send({ message: "You have no entries yet!" });
        }
        return res.status(200).send(allEntries);
    }); 
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
    const token = req.body.token || req.query.token || req.headers['authentication'];
    const entry = [];

    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }
    
      const getEntry = client.query('SELECT * FROM entry WHERE diaryUserId=($1) AND id=($2);',
       [req.user.id, req.params.entryId]);

      getEntry.on('row', (row) => { 
        entry.push(row); 
      });
  
      getEntry.on('end', () => { 
        done();
        if(entry.length === 0){
            return res.status(404).send({ message: "Entry can not be found!" });
        }
        return res.status(200).send(entry);
    }); 
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
  const title = this.setTitle(req.body.title, req.body.content);
  const allEntries = [];

  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      return res.status(500).send({
        message: 'Server error!'
      });
  }

  
  const addEntry = client.query('INSERT INTO entry(diaryUserId, title, content) values($1, $2, $3)',
  [req.user.id, title, req.body.content]);

  const getEntries = client.query('SELECT * FROM entry WHERE diaryUserId=($1);', [req.user.id]);

  getEntries.on('row', (row) => { 
    allEntries.push(row); 
  });

  getEntries.on('end', () => { 
    done();
    if(addEntry){
    return res.status(201).send({
      message: 'A new diary entry has been added successfully', allEntries
    });
  }

  return res.status(500).send({
      message: 'Server error: Entry could be added!'
  });
   
   });
  }); 

}


  // method for setting the title in postEntry method
  setTitleForUpdate(title, entry){
    if (!title) {
      return entry.title;
    } else {
      return title;
    }
  }


    // method for setting the title in postEntry method
    setContentForUpdate(content, entry){
      if (!content) {
        return entry.content;
      } else {
        return content;
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
    const updatedEntry = [];
  
    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        return res.status(500).send({
          message: 'Server error!'
        });
    }
  

    const title = this.setTitleForUpdate(req.body.title, req.entry);
    const content = this.setContentForUpdate(req.body.content, req.entry)
    
    const update = client.query('UPDATE entry SET title=($1), content=($2) WHERE id=($3)',
    [title, content, req.params.entryId]);
  
    const getUpdatedEntry = client.query('SELECT * FROM entry WHERE id=($1);', [req.params.entryId]);
  
    getUpdatedEntry.on('row', (row) => { 
      updatedEntry.push(row); 
    });
  
    getUpdatedEntry.on('end', () => { 
      done();
      if(update){
      return res.status(200).send({
        message: 'The entry has been updated successfully', updatedEntry
      });
    }
  
    return res.status(500).send({
        message: 'Server error: Entry could be added!'
    });
     
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
  */
  deleteEntry(req, res) {
    const entryToDelete = this.entries.find(entry => entry.id === req.params.entryId);

    if (entryToDelete) {
      const index = this.entries.indexOf(entryToDelete);

      if(this.entries.splice(index, 1)){
        return res.status(204).send({
          message: ['The entry has been deleted successfully', this.entries]
      });
      }

      return res.status(500).send({
        message: 'Server error: Entry could be deleted!'
      })


    }
    return res.status(404).send({
      message: 'Entry can not be found!'
    });
  }
}
