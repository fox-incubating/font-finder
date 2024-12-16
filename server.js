import http from 'http'
import fs from 'fs'
import fsp from 'fs/promises'
import p from 'path-to-regexp'

const FontMetadata = JSON.parse(
	fs.readFileSync('./google-fonts-repository/metadata/google-fonts-v2.json'),
)
{
	// Compute some statistics.
	const /** @type {string[]} */ allCategories = []
	const /** @type {string[]} */ allSubsets = []
	const /** @type {string[]} */ allStyles = []
	const /** @type {string[]} */ allWeights = []
	for (const fontId in FontMetadata) {
		const category = FontMetadata[fontId].category
		if (!allCategories.includes(category)) {
			allCategories.push(category)
		}

		const subsets = FontMetadata[fontId].subsets
		for (const subset of subsets) {
			if (!allSubsets.includes(subset)) {
				allSubsets.push(subset)
			}
		}

		const styles = FontMetadata[fontId].styles
		for (const style of styles) {
			if (!allStyles.includes(style)) {
				allStyles.push(style)
			}
		}

		const weights = FontMetadata[fontId].weights
		for (const weight of weights) {
			if (!allWeights.includes(weight)) {
				allWeights.push(weight)
			}
		}
		allWeights.sort()
	}
	console.info('categories', allCategories)
	// console.info('subsets', allSubsets)
	console.info('styles', allStyles)
	console.info('weights', allWeights)
}

const server = http.createServer(async (req, res) => {
	{
		const fn = p.match('/api/font/get-all-metadata')
		if (req.method === 'GET' && fn(req.url)) {
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify(FontMetadata))
			return
		}
	}

	{
		const fn = p.match('/api/font/get-metadata/:fontId')
		if (req.method === 'POST' && fn(req.url)) {
			const { fontId } = fn(req.url).params
			const json = await fsp.readFile(
				`./google-fonts-repository/fonts/google/${fontId}/metadata.json`,
			)
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(json)
			return
		}
	}

	{
		const fn = p.match('/api/font/get-metadata2/:fontId')
		if (req.method === 'POST' && fn(req.url)) {
			const { fontId } = fn(req.url).params
			const metadata = FontMetadata[fontId]
			if (metadata) {
				res.writeHead(200, { 'Content-Type': 'application/json' })
				res.end(JSON.stringify(metadata))
			} else {
				res.writeHead(404)
				res.end()
			}
			return
		}
	}

	{
		const fn = p.match('/fonts/get-full-stylesheet/:fontId.css')
		if (req.method === 'GET' && fn(req.url)) {
			const { fontId } = fn(req.url).params
			let stylesheet = ''
			for (const stat of await fsp.readdir(
				`./google-fonts-repository/fonts/google/${fontId}`,
				{
					withFileTypes: true,
				},
			)) {
				if (!stat.isFile()) {
					continue
				}

				if (/^[0-9]{3}/.test(stat.name)) {
					stylesheet += (
						await fsp.readFile(
							`./google-fonts-repository/fonts/google/${fontId}/${stat.name}`,
							'utf-8',
						)
					).replaceAll('./files/', `/static/${fontId}/`)
					stylesheet += '\n'
				}
			}
			res.setHeader('Content-Type', 'text/css')
			res.write(stylesheet)
			res.end()
			return
		}
	}

	{
		const fn = p.match('/static/:fontId/:fontFile')
		if (req.method === 'GET' && fn(req.url)) {
			const match = p.match('/static/:fontId/:fontFile')(req.url)
			const fontId = match.params.fontId
			const fontFile = match.params.fontFile
			const content = await fsp.readFile(
				`./google-fonts-repository/fonts/google/${fontId}/files/${fontFile}`,
			)
			res.write(content)
			res.end()
			return
		}
	}

	{
		console.log(`No match found: "${req.method}: ${req.url}"`)
		res.writeHead(404)
		res.end()
		return
	}
})

server.listen(3001, () => console.log('Server listening on port 3001'))
