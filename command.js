#!/usr/bin/env node

var oogCommand = require('oog/command');

var opts = oogCommand.parseArgs();
var goog = oogCommand.init(opts);
var cljs = goog.require('cljs.core');
cljs.enable_console_print_BANG_();
oogCommand.run(opts, goog);
