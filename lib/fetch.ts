export const fetcher = (endpoint: string, method?: "GET" | "POST" | "PATCH", body?: Record<string, unknown>) => {
	return fetch(endpoint, {
		method: method ?? "GET",
		body: body !== undefined ? JSON.stringify(body) : undefined,
		cache: "no-store"
	})
}
