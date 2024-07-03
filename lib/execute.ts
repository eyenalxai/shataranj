import type { ChessMove } from "@/lib/types"

export type StrategyFunction = ({ fen }: { fen: string }) => ChessMove | Promise<ChessMove>

type ExecuteStrategyProps = {
	strategyFn: StrategyFunction
	fen: string
}

export const executeStrategy = ({ strategyFn, fen }: ExecuteStrategyProps) => {
	return strategyFn({ fen })
}
