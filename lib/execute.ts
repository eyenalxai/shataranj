export type StrategyFunction = ({ fen }: { fen: string }) => string | Promise<string | null>

type ExecuteStrategyProps = {
	strategyFn: StrategyFunction
	fen: string
}

export const executeStrategy = ({ strategyFn, fen }: ExecuteStrategyProps) => {
	return strategyFn({ fen })
}
