import type { Color, PieceSymbol, Square } from "chess.js"

export type ChessMove = {
	from: Square
	to: Square
	promotion?: PieceSymbol
}

type Strategy = "random-move" | "stockfish"

type ControlMethod = "manual" | Strategy

export type PlayerControls = {
	[key in Color]: ControlMethod
}
