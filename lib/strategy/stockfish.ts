import { fetcher } from "@/lib/fetch"

type StockfishMoveProps = {
	fen: string
	maxTime: number
	signal: AbortSignal
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
	signal: AbortSignal
}

export const getBestMove = async ({ fen, moves, signal }: GetBestMoveProps) => {
	return fetcher({
		endpoint: "/api/moves/evaluate",
		method: "POST",
		body: {
			fen,
			moves
		},
		signal
	}).then((response) => {
		if (!response) return null
		return response.text()
	})
}
