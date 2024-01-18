const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      if (req.url && req.url.trim().toLowerCase().startsWith('/_next/image')) {
        res.statusCode = 404
        res.end('Not found.')
        return
      }
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      res.statusCode = 500
      res.end('Internal server error.')
    }
  }).listen(port, (err) => {
    if (err) throw err
  })
})
