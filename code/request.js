const http = require('http');
const https = require('https');

function makeRequest(verb, url, headers = {}, body = {}) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const options = {
            method: verb,
            headers: headers
        };

        const req = protocol.request(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (Object.keys(body).length > 0) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
}

module.exports = {
    makeRequest
}