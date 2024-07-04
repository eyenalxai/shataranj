import { fetcher } from "@/lib/fetch"
import { toast } from "sonner"

type StockfishMoveProps = {
	fen: string
	maxTime: number
	signal?: AbortSignal
}

export const stockfishMove = async ({ fen, maxTime, signal }: StockfishMoveProps) => {
	return fetcher({ endpoint: `/api/moves/stockfish?fen=${fen}&maxTime=${maxTime}`, signal: signal })
		.then((response) => {
			if (!response.ok) {
				toast.error(`Error: ${response.status} ${response.statusText}`)
				return null
			}
			return response.text()
		})
		.catch((error) => {
			if (error.name === "AbortError") return null
			toast.error(`${error}`)
			return null
		})
}
