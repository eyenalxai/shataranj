import { getBestMove, getBestMoveFromList } from "@/lib/strategy/stockfish"
import { Chess } from "chess.js"

type PacifistMoveProps = {
	fen: string
	signal: AbortSignal
}

export const pacifistMove = async ({ fen, signal }: PacifistMoveProps) => {
	const chessboard = new Chess(fen)

	const legalMoves = chessboard.moves({ verbose: true })
	const nonCaptureMoves = legalMoves.filter((move) => !move.flags.includes("c") || !move.flags.includes("e"))

	if (nonCaptureMoves.length === 1) return nonCaptureMoves[0].lan
	if (nonCaptureMoves.length > 1)
		return await getBestMoveFromList({ fen, moves: nonCaptureMoves.map((move) => move.lan), signal })

	return await getBestMove({ fen, maxTime: 100, signal })
}
