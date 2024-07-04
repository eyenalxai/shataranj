import { getBestMove, getBestMoveFromList } from "@/lib/strategy/stockfish"
import { Chess } from "chess.js"

type BerserkMoveProps = {
	fen: string
	signal: AbortSignal
}

export const berserkMove = async ({ fen, signal }: BerserkMoveProps) => {
	const chessboard = new Chess(fen)

	const legalMoves = chessboard.moves({ verbose: true })
	const captureMoves = legalMoves.filter((move) => move.flags.includes("c") || move.flags.includes("e"))

	if (captureMoves.length === 1) return captureMoves[0].lan
	if (captureMoves.length > 1)
		return await getBestMoveFromList({ fen, moves: captureMoves.map((move) => move.lan), signal })

	return await getBestMove({ fen, maxTime: 100, signal })
}
