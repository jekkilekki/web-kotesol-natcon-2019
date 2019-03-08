// Helpers for simulating a DB call to load our file
const fs = require( 'fs' );
const util = require( 'util' );

// Create a Promise for the file we read in - to simulate a DB call
const readFile = util.promisify(fs.readFile);

/**
 * 
 */
class DataService {

  constructor( datafile ) {
    this.datafile = datafile;
  }

  /* Retrieves Plenary info in a usable format */
  async getSponsors() {
    const data = await this.getSponsorData();
    return data.map((sponsor) => {
      return {
        name: sponsor.name,
        description: sponsor.description,
        address: sponsor.address,
        phone: sponsor.phone,
        map: sponsor.map,
        website: sponsor.website,
        level: sponsor.level,
        amount: sponsor.amount,
        gift: sponsor.gift,
        logo: sponsor.logo,
        media: sponsor.media
      }
    });
  }

  async getTeam() {
    const data = await this.getTeamData();
    return data.map((member) => {
      return {
        name: member.name,
        title: member.shortname,
        email: member.nickname,
        site: member.affiliation,
        bio: member.bio,
        img: member.img,
      };
    });
  }

  async getTestimonials() {
    const data = await this.getTestimonialData();
    return data.map((testimonial) => {
      return {
        id: testimonial.id,
        member: testimonial.member,
        since: testimonial.since,
        comment: testimonial.comment,
      };
    });
  }

  /* Retrieves Sponsor data */
  async getSponsorData() {
    // Async - Await function to read in the file
    const data = await readFile(this.datafile, 'utf8');

    // Error checking (empty data)
    if( ! data ) return [];

    // Return the sponsors object from the JSON file
    return JSON.parse(data).sponsors;
  }

  /* Retrieves only Team data */
  async getTeamData() {
    const data = await readFile(this.datafile, 'utf8');
    if( ! data ) return [];
    return JSON.parse(data).team;
  }

  /* Retrieves only Testimonial data */
  async getTestimonialData() {
    const data = await readFile(this.datafile, 'utf8');
    if( ! data ) return [];
    return JSON.parse(data).testimonals;
  }
}

module.exports = DataService;