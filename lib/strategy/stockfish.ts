import { fetcher } from "@/lib/fetch"

type StockfishMoveProps = {
	fen: string
	maxTime: number
	signal?: AbortSignal
}

export const stockfishMove = async ({ fen, maxTime, signal }: StockfishMoveProps) => {
	return fetcher({ endpoint: `/api/moves/stockfish?fen=${fen}&maxTime=${maxTime}`, signal: signal }).then(
		(response) => {
			if (!response) return null
			return response.text()
		}
	)
}

type GetBestMoveProps = {
	fen: string
	moves: string[]
}

export const getBestMove = async ({ fen, moves }: GetBestMoveProps) => {
	return fetcher({
		endpoint: "/api/moves/evaluate",
		method: "POST",
		body: {
			fen,
			moves
		}
	}).then((response) => {
		if (!response) return null
		return response.text()
	})
}
