"use client"

import { randomMove } from "@/lib/strategy"
import type { ChessMove, PlayerControls } from "@/lib/types"
import { Chess, type Square } from "chess.js"
import { useEffect, useState } from "react"

export const useChessGame = () => {
	const [game, setGame] = useState(new Chess())
	const [playerControls, setPlayerControls] = useState<PlayerControls>({
		w: "manual",
		b: "random-move"
	})

	useEffect(() => {
		if (playerControls[game.turn()] === "manual") return

		if (playerControls[game.turn()] === "random-move") {
			const chessMove = randomMove(game.fen())
			const gameCopy = new Chess(game.fen())
			gameCopy.move(chessMove)
			setGame(gameCopy)
		}
	}, [playerControls, game])

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
