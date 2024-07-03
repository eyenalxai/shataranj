"use client"

import type { ChessMove, PlayerControls } from "@/lib/types"
import { Chess, type Square } from "chess.js"
import { useState } from "react"

export const useChessGame = () => {
	const [game, setGame] = useState(new Chess())
	const [playerControls, setPlayerControls] = useState<PlayerControls>({
		w: "manual",
		b: "manual"
	})

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

	return { game, onPieceDrop, disabled: playerControls[game.turn()] !== "manual" }
}
