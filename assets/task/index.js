var initVendorTask = require('./vendor.js').initVendorTask;
var initAppTask = require('./app.js').initAppTask;
var initSourceTask = require('./source.js').initSourceTask;
var initBuildTask = require('./build.js').initBuildTask;
var initPublishTask = require('./publish').initPublishTask;

module.exports.initialize = function() {
    initVendorTask();
    initAppTask();
    initSourceTask();
    initBuildTask();
    initPublishTask();
}