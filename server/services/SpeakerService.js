// Helpers for simulating a DB call to load our file
const fs = require( 'fs' );
const util = require( 'util' );

// Create a Promise for the file we read in - to simulate a DB call
const readFile = util.promisify(fs.readFile);

/**
 * 
 */
class SpeakerService {

  constructor( datafile ) {
    this.datafile = datafile;
  }

  async getNames() {
    const data = await this.getData();
    return data.map((speaker) => {
      return { name: speaker.name, shortname: speaker.shortname };
    });
  }

  async getData() {
    // Async - Await function to read in the file
    const data = await readFile(this.datafile, 'utf8');

    // Error checking (empty data)
    if( ! data ) return [];

    // Return the speakers object from the JSON file
    return JSON.parse(data).speakers;
  }
}

module.exports = SpeakerService;