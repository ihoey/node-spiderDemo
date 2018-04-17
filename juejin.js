var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var url = 'https://juejin.im/welcome/frontend';
var items = [];

https.get(url, function(res) {
    var data = "";
    res.on('data', function(chunk) {
        data += chunk;
    });
    res.on("end", function(chunk) {
        items = [];
        var $ = cheerio.load(data)
        $('#juejin .entry-list>li.item').each(function(index, element) {
            var $element = $(element);
            items.push({
                title: $element.find('.title-row a.title').text(),
                href: $element.find('.title-row a.title').attr('href'),
                like: $element.find('.action-row .like .count').text(),
                author: $element.find('.item.username .user-popover-box a').text()
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
