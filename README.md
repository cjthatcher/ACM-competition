ACM-competition
===============

This is the testing website for the ACM coding competitions at USU. word.

###Setup for dev

1. set up an environment variable for node: `NODE_ENV=localdev`
2. create `config/localdev.js` with `module.exports = { strategy: 'couch' };`
 in it. Possible strategies are `memory`, `couch`, or `mongo`.
3. `npm install`
4. `npm install -g gulp`
5. `gulp`

###Todo
- users need a way to update/change their info
- admin needs to be able to edit users
- admin needs to be able to create questions
- Event status is not being saved
- Admin routes need to be locked down
