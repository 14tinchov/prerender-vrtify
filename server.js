#!/usr/bin/env node
var prerender = require('./lib');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

var server = prerender({
    workers: WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    logRequests: true,
    pageDoneCheckTimeout: 10000,
    resourceDownloadTimeout: 5000,
    resourceDownloadTimeout: 5000,
    waitAfterLastRequest: 5000,
    jsTimeout: 5000,
    jsCheckTimeout: 5000,
    evaluateJavascriptCheckTimeout: 5000
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
server.use(prerender.logger());
server.use(prerender.removeScriptTags());
// server.use(require('prerender-redis-cache'));
// server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
