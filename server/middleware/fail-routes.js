/* jshint node:true */
'use strict';

module.exports = function (req, res, next) {
  res.forbidden = function () {
    res.writeHead(403);
    res.end('Forbidden');
  };

  res.fail = function (err) {
    res.send({
      success: false,
      err: err
    });
  };

  next();
};
