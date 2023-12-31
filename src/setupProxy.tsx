import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express'; // Assuming you are using Express

export default function(app: Application) {
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
}
