var http = require('http')
var querystring = require('querystring')
var config = require('./config')
var cheerio = require('cheerio')
var lineReader = require('line-reader');

var content = ''

var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://weixin.91160.com/',
	method: 'GET',
	headers: {
	"Content-Length": content.length,
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	//"Accept-Encoding":"gzip,deflate,sdch",
	"Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
	"Connection":"keep-alive",
	"Host":"weixin.91160.com",
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0"
	}
}

var check = function(ip, port){
	options.host = ip
	options.port = port
	try{
		var req = http.request(options, function(res){
			res.setEncoding('utf8')
			if(res.statusCode==200){
				console.log(options.host)
			}
		})

		req.write(content)
		req.end()
	}
	catch (e){
		consle.log(0)
	}
}

lineReader.eachLine('log.txt', function(line, last) {
	var arr = line.split(':')
	var ip = arr[0]
	var port = arr[1]
	//console.log(ip, port)
	
});
check('219.139.34.77', '8080')
//setInterval(check, 10)