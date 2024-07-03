import type { Color } from "chess.js"

type StockfishStrategy =
	| "stockfish-10"
	| "stockfish-100"
	| "stockfish-500"
	| "stockfish-1000"
	| "stockfish-2000"
	| "stockfish-3000"
	| "stockfish-5000"

export type Strategy = "random-move" | StockfishStrategy

export type ControlMethod = "manual" | Strategy

export type PlayerControls = {
	[key in Color]: ControlMethod
}

export type Reason =
	| "checkmate"
	| "stalemate"
	| "insufficient_material"
	| "seventyfive_moves"
	| "fivefold_repetition"
	| "fifty_moves"
	| "threefold_repetition"
	| "variant_win"
	| "variant_loss"
	| "variant_draw"

export type GameOutcome = {
	winner: Color
	reason: Reason
}

export type SetPlayerStrategy = ({ player, strategy }: { player: Color; strategy: ControlMethod }) => void
