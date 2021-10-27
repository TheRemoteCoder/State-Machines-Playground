const liveServer = require('live-server');
 
const params = {
  port: 8181,
  host: '0.0.0.0',    // Set the address to bind to. Defaults to 0.0.0.0.
  root: 'src/',       // Set root directory that's being server. Defaults to cwd.
  open: true,         // When false, it won't load your browser by default.
  ignore: 'scss',     // Comma-separated string for paths to ignore
  file: 'index.html', // When set, serve this file for every 404 (useful for single-page applications)
  wait: 1000          // Waits for all changes, before reloading. Defaults to 0 sec.
};

liveServer.start(params);

