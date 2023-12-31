import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://storage.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // rewrite path
      },
    })
  );
};
