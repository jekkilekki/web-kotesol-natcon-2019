// Helpers for simulating a DB call to load our file
const fs = require( 'fs' );
const util = require( 'util' );

// Create a Promise for the file we read in - to simulate a DB call
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * 
 */
class FeedbackService {

  constructor( datafile ) {
    this.datafile = datafile;
  }

  async addFeedback(name, title, message) {
    const data = await this.getData();
    data.unshift({name, title, message});
    return writeFile(this.datafile, JSON.stringify(data));
  }

  async getAllFeedback() {
    const data = await this.getData();
    return data;
  }

  /* Retrieves ALL Speaker data */
  async getData() {
    // Async - Await function to read in the file
    const data = await readFile(this.datafile, 'utf8');

    // Error checking (empty data)
    if( ! data ) return [];

    // Return the speakers object from the JSON file
    return JSON.parse(data);
  }
}

module.exports = FeedbackService;