#!/usr/bin/env node
var prerender = require('./lib');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

var server = prerender({
    workers: WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    logRequests: true,
    resourceDownloadTimeout: 20000,
    pageDoneCheckTimeout: 20000,
    resourceDownloadTimeout: 20000,
    waitAfterLastRequest: 20000,
    jsTimeout: 20000,
    jsCheckTimeout: 20000,
    evaluateJavascriptCheckTimeout: 20000
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
