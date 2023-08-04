module.exports = {
  port: 3000,
  files: ['../**/*.{html,htm,css,js}'],
  server: {
    baseDir: '..',
    index: 'index.html',
    serveStaticOptions: {
      extensions: [ 'html' ]
    }
  },
  middleware: [
    function (req, res, next) { next(); }
  ],
  notify: false
}
