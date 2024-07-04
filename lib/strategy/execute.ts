import { randomMove, stockFishMove } from "@/lib/strategy/moves"

export const exhaustiveCheck = (_: never): never => {
	throw new Error("Exhaustive check failed")
}

type ExecuteStrategyProps =
	| {
			strategy: "random-move"
			fen: string
	  }
	| {
			strategy: "stockfish"
			maxTime: number
			fen: string
			signal: AbortSignal
	  }

export const executeStrategy = (props: ExecuteStrategyProps): string | Promise<string | null> => {
	switch (props.strategy) {
		case "random-move":
			return randomMove({ fen: props.fen })
		case "stockfish":
			return stockFishMove({ fen: props.fen, maxTime: props.maxTime, signal: props.signal })
		default:
			return exhaustiveCheck(props)
	}
}
