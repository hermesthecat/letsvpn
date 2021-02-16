const { createProxyMiddleware } = require('http-proxy-middleware');


// This file is used to set up proxy for development so that relative urls will redirect to the API backend.

module.exports = function(app) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        let api = 'localhost';
        if (process.env.API_HOST)
            api = process.env.API_HOST;
        app.use(
            '/api', createProxyMiddleware({
                target: `http://${api}:8000`,
                changeOrigin: true,
            })
        );
        app.use(
            '/staticfiles', createProxyMiddleware({
                target: `http://${api}:8000`,
                changeOrigin: true,
            })
        );
        app.use(
            '/admin', createProxyMiddleware({
                target: `http://${api}:8000`,
                changeOrigin: true,
            })
        );
        app.use(
            '/auth', createProxyMiddleware({
                target: `http://${api}:8000`,
                changeOrigin: true,
            })
        );
        app.use(
            '/social', createProxyMiddleware({
                target: `http://${api}:8000`,
                changeOrigin: true,
            })
        );
        app.use(
            '/media', createProxyMiddleware({
                target: `http://${api}:8000`,
                changeOrigin: true,
            })
        );
    }

};