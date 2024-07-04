import { getStockfishMove } from "@/lib/stockfish"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url)

	const fen = searchParams.get("fen")
	if (!fen) return new NextResponse("FEN query param is required", { status: 400 })

	const maxTimeString = searchParams.get("maxTime")
	if (!maxTimeString) return new NextResponse("maxTime query param is required", { status: 400 })

	const maxTime = Number.parseInt(maxTimeString, 10)

	try {
		const bestMove = await getStockfishMove(fen, maxTime)
		return new NextResponse(bestMove)
	} catch (error) {
		return new NextResponse(error?.toString() || "Error finding best move", { status: 500 })
	}
}
