import { getBestMoveFromLegalMoves } from "@/lib/stockfish"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
	const { fen, moves }: { fen: string; moves: string[] } = await request.json()

	console.log("POST /api/moves/evaluate", fen, moves)

	try {
		const bestMove = await getBestMoveFromLegalMoves(fen, moves, 50)
		console.log("Best move", bestMove)
		return new NextResponse(bestMove)
	} catch (error) {
		return new NextResponse(error?.toString() || "Error finding best move", { status: 500 })
	}
}
