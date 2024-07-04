import { getBestMove } from "@/lib/strategy/stockfish"
import { Chess } from "chess.js"

type BerserkMoveProps = {
	fen: string
}

export const berserkMove = async ({ fen }: BerserkMoveProps) => {
	console.log("Berserk move")
	const chessboard = new Chess(fen)
	const legalMoves = chessboard.moves({ verbose: true })
	const captureMoves = legalMoves.filter((move) => move.flags.includes("c"))
	console.log("Capture moves", captureMoves)
	if (captureMoves.length === 1) return captureMoves[0].san

	if (captureMoves.length > 1) {
		return await getBestMove({ fen, moves: captureMoves.map((move) => move.san) })
	}

	return await getBestMove({ fen, moves: legalMoves.map((move) => move.san) })
}
