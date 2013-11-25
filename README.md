# node-cljs

[![Build Status](https://travis-ci.org/also/node-cljs.png?branch=master)](https://travis-ci.org/also/node-cljs)

Run compiled ClojureScript code with node.js. Skip `:target :nodejs` and `(set! *main-cli-fn* ...)` and call any exported function from the command line.

## Install

```
npm install -g node-cljs
```

## Usage

```
usage: node-cljs :output-to [-m namespace.main_fn [arg...]]
       node-cljs :output-dir :output-to [-a] [-r namespace]... [-m namespace.main_fn [arg...]]
```

Namespaces and functions need to use the munged form, that is, `cemerick.cljs.test.run_all_tests`, not `cemerick.cljs.test.run-all-tests`.

Unless one of the namespaces you'll load has a side effect (why would you do this?!), specify the function to call with `-m`.

### Unoptimized

When compiled with `:optimizations :none`, the first argument points to `:output-dir` (the directory containing `goog/base.js`) and the second is `:output-to`.

The `-r` option will load a namspace, and the `-a` option will load all namespaces. This is useful when the main function you are calling depends on other namespaces without requiring them, like `cemerick.cljs.test.run-all-tests`. If you compile with optimization, all your tests will be included in the `:output-to` file, but without optimization they will need to be explicitly required.

### Optimized

For all other `:optimization` levels, you only need to specify the single file `:output-to`.

## Examples

Given [this](https://github.com/also/clojurescript.test/blob/node/project.clj) lein-cljsbuild configuration:

```
# require all namespaces and run all tests for an unoptimized build
node-cljs target/cljs/unoptimized target/cljs/unoptimized.js -a -m cemerick.cljs.node.run_all_tests

# run cemerick.cljs.test.basic with a build optimized with :advanced
node-cljs target/cljs/advanced.js -m cemerick.cljs.node.run_tests cemerick.cljs.test.basic

# require cemerick.cljs.test.fixtures and run all tests for an unoptimized build
node-cljs target/cljs/unoptimized target/cljs/unoptimized.js -r cemerick.cljs.test.fixtures -m cemerick.cljs.node.run_all_tests
```
