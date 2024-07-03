"use client"

import { executeStrategy } from "@/lib/execute"
import type { PlayerControls } from "@/lib/types"
import { Chess, type Square } from "chess.js"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export const useChessGame = () => {
	const [chessboard, setChessboard] = useState(new Chess())
	const [playerControls, _setPlayerControls] = useState<PlayerControls>({
		w: "stockfish-10",
		b: "stockfish-100"
	})

	const strategyFunctions = useMemo(() => {
		return {
			"random-move": async (fen: string) => executeStrategy({ strategy: "random-move", fen }),
			"stockfish-10": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 10 }),
			"stockfish-100": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 100 }),
			"stockfish-500": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 500 }),
			"stockfish-1000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 1000 }),
			"stockfish-2000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 2000 }),
			"stockfish-3000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 3000 }),
			"stockfish-5000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 5000 })
		}
	}, [])

	useEffect(() => {
		const strategy = playerControls[chessboard.turn()]

		if (strategy === "manual") return

		const makeMove = async () => {
			const execute = strategyFunctions[strategy]

			if (execute) {
				const chessMove = await execute(chessboard.fen())
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
	}, [playerControls, chessboard, strategyFunctions])

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
