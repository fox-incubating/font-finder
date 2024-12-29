import { useEffect, useState, useRef } from 'preact/hooks'
import './app.css'
import { FontSearchDialog } from './FontSearchDialog.tsx'

export type FontEntry = {
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
export type VariableEntry = {
	default: string
	min: string
	max: string
	step: string
}

export function App() {
	const fontSearchDialogRef = useRef<HTMLDialogElement>(null)

	const [allFontIds, setAllFontIds] = useState<string[]>([])
	const [allFontMetadata, setAllFontMetadata] = useState<any>({})
	const [searchSettings, setSearchSettings] = useState({
		categories: ['sans-serif'],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		string: '',
	})
	const fontScale = [12, 16, 18, 24, 32, 36, 48, 64, 72, 96, 128]
	const [h1Font, setH1Font] = useState(6)
	const [pFont, setPFont] = useState(2)

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

	return (
		<>
			<FontSearchDialog
				ref={fontSearchDialogRef}
				closeDialog={() => {
					if (fontSearchDialogRef.current) {
						fontSearchDialogRef.current.hidePopover()
					}
				}}
				allFontIds={allFontIds}
				allFontMetadata={allFontMetadata}
			/>
			<div class='overlay'>
				<p>
					<b>Font Settings</b>
				</p>
				<label>
					h1 Font Size ({fontScale[h1Font]}px)
					<input
						type='range'
						defaultValue={h1Font}
						min={1}
						max={10}
						onInput={(ev) => setH1Font(ev.target.value - 1)}
					/>
				</label>
				<label>
					p Font Size ({fontScale[pFont]}px)
					<input
						type='range'
						defaultValue={pFont}
						min={1}
						max={10}
						onInput={(ev) => setPFont(ev.target.value - 1)}
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
							if (fontSearchDialogRef.current) {
								fontSearchDialogRef.current.showPopover()
							}
						}}
					>
						Show Font Search
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
			<main class='text'>
				<h1 class='preview-title' style={'font-size: ' + fontScale[h1Font] + 'px'}>
					Catalan Opening
				</h1>
				<p class='preview-text' style={'font-size: ' + fontScale[pFont] + 'px'}>
					In the Catalan, White adopts a combination of the Queen's Gambit and Réti
					Opening. White combines the space-gaining moves d4 and c4 with g3, preparing to
					fianchetto the king's bishop. This places pressure mainly on the queenside while
					hoping to keep the white king safe in the long-term. The c4-pawn can become
					vulnerable, however, and White might have to sacrifice a pawn.
				</p>
				<p class='preview-text' style={'font-size: ' + fontScale[pFont] + 'px'}>
					Black has two main approaches to play against the Catalan: in the Open Catalan
					Black plays ...dxc4 and can either try to hold on to the pawn with ...b5 or give
					it back for extra time to free their game. In the Closed Catalan, Black does not
					capture on c4; their game can be somewhat cramped for a while, but is quite
					solid. Additionally, Black has ways to avoid the Catalan.
				</p>
				<p class='preview-text' style={'font-size: ' + fontScale[pFont] + 'px'}>
					The Catalan has had proponents at the highest level in chess, with Vladimir
					Kramnik, Viswanathan Anand and Magnus Carlsen all employing the opening in their
					World Chess Championship title games. A number of other grandmasters have
					successfully played the Catalan, including Fabiano Caruana, Daniil Dubov, Anish
					Giri and Ding Liren.
				</p>
			</main>
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
