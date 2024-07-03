"use client"

import { strategyFunctions } from "@/lib/strategy/list"
import type { ControlMethod, PlayerControls } from "@/lib/types"
import { Chess, type Color, type Square } from "chess.js"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export type SetPlayerStrategy = ({ player, strategy }: { player: Color; strategy: ControlMethod }) => void

export const useChessGame = () => {
	const [chessboard, setChessboard] = useState(new Chess())
	const [playerControls, setPlayerControls] = useState<PlayerControls>({
		w: "manual",
		b: "manual"
	})

	const setPlayerStrategy: SetPlayerStrategy = ({ player, strategy }: { player: Color; strategy: ControlMethod }) => {
		setPlayerControls((prev) => {
			const newPlayerControls = { ...prev }
			newPlayerControls[player] = strategy
			return newPlayerControls
		})
	}

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

	return {
		chessboard,
		onPieceDrop,
		disabled: playerControls[chessboard.turn()] !== "manual",
		playerControls,
		setPlayerStrategy
	}
}
