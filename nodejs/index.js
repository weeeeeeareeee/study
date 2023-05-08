const http = require('http');
const url = require('url');
const qs = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
	let reqData = null;
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	if (req.method == 'GET') {
		reqData = url.parse(req.url, true).query;
		res.write(JSON.stringify(reqData));
	} else if (req.method == 'POST') {
		reqData = await getPostRequestData(req);
		res.write(reqData);
	}

	res.end();
});
server.listen(port, hostname, () => {
	console.log(hostname + ':' + port);
});

const getPostRequestData = (req) => {
	return new Promise((resolve, reject) => {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			resolve(body);
		});
		req.on('error', (e) => {
			reject(e);
		});
	});
};
