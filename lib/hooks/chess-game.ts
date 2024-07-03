"use client"

import { executeStrategy } from "@/lib/execute"
import { randomMove } from "@/lib/strategy"
import type { ChessMove, PlayerControls } from "@/lib/types"
import { Chess, type Square } from "chess.js"
import { useEffect, useState } from "react"

export const useChessGame = () => {
	const [chessboard, setChessboard] = useState(new Chess())
	const [playerControls, _setPlayerControls] = useState<PlayerControls>({
		w: "manual",
		b: "random-move"
	})

	useEffect(() => {
		if (playerControls[chessboard.turn()] === "manual") return

		const makeMove = async () => {
			if (playerControls[chessboard.turn()] === "random-move") {
				const chessMove = await executeStrategy({
					strategyFn: randomMove,
					fen: chessboard.fen()
				})

				const chessboardCopy = new Chess(chessboard.fen())
				chessboardCopy.move(chessMove)
				setChessboard(chessboardCopy)
			}
		}

		makeMove().catch((error) => console.error(`Error making move: ${error}`))
	}, [playerControls, chessboard])

	const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
		const chessMove: ChessMove = {
			from: sourceSquare,
			to: targetSquare,
			promotion: "q"
		}

		const chessboardCopy = new Chess(chessboard.fen())
		const move = chessboardCopy.move(chessMove)
		setChessboard(chessboardCopy)

		return move !== null
	}

	return { chessboard, onPieceDrop, disabled: playerControls[chessboard.turn()] !== "manual" }
}
