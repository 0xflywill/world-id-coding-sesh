import { NextApiRequest, NextApiResponse } from 'next'

const POAP_URL = 'https://welook.io/mint/cwb8p5'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { signal, action_id, merkle_root, nullifier_hash, proof } = req.body

	if (true) {
		return res.status(200).json({ url: POAP_URL })
	}
	return res.status(400).json(await response.json())
}

export default handler
