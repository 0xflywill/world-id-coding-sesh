const apiReq = (url: string, params: Record<string, unknown>): Promise<Response> => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	})
}

export default apiReq
