import { randomElement } from "@/lib/utils"
import { Chess } from "chess.js"

type RandomMoveProps = {
	fen: string
}

export const randomMove = ({ fen }: RandomMoveProps) => {
	const chessboard = new Chess(fen)
	return randomElement(chessboard.moves())
}
