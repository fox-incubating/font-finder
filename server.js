import http from 'http'
import fs from 'fs'
import fsp from 'fs/promises'
import p from 'path-to-regexp'

const googleFonts = []

{
	for (const stat of fs.readdirSync('./fonts/fonts/google', {
		withFileTypes: true,
	})) {
		if (!stat.isDirectory()) {
			continue
		}

		googleFonts.push(stat.name)
	}
}

const server = http.createServer(async (req, res) => {
	console.log(req.url)

	if (p.match('/api/fonts/list')(req.url) && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(googleFonts))
	} else if (p.match('/api/font/:font')(req.url) && req.method === 'POST') {
		const match = p.match('/api/font/:font')(req.url)
		const fontName = match.params.font
		const json = await fsp.readFile(`./fonts/fonts/google/${fontName}/metadata.json`)
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(json)
	} else if (p.match('/fonts/:fontId')(req.url) && req.method === 'GET') {
		const match = p.match('/fonts/:fontId')(req.url)
		const fontId = match.params.fontId
		let stylesheet = ''
		for (const stat of await fsp.readdir(`./fonts/fonts/google/${fontId}`, {
			withFileTypes: true,
		})) {
			if (!stat.isFile()) {
				continue
			}

			if (/^[0-9]{3}/.test(stat.name)) {
				stylesheet += (
					await fsp.readFile(`./fonts/fonts/google/${fontId}/${stat.name}`, 'utf-8')
				).replaceAll('./files/', `/static/${fontId}/`)
				stylesheet += '\n'
			}
		}
		console.log(stylesheet)
		res.setHeader('Content-Type', 'text/css')
		res.write(stylesheet)
		res.end()
	} else if (p.match('/static/:fontId/:fontFile')(req.url) && req.method === 'GET') {
		const match = p.match('/static/:fontId/:fontFile')(req.url)
		const fontId = match.params.fontId
		const fontFile = match.params.fontFile
		const content = await fsp.readFile(`./fonts/fonts/google/${fontId}/files/${fontFile}`)
		res.write(content)
		res.end()
	} else {
		console.log(`No match found: "${req.method}: ${req.url}"`)
		res.writeHead(404)
		res.end()
	}
})

server.listen(3001, () => console.log('Server listening on port 3001'))
