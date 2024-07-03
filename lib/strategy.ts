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

export const stockFishMove = async ({ fen }: RandomMoveProps) => {
	return fetcher(`/api/moves/stockfish?fen=${fen}`)
		.then((response) => {
			if (!response.ok) {
				toast.error(`Error: ${response.status} ${response.statusText}`)
				return null
			}
			return response.text()
		})
		.catch((error) => {
			toast.error(`${error}`)
			return null
		})
}
