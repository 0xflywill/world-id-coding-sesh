import apiReq from '@/lib/fetcher'
import { VerificationResponse } from '@worldcoin/id'
import { NextApiRequest, NextApiResponse } from 'next'

const POAP_URL = 'https://welook.io/mint/cwb8p5'

type RequestBody = VerificationResponse & { signal: string }

const action_id = process.env.NEXT_PUBLIC_ACTION_ID

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { signal, merkle_root, nullifier_hash, proof }: RequestBody = req.body

	const verificationResponse = await apiReq('https://developer.worldcoin.org/api/v1/verify', {
		signal,
		merkle_root,
		nullifier_hash,
		proof,
		action_id: process.env.NEXT_PUBLIC_ACTION_ID,
	})

	if (verificationResponse.ok) {
		return res.status(200).json({ url: POAP_URL })
	}
	return res.status(400).json(await verificationResponse.json())
}

export default handler
