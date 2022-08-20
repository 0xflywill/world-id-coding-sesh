import { VerificationResponse } from '@worldcoin/id'
import { NextApiRequest, NextApiResponse } from 'next'

const POAP_URL = 'https://welook.io/mint/cwb8p5'

type RequestBody = VerificationResponse & { signal: string }

const action_id = process.env.NEXT_PUBLIC_ACTION_ID

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { signal, merkle_root, nullifier_hash, proof }: RequestBody = req.body

	if (true) {
		return res.status(200).json({ url: POAP_URL })
	}
	return res.status(400).json(await response.json())
}

export default handler
