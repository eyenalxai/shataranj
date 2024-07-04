import { fetcher } from "@/lib/fetch"
import { Chess } from "chess.js"
import { toast } from "sonner"

export const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

type RandomMoveProps = {
	fen: string
}

export const randomMove = ({ fen }: RandomMoveProps) => {
	const chessboard = new Chess(fen)
	return randomElement(chessboard.moves())
}

type StockFishMoveProps = {
	fen: string
	maxTime: number
	signal?: AbortSignal
}

export const stockFishMove = async ({ fen, maxTime, signal }: StockFishMoveProps) => {
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
