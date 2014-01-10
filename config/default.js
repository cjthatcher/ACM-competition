/* jshint node:true */
module.exports = {
  couchConfig: {
    host: 'localhost',
    port: 5984,
    db: {
      user: 'acm_users',
      event: 'acm_events'
    }
  },
  mongoConfig: {
    host: 'localhost',
    port: 27017,
    collection: 'acmCompetition',
    db: {
      user: 'users',
      event: 'events'
    }
  },
  strategy: 'memory',
  port: 3000
};
