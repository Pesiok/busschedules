const cheerio = require('cheerio'),
bodyParser = require('body-parser'),
jsonParser = bodyParser.json();

//written by https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const request = function(url) {
    const protocol = url.startsWith('https') ? require('https') : require('http');
    return new Promise((resolve, reject) => {
        const request = protocol.get(url, res => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                reject(new Error(`Failed with status code: ${res.statusCode}`));
            }
            const body = [];
            res.on('data', chunk => body.push(chunk));
            res.on('end', () => resolve(body.join('')));
        });
        request.on('error', err => reject(err));
    })
}

const requestHandler = function(resp) {
        const $ = cheerio.load(resp);

        const schedule = {};
        schedule.stop = $('#title').text();
        schedule.departures = [];

        const elements = $('#departures-table > tr');
        elements.each(function() {
            const departure = {};
            departure.time = $(this).find('.time').text();
            departure.line = $(this).find('.line').text();
            departure.destination = $(this).find('.destination').text();

            schedule.departures.push(departure);
        });
        return schedule;
    }

module.exports = function(app) {
    app.post('/schedule', jsonParser, (req, res) => {
        const url = `http://bielawa.trapeze.fi/bussit/web?command=fullscreen2&stop=${req.body.stop}`;

        request(url)
            .then(requestHandler)
            .then(data => res.json(data))
            .catch(err => console.error(err));   
    });
}
