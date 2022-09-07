const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors')
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

const port = 4250;

app.use(express.static(__dirname + '/dist/applications-app'));

const applicationsAppUrl = 'https://rpnszaidmg.execute-api.eu-west-1.amazonaws.com/Prod';
const applicationsAppAuthorizationKey = '9874654654987654658';
app.use(
    '/api',
    createProxyMiddleware({
        target: applicationsAppUrl,
        changeOrigin: true,
        onProxyReq: proxyReq => proxyReq.setHeader('Authorization', applicationsAppAuthorizationKey),
        pathRewrite: {
            '^/api': '',
        },
    })
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/applications-app/index.html'));
});





const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
