"use client"

import { executeStrategy } from "@/lib/execute"
import type { PlayerControls } from "@/lib/types"
import { Chess, type Square } from "chess.js"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const useChessGame = () => {
	const [chessboard, setChessboard] = useState(new Chess())
	const [playerControls, _setPlayerControls] = useState<PlayerControls>({
		w: "random-move",
		b: "stockfish"
	})

	useEffect(() => {
		if (playerControls[chessboard.turn()] === "manual") return

		const makeMove = async () => {
			if (playerControls[chessboard.turn()] === "random-move") {
				const chessMove = await executeStrategy({
					strategy: "random-move",
					fen: chessboard.fen()
				})

				if (chessMove === null) return

				const chessboardCopy = new Chess(chessboard.fen())
				chessboardCopy.move(chessMove)
				setChessboard(chessboardCopy)
			}

			if (playerControls[chessboard.turn()] === "stockfish") {
				const chessMove = await executeStrategy({
					strategy: "stockfish",
					fen: chessboard.fen(),
					maxTime: 1000
				})

				if (chessMove === null) return

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
			const chessboardCopy = new Chess(chessboard.fen())
			const move = chessboardCopy.move({
				from: sourceSquare,
				to: targetSquare
			})
			setChessboard(chessboardCopy)

			return move !== null
		} catch (error) {
			toast.error(`${error}`)
			return false
		}
	}

	return { chessboard, onPieceDrop, disabled: playerControls[chessboard.turn()] !== "manual" }
}
