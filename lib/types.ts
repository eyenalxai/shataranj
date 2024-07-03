import type { Color } from "chess.js"

type Strategy = "random-move" | "stockfish"

type ControlMethod = "manual" | Strategy

export type PlayerControls = {
	[key in Color]: ControlMethod
}
