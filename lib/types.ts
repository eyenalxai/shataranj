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

type ControlMethod = "manual" | Strategy

export type PlayerControls = {
	[key in Color]: ControlMethod
}
