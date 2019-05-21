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

  /* Retrieves Plenary info in a usable format */
  async getPlenaryDetails() {
    const data = await this.getPlenaryData();
    return data.map((plenary) => {
      return {
        name: plenary.name,
        shortname: plenary.shortname,
        nickname: plenary.nickname,
        affiliation: plenary.affiliation,
        img: plenary.img,
        plenaryimg: plenary.plenaryimg,
        title: plenary.title,
        summary: plenary.summary,
        abstract: plenary.abstract,
        bio: plenary.bio,
        shortbio: plenary.shortbio,
        website: plenary.website
      }
    });
  }

  /* Retrieves Names and Shortnames of Speakers only */
  async getSpeakersNames() {
    const data = await this.getData();
    return data.map((speaker) => {
      return { name: speaker.name, shortname: speaker.shortname };
    });
  }

  async getSpeakersShortList() {
    const data = await this.getData();
    return data.map((speaker) => {
      return {
        name: speaker.name,
        shortname: speaker.shortname,
        nickname: speaker.nickname,
        affiliation: speaker.affiliation,
        img: speaker.img,
        title: speaker.title,
        summary: speaker.summary,
        status: speaker.status
      };
    });
  }

  async getSpeakersFullList() {
    const data = await this.getData();
    return data.map((speaker) => {
      return {
        id: speaker.id,
        name: speaker.name,
        shortname: speaker.shortname,
        nickname: speaker.nickname,
        affiliation: speaker.affiliation,
        other: speaker.other,
        img: speaker.img,
        time: speaker.time,
        track: speaker.track,
        topic: speaker.topic,
        subtopic: speaker.subtopic,
        room: speaker.room,
        title: speaker.title,
        summary: speaker.summary,
        abstract: speaker.abstract,
        bio: speaker.bio,
        media: speaker.media,
        website: speaker.website,
        email: speaker.email,
        phone: speaker.phone,
        status: speaker.status,
        coPresenter: speaker.coPresenter,
        coPresenterAff: speaker.coPresenterAff,
        coPresenterBio: speaker.coPresenterBio,
        coPresenterEmail: speaker.coPresenterEmail,
        coPresenterImg: speaker.coPresenterImg
      };
    });
  }

  async getSpeakerDetails(shortname) {
    const data = await this.getData();
    const speaker = data.find((speaker) => {
      return speaker.shortname === shortname;
    })
    if( ! speaker ) return null;
    return {
      title: speaker.title,
      name: speaker.name,
      nickname: speaker.nickname,
      shortname: speaker.shortname,
      affiliation: speaker.affiliation,
      other: speaker.other,
      time: speaker.time,
      track: speaker.track,
      topic: speaker.topic,
      subtopic: speaker.subtopic,
      room: speaker.room,
      summary: speaker.summary,
      abstract: speaker.abstract,
      bio: speaker.bio,
      img: speaker.img,
      media: speaker.media,
      email: speaker.email,
      phone: speaker.phone,
      status: speaker.status,
      coPresenter: speaker.coPresenter,
      coPresenterAff: speaker.coPresenterAff,
      coPresenterBio: speaker.coPresenterBio,
      coPresenterEmail: speaker.coPresenterEmail,
      coPresenterImg: speaker.coPresenterImg
    }
  }

  async getPlenarySpeaker(shortname) {
    const data = await this.getPlenaryData();
    const speaker = data.find((speaker) => {
      return speaker.shortname === shortname;
    })
    if( ! speaker ) return null;
    return {
      title: speaker.title,
      name: speaker.name,
      nickname: speaker.nickname,
      shortname: speaker.shortname,
      affiliation: speaker.affiliation,
      other: speaker.other,
      time: speaker.time,
      track: speaker.track,
      topic: speaker.topic,
      subtopic: speaker.subtopic,
      room: speaker.room,
      summary: speaker.summary,
      abstract: speaker.abstract,
      bio: speaker.bio,
      img: speaker.img,
      media: speaker.media,
      email: speaker.email,
      phone: speaker.phone
    };
  }

  /* Retrieves ALL Speaker data */
  async getData() {
    // Async - Await function to read in the file
    const data = await readFile(this.datafile, 'utf8');

    // Error checking (empty data)
    if( ! data ) return [];

    // Return the speakers object from the JSON file
    return JSON.parse(data).speakers;
  }

  /* Retrieves only Plenary speaker data */
  async getPlenaryData() {
    const data = await readFile(this.datafile, 'utf8');
    if( ! data ) return [];
    return JSON.parse(data).plenary;
  }
}

module.exports = SpeakerService;