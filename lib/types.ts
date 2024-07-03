import type { Color, PieceSymbol, Square } from "chess.js"

export type PromotablePieces = Exclude<PieceSymbol, "p" | "k">

export type ChessMove = {
	from: Square
	to: Square
	promotion?: PromotablePieces
}

type ControlMethod = "manual" | "random-move" | "stockfish"

export type PlayerControls = {
	[key in Color]: ControlMethod
}
