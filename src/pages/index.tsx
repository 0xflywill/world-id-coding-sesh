import { FC, useState } from 'react'
import { APP_NAME } from '@/lib/consts'
import ThemeSwitcher from '@/components/ThemeSwitcher'

const SIGNAL = 'poap-0xE301'
const ACTION_ID = 'wid_4e31f348e539ddb9245854b4ce7872f1'

const Home: FC = () => {
	const [error, setError] = useState('')
	const handleClaim = async () => {
		const response = await fetch('/api/claim', {
			method: 'POST',
			body: JSON.stringify({ signal: SIGNAL, actionId: ACTION_ID }),
		})
		if (response.ok) {
			const { url } = await response.json()
			window.location.href = url
		} else {
			console.error(await response.json())
			setError('Error claiming. Please check console for details.')
		}
	}

	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
				<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
					<h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
				</div>

				<div className="flex items-center flex-col mt-8">
					<img className="w-48" src="/images/poap-image.png" alt="" />
					<div className="mt-8 text-xl text-bold bg-slate-200 py-4 px-8 dark:bg-neutral-700 rounded-md">
						You've met flywill.eth at ETHMexico
					</div>
				</div>

				<div className="flex justify-center mt-16">
				</div>
				<div className="flex justify-center mt-8">
					<button
						className="bg-violet-600 text-white rounded-lg px-16 py-4 drop-shadow-md disabled:bg-violet-300 disabled:cursor-not-allowed"
						onClick={handleClaim}
					>
						Claim POAP
					</button>
				</div>
				{error && <div className="flex justify-center mt-8 text-red-400	">{error}</div>}

				<div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg"></div>
			</div>
		</div>
	)
}

export default Home
