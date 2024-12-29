import { forwardRef, useState } from 'preact/compat'

export const FontSearchDialog = forwardRef<
	HTMLDialogElement,
	{ closeDialog: any; allFontIds: any; allFontMetadata: any }
>(({ closeDialog, allFontIds, allFontMetadata }, ref) => {
	const [searchSettings, setSearchSettings] = useState({
		categories: ['sans-serif'],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		string: '',
	})
	const itemsInPage = 24
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

	return (
		<dialog ref={ref} popover='manual' class='dialog-font-search'>
			<div class='controls'>
				<div class='topmost'>
					<label class='search'>
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
						<button
							onClick={() => {
								setCurrentPage(0)
							}}
						>
							First
						</button>
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
						<button
							onClick={() => {
								setCurrentPage(Math.ceil(filteredFontIds.length / itemsInPage) - 1)
							}}
						>
							Last
						</button>
						<span class='paging-info'>
							Page {currentPage + 1} of {Math.ceil(filteredFontIds.length / itemsInPage)}
						</span>
					</div>
					<button
						onClick={() => {
							closeDialog()
						}}
					>
						Close
					</button>
				</div>

				<div class='categories'>
					<b>Categories</b>
					<label>
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
						Sans-Serif
					</label>
					<label>
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
						Serif
					</label>
					<label>
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
						Display
					</label>
					<label>
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
						Handwriting
					</label>
					<label>
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
						Monospace
					</label>
				</div>
				<div class='weights'>
					<b>Weights</b>
					<label>
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
						100
					</label>
					<label>
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
						200
					</label>
					<label>
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
						300
					</label>
					<label>
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
						400
					</label>
					<label>
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
						500
					</label>
					<label>
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
						600
					</label>
					<label>
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
						700
					</label>
					<label>
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
						800
					</label>
					<label>
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
						900
					</label>
				</div>
				<details>
					<summary>Debug</summary>
					<pre>{JSON.stringify(searchSettings, null, '\t')}</pre>
				</details>
			</div>
			{filteredFontIds.length > 0 ? (
				<div class='font-grid'>
					{filteredFontIds
						.slice(currentPage * itemsInPage, currentPage * itemsInPage + itemsInPage)
						.map((fontId) => (
							<FontEntry key={fontId} id={fontId} />
						))}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</dialog>
	)
})

function FontEntry({ id }: { id: string }) {
	return (
		<div class='font-entry'>
			<div>{id}</div>
		</div>
	)
}
