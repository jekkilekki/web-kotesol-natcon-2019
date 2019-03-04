const path = require( 'path' );

module.exports = {
  development: {
    sitename: '2019 KOTESOL National Conference [Dev]',
    data: {
      speakers: path.join(__dirname, '../data/data.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      sponsors: path.join(__dirname, '../data/sponsors.json'),
      team: path.join(__dirname, '../data/team.json'),
      testimonials: path.join(__dirname, '../data/testimonials.json'),
    }
  },
  production: {
    sitename: '2019 KOTESOL National Conference',
    data: {
      speakers: path.join(__dirname, '../data/data.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      sponsors: path.join(__dirname, '../data/sponsors.json'),
      team: path.join(__dirname, '../data/team.json'),
      testimonials: path.join(__dirname, '../data/testimonials.json'),
    }
  }
}