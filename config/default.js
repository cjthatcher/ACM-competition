/* jshint node:true */
module.exports = {
  sessOptions: {
    key: 'usu-acm.sid',
    secret: 'shutupdude'
  },
  couchConfig: {
    host: 'localhost',
    port: 5984,
    db: {
      user: 'acm_users',
      event: 'acm_events',
      results: 'acm_results',
      session: 'acm_sessions',
      posts: 'acm_posts'
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
  strategy: 'couch', // memory, couch, mongo
  port: 3000
};
