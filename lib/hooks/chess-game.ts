"use client"

import { executeStrategy } from "@/lib/execute"
import { randomMove } from "@/lib/strategy"
import type { ChessMove, PlayerControls } from "@/lib/types"
import { Chess, type Square } from "chess.js"
import { useEffect, useState } from "react"
import { toast } from "sonner"

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

		const timeout = setTimeout(() => {
			makeMove().catch((error) => toast.error(`${error}`))
		}, 400)

		return () => clearTimeout(timeout)
	}, [playerControls, chessboard])

	const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
		try {
			const chessMove: ChessMove = {
				from: sourceSquare,
				to: targetSquare,
				promotion: "q"
			}

			const chessboardCopy = new Chess(chessboard.fen())
			const move = chessboardCopy.move(chessMove)
			setChessboard(chessboardCopy)

			return move !== null
		} catch (error) {
			toast.error(`${error}`)
			return false
		}
	}

	return { chessboard, onPieceDrop, disabled: playerControls[chessboard.turn()] !== "manual" }
}
