import type { Color } from "chess.js"

type StockfishStrategy =
	| "stockfish-10"
	| "stockfish-100"
	| "stockfish-500"
	| "stockfish-1000"
	| "stockfish-2000"
	| "stockfish-3000"
	| "stockfish-5000"

export type Strategy = "random-move" | "berserk" | StockfishStrategy

export type ControlMethod = "manual" | Strategy

export type PlayerControls = {
	[key in Color]: ControlMethod
}

export type GameOutcome = "threefold-repetition" | "draw" | "checkmate" | "stalemate" | "insufficient-material"

export type SetPlayerStrategy = ({ player, strategy }: { player: Color; strategy: ControlMethod }) => void

export const exhaustiveCheck = (_: never): never => {
	throw new Error("Exhaustive check failed")
}
