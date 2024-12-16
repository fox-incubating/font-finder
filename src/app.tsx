import { useEffect, useState } from 'preact/hooks'
import './app.css'

type FontEntry = {
	id: string
	family: string
	subsets: string[]
	weights: number[]
	styles: string[]
	defSubset: string
	variable: { ital: VariableEntry; wdth: VariableEntry; wght: VariableEntry }
	lastModified: string
	version: string
	category: string
	license: {
		type: string
		url: string
		attribution: string
	}
	source: string
	type: string
}
type VariableEntry = {
	default: string
	min: string
	max: string
	step: string
}

export function App() {
	const [allFontIds, setAllFontIds] = useState<string[]>([])
	const [allFontMetadata, setAllFontMetadata] = useState<any>({})
	const [searchSettings, setSearchSettings] = useState({
		categories: ['sans-serif'],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		string: '',
	})
	const [h1Font, setH1Font] = useState(48)
	const [pFont, setPFont] = useState(18)

	const itemsInPage = 10
	const [currentPage, setCurrentPage] = useState(0)
	const filteredFontIds = allFontIds.filter((fontId) => {
		let shouldShow = true

		const metadata = allFontMetadata[fontId]
		if (!metadata.family.toLowerCase().includes(searchSettings.string)) {
			shouldShow = false
		}

		if (!searchSettings.categories.includes(metadata.category)) {
			shouldShow = false
		}

		for (const weights of searchSettings.weights) {
			if (!metadata.weights.includes(weights)) {
				shouldShow = false
			}
		}

		return shouldShow
	})

	console.log(filteredFontIds.length)

	useEffect(() => {
		fetch('/api/font/get-all-metadata', { method: 'GET' })
			.then((res) => {
				return res.json()
			})
			.then((json: any) => {
				setAllFontIds(Object.keys(json))
				setAllFontMetadata(json)
			})
	}, [])
	const [searchSettingsDialog, showSearchSettingsDialog] = useState(false)

	return (
		<>
			<dialog class='search-settings' open={searchSettingsDialog}>
				<h2>Search Settings</h2>
				<button
					onClick={() => {
						showSearchSettingsDialog(false)
					}}
				>
					Close
				</button>
				<div>
					<h3>Categories</h3>
					<label>
						Sans-Serif
						<input
							type='checkbox'
							checked={searchSettings.categories.includes('sans-serif')}
							onChange={(ev) => {
								const str = 'sans-serif'
								const categories = searchSettings.categories
								if (ev.target.checked) {
									if (!categories.includes(str)) {
										categories.push(str)
									}
								} else {
									if (categories.includes(str)) {
										categories.splice(categories.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									categories,
								})
							}}
						/>
					</label>
					<label>
						Serif
						<input
							type='checkbox'
							checked={searchSettings.categories.includes('serif')}
							onChange={(ev) => {
								const str = 'serif'
								const categories = searchSettings.categories
								if (ev.target.checked) {
									if (!categories.includes(str)) {
										categories.push(str)
									}
								} else {
									if (categories.includes(str)) {
										categories.splice(categories.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									categories,
								})
							}}
						/>
					</label>
					<label>
						Display
						<input
							type='checkbox'
							checked={searchSettings.categories.includes('display')}
							onChange={(ev) => {
								const str = 'display'
								const categories = searchSettings.categories
								if (ev.target.checked) {
									if (!categories.includes(str)) {
										categories.push(str)
									}
								} else {
									if (categories.includes(str)) {
										categories.splice(categories.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									categories,
								})
							}}
						/>
					</label>
					<label>
						Handwriting
						<input
							type='checkbox'
							checked={searchSettings.categories.includes('handwriting')}
							onChange={(ev) => {
								const str = 'handwriting'
								const categories = searchSettings.categories
								if (ev.target.checked) {
									if (!categories.includes(str)) {
										categories.push(str)
									}
								} else {
									if (categories.includes(str)) {
										categories.splice(categories.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									categories,
								})
							}}
						/>
					</label>
					<label>
						Monospace
						<input
							type='checkbox'
							checked={searchSettings.categories.includes('monospace')}
							onChange={(ev) => {
								const str = 'monospace'
								const categories = searchSettings.categories
								if (ev.target.checked) {
									if (!categories.includes(str)) {
										categories.push(str)
									}
								} else {
									if (categories.includes(str)) {
										categories.splice(categories.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									categories,
								})
							}}
						/>
					</label>
				</div>
				<div>
					<h3>Weights</h3>
					<p>Select the weights that must be included.</p>
					<label>
						100
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(100)}
							onChange={(ev) => {
								const str = 100
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						200
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(200)}
							onChange={(ev) => {
								const str = 200
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						300
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(300)}
							onChange={(ev) => {
								const str = 300
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						400
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(400)}
							onChange={(ev) => {
								const str = 400
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						500
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(500)}
							onChange={(ev) => {
								const str = 500
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						600
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(600)}
							onChange={(ev) => {
								const str = 600
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						700
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(700)}
							onChange={(ev) => {
								const str = 700
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						800
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(800)}
							onChange={(ev) => {
								const str = 800
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
					<label>
						900
						<input
							type='checkbox'
							checked={searchSettings.weights.includes(900)}
							onChange={(ev) => {
								const str = 900
								const weights = searchSettings.weights
								if (ev.target.checked) {
									if (!weights.includes(str)) {
										weights.push(str)
									}
								} else {
									if (weights.includes(str)) {
										weights.splice(weights.indexOf(str), 1)
									}
								}
								setSearchSettings({
									...searchSettings,
									weights,
								})
							}}
						/>
					</label>
				</div>
				<div>
					<h3>Debug</h3>
					<pre>{JSON.stringify(searchSettings, null, '\t')}</pre>
				</div>
			</dialog>
			<div class='overlay'>
				<p>
					<b>Font Settings</b>
				</p>
				<label>
					h1 Font Size
					<input
						type='range'
						defaultValue={h1Font}
						min={12}
						max={32}
						onInput={(ev) => setH1Font(ev.target.value)}
					/>
				</label>
				<label>
					p Font Size
					<input
						type='range'
						defaultValue={pFont}
						min={12}
						max={32}
						onInput={(ev) => setPFont(ev.target.value)}
					/>
				</label>
			</div>
			<div class='bottom'>
				<div class='search'>
					<label>
						<b>Search</b>
						<input
							type='text'
							onInput={(ev) => {
								setSearchSettings({
									...searchSettings,
									string: ev.target.value,
								})
							}}
						/>
					</label>
					<div class='paging'>
						<span>
							Page {currentPage + 1} of {Math.ceil(filteredFontIds.length / itemsInPage)}
						</span>
						<button
							onClick={() => {
								if (currentPage > 0) {
									setCurrentPage(currentPage - 1)
								}
							}}
						>
							Backward
						</button>
						<button
							onClick={() => {
								if (currentPage < Math.ceil(filteredFontIds.length / itemsInPage - 1)) {
									setCurrentPage(currentPage + 1)
								}
							}}
						>
							Forward
						</button>
					</div>
					<button
						onClick={() => {
							showSearchSettingsDialog(true)
						}}
					>
						Search Settings
					</button>
				</div>
				{filteredFontIds.length > 0 ? (
					<div class='font-list'>
						{filteredFontIds
							.slice(currentPage * itemsInPage, currentPage * itemsInPage + itemsInPage)
							.map((fontId) => (
								<FontEntry key={fontId} id={fontId} />
							))}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<h1 class='preview-title' style={'font-size: ' + h1Font + 'px'}>
				Catalan Opening
			</h1>
			<p class='preview-text' style={'font-size: ' + pFont + 'px'}>
				In the Catalan, White adopts a combination of the Queen's Gambit and Réti Opening.
				White combines the space-gaining moves d4 and c4 with g3, preparing to fianchetto
				the king's bishop. This places pressure mainly on the queenside while hoping to
				keep the white king safe in the long-term. The c4-pawn can become vulnerable,
				however, and White might have to sacrifice a pawn.
			</p>
			<p class='preview-text' style={'font-size: ' + pFont + 'px'}>
				Black has two main approaches to play against the Catalan: in the Open Catalan
				Black plays ...dxc4 and can either try to hold on to the pawn with ...b5 or give
				it back for extra time to free their game. In the Closed Catalan, Black does not
				capture on c4; their game can be somewhat cramped for a while, but is quite solid.
				Additionally, Black has ways to avoid the Catalan.
			</p>
			<p class='preview-text' style={'font-size: ' + pFont + 'px'}>
				The Catalan has had proponents at the highest level in chess, with Vladimir
				Kramnik, Viswanathan Anand and Magnus Carlsen all employing the opening in their
				World Chess Championship title games. A number of other grandmasters have
				successfully played the Catalan, including Fabiano Caruana, Daniil Dubov, Anish
				Giri and Ding Liren.
			</p>
		</>
	)
}

function FontEntry({ id }: { id: string }) {
	const [font, setFont] = useState<null | FontEntry>(null)
	{
		const link = document.createElement('link')
		link.type = 'text/css'
		link.rel = 'stylesheet'
		link.href = `/fonts/get-full-stylesheet/${id}.css`
		document.head.appendChild(link)
	}

	useEffect(() => {
		fetch(`/api/font/get-metadata/${id}`, { method: 'POST' })
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				setFont(json)
			})
	}, [])

	if (!font) {
		return <p>Loading...</p>
	} else {
		return (
			<div class='font-entry'>
				<div>
					<p class='family'>{font.family}</p>
					<span class='category'>{font.category}</span>
				</div>
				<button
					onClick={() => {
						for (const el of document.querySelectorAll<HTMLParagraphElement>(
							'.preview-title',
						)) {
							el.style.fontFamily = `'${font.family}', monospace`
						}
					}}
				>
					Set Title
				</button>
				<button
					onClick={() => {
						for (const el of document.querySelectorAll<HTMLParagraphElement>(
							'.preview-text',
						)) {
							el.style.fontFamily = `'${font.family}', monospace`
						}
					}}
				>
					Set Text
				</button>
				<p
					class='test'
					style={{
						fontFamily: `'${font.family}', monospace`,
					}}
				>
					The quick brown fox jumped over the lazy dog
				</p>
			</div>
		)
	}
}
