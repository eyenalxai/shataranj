import { getBestMove, stockfishMove } from "@/lib/strategy/stockfish"
import { Chess } from "chess.js"

type BerserkMoveProps = {
	fen: string
	signal: AbortSignal
}

export const berserkMove = async ({ fen, signal }: BerserkMoveProps) => {
	const chessboard = new Chess(fen)

	const legalMoves = chessboard.moves({ verbose: true })
	const captureMoves = legalMoves.filter((move) => move.flags.includes("c"))

	if (captureMoves.length === 1) return captureMoves[0].lan
	if (captureMoves.length > 1) return await getBestMove({ fen, moves: captureMoves.map((move) => move.lan), signal })

	return await stockfishMove({ fen, maxTime: 100, signal })
}
