const express = require ('express')
const app = express()
const http = require('http')
const cors = require('cors')
const bodyParser = require ('body-parser')
const port = (process.env.NODE_ENV=='prod')? process.env.PROD_APP_PORT : 3000
const hostname = (process.env.NODE_ENV=='prod')? process.env.PROD_APP_HOST : 'localhost'
const morgan=require('morgan')
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('tiny'))
// instagram test
// santitize
console.log('ENVIRONMENT:', process.env.NODE_ENV)
// log function
function createRequestLogs (data, brandName) {
	let fileName = brandName ? brandName : 'request'
	let basePath = path.join(__dirname, 'requestLogs')
	let existsPath = fs.existsSync(basePath)
	if (!existsPath) {
		fs.mkdir(basePath, (err) => {
			if (err) console.log(err)
		})
	}
	let currentTime = new Date()
	let logData = typeof data === 'object' && data? (JSON.stringify(data) + ' - ' + currentTime.toISOString() + ' - ' + currentTime + '\r\n') : (data + ' - ' + currentTime.toISOString())
	fs.appendFile(`${basePath}/${fileName}.log`, logData, (err) => {
		if (err) console.log(err)
	})
}
// routeEvents
app.get('/', (req,res) => {
	res.writeHeader(200, {'Content-Type': 'text/html'})
	res.write('API is running on port')
	res.end()
})
app.post('/log', (req,res) => {
	createRequestLogs(null)
	res.status(200).json({
		success: true
	})
})
process.on('uncaughtException', err => {
  console.log(err);
  //process.stderr.write(`Caught Exception. Err: ${err}`, () => process.exit(1))
})

process.on('warning', (warning) => {
	let mes = warning.name +' '+warning.message+' '+warning.stack
	console.log(mes);
	//loggers.createLog({level:'warn',message:mes})
});
const server = http.createServer(app)

server.listen(port,hostname,function() {
	console.log(`App running on ${hostname}:${port}`)
})