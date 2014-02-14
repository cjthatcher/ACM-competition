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

###todo
 - Users need a way to update/change their info (profile)
 - feature: startdate, stopdate, duration
 - on create user, don't set pass, send email instead
 - password reset email
 - password reset routes
 - forgot my password
 - dynamic (html) entries on index (for admin)
