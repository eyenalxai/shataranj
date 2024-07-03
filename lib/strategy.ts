import type { ChessMove } from "@/lib/types"
import { Chess } from "chess.js"

export const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const randomMove = (fen: string): ChessMove => {
	const chessboard = new Chess(fen)
	const move = randomElement(
		chessboard.moves({
			verbose: true
		})
	)
	return {
		from: move.from,
		to: move.to,
		promotion: move.promotion
	}
}
