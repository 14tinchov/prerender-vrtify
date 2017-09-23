#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: 4,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    logRequests: true,
    pageDoneCheckTimeout: 9000,
    resourceDownloadTimeout: 50000
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
