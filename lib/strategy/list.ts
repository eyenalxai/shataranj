import { executeStrategy } from "@/lib/strategy/execute"

export const strategyFunctions = {
	"random-move": async (fen: string) => executeStrategy({ strategy: "random-move", fen }),
	"stockfish-10": async (fen: string, signal: AbortSignal) =>
		executeStrategy({ strategy: "stockfish", fen, maxTime: 10, signal }),
	"stockfish-100": async (fen: string, signal: AbortSignal) =>
		executeStrategy({ strategy: "stockfish", fen, maxTime: 100, signal }),
	"stockfish-500": async (fen: string, signal: AbortSignal) =>
		executeStrategy({ strategy: "stockfish", fen, maxTime: 500, signal }),
	"stockfish-1000": async (fen: string, signal: AbortSignal) =>
		executeStrategy({ strategy: "stockfish", fen, maxTime: 1000, signal }),
	"stockfish-2000": async (fen: string, signal: AbortSignal) =>
		executeStrategy({ strategy: "stockfish", fen, maxTime: 2000, signal }),
	"stockfish-3000": async (fen: string, signal: AbortSignal) =>
		executeStrategy({ strategy: "stockfish", fen, maxTime: 3000, signal }),
	"stockfish-5000": async (fen: string, signal: AbortSignal) =>
		executeStrategy({ strategy: "stockfish", fen, maxTime: 5000, signal })
}
