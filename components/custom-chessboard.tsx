"use client"

import { useTheme } from "next-themes"

import type { Square } from "chess.js"
import { Chessboard } from "react-chessboard"

type CustomChessboardProps = {
	fen: string
	onPieceDrop: (sourceSquare: Square, targetSquare: Square) => boolean
	disabled: boolean
}

export const CustomChessboard = ({ fen, onPieceDrop, disabled }: CustomChessboardProps) => {
	const { resolvedTheme } = useTheme()

	return (
		<Chessboard
			position={fen}
			onPieceDrop={onPieceDrop}
			arePiecesDraggable={!disabled}
			customDarkSquareStyle={{
				backgroundColor: resolvedTheme === "dark" ? "#404040" : "#a3a3a3"
			}}
			customLightSquareStyle={{
				backgroundColor: resolvedTheme === "dark" ? "#737373" : "#d4d4d4"
			}}
		/>
	)
}
