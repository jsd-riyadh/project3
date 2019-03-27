const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const staticMiddleware = require('express').static

let PORT = process.env.PORT || 3000
// serve content out of 'public' as is
server.use(staticMiddleware('public'))

server.use('/api', router)

server.listen(`${PORT}`, () => {
    console.log('JSON Server is running')
});