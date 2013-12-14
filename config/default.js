/* jshint node:true */
module.exports = {
  db: {
    host: 'localhost',
    port: 27017,
    dbName: 'acmCompetition',
    strategy: 'mongo',
    groups: ['users', 'events', 'problems']
  },
  port: 3000
};
