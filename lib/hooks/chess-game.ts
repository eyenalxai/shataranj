"use client"

import { strategyFunctions } from "@/lib/strategy/list"
import type { ControlMethod, GameOutcome, PlayerControls, SetPlayerStrategy } from "@/lib/types"
import { Chess, type Color, type Square } from "chess.js"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const useChessGame = () => {
	const [chessboard, setChessboard] = useState(new Chess())
	const [playerControls, setPlayerControls] = useState<PlayerControls>({
		w: "manual",
		b: "manual"
	})
	const [isPaused, setIsPaused] = useState(false)
	const [gameOutcome, setGameOutcome] = useState<GameOutcome | null>(null)

	const restart = () => {
		setChessboard(new Chess())
		setGameOutcome(null)
		setPlayerControls({ w: "manual", b: "manual" })
		setIsPaused(false)
	}

	const togglePause = () => setIsPaused((prev) => !prev)

	const setPlayerStrategy: SetPlayerStrategy = ({ player, strategy }: { player: Color; strategy: ControlMethod }) => {
		setPlayerControls((prev) => {
			const newPlayerControls = { ...prev }
			newPlayerControls[player] = strategy
			return newPlayerControls
		})
	}

	useEffect(() => {
		if (chessboard.isThreefoldRepetition()) setGameOutcome("threefold-repetition")
		if (chessboard.isDraw()) setGameOutcome("draw")
		if (chessboard.isCheckmate()) setGameOutcome("checkmate")
		if (chessboard.isStalemate()) setGameOutcome("stalemate")
		if (chessboard.isInsufficientMaterial()) setGameOutcome("insufficient-material")
	}, [chessboard])

	useEffect(() => {
		if (isPaused) return
		if (gameOutcome !== null) return

		const strategy = playerControls[chessboard.turn()]

		if (strategy === "manual") return

		const controller = new AbortController()
		const signal = controller.signal

		const makeMove = async () => {
			const execute = strategyFunctions[strategy]

			if (execute) {
				const chessMove = await execute(chessboard.fen(), signal)
				if (chessMove === null) return

				const chessboardCopy = new Chess(chessboard.fen())
				chessboardCopy.move(chessMove)
				setChessboard(chessboardCopy)
			}
		}

		const timeout = setTimeout(() => {
			makeMove().catch((error) => toast.error(`${error}`))
		}, 400)

		return () => {
			clearTimeout(timeout)
			controller.abort()
		}
	}, [playerControls, chessboard, gameOutcome, isPaused])

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

	return {
		chessboard,
		onPieceDrop,
		disabled: playerControls[chessboard.turn()] !== "manual" || gameOutcome !== null || isPaused,
		playerControls,
		setPlayerStrategy,
		gameOutcome,
		restart,
		isPaused,
		togglePause
	}
}
