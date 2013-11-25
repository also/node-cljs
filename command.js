#!/usr/bin/env node

var oogCommand = require('oog/command');

var opts = oogCommand.parseArgs();
var goog = oogCommand.init(opts);
try {
  var cljs = goog.require('cljs.core');
  cljs.enable_console_print_BANG_();
} catch (e) {
  console.warn(e.message);
}
oogCommand.run(opts, goog);
