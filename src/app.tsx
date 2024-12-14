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
	const [allFontsList, setAllFontsList] = useState<string[]>([])

	const [h1Font, setH1Font] = useState(48)
	const [pFont, setPFont] = useState(18)
	const [searchStr, setSearchStr] = useState('')

	const itemsInPage = 20
	const [currentPage, setCurrentPage] = useState(0)
	const [totalPage, setTotalPage] = useState(1)

	useEffect(() => {
		fetch('/api/fonts/list', { method: 'GET' })
			.then((res) => {
				return res.json()
			})
			.then((json: any) => {
				setAllFontsList(json)
			})
	}, [])

	return (
		<>
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
								setSearchStr(ev.target.value)
								setFonts(
									allFontsList.filter((font) =>
										font.toLowerCase().includes(searchStr.toLowerCase()),
									),
								)
							}}
						/>
					</label>
					<div class='paging'>
						<span>
							Page {currentPage + 1} of {Math.ceil(allFontsList.length / itemsInPage)}
						</span>
						<button onClick={() => setCurrentPage(currentPage - 1)}>Backward</button>
						<button onClick={() => setCurrentPage(currentPage + 1)}>Forward</button>
					</div>
					<input type='checkbox' />
				</div>
				{allFontsList.length > 0 ? (
					<div class='font-list'>
						{allFontsList.slice(currentPage * itemsInPage, itemsInPage).map((fontId) => (
							<FontEntry id={fontId} />
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
		link.href = `/fonts/${id}`
		document.head.appendChild(link)
	}

	useEffect(() => {
		fetch(`/api/font/${id}`, { method: 'POST' })
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
