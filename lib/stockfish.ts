import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process"

export const getStockfishMove = async (fen: string, maxTime: number) => {
	const stockfish = spawn("stockfish")

	stockfish.stdin.write(`position fen ${fen}\n`)
	stockfish.stdin.write(`go movetime ${maxTime}\n`)

	return listenForBestMove(stockfish, fen, maxTime)
}

const listenForBestMove = (stockfish: ChildProcessWithoutNullStreams, fen: string, maxTime: number) => {
	stockfish.stdin.write(`position fen ${fen}\n`)
	stockfish.stdin.write(`go movetime ${maxTime}\n`)

	return new Promise((resolve, reject) => {
		stockfish.stdout.on("data", (data: Buffer) => {
			const output = data.toString()
			const match = output.match(/^bestmove\s(\S+)/m)
			if (match) {
				const bestMove = match[1]
				stockfish.stdin.end()
				resolve(bestMove)
			}
		})

		stockfish.stderr.on("data", (data: Buffer) => {
			reject(new Error(`Stockfish error: ${data.toString()}`))
		})

		stockfish.on("close", (code: number) => {
			if (code !== 0) reject(new Error(`Stockfish exited with code ${code}`))
		})
	}) as Promise<string>
}

export const getBestMoveFromLegalMoves = async (
	fen: string,
	legalMoves: string[],
	maxTimeEach: number
): Promise<string> => {
	let bestMove = ""
	let bestEvaluation = Number.NEGATIVE_INFINITY
	for (const move of legalMoves) {
		try {
			const evaluation = await evaluateMove(fen, move, maxTimeEach)
			if (evaluation > bestEvaluation) {
				bestEvaluation = evaluation
				bestMove = move
			}
		} catch (error) {
			console.error(`Error evaluating move ${move}:`, error)
		}
	}
	return bestMove
}

const evaluateMove = (fen: string, move: string, maxTime: number): Promise<number> => {
	return new Promise((resolve, reject) => {
		const stockfish = spawn("stockfish")
		let depthReached = 0
		stockfish.stdin.write("uci\n")
		// Wait for readyok before proceeding
		stockfish.stdin.write(`position fen ${fen} moves ${move}\n`)
		stockfish.stdin.write(`go movetime ${maxTime}\n`)

		stockfish.stdout.on("data", (data: Buffer) => {
			const output = data.toString()
			if (/bestmove/.test(output)) {
				resolve(depthReached) // Using depth as a proxy for move quality
			}
			const depthMatch = output.match(/depth (\d+)/)
			if (depthMatch) {
				depthReached = Number.parseInt(depthMatch[1], 10)
			}
		})

		stockfish.stderr.on("data", (data: Buffer) => {
			reject(new Error(`Stockfish error: ${data.toString()}`))
		})

		stockfish.on("close", (code: number) => {
			if (code !== 0) {
				reject(new Error(`Stockfish exited with code ${code}`))
			} else {
				resolve(depthReached) // Ensure resolution even if bestmove isn't found
			}
		})
	})
}
