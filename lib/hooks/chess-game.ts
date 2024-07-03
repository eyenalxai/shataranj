import type { ChessMove } from "@/lib/types"
import { Chess, type Color, type Square } from "chess.js"
import { useState } from "react"

export const useChessGame = () => {
	const [game, setGame] = useState(new Chess())
	const [playerColor, setPlayerColor] = useState<Color>("w")

	const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
		const chessMove: ChessMove = {
			from: sourceSquare,
			to: targetSquare,
			promotion: "q"
		}

		const gameCopy = new Chess(game.fen())
		const move = gameCopy.move(chessMove)
		setGame(gameCopy)

		return move !== null
	}

	return { game, onPieceDrop, disabled: playerColor !== game.turn() }
}
