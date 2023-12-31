const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://storage.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // rewrite path
      },
    })
  );ZZ
};
