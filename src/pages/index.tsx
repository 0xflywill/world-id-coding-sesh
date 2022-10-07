import { FC, useState } from 'react'
import { APP_NAME } from '@/lib/consts'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import dynamic from 'next/dynamic'
import { VerificationResponse, WidgetProps } from '@worldcoin/id'
import apiReq from '@/lib/fetcher'

const WorldIDWidget = dynamic<WidgetProps>(() => import('@worldcoin/id').then(mod => mod.WorldIDWidget), { ssr: false })

const Home: FC = () => {
	const [error, setError] = useState('')
	const [proof, setProof] = useState(null as null | VerificationResponse)
	const handleClaim = async () => {
		const response = await apiReq('/api/claim', { signal: 'my-poap', ...proof })
		if (response.ok) {
			const { url } = await response.json()
			window.location.href = url
		} else {
			console.error(await response.json())
			setError('Error claiming.')
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
						You've met flywill.eth at ETHBogotá
					</div>
				</div>

				<div className="flex justify-center mt-16">
					<WorldIDWidget signal="my-poap" actionId={process.env.NEXT_PUBLIC_ACTION_ID} onSuccess={setProof} />
				</div>
				<div className="flex justify-center mt-8">
					<button
						className="bg-violet-600 text-white rounded-lg px-16 py-4 drop-shadow-md disabled:bg-violet-300 disabled:cursor-not-allowed"
						onClick={handleClaim}
						disabled={!proof}
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
