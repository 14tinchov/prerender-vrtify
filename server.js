#!/usr/bin/env node
var prerender = require('./lib');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

var server = prerender({
    workers: WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    logRequests: true,
    // resourceDownloadTimeout: 200000
    pageDoneCheckTimeout: 50000,
    // resourceDownloadTimeout: 100000,
    // waitAfterLastRequest: 50000,
    // jsTimeout: 50000,
    // jsCheckTimeout: 50000,
    // evaluateJavascriptCheckTimeout: 100000
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(require('prerender-redis-cache'));
// server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
