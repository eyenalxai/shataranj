import { Chess } from "chess.js"

export const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

type RandomMoveProps = {
	fen: string
}

export const randomMove = ({ fen }: RandomMoveProps) => {
	const chessboard = new Chess(fen)
	return randomElement(chessboard.moves())
}
