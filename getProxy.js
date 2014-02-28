var http = require('http')
var querystring = require('querystring')
var config = require('./config')
var log = require('./log')
var cheerio = require('cheerio')

var content = ''

var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://cn-proxy.com/',
	method: 'GET',
	headers: {
	"Content-Length": content.length,
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	//"Accept-Encoding":"gzip,deflate,sdch",
	"Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
	"Connection":"keep-alive",
	"Host":"cn-proxy.com",
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0"
	}
}

var check = function(){

	var req = http.request(options, function(res){
		res.setEncoding('utf8')
		var html = ''
		res.on('data', function(data){
			html += data
		})
		.on('end', function(){
			var $ = cheerio.load(html)
			$('tr').each(function(i, o){
				var ip = $(o).find('td').eq(0).text()
				var port = $(o).find('td').eq(1).text()
				if(!/\d/.test(ip)){
					return
				}
				log.write(ip +':'+ port)
			})
		})
	})

	req.write(content)
	req.end()
}

check()
//setInterval(check, 10)