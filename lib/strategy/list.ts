import { executeStrategy } from "@/lib/strategy/execute"

export const strategyFunctions = {
	"random-move": async (fen: string) => executeStrategy({ strategy: "random-move", fen }),
	"stockfish-10": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 10 }),
	"stockfish-100": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 100 }),
	"stockfish-500": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 500 }),
	"stockfish-1000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 1000 }),
	"stockfish-2000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 2000 }),
	"stockfish-3000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 3000 }),
	"stockfish-5000": async (fen: string) => executeStrategy({ strategy: "stockfish", fen, maxTime: 5000 })
}
