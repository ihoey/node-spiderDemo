var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var url = 'https://blog.wilddog.com/?cat=28';
var items = [];

https.get(url, function(res) {
    var data = "";
    res.on('data', function(chunk) {
        data += chunk;
    });
    res.on("end", function(chunk) {
        items = [];
        var $ = cheerio.load(data)
        $('.entry-header').each(function(idx, element) {
            var $element = $(element);
            items.push({
                title: $element.find('.entry-title a').text(),
                href: $element.find('.entry-title a').attr('href'),
                time: $element.find('.entry-meta .entry-date').text(),
                author: $element.find('.author a').text()
            });
        });
    });
});

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
